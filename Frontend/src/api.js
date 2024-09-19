const BASE_URL = 'http://localhost:5000/api';

export const fetchRandomExercise = async () => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/random-exercise`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching random exercise:', error);
    throw error;
  }
};