const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST route for sending message to AI chat
router.post('/ai', chatController.sendMessageToAIChat);

// Optional: Route to initialize AI chat session if needed
router.post('/ai/create', chatController.createAIChat);

module.exports = router;
