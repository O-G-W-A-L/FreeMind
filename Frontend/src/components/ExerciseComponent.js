import React, { useEffect, useState } from 'react';
import { fetchRandomExercise } from '../api'; // Ensure correct path

const ExerciseComponent = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExercise = async () => {
      try {
        const data = await fetchRandomExercise();
        setExercise(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getExercise();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {exercise && (
        <div>
          <h1>{exercise.name}</h1>
          <p>{exercise.bodyPart}</p>
          <img src={exercise.gifUrl} alt={exercise.name} />
          <ul>
            {exercise.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseComponent;
