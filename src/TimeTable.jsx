import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ButtonDarkExample from './dropdown';
import { Button } from 'react-bootstrap';
import StorageManager from './methods/StorageManager';

const TimeTable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'];

  const subjects = StorageManager.getSubjects();

  const initialTimetable = Array(days.length).fill().map(() => Array(hours.length).fill(''));

  const [timetable, setTimetable] = useState(initialTimetable);

  const handleSelect = (dayIndex, hourIndex, subject) => {
    setTimetable(prevTimetable => {
      const newTimetable = [...prevTimetable];
      console.log(subject);
      newTimetable[dayIndex][hourIndex] = subject;
      return newTimetable;
    });
  };

  const handleNext = () => {
    console.log(timetable);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          {hours.map((hour, index) => (
            <th key={index}>{hour}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, dayIndex) => (
          <tr key={dayIndex}>
            <th>{day}</th>
            {hours.map((hour, hourIndex) => (
              <td key={hourIndex}>
                <ButtonDarkExample subjects={subjects} 
                updateTimetable={(subject) => handleSelect(dayIndex, hourIndex, subject)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <Button onClick={handleNext}>Next</Button>
    </Table>
  );
};

export default TimeTable;
