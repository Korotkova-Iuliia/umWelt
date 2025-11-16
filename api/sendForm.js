export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Валидация
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Тест: просто вывод в лог
    console.log('Form received:', req.body);

    // Если хочешь что-то отправлять — здесь будет fetch()

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
