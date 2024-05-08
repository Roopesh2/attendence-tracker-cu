import React from 'react';
import CardList from './CardList';

const Homepage = () => {
  const items = [
    { title: '001-LAT', description: 'Linear algebra and transformation' },
    { title: '002-ELS', description: 'environment and life sciences' },
    // Add more cards as needed
  ];

  return (
    <div>
      <h1>Attendence Report</h1>
      <CardList items={items} />
    </div>
  );
};

export default Homepage;
