import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import DropdownButton from "../dropdown";
import { Button, Col } from "react-bootstrap";
import StorageManager from "../methods/StorageManager";
import { removeNonExistantEntries } from "../methods/file_ops";
import { END_DATE_DIR, START_DATE_DIR } from "../methods/consts";

function TimeTable({ next, previous }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [isNotFilled, setIsNotFilled] = useState(
    Array(5)
      .fill()
      .map(() => Array(6).fill(false)),
  );
  const [isLoading, setIsLoading] = useState(false);
  const hours = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  const subjects = StorageManager.getSubjectListFromCache().map(
    (value, _) => value.code,
  );
  const prevTable = removeNonExistantEntries(
    StorageManager.getTimeTableFromCache(),
    subjects,
  );
  const [timetable, setTimetable] = useState(prevTable);

  const handleSelect = (dayIndex, hourIndex, subject) => {
    const newTimetable = [...timetable];
    console.log(subject);
    newTimetable[dayIndex][hourIndex] = subject;
    setTimetable(newTimetable);
  };

  const validateTable = (tt, _isnf) => {
    let isnf = [..._isnf],
      fullyFilled = true;
    for (let i = 0; i < tt.length; i++) {
      for (let j = 0; j < tt[i].length; j++) {
        if (tt[i][j] == "") {
          isnf[i][j] = true;
          fullyFilled = false;
        } else {
          isnf[i][j] = false;
        }
      }
    }
    return [isnf, fullyFilled];
  };
  const handleFinish = async () => {
    console.log(timetable);
    let [isnf, fullyFilled] = validateTable(timetable, isNotFilled);
    StorageManager.setTimeTable(timetable, true);
    // if (fullyFilled) {
    setIsLoading(true);
    StorageManager.initializeFields(
      timetable,
      StorageManager.getSubjectListFromCache(),
      {},
      StorageManager.getCache(START_DATE_DIR),
      StorageManager.getCache(END_DATE_DIR),
      (success) => {
        setIsLoading(false);
        if (success) {
          next();
        } else {
          alert("Couldn't update status please try again.");
        }
      },
    );
    // } else {
    //   setIsNotFilled(isnf);
    // }
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
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Specify Time Table
      </h1>
      <div
        style={{
          maxWidth: "100vw",
          overflow: "scroll",
        }}
      >
        <Table bordered hover>
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
                      isNotFilled={isNotFilled[dayIndex][hourIndex]}
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
      </div>
      <Col
        className="flex-inline-container"
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        {isLoading ? "" : <Button onClick={handlePrevious}>Previous</Button>}
        <Button onClick={handleFinish} disabled={isLoading}>
          {isLoading ? "Please wait..." : "Finish"}
        </Button>
        {isLoading ? (
          ""
        ) : (
          <Button onClick={next} variant="outline-primary">
            Cancel
          </Button>
        )}
      </Col>
    </Col>
  );
}

export default TimeTable;
