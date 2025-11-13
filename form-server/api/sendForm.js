// api/sendForm.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, type } = req.body;

    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbxPtaFFve6ZbORB-2I8XrClt_ai1bypZrWNRTYYYHojAWxHvVYDDR18kCs-kulPtvhM/exec';

    const params = new URLSearchParams({ name, email, type });

    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: params,
    });

    const text = await response.text();

    res.status(200).json({ success: true, response: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
