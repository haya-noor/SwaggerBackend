
//   ***For uploading the .json file*** to Google Drive  using openapi fetch library 

/*
import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

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

  try {
    // Search for the existing swagger.json file
    const searchResponse = await drive.files.list({
      q: `name='swagger-${branchName}.json' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      const fileId = files[0].id ?? '';
      console.log(`Found existing swagger.json file for branch ${branchName} with ID: ${fileId}. Updating it...`);

      // Update the existing swagger.json file
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('http/output/swagger.json'),
      };

      const updateResponse = await drive.files.update({
        fileId: fileId,
        media: media,
        fields: 'id, name',
        requestBody: {
          name: `swagger-${branchName}.json`,
        },
      });

      if (updateResponse.data && 'id' in updateResponse.data) {
        console.log(`Updated swagger.json file with ID: ${updateResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', updateResponse.data);
      }
    } else {
      console.log('No existing swagger.json file found for branch ${branchName}. Uploading a new one...');

      // Upload the new swagger.json file
      const fileMetadata = {
        name: `swagger-${branchName}.json`, // Include branch name in the file name
        parents: [folderId],
      };
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('http/output/swagger.json'),
      };

      const uploadResponse = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name',
      });

      if (uploadResponse.data && 'id' in uploadResponse.data) {
        console.log(`Uploaded new swagger.json file with ID: ${uploadResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }

  console.log("Branch name: ", branchName);
}

uploadFile();

*/



// ** For uploading .ts file to Google Drive**  Using openapi fetch library 
/*
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

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

// Convert JSON to TypeScript
function convertJsonToTs(jsonFilePath: string, tsFilePath: string) {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonObject = JSON.parse(jsonContent);
  const tsContent = `const swaggerSpec = ${JSON.stringify(jsonObject, null, 2)} as const;\nexport default swaggerSpec;\n`;
  fs.writeFileSync(tsFilePath, tsContent, 'utf-8');
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

  //const jsonFilePath = path.join(__dirname, '../http/output/swagger.json'); // Correct the path
  const jsonFilePath = path.join(__dirname,'../http/output/swagger.json');

  const tsFilePath = path.join(__dirname, `../http/output/swagger-${branchName}.ts`);

  // Convert swagger.json to swagger-${branchName}.ts
  convertJsonToTs(jsonFilePath, tsFilePath);

  try {
    // Search for the existing TypeScript file
    const searchResponse = await drive.files.list({
      q: `name='swagger-${branchName}.ts' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      const fileId = files[0].id ?? '';
      console.log(`Found existing swagger-${branchName}.ts file for branch ${branchName} with ID: ${fileId}. Updating it...`);

      // Update the existing TypeScript file
      const media = {
        mimeType: 'application/typescript',
        body: fs.createReadStream(tsFilePath),
      };

      const updateResponse = await drive.files.update({
        fileId: fileId,
        media: media,
        fields: 'id, name',
        requestBody: {
          name: `swagger-${branchName}.ts`,
        },
      });

      if (updateResponse.data && 'id' in updateResponse.data) {
        console.log(`Updated swagger-${branchName}.ts file with ID: ${updateResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', updateResponse.data);
      }
    } else {
      console.log(`No existing swagger-${branchName}.ts file found for branch ${branchName}. Uploading a new one...`);

      // Upload the new TypeScript file
      const fileMetadata = {
        name: `swagger-${branchName}.ts`, // Include branch name in the file name
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
        console.log(`Uploaded new swagger-${branchName}.ts file with ID: ${uploadResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }

  console.log("Branch name: ", branchName);
}

uploadFile();

*/


//Generating swagger.json file, then converting it to swagger.ts file and then uploading that swagger.ts file to Google Drive
/*
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import { spawnSync } from 'child_process';

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

// Convert JSON to TypeScript
function convertJsonToTs(jsonFilePath: string, tsFilePath: string) {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonObject = JSON.parse(jsonContent);
  const tsContent = `const swaggerSpec = ${JSON.stringify(jsonObject, null, 2)} as const;\nexport default swaggerSpec;\n`;
  fs.writeFileSync(tsFilePath, tsContent, 'utf-8');
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

  // Convert swagger.json to swagger-${branchName}.ts
  convertJsonToTs(jsonFilePath, tsFilePath);

  try {
    // Search for the existing TypeScript file
    const searchResponse = await drive.files.list({
      q: `name='swagger-${branchName}.ts' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      const fileId = files[0].id ?? '';
      console.log(`Found existing swagger-${branchName}.ts file for branch ${branchName} with ID: ${fileId}. Updating it...`);

      // Update the existing TypeScript file
      const media = {
        mimeType: 'application/typescript',
        body: fs.createReadStream(tsFilePath),
      };

      const updateResponse = await drive.files.update({
        fileId: fileId,
        media: media,
        fields: 'id, name',
        requestBody: {
          name: `swagger-${branchName}.ts`,
        },
      });

      if (updateResponse.data && 'id' in updateResponse.data) {
        console.log(`Updated swagger-${branchName}.ts file with ID: ${updateResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', updateResponse.data);
      }
    } else {
      console.log(`No existing swagger-${branchName}.ts file found for branch ${branchName}. Uploading a new one...`);

      // Upload the new TypeScript file
      const fileMetadata = {
        name: `swagger-${branchName}.ts`, // Include branch name in the file name
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
        console.log(`Uploaded new swagger-${branchName}.ts file with ID: ${uploadResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }

  console.log("Branch name: ", branchName);
}

uploadFile();
*/



//semantic versioning 

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync, spawnSync } from 'child_process';

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

// Get version number
function getVersionNumber() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error getting version number:', error);
    return '1.0.0';
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

// Convert JSON to TypeScript
function convertJsonToTs(jsonFilePath: string, tsFilePath: string) {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonObject = JSON.parse(jsonContent);
  const tsContent = `const swaggerSpec = ${JSON.stringify(jsonObject, null, 2)} as const;\nexport default swaggerSpec;\n`;
  fs.writeFileSync(tsFilePath, tsContent, 'utf-8');
}

async function uploadFile() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];

  if (!keyFile || !folderId) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const branchName = getCurrentBranchName();
  const version = getVersionNumber();

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const jsonFilePath = path.join(__dirname, '../http/output/swagger.json');
  const tsFilePath = path.join(__dirname, `../http/output/swagger-${branchName}-v${version}.ts`);

  // Generate swagger.json file
  generateSwaggerJson();

  // Convert swagger.json to swagger-${branchName}-v${version}.ts
  convertJsonToTs(jsonFilePath, tsFilePath);

  try {
    // Search for the existing TypeScript file
    const searchResponse = await drive.files.list({
      q: `name='swagger-${branchName}-v${version}.ts' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = searchResponse.data.files ?? [];
    if (files.length > 0 && files[0]?.id) {
      const fileId = files[0].id ?? '';
      console.log(`Found existing swagger-${branchName}-v${version}.ts file for branch ${branchName} with ID: ${fileId}. Updating it...`);

      // Update the existing TypeScript file
      const media = {
        mimeType: 'application/typescript',
        body: fs.createReadStream(tsFilePath),
      };

      const updateResponse = await drive.files.update({
        fileId: fileId,
        media: media,
        fields: 'id, name',
        requestBody: {
          name: `swagger-${branchName}-v${version}.ts`,
        },
      });

      if (updateResponse.data && 'id' in updateResponse.data) {
        console.log(`Updated swagger-${branchName}-v${version}.ts file with ID: ${updateResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', updateResponse.data);
      }
    } else {
      console.log(`No existing swagger-${branchName}-v${version}.ts file found for branch ${branchName}. Uploading a new one...`);

      // Upload the new TypeScript file
      const fileMetadata = {
        name: `swagger-${branchName}-v${version}.ts`, // Include branch name and version in the file name
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
        console.log(`Uploaded new swagger-${branchName}-v${version}.ts file with ID: ${uploadResponse.data.id} from branch: ${branchName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
uploadFile();

