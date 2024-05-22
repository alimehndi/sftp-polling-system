import express from 'express';
const router = express.Router();
import  { fetchFile, deleteFile, addFile } from '../services/sftpServices.js';

// Fetch file from SFTP path
router.get('/:filePath', async (req, res) => {
  const { filePath } = req.params;
  try {
    const fileData = await fetchFile(filePath);
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
    await addFile(localFilePath, remoteFilePath);
    res.send('File added successfully');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export { router as fileController };
