import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ButtonDarkExample from "../dropdown";
import { Button, Col } from "react-bootstrap";
import StorageManager from "../methods/StorageManager";
import { TIMETABLE_EMPTY } from "../methods/consts";

function TimeTable({ next, previous }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  const subjects = StorageManager.getSubjectsFromCache().map(
    (value, _) => value.code,
  );
  const prevTable = StorageManager.getTimeTableFromCache();
  const initialTimetable =
    prevTable.length > 0
      ? prevTable
      : TIMETABLE_EMPTY;
  const [timetable, setTimetable] = useState(initialTimetable);

  const handleSelect = (dayIndex, hourIndex, subject) => {
    setTimetable((prevTimetable) => {
      const newTimetable = [...prevTimetable];
      console.log(subject);
      newTimetable[dayIndex][hourIndex] = subject;
      return newTimetable;
    });
  };

  const handleNext = () => {
    console.log(timetable);
    StorageManager.setTimeTable(timetable);
    StorageManager.setSubjects(StorageManager.getSubjectsFromCache());
    next();
  };

  const handlePrevious = () => {
    console.log(timetable);
    StorageManager.setTimeTable(timetable, true);
    previous();
  };

  return (
    <Col>
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
              {hours.map((_, hourIndex) => (
                <td key={`${hourIndex}-${dayIndex}-td`}>
                  <ButtonDarkExample
                    key={`${hourIndex}-${dayIndex}`}
                    subjects={subjects}
                    value={
                      subjects.indexOf(timetable[dayIndex][hourIndex]) >= 0
                        ? timetable[dayIndex][hourIndex]
                        : ""
                    }
                    updateTimetable={(subject) =>
                      handleSelect(dayIndex, hourIndex, subject)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Col>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Col>
    </Col>
  );
}

export default TimeTable;
