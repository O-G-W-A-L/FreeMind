import React, { useState } from 'react';
import { fetchRandomExercise } from '../api'; // Adjust the path as needed

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExploreMore = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching exercise...');
      const fetchedExercise = await fetchRandomExercise();
      console.log('Response:', fetchedExercise);
      setExercise(fetchedExercise);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      setError('Failed to fetch exercise. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleExploreMore} disabled={loading}>
        {loading ? 'Loading...' : 'Explore more'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading exercise...</p>
      ) : exercise ? (
        <div className="mt-10 p-6 bg-n-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Today's Exercise: {exercise.name}</h3>
          <p className="mb-2"><strong>Equipment:</strong> {exercise.equipment}</p>
          <p className="mb-2"><strong>Target:</strong> {exercise.target}</p>
          <p><strong>Instructions:</strong> {exercise.instructions}</p>
        </div>
      ) : (
        <p>No exercise loaded yet. Click "Explore more" to load an exercise.</p>
      )}
    </div>
  );
};

export default Exercise;