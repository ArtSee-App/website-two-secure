// netlify/functions/search.js
const fetch    = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event) => {
  try {
    const BASE   = process.env.ARTVISTA_API_BASE_URL;
    const SECRET = process.env.ARTVISTA_SECRET_TOKEN;

    // 🔑 Token al
    const tokRes = await fetch(`${BASE}/get_custom_token/?token=${SECRET}`);
    if (!tokRes.ok) throw new Error('Failed to fetch token');
    const { id_token: token } = await tokRes.json();

    // 🚀 Front-end JSON gönderiyor: { bbox: {...}, imageData: "<base64>" }
    const { bbox, imageData } = JSON.parse(event.body);
    const buffer = Buffer.from(imageData, 'base64');

    // 🎨 Multipart form oluştur
    const form = new FormData();
    form.append('file', buffer, { filename: 'crop.jpg', contentType: 'image/jpeg' });

    // 🔍 Arama endpoint’ine POST
    const searchRes = await fetch(
      `${BASE}/artwork_search_for_website/?token=${token}`,
      {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      }
    );
    if (!searchRes.ok) throw new Error('Search API failed');

    const results = await searchRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.message };
  }
};
