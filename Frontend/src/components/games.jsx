import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 1,
    title: 'Sudoku',
    description: 'A classic logic-based number placement puzzle.',
    image: 'https://dribbble.com/shots/9446342-Sudoku-Game-Logo',
    link: 'https://www.sudokulovers.com/',
  },
  {
    id: 2,
    title: 'Tetris',
    description: 'A tile-matching game where you arrange falling blocks.',
    image: '#',
    link: 'https://www.freetetris.org/game.php', 
  },
  {
    id: 3,
    title: 'Crossword Puzzle',
    description: 'A word puzzle where you fill in the words based on clues.',
    image: '#',
    link: '#',
  },
  {
    id: 4,
    title: 'Word Search',
    description: 'Find hidden words in a grid of letters.',
    image: '#',
    link: '#',
  },
  {
    id: 5,
    title: 'Trivia Quiz',
    description: 'Test your knowledge with a series of trivia questions.',
    image: '#',
    link: '#',
  },
  {
    id: 6,
    title: 'Memory Game',
    description: 'Match pairs of cards to test your memory.',
    image: '#',
    link: '#',
  },
];

const Games = () => {
  return (
    <div className="flex flex-col items-center px-6 py-8 bg-n-8 text-n-1 font-sora">
      <h2 className="text-3xl font-semibold mb-8">Games & Quizzes</h2>
      <h3 className="text-1xl font-semibold mb-5">Lets Have Some Fun, Smile</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-n-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="mb-4">{game.description}</p>
              <a
                href={game.link}
                className="text-indigo-500 hover:text-indigo-700 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Now &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
