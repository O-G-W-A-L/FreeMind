
const express = require('express');
const app = express();

// Middleware, routes, etc.

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

module.exports = app;

