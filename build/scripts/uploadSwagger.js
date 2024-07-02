"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function uploadFile() {
    const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
    const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
    if (!keyFile || !folderId) {
        console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
        return;
    }
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: keyFile,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = googleapis_1.google.drive({ version: 'v3', auth });
    try {
        const searchResponse = await drive.files.list({
            q: `name='swagger.json' and '${folderId}' in parents and trashed=false`,
            fields: 'files(id, name)',
        });
        const files = searchResponse.data.files ?? [];
        if (files.length > 0 && files[0]?.id) {
            const fileId = files[0].id ?? '';
            console.log(`Found existing swagger.json file with ID: ${fileId}. Updating it...`);
            const media = {
                mimeType: 'application/json',
                body: fs_1.default.createReadStream('http/output/swagger.json'),
            };
            const updateResponse = await drive.files.update({
                fileId: fileId,
                media: media,
                fields: 'id',
            });
            if (updateResponse.data && 'id' in updateResponse.data) {
                console.log('Updated swagger.json file with ID:', updateResponse.data.id);
            }
            else {
                console.error('Unexpected response format:', updateResponse.data);
            }
        }
        else {
            console.log('No existing swagger.json file found. Uploading a new one...');
            const fileMetadata = {
                name: 'swagger.json',
                parents: [folderId],
            };
            const media = {
                mimeType: 'application/json',
                body: fs_1.default.createReadStream('http/output/swagger.json'),
            };
            const uploadResponse = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id',
            });
            if (uploadResponse.data && 'id' in uploadResponse.data) {
                console.log('Uploaded new swagger.json file with ID:', uploadResponse.data.id);
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
