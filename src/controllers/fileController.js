import express from 'express';
const router = express.Router();
import  { fetchFile, deleteFile, addFile } from '../services/sftpServices.js';

// Fetch file from SFTP path
router.get('/:filePath', async (req, res) => {
  const { filePath } = req.params;
  console.log(filePath);
  try {
    const fileData = await fetchFile(filePath);
    console.log('File Data is', fileData);
    res.send(fileData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete file from SFTP path
router.delete('/:filePath', async (req, res) => {
  const { filePath } = req.params;
  try {
    await deleteFile(filePath);
    res.send('File deleted successfully');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add file to SFTP path
router.post('/add', async (req, res) => {
  const { localFilePath, remoteFilePath } = req.body;
  if (!localFilePath || !remoteFilePath) {
    return res.status(400).send({ error: 'Both localFilePath and remoteFilePath are required' });
  }
  try {
    console.log(localFilePath);
    console.log(remoteFilePath);
    await addFile(localFilePath, remoteFilePath);
    res.send('File added successfully');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export { router as fileController };
