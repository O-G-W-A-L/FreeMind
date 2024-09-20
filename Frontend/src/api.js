const BASE_URL = 'http://localhost:5000/api';

// Fetch random exercise
export const fetchRandomExercise = async () => {
  try {
    console.log('Fetching from:', `${BASE_URL}/exercises/random-exercise`);
    const response = await fetch(`${BASE_URL}/exercises/random-exercise`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in fetchRandomExercise:', error);
    throw error;
  }
};

// Send message to AI chat
export const sendMessageToAIChat = async (message) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error sending message to AI chat:', error);
    throw error;
  }
};
