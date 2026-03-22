// netlify/functions/analyze.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const BASE   = process.env.ARTVISTA_API_BASE_URL;
    const SECRET = process.env.ARTVISTA_SECRET_TOKEN;

    // 1️⃣ Güvenli token al
    const tokRes = await fetch(`${BASE}/get_custom_token/?token=${SECRET}`);
    if (!tokRes.ok) throw new Error('Failed to fetch token');
    const { id_token } = await tokRes.json();

    // 2️⃣ Handle both base64-encoded and raw bodies
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body);

    const apiRes = await fetch(
      `${BASE}/get_bbox_for_website/?token=${id_token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': event.headers['content-type'] },
        body: rawBody,
      }
    );
    if (!apiRes.ok) throw new Error(`BBox API failed: ${apiRes.status}`);

    const bboxes = await apiRes.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(bboxes)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
