import React from 'react';
import CardList from './CardList';

const Homepage = () => {
  const items = [
    { title: 'Card 1', description: 'This is Card 1' },
    { title: 'Card 2', description: 'This is Card 2' },
    // Add more cards as needed
  ];

  return (
    <div>
      <h1>Homepage</h1>
      <CardList items={items} />
    </div>
  );
};

export default Homepage;
