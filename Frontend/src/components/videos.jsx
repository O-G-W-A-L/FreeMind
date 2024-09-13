import React from 'react';
import { Link } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React, a popular JavaScript library for building user interfaces.',
    image: 'https://reactjs.org/logo-og.png',
    link: 'https://reactjs.org/docs/getting-started.html',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Closures',
    description: 'A deep dive into JavaScript closures and how they work.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/format:webp/1*1g5OMVeu21BRn2Yhf2xgQw.png',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
  },
  {
    id: 3,
    title: 'Introduction to Node.js',
    description: 'An introduction to Node.js, a runtime environment for executing JavaScript code outside the browser.',
    image: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg',
    link: 'https://nodejs.org/en/docs/',
  },
  {
    id: 4,
    title: 'Basics of CSS Grid',
    description: 'Learn the basics of CSS Grid layout, a powerful tool for creating complex web layouts.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/format:webp/1*d-OWVEIetP8p8GBt1dWqOw.png',
    link: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
  },
  {
    id: 5,
    title: 'Understanding Asynchronous JavaScript',
    description: 'Explore asynchronous programming in JavaScript, including promises and async/await.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/format:webp/1*zCB2WQuX_wfqwoY5nNu6hw.png',
    link: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await',
  },
  {
    id: 6,
    title: 'Intro to Web Accessibility',
    description: 'Learn the basics of web accessibility and how to make your web applications more inclusive.',
    image: 'https://a11yproject.com/images/a11yproject-logo.png',
    link: 'https://web.dev/accessibility/',
  },
];

const Videos = () => {
  return (
    <div className="flex flex-col items-center px-6 py-8 bg-n-8 text-n-1 font-sora">
      <h2 className="text-3xl font-semibold mb-8">Educational Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-n-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={video.image}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <p className="mb-4">{video.description}</p>
              <a
                href={video.link}
                className="text-indigo-500 hover:text-indigo-700 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
