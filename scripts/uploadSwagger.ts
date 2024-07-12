

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync, spawnSync } from 'child_process';
import crypto from 'crypto';
import { StorageService } from './StorageService';
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

async function uploadSwaggerFile(storageService: StorageService) {
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

  const existingFiles = await storageService.searchFile(fileName, folderId);
  if (existingFiles.length > 0) {
    console.log(`File with name ${fileName} already exists in Google Drive. Skipping upload.`);
  } else {
    console.log(`No existing file found with name ${fileName}. Uploading new file...`);
    await storageService.uploadFile(fileName, jsonFilePath, 'application/json');
    // Update the .env file with the new hash
    updateEnvFile(newHash);
  }
}

// Dependency injection
const googleDriveService = new GoogleDrive();
uploadSwaggerFile(googleDriveService);
