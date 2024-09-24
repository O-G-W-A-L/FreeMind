import React from 'react';
import { Link } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: 'ADHD - The Bright Side ',
    description: 'Get the best side and learn that ADHD, not a disorder always',
    image: 'https://www.calmclinic.com/storage/images/213/qoxihx/main/w1600.png',
    link: 'https://youtu.be/uU6o2_UFSEY?si=yLlROjiI9nPz_eXm',
  },
  {
    id: 2,
    title: 'Meditation',
    description: 'Understand Meditation Works & Science-Based Effective Meditations',
    image: 'https://www.sciencenews.org/wp-content/uploads/2023/02/021123_LS_depression_feat.jpg',
    link: 'https://youtu.be/wTBSGgbIvsY?si=ijLXdjzi1s17hv4S',
  },
  {
    id: 3,
    title: 'Interviews',
    description: 'How to Understand & Assess Your Mental Health',
    image: '',
    link: 'https://youtu.be/tLRCS48Ens4?si=Z8Ya1llLdiYtdqLH',
  },
  {
    id: 4,
    title: 'RE_Focus',
    description: 'Play to Rewire & Improve Your Brain.',
    image: '',
    link: 'https://youtu.be/BwyZIWeBpRw?si=YeTfwdK0Iij_tAAA',
  },
  {
    id: 5,
    title: 'Manage Your Mental Health',
    description: 'How to manage your mental health',
    image: 'https://mu6hw.png',
    link: 'How to manage your mental health',
  },
  {
    id: 6,
    title: 'The Healing Roadmap',
    description: 'The Path to a better life',
    image: '',
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
