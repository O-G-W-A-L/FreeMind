const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exerciseRoutes = require('./src/routes/exerciseRoutes');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Use the exercise routes
app.use('/api/exercises', exerciseRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Backend running on port ${port}`));