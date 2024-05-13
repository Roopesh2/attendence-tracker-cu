import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ButtonDarkExample({subjects, updateTimetable, value}) {
  const [dropdownTitle, setDropdownTitle] = useState('Select Subject');

  const handleSelect = (eventKey) => {
    setDropdownTitle(eventKey);
    updateTimetable(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect} defaultValue={value}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        {value || "Select Subject"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {subjects.map((hour, i) => (
              <Dropdown.Item eventKey={subjects[i]}>{subjects[i]}</Dropdown.Item>
            ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonDarkExample;
