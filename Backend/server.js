const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Example user data (replace with your database logic)
const users = [{ email: 'test@example.com', password: 'password' }];

// Sign-up route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // Add user to database (omitted for simplicity)
  res.send({ message: 'User signed up!' });
});

// Sign-in route
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.send({ message: 'This is a protected route!' });
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
