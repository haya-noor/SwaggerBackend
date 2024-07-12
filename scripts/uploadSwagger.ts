
/*
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

// Compute MD5 checksum of the JSON content
function computeChecksum(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('md5').update(content).digest('hex');
}

// Function to update the .env file with the new hash
function updateEnvFile(newHash: string) {
  const envFilePath = path.join(__dirname, '../.env');
  let envContent = fs.readFileSync(envFilePath, 'utf-8');


*/

//  if (envContent.includes('SWAGGER_HASH=')) {
//    envContent = envContent.replace(/SWAGGER_HASH=.*/, `SWAGGER_HASH=${newHash}`);
//  } else {
//    envContent += `\nSWAGGER_HASH=${newHash}`;
//  }

//  fs.writeFileSync(envFilePath, envContent, 'utf-8');
//}


/*
async function uploadFile() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
  const storedHash = process.env['SWAGGER_HASH'];

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

  // Generate swagger.json file
  generateSwaggerJson();

  // Compute checksum for swagger.json
  const newHash = computeChecksum(jsonFilePath);

  if (storedHash === newHash) {
    console.log('The file has not changed. Skipping upload.');
    return;
  }

  const fileName = `swagger-${branchName}-${newHash}.json`;

  try {
    // Search for the existing JSON file
    const searchResponse = await drive.files.list({
      q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      console.log(`File with name ${fileName} already exists in Google Drive. Skipping upload.`);
    } else {
      console.log(`No existing file found with name ${fileName}. Uploading new file...`);

      // Upload the new JSON file
      const fileMetadata = {
        name: fileName,
        parents: [folderId],
      };
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream(jsonFilePath),
      };

      const uploadResponse = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name',
      });

      if (uploadResponse.data && 'id' in uploadResponse.data) {
        console.log(`Uploaded new file with ID: ${uploadResponse.data.id} and name: ${fileName}`);
        // Update the .env file with the new hash
        updateEnvFile(newHash);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

uploadFile();
*/



import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync, spawnSync } from 'child_process';
import crypto from 'crypto';
import { AbstractGoogleDrive } from './AbstractGoogleDrive';
import { GoogleDrive } from './GoogleDrive';

dotenv.config();

// Get current branch name
function getCurrentBranchName(): string {
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

// Compute MD5 checksum of the JSON content
function computeChecksum(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('md5').update(content).digest('hex');
}

// Function to update the .env file with the new hash
function updateEnvFile(newHash: string) {
  const envFilePath = path.join(__dirname, '../.env');
  let envContent = fs.readFileSync(envFilePath, 'utf-8');

  if (envContent.includes('SWAGGER_HASH=')) {
    envContent = envContent.replace(/SWAGGER_HASH=.*/, `SWAGGER_HASH=${newHash}`);
  } else {
    envContent += `\nSWAGGER_HASH=${newHash}`;
  }

  fs.writeFileSync(envFilePath, envContent, 'utf-8');
}

async function uploadSwaggerFile(driveService: AbstractGoogleDrive) {
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
  const storedHash = process.env['SWAGGER_HASH'];

  if (!folderId) {
    console.error('Missing GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const branchName = getCurrentBranchName();
  const jsonFilePath = path.join(__dirname, '../http/output/swagger.json');

  // Generate swagger.json file
  generateSwaggerJson();

  // Compute checksum for swagger.json
  const newHash = computeChecksum(jsonFilePath);

  if (storedHash === newHash) {
    console.log('The file has not changed. Skipping upload.');
    return;
  }

  const fileName = `swagger-${branchName}-${newHash}.json`;

  const existingFiles = await driveService.searchFile(fileName, folderId);
  if (existingFiles.length > 0) {
    console.log(`File with name ${fileName} already exists in Google Drive. Skipping upload.`);
  } else {
    console.log(`No existing file found with name ${fileName}. Uploading new file...`);
    await driveService.uploadFile(fileName, jsonFilePath, 'application/json');
    // Update the .env file with the new hash
    updateEnvFile(newHash);
  }
}

// Dependency injection
const googleDriveService = new GoogleDrive();
uploadSwaggerFile(googleDriveService);


