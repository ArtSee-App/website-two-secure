// netlify/functions/save_email.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  // 1️⃣ Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  // 2️⃣ Only GET is allowed from here on
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { Allow: 'GET, OPTIONS' },
      body: 'Method Not Allowed'
    };
  }

  // 3️⃣ Extract token + email_to_save from the query string
  const { token, email_to_save } = event.queryStringParameters || {};

  if (!token) {
    return { statusCode: 400, body: 'Missing token' };
  }
  if (!email_to_save) {
    return { statusCode: 400, body: 'Missing email_to_save' };
  }

  try {
    // 4️⃣ Forward the GET to the real ArtVista backend
    const BASE = process.env.ARTVISTA_API_BASE_URL; // e.g. "https://api.artvista.com"
    const url = `${BASE}/save_email/?token=${encodeURIComponent(token)}&email_to_save=${encodeURIComponent(email_to_save)}`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();

    // 5️⃣ Propagate status + CORS header
    return {
      statusCode: apiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
