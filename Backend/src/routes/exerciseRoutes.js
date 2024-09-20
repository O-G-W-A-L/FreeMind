// src/routes/exerciseRoutes.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/random-exercise', async (req, res) => {
  console.log('Random exercise route hit');
  try {
    const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio', {
      headers: {
        'X-RapidAPI-Key': 'f0b46214fdmsh7a114245808902fp1fbffcjsnb82d19d976f5',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    
    const exercises = response.data;
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    
    res.json(randomExercise);
  } catch (error) {
    console.error('Error fetching exercise:', error);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
});

module.exports = router;