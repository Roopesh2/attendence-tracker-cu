import React from 'react';
import CardList from './CardList';
import { Button } from 'react-bootstrap';

const Homepage = ({setLoginState}=props) => {
  const items = [
    { title: '001-LAT', description: 'Linear algebra and transformation' },
    { title: '002-ELS', description: 'environment and life sciences' },
    // Add more cards as needed
  ];

	function signout() {
		setLoginState(false);
	}
  return (
    <div className='max-width'>
			<Button onClick={signout} variant='outline-primary'>Sign Out</Button>
      <h1>Attendence Report</h1>
      <CardList items={items} />
    </div>
  );
};

export default Homepage;
