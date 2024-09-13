import React from 'react';
import { Link } from 'react-router-dom';

const mentalIllnesses = [
  {
    id: 1,
    title: 'Anxiety Disorder',
    description: 'A mental health disorder characterized by excessive worry and fear.',
    image: 'https://www.calmclinic.com/storage/images/213/qoxihx/main/w1600.png',
    link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
  },
  {
    id: 2,
    title: 'Depression',
    description: 'A common and serious medical illness that negatively affects how you feel, the way you think and how you act.',
    image: 'https://www.sciencenews.org/wp-content/uploads/2023/02/021123_LS_depression_feat.jpg',
    link: 'https://www.nimh.nih.gov/health/topics/depression',
  },
  {
    id: 3,
    title: 'Obsessive-Compulsive Disorder',
    description: 'A common, chronic, and long-lasting disorder in which a person has uncontrollable, reoccurring thoughts and/or behaviors that he or she feels the urge to repeat over and over.',
    image: 'https://superblog.supercdn.cloud/site_cuid_cl92i00jg261301kozfglx818f/images/obsessive-compulsive-disorder-ocd-1685709447808-compressed.jpg',
    link: 'https://www.nimh.nih.gov/health/topics/ocd',
  },
  {
    id: 4,
    title: 'Panic Disorder',
    description: 'A sudden episode of intense fear that triggers severe physical reactions when there is no real danger or apparent cause.',
    image: 'https://images.prismic.io/cerebral/42857718-d8da-4e17-8a20-b8d1fdd31158_Panic%20Attacks.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&w=3420&h=1897',
    link: 'https://www.nimh.nih.gov/health/topics/panicdisorder',
  },
  {
    id: 6,
    title: 'Schizophrenia',
    description: 'A serious mental illness that affects how a person thinks, feels, and behaves.',
    image: 'https://www.health.com/thmb/sMXUhpkvLq2h7VEBwdjnOH1vHIQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Schizophrenia-Overview-PaigeMcLaughlin-Final-e784ef4214264c8ea708309a09c4901e.jpg',
    link: 'https://www.nimh.nih.gov/health/topics/schizophrenia',
  },
  {
    id: 7,
    title: 'Post-traumatic Stress Disorder',
    description: 'A mental health condition that can develop in people who have experienced shocking or scary events.',
    image: 'https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_7061_1662009165227664.jpg',
    link: 'https://www.nimh.nih.gov/health/topics/ptsd',
  },
  {
    id: 8,
    title: 'Psychosis',
    description: 'A loss of contact with reality.',
    image: 'https://imageurl.jpg',
    link: 'https://www.nimh.nih.gov/health/topics/psychosis',
  },
];

const Articles = () => {
  return (
    <div className="flex flex-col items-center px-6 py-8 bg-n-8 text-n-1 font-sans">
      <h2 className="text-3xl font-bold mb-8">Mental Illness Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {mentalIllnesses.map((illness) => (
          <div
            key={illness.id}
            className="bg-n-9 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={illness.image}
              alt={illness.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{illness.title}</h3>
              <p className="mb-4">{illness.description}</p>
              <Link
                to={illness.link}
                className="text-indigo-500 hover:text-indigo-700 font-semibold"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
