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
const child_process_2 = require("child_process");
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
    const result = (0, child_process_2.spawnSync)('npx', ['tsoa', 'spec'], { stdio: 'inherit' });
    if (result.error) {
        console.error('Error generating swagger.json:', result.error);
    }
}
function convertJsonToTs(jsonFilePath, tsFilePath) {
    const jsonContent = fs_1.default.readFileSync(jsonFilePath, 'utf-8');
    const jsonObject = JSON.parse(jsonContent);
    const tsContent = `const swaggerSpec = ${JSON.stringify(jsonObject, null, 2)} as const;\nexport default swaggerSpec;\n`;
    fs_1.default.writeFileSync(tsFilePath, tsContent, 'utf-8');
}
async function uploadFile() {
    const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
    const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
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
    const tsFilePath = path_1.default.join(__dirname, `../http/output/swagger-${branchName}.ts`);
    generateSwaggerJson();
    convertJsonToTs(jsonFilePath, tsFilePath);
    try {
        const searchResponse = await drive.files.list({
            q: `name='swagger-${branchName}.ts' and '${folderId}' in parents and trashed=false`,
            fields: 'files(id, name)',
        });
        const files = searchResponse.data.files ?? [];
        if (files.length > 0 && files[0]?.id) {
            const fileId = files[0].id ?? '';
            console.log(`Found existing swagger-${branchName}.ts file for branch ${branchName} with ID: ${fileId}. Updating it...`);
            const media = {
                mimeType: 'application/typescript',
                body: fs_1.default.createReadStream(tsFilePath),
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
            }
            else {
                console.error('Unexpected response format:', updateResponse.data);
            }
        }
        else {
            console.log(`No existing swagger-${branchName}.ts file found for branch ${branchName}. Uploading a new one...`);
            const fileMetadata = {
                name: `swagger-${branchName}.ts`,
                parents: [folderId],
            };
            const media = {
                mimeType: 'application/typescript',
                body: fs_1.default.createReadStream(tsFilePath),
            };
            const uploadResponse = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, name',
            });
            if (uploadResponse.data && 'id' in uploadResponse.data) {
                console.log(`Uploaded new swagger-${branchName}.ts file with ID: ${uploadResponse.data.id} from branch: ${branchName}`);
            }
            else {
                console.error('Unexpected response format:', uploadResponse.data);
            }
        }
    }
    catch (error) {
        console.error('Error uploading file:', error);
    }
    console.log("Branch name: ", branchName);
}
uploadFile();
