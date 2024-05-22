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
    notifyExternalAPI(filePath);
  });
}, process.env.POLL_INTERVAL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// import Client from 'ssh2-sftp-client';
// import express from 'express';

// const app = express();
// let sftp = new Client();

// const config = {
//   host: '127.0.0.1',
//   port: '22',
//   username: 'sftpuser1',
//   password: 'YourPassword123'
// };

// async function connect() {
//   try {
//     await sftp.connect(config);
//     console.log('SFTP connection established');
//   } catch (error) {
//     console.error('Error connecting to SFTP:', error);
//   }
// }

// // Call the connect function
// connect();

// // Start your express app (example, adjust as needed)
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// // import Client from 'ssh2-sftp-client';
// // import express from 'express';
// // const app = express();
// // let sftp = new Client();

// // const config = {
// //   host: '127.0.0.1',
// //   port: '22',
// //   username: 'sftpuser1',
// //   password: 'YourPassword123'
// // };

// // async function connect() {
// //   await sftp.connect(config);
// // }

// // async function pollForNewFiles() {
// //   try {
// //     await connect();
// //     const files = await sftp.list('/uploads');
// //     files.forEach(file => {
// //       notifyExternalAPI(`/uploads/${file.name}`);
// //     });
// //   } catch (err) {
// //     console.error('Error polling for new files:', err);
// //   } finally {
// //     await sftp.end();
// //   }
// // }

// // function notifyExternalAPI(filePath) {
// //   console.log('New file detected:', filePath);
// //   // Code to notify external API about the new file
// // }

// // app.get('/fetch/:filePath', async (req, res) => {
// //   try {
// //     await connect();
// //     const fileData = await sftp.get(req.params.filePath);
// //     res.send(fileData);
// //   } catch (err) {
// //     res.status(500).send(err.message);
// //   } finally {
// //     await sftp.end();
// //   }
// // });

// // app.delete('/delete/:filePath', async (req, res) => {
// //   try {
// //     await connect();
// //     await sftp.delete(req.params.filePath);
// //     res.send('File deleted successfully');
// //   } catch (err) {
// //     res.status(500).send(err.message);
// //   } finally {
// //     await sftp.end();
// //   }
// // });

// // app.post('/add', async (req, res) => {
// //   try {
// //     await connect();
// //     // Code to add file to SFTP server
// //     res.send('File added successfully');
// //   } catch (err) {
// //     res.status(500).send(err.message);
// //   } finally {
// //     await sftp.end();
// //   }
// // });

// // setInterval(pollForNewFiles, 5000);

// // const port = 3000;
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });
