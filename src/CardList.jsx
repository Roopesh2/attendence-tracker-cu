import React from 'react';

const CardList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={
            { border: '1px solid black',
            margin: '10px',
            padding: '10px',
            boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
            }}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
