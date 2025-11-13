export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight-запроса (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, type } = req.body;

    // URL берем из переменной окружения
    const scriptUrl = process.env.GAS_URL;

    const response = await fetch(
      `${scriptUrl}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email
      )}&bookType=${encodeURIComponent(type)}&agree=true`
    );

    const data = await response.text();
    console.log('Google Script response:', data);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending form:', error);
    return res.status(500).json({ error: 'Failed to send form' });
  }
}

// // api/sendForm.js
// import fetch from 'node-fetch';

// export default async function handler(req, res) {
//   console.log(req);
//   console.log(res);
//   // Разрешаем только POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     // Берём данные из тела запроса
//     const { name, email, type } = req.body;

//     // ✅ Сюда вставь переменную своего реальный URL Google Script
//     const scriptUrl = process.env.GAS_URL;
//     console.log(process);
//     console.log(scriptUrl);

//     // Подготавливаем данные как URLSearchParams (Google Script принимает так)
//     const params = new URLSearchParams({ name, email, type });

//     // Отправляем запрос к Google Script
//     const response = await fetch(scriptUrl, {
//       method: 'POST',
//       body: params,
//     });

//     const text = await response.text();

//     // Возвращаем успех фронтенду
//     res.status(200).json({ success: true, response: text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
