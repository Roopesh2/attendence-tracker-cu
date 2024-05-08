import React from 'react';
import CardList from './CardList';
import { Button } from 'react-bootstrap';
import './home.css'

const Homepage = ({setLoginState}=props) => {
  const items = [
    { title: '001-LAT', description: 'Linear algebra and transformation' },
    { title: '002-ELS', description: 'Environment and life sciences' },
    { title: '003-ICP', description: 'Introduction to cyber physical systems' },
    { title: '004-OOPS',description: 'Object oriented programming' },
    { title: '005-DE ', description: 'Digital Electronics' },
    { title: '006-CHE', description: 'Chemistry' },
    { title: '007-PHY', description: 'Physics' },
    { title: '008-BE',  description: 'Basic Electrical ' },
    { title: '009-BELAB',description: 'Basic Electrical Laboratory' },
    { title: '010-DELAB',description: 'Digital Elctronics laboratory' },
    // Add more cards as needed
  ];

	function signout() {
		setLoginState(false);
	}
  return (
    <div className='max-width'>
			<header>
			<Button onClick={signout} variant='outline-primary'>Sign Out</Button>
			</header>
      <h1 style={{
				textAlign: "center",
				fontWeight: 700
			}}>Attendence Report</h1>
      <CardList items={items} />
    </div>
  );
};

export default Homepage;
