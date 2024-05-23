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
    console.error('Error connecting to SFTP server: 32', err.message);
  }
}


async function fetchFile(filePath) {
  try {
    await connect();
    const fileData = await sftp.get(filePath);
    return fileData;
  } catch (err) {
    console.error('Error fetching file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function deleteFile(filePath) {
  try {
    await connect();
    await sftp.delete(filePath);
    console.log('File deleted successfully:', filePath);
  } catch (err) {
    console.error('Error deleting file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function addFile(localFilePath, remoteFilePath) {
  try {
    await connect();
    await sftp.put(localFilePath, remoteFilePath);
    console.log('File added successfully:', remoteFilePath);
  } catch (err) {
    console.error('Error adding file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

export  { fetchFile, deleteFile, addFile };
