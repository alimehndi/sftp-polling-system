
import Client from 'ssh2-sftp-client';

import dotenv from 'dotenv';
dotenv.config();

const sftp = new Client();


async function connect() {
  try {
      await sftp.connect({
      host: process.env.SFTP_HOST,
      port: process.env.SFTP_PORT,
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD

    });
    console.log('Connected to SFTP server');
  } catch (err) {
    console.error('Error connecting to SFTP server 32:', err.message);
  }
}

async function pollSFTPPath(sftpPath, callback) {
  try {
    await connect();
    const files = await sftp.list(sftpPath);
    files.forEach(file => {
      callback(file.name);
    });
  } catch (err) {
    console.error('Error polling SFTP path:', err.message);
  } finally {
    await sftp.end();
  }
}

export  { pollSFTPPath };
