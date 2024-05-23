import axios from 'axios';

async function notifyExternalAPI(filePath) {
  try {
    const response = await axios.post(process.env.EXTERNAL_API_URL, { filePath });
    console.log('External API notified:', response.data);
  } catch (err) {
    console.error('Error notifying external API:', err.message);
  }

}

export  { notifyExternalAPI };
