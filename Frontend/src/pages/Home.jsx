import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home_info from '../components/Home_info';
import img1 from '../images/homeimgnew-min.jpg';
import '../App.css'; // Assuming you have your styles here

const Home = () => {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(response.data.setup + ' ' + response.data.punchline);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="helpline-container">
        <h3 className="marquee" style={{ color: 'navyblue' }}>
          Helpline Numbers under this Programme : ☎️ 999 or 📞 256 774 114 216
        </h3>
      </div>
      <div className="home-allcontent">
        <div className="home-project-intro-image">
          {/* Added styling for responsiveness */}
          <img
            src={img1}
            alt="FreeMind: Embrace, Empower, Elevate, Heal"
            className="home-image"
          />
        </div>

        <div className="home-project-intro-quote">
          <h3>
            "In the journey of life, may you find solace, laughter, and the companionship of kindred souls. Just know, shit happens"
          </h3>
        </div>

        <div className="home-project-intro">
          <p> 
            FreeMind has many such resources to make you smile even when you feel you can't. We also offer a variety of other resources to help you 
            understand yourself better. After all, we all deserve to know what is going inside us.
          </p>
        </div>

        <Home_info />
      </div>
    </div>
  );
};

export default Home;