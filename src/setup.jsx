import React, { useState } from 'react';
import Addcomponent from './component'; // import your component
import { Button } from 'react-bootstrap';

const ParentComponent = () => {
  const [count, setCount] = useState(1);
  const [components, setComponents] = useState([{}]);
  const handleAdd = () => {
    setComponents(prevComponents => [...prevComponents, {}]);
  };
  const handleDelete = (index) => {
    if (components.length > 1) {
      setComponents(prevComponents => prevComponents.filter((component, i) => i !== index));
    }
  };
  
  return (
    <div>
      {components.map((component, index) => (
        <Addcomponent key={index} onDelete={() => handleDelete(index)} />
      ))}
      <Button onClick={handleAdd}>Add Component</Button>
    </div>
); 
};


export default ParentComponent;
