// api/sendForm.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Берём данные из тела запроса
    const { name, email, type } = req.body;

    // ✅ Сюда вставь переменную своего реальный URL Google Script
    const scriptUrl = process.env.GAS_URL;

    // Подготавливаем данные как URLSearchParams (Google Script принимает так)
    const params = new URLSearchParams({ name, email, type });

    // Отправляем запрос к Google Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: params,
    });

    const text = await response.text();

    // Возвращаем успех фронтенду
    res.status(200).json({ success: true, response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
