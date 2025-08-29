const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const API_KEY = process.env.NEWS_API_KEY; // ✅ Safe from env variable

    let url = "";

    if (event.queryStringParameters.q) {
      // 🔍 Search query
      const query = encodeURIComponent(event.queryStringParameters.q);
      url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${API_KEY}`;
    } else {
      // 📰 Category headlines
      const category = event.queryStringParameters.category || "general";
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("❌ Netlify Function Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
