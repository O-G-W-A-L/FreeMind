const { db, auth } = require('../config/firebase-config'); // Path to firebase-config is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { email, password, displayName, isProfessional } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').doc(email).set({
      email,
      password: hashedPassword,
      displayName,
      isProfessional,
      createdAt: admin.firestore.Timestamp.now() // Ensure 'admin' is defined or imported
    });
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();
    if (!doc.exists || !(await bcrypt.compare(password, doc.data().password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
