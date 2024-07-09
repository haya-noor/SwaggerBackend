

//Using hashing technique 

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync, spawnSync } from 'child_process';
import crypto from 'crypto';

// Load environment variables from .env file
dotenv.config();

// Get current branch name
function getCurrentBranchName() {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return branchName;
  } catch (error) {
    console.error('Error getting current branch name:', error);
    return 'unknown';
  }
}

// Generate swagger.json file
function generateSwaggerJson() {
  console.log('Generating swagger.json...');
  const result = spawnSync('npx', ['tsoa', 'spec'], { stdio: 'inherit' });
  if (result.error) {
    console.error('Error generating swagger.json:', result.error);
  }
}

// Convert JSON to TypeScript and generate MD5 checksum
function convertJsonToTs(jsonFilePath: string, tsFilePath: string): string {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonObject = JSON.parse(jsonContent);
  const tsContent = `const swaggerSpec = ${JSON.stringify(jsonObject, null, 2)} as const;\nexport default swaggerSpec;\n`;
  fs.writeFileSync(tsFilePath, tsContent, 'utf-8');
  
  const hash = crypto.createHash('md5').update(tsContent).digest('hex');
  return hash;
}

async function uploadFile() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];

  if (!keyFile || !folderId) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const branchName = getCurrentBranchName();

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const jsonFilePath = path.join(__dirname, '../http/output/swagger.json');
  const tsFilePath = path.join(__dirname, `../http/output/swagger-${branchName}.ts`);

  // Generate swagger.json file
  generateSwaggerJson();

  // Convert swagger.json to swagger-${branchName}.ts and get checksum
  const hash = convertJsonToTs(jsonFilePath, tsFilePath);

  const fileName = `swagger-${branchName}-${hash}.ts`;

  try {
    // Search for the existing TypeScript file
    const searchResponse = await drive.files.list({
      q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      console.log(`File with name ${fileName} already exists in Google Drive. Skipping upload.`);
    } else {
      console.log(`No existing file found with name ${fileName}. Uploading new file...`);

      // Upload the new TypeScript file
      const fileMetadata = {
        name: fileName,
        parents: [folderId],
      };
      const media = {
        mimeType: 'application/typescript',
        body: fs.createReadStream(tsFilePath),
      };

      const uploadResponse = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name',
      });

      if (uploadResponse.data && 'id' in uploadResponse.data) {
        console.log(`Uploaded new file with ID: ${uploadResponse.data.id} and name: ${fileName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

uploadFile();
