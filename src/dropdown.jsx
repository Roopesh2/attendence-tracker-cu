import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function DropdownButton({ subjects, updateTimetable, value }) {
  const handleSelect = (eventKey) => {
    updateTimetable(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect} defaultValue={value}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value || "Select Subject"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {subjects.map((hour, i) => (
          <Dropdown.Item key={i} eventKey={subjects[i]}>
            {subjects[i]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
