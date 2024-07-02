

import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function uploadFile() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];

  if (!keyFile || !folderId) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Search for the existing swagger.json file
    const searchResponse = await drive.files.list({
      q: `name='swagger.json' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      const fileId = files[0].id ?? '';
      console.log(`Found existing swagger.json file with ID: ${fileId}. Updating it...`);

      // Update the existing swagger.json file
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('http/output/swagger.json'),
      };

      const updateResponse = await drive.files.update({
        fileId: fileId,
        media: media,
        fields: 'id',
      });

      if (updateResponse.data && 'id' in updateResponse.data) {
        console.log('Updated swagger.json file with ID:', updateResponse.data.id);
      } else {
        console.error('Unexpected response format:', updateResponse.data);
      }
    } else {
      console.log('No existing swagger.json file found. Uploading a new one...');

      // Upload the new swagger.json file
      const fileMetadata = {
        name: 'swagger.json',
        parents: [folderId],
      };
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('http/output/swagger.json'),
      };

      const uploadResponse = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      if (uploadResponse.data && 'id' in uploadResponse.data) {
        console.log('Uploaded new swagger.json file with ID:', uploadResponse.data.id);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

uploadFile();
