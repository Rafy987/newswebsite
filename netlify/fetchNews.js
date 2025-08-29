const fetch = require("node-fetch");

exports.handler = async (event) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const { type, q, category } = event.queryStringParameters;

  let url = "";
  if (type === "search") {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
