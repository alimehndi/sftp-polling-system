import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post('/notify', (req, res) => {
  const { filePath } = req.body;
  
  if (!filePath) {
    return res.status(400).send('filePath is required');
  }

  console.log(`Received notification for filePath: ${filePath}`);
  res.status(200).send({ message: 'Notification received successfully', filePath });
});

app.listen(port, () => {
  console.log(`External API is running on port ${port}`);
});
