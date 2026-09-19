// netlify/functions/save_email.js
const fetch = require('node-fetch');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  // 1️⃣ CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...CORS_HEADERS, Allow: 'GET, POST, OPTIONS' },
      body: 'Method Not Allowed'
    };
  }

  // 2️⃣ Accept the email as ?email_to_save=… (GET) or as JSON { email_to_save } (POST)
  const query = event.queryStringParameters || {};
  let email = query.email_to_save;
  let clientToken = query.token;

  if (event.httpMethod === 'POST' && event.body) {
    try {
      const parsed = JSON.parse(event.body);
      email = parsed.email_to_save || email;
      clientToken = parsed.token || clientToken;
    } catch (_err) {
      return jsonResponse(400, { error: 'Invalid JSON body' });
    }
  }

  if (!email) {
    return jsonResponse(400, { error: 'Missing email_to_save' });
  }

  try {
    const BASE = process.env.ARTVISTA_API_BASE_URL;
    const SECRET = process.env.ARTVISTA_SECRET_TOKEN;

    // 3️⃣ Same auth flow as analyze.js / search.js: exchange the server-side secret
    //    for a short-lived id_token. A token supplied by the caller is still honoured
    //    for backwards compatibility.
    let token = clientToken;
    if (!token) {
      const tokRes = await fetch(`${BASE}/get_custom_token/?token=${SECRET}`);
      if (!tokRes.ok) throw new Error('Failed to fetch token');
      ({ id_token: token } = await tokRes.json());
    }

    // 4️⃣ Forward to the ArtVista backend
    const url = `${BASE}/save_email/?token=${encodeURIComponent(token)}&email_to_save=${encodeURIComponent(email)}`;
    const apiRes = await fetch(url);
    const data = await apiRes.json().catch(() => ({}));

    // 5️⃣ Propagate status
    return jsonResponse(apiRes.status, data);
  } catch (err) {
    console.error(err);
    return jsonResponse(500, { error: err.message });
  }
};
