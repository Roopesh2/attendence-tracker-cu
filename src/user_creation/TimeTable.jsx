import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import DropdownButton from "../dropdown";
import { Button, Col } from "react-bootstrap";
import StorageManager from "../methods/StorageManager";
import { TIMETABLE_EMPTY } from "../methods/consts";
import { removeNonExistantEntries } from "../methods/file_ops";

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
  const prevTable = removeNonExistantEntries(
    StorageManager.getTimeTableFromCache(),
    subjects,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [timetable, setTimetable] = useState(prevTable);

  useEffect(() => {
    if (prevTable.length == 0) {
      StorageManager.getTimeTable((tt) => {
        setTimetable(tt);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSelect = (dayIndex, hourIndex, subject) => {
    const newTimetable = [...timetable];
    console.log(subject);
    newTimetable[dayIndex][hourIndex] = subject;
    console.log(newTimetable);
    setTimetable(newTimetable);
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
    <Col
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          maxWidth: "100vw",
          overflow: "scroll",
        }}
      >
        {isLoading ? (
          "Loading timetable"
        ) : (
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
                      <DropdownButton
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
        )}
      </div>
      <Col
        className="flex-inline-container"
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Finish</Button>
        <Button onClick={next} variant="outline-primary">
          Cancel
        </Button>
      </Col>
    </Col>
  );
}

export default TimeTable;
