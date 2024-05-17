import React, { useEffect, useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";
import StorageManager from "./methods/StorageManager";

const Homepage = ({ setLoginState } = props) => {
  function signout() {
    setLoginState(false, false);
  }

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentSubj, setCurrentSubj] = useState(1);
  const [clickedSubject, setClickedSubject] = useState("");

  const toggleCalendar = (dat) => {
    if (dat) {
      setClickedSubject(dat);
    }
    setShowCalendar((prev) => !prev);
  };

  const [subjects, setSubjects] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [absentDays, setAbsentDays] = useState({});
  useEffect(() => {
    StorageManager.getSubjects((arr) => {
      if (typeof arr == "boolean" && !arr) {
        // no records found. probably failed login
        setLoginState(true, true);
      } else {
        setSubjects(arr);
      }
    });
  }, []);

  useEffect(() => {
    StorageManager.getTimeTable((arr) => {
      if (typeof arr == "boolean" && !arr) {
        // no records found. probably failed login
        setLoginState(true, true);
      } else {
        setTimetable(arr);
      }
    });
  }, []);

  useEffect(() => {
    StorageManager.getAttendenceData((obj) => {
      if (typeof obj == "boolean" && !obj) {
        // no records found. probably failed login
        setLoginState(true, true);
      } else {
        setAbsentDays(obj);
      }
    });
  }, []);
  return (
    <>
      <Header signout={signout} editFields={() => setLoginState(true, true)} />
      <Container fluid className="article">
        <Col lg={7} className="d-none d-lg-inline-block panes">
          <CardList
            items={subjects || []}
            today={timetable[new Date().getDay() - 1]}
            currentSubj={currentSubj}
            toggleCalendar={toggleCalendar}
          />
        </Col>
        <Col lg={4} className="d-none d-lg-inline-block panes">
          {showCalendar ? <h4 style={{textAlign: "center"}}>{clickedSubject?.code} : {clickedSubject?.name} </h4> : ""}
          <CalendarView subjectDetails={absentDays[clickedSubject?.code]} />
        </Col>
        {showCalendar ? (
          <Col md={12} className="d-block d-lg-none panes calender-sm">
            <Button onClick={toggleCalendar}>Back to Cards</Button>
            <CalendarView subjectDetails={absentDays[clickedSubject?.code]} />
          </Col>
        ) : (
          <Col md={12} className="d-block d-lg-none panes">
            <CardList
              items={subjects || []}
              today={timetable[new Date().getDay() - 1]}
              currentSubj={currentSubj}
              toggleCalendar={toggleCalendar}
            />
          </Col>
        )}
      </Container>
    </>
  );
};

export default Homepage;
