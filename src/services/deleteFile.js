import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

//generate a new payment link for the item
router.delete('/:path',async(req,res) => {
    try {
         
        const filePath = req.params.path;  
        await sftp.delete(filePath);
        res.status(200).json({ success: true });
        console.log('File Deleted Successfully');
      } catch (error) {
        console.error("Error deleting the File:", error);
        res.status(500).json({ success: false, error: "Failed to delete  File" });
      }
});

export {router as deleteFileRouter};