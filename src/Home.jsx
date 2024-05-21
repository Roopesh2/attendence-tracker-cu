import React, { useEffect, useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";
import StorageManager from "./methods/StorageManager";
import {
  SUBJECT_DATA_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
} from "./methods/consts";

const Homepage = ({ setLoginState } = props) => {
  function signout() {
    setLoginState(false, false);
  }

  const [showCalendar, setShowCalendar] = useState(false);
  const [clickedSubject, setClickedSubject] = useState("");

  const toggleCalendar = (dat) => {
    if (dat) {
      setClickedSubject(dat);
    }
    setShowCalendar((prev) => !prev);
  };

  const [subjectList, setSubjectList] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [subjectData, setSubjectData] = useState({});
  const [attendenceDays, setAttendanceData] = useState({});

  useEffect(() => {
    StorageManager.fetchData((data) => {
      if (typeof data == "boolean" && !data) {
        // no records found. probably failed login
        setLoginState(true, true);
      } else {
        setSubjectList(data[SUBJECT_LIST_DIR]);
        setTimetable(data[TIMETABLE_DIR]);
        setSubjectData(data[SUBJECT_DATA_DIR]);
        StorageManager.updateCache(data);
      }
    });

    StorageManager.getAttendanceData((data) => {
      if (Object.keys(data).length > 0) {
        setAttendanceData(data);
      }
    });
  }, []);

  return (
    <>
      <Header signout={signout} editFields={() => setLoginState(true, true)} />
      <Container fluid className="article">
        <Col lg={7} className="d-none d-lg-inline-block panes">
          <CardList
            allSubjects={subjectList}
            subjectData={subjectData}
            subjectsToday={timetable[new Date().getDay() - 1]}
            toggleCalendar={toggleCalendar}
          />
        </Col>
        <Col lg={4} className="d-none d-lg-inline-block panes">
          {showCalendar ? (
            <h4 style={{ textAlign: "center" }}>
              {clickedSubject?.code} : {clickedSubject?.name}{" "}
            </h4>
          ) : (
            ""
          )}
          <CalendarView dates={attendenceDays[clickedSubject?.code]} />
        </Col>
        {showCalendar ? (
          <Col md={12} className="d-block d-lg-none panes calender-sm">
            <Button onClick={toggleCalendar}>Back to Cards</Button>
            <CalendarView dates={attendenceDays[clickedSubject?.code]} />
          </Col>
        ) : (
          <Col md={12} className="d-block d-lg-none panes">
            <CardList
              allSubjects={subjectList}
              subjectData={subjectData}
              subjectsToday={timetable[new Date().getDay() - 1]}
              toggleCalendar={toggleCalendar}
            />
          </Col>
        )}
      </Container>
    </>
  );
};

export default Homepage;
