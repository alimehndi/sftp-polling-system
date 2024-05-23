import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { fileController } from './src/controllers/fileController.js';
import { pollSFTPPath } from './src/utils/sftpPolling.js';
import { notifyExternalAPI } from './src/services/notification_service.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// API endpoints for file operations
app.use('/files', fileController);


// Polling SFTP path and notify external API
setInterval(() => {
  pollSFTPPath(process.env.SFTP_PATH, filePath => {
    //console.log(filePath);
    notifyExternalAPI(filePath);
  });
}, process.env.POLL_INTERVAL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

