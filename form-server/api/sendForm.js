import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Разрешаем CORS для всех источников
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight-запроса
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, type } = req.body;

    console.log('📨 Получены данные:', name, email, type);

    // Читаем переменную окружения (безопасно)
    const scriptUrl = process.env.GAS_URL;

    if (!scriptUrl) {
      console.error('GAS_URL не задана в переменных окружения!');
      return res
        .status(500)
        .json({ error: 'Missing GAS_URL environment variable' });
    }

    // Отправляем данные на Google Script
    const response = await fetch(
      `${scriptUrl}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email
      )}&bookType=${encodeURIComponent(type)}&agree=true`
    );

    const text = await response.text();
    console.log('Ответ от Google Script:', text);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Ошибка при отправке формы:', error);
    return res.status(500).json({ error: 'Failed to send form' });
  }
}
