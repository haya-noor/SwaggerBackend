"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const child_process_1 = require("child_process");
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
function getCurrentBranchName() {
    try {
        const branchName = (0, child_process_1.execSync)('git rev-parse --abbrev-ref HEAD').toString().trim();
        return branchName;
    }
    catch (error) {
        console.error('Error getting current branch name:', error);
        return 'unknown';
    }
}
function generateSwaggerJson() {
    console.log('Generating swagger.json...');
    const result = (0, child_process_1.spawnSync)('npx', ['tsoa', 'spec'], { stdio: 'inherit' });
    if (result.error) {
        console.error('Error generating swagger.json:', result.error);
    }
}
function computeChecksum(filePath) {
    const content = fs_1.default.readFileSync(filePath, 'utf-8');
    return crypto_1.default.createHash('md5').update(content).digest('hex');
}
function updateEnvFile(newHash) {
    const envFilePath = path_1.default.join(__dirname, '../.env');
    let envContent = fs_1.default.readFileSync(envFilePath, 'utf-8');
    if (envContent.includes('SWAGGER_HASH=')) {
        envContent = envContent.replace(/SWAGGER_HASH=.*/, `SWAGGER_HASH=${newHash}`);
    }
    else {
        envContent += `\nSWAGGER_HASH=${newHash}`;
    }
    fs_1.default.writeFileSync(envFilePath, envContent, 'utf-8');
}
async function uploadFile() {
    const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
    const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
    const storedHash = process.env['SWAGGER_HASH'];
    if (!keyFile || !folderId) {
        console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
        return;
    }
    const branchName = getCurrentBranchName();
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: keyFile,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = googleapis_1.google.drive({ version: 'v3', auth });
    const jsonFilePath = path_1.default.join(__dirname, '../http/output/swagger.json');
    generateSwaggerJson();
    const newHash = computeChecksum(jsonFilePath);
    if (storedHash === newHash) {
        console.log('The file has not changed. Skipping upload.');
        return;
    }
    const fileName = `swagger-${branchName}-${newHash}.json`;
    try {
        const searchResponse = await drive.files.list({
            q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
            fields: 'files(id, name)',
        });
        const files = searchResponse.data.files ?? [];
        if (files.length > 0 && files[0]?.id) {
            console.log(`File with name ${fileName} already exists in Google Drive. Skipping upload.`);
        }
        else {
            console.log(`No existing file found with name ${fileName}. Uploading new file...`);
            const fileMetadata = {
                name: fileName,
                parents: [folderId],
            };
            const media = {
                mimeType: 'application/json',
                body: fs_1.default.createReadStream(jsonFilePath),
            };
            const uploadResponse = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, name',
            });
            if (uploadResponse.data && 'id' in uploadResponse.data) {
                console.log(`Uploaded new file with ID: ${uploadResponse.data.id} and name: ${fileName}`);
                updateEnvFile(newHash);
            }
            else {
                console.error('Unexpected response format:', uploadResponse.data);
            }
        }
    }
    catch (error) {
        console.error('Error uploading file:', error);
    }
}
uploadFile();
