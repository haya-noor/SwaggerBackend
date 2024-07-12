import fs from 'fs';
import { StorageService } from './StorageService';

export class GoogleDrive extends StorageService {
  async uploadFile(fileName: string, filePath: string, mimeType: string): Promise<void> {
    const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
    if (!folderId) {
      throw new Error('Missing GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    }

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };
    const media = {
      mimeType,
      body: fs.createReadStream(filePath),
    };

    try {
      const uploadResponse = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name',
      });

      if (uploadResponse.data && 'id' in uploadResponse.data) {
        console.log(`Uploaded new file with ID: ${uploadResponse.data.id} and name: ${fileName}`);
      } else {
        console.error('Unexpected response format:', uploadResponse.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async searchFile(fileName: string, folderId: string): Promise<any[]> {
    try {
      const searchResponse = await this.drive.files.list({
        q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)',
      });

      return searchResponse.data.files ?? [];
    } catch (error) {
      console.error('Error searching file:', error);
      return [];
    }
  }
}
