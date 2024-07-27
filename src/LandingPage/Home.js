import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import msaImage from '../assets/images/msa.png';
import alignmentImage from '../assets/images/alignment.png';

const algorithms = [
  { id: 'alignment', name: 'Sequenzalignment', imgSrc: alignmentImage },
  { id: 'msa', name: 'Multiple Sequence Alignment (MSA)', imgSrc: msaImage },
];

function Home() {
  return (
    <div className="Home">
      <h1>Algorithm Overview</h1>
      <ul className='algorithm-list'>
        {algorithms.map(algorithm => (
          <li key={algorithm.id} className="algorithm-item">
            <Link to={`/algorithm/${algorithm.id}`} className="algorithm-link">
              <div className="algorithm-image-container">
                <img src={algorithm.imgSrc} alt={algorithm.name} className="algorithm-image" />
              </div>
              <span>{algorithm.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
