import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

//generate a new payment link for the item
router.get('/:path',async(req,res) => {
    try {
         
        const filePath = req.params.path;  
        const fileData = await sftp.get(filePath);
        res.send(fileData);
        res.status(200).json({ success: true });
        console.log('File Deleted Successfully');
      } catch (error) {
        console.error("Error fetching the File:", error);
        res.status(500).json({ success: false, error: "Failed to fetch  File" });
      }
});

export {router as fetchFileRouter};