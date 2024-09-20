const axios = require('axios');

// Constants for ChatGPT API via RapidAPI
const CHAT_API_URL = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
const RAPID_API_KEY = 'f0b46214fdmsh7a114245808902fp1fbffcjsnb82d19d976f5';
const RAPID_API_HOST = 'chatgpt-42.p.rapidapi.com';

// Controller for AI chat message
exports.sendMessageToAIChat = async (req, res) => {
  const { message } = req.body;

  const options = {
    method: 'POST',
    url: CHAT_API_URL,
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST,
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);
    
    // Inspect the response structure
    // It's essential to adjust the parsing based on the actual response from RapidAPI
    // For example, if the response contains data.choices[0].text, adjust accordingly
    let aiResponse = '';

    if (response.data) {
      if (response.data.result) {
        aiResponse = response.data.result;
      } else if (response.data.choices && response.data.choices.length > 0) {
        aiResponse = response.data.choices[0].text || response.data.choices[0].message.content;
      } else {
        aiResponse = "I'm sorry, I couldn't process that.";
      }
    } else {
      aiResponse = "I'm sorry, I couldn't process that.";
    }

    res.json({ result: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

// no need separate chat creation for this implementation
exports.createAIChat = async (req, res) => {
  res.json({ message: 'Chat session ready' });
};
