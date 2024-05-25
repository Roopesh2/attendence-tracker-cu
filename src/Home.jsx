import { useEffect, useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";
import StorageManager from "./methods/StorageManager";
import {
  ATTENDANCE_DATA_DIR,
  END_DATE_DIR,
  NO_CLASS_DIR,
  START_DATE_DIR,
  SUBJECT_DATA_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
  TIMETABLE_EMPTY,
} from "./methods/consts";

const Homepage = ({ setLoginState }) => {
  function signout() {
    setLoginState(false, false);
  }

  const mediaQL = window.matchMedia("(min-width: 992px)");
  const [showCalendar, setShowCalendar] = useState(false);
  const [clickedSubject, setClickedSubject] = useState("");
  const [isDesktopSize, setIsDesktopSize] = useState(mediaQL.matches);
  function handleViewportChange(mql) {
    if (mql.matches) {
      setIsDesktopSize(true);
    } else {
      setIsDesktopSize(false);
    }
  }
  mediaQL.addEventListener("change", handleViewportChange);

  const toggleCalendar = (dat) => {
    if (typeof dat?.name == "string") {
      setClickedSubject(dat);
      setShowCalendar(true);
    } else {
      setShowCalendar((prev) => !prev);
      setClickedSubject("");
    }
  };

  const [fbData, setFbData] = useState({
    [SUBJECT_LIST_DIR]: [],
    [TIMETABLE_DIR]: TIMETABLE_EMPTY,
    [SUBJECT_DATA_DIR]: {},
    startEndDate: [],
    [ATTENDANCE_DATA_DIR]: {},
    [NO_CLASS_DIR]: {},
  });

  function fetchData() {
    StorageManager.fetchData((data) => {
      if (typeof data == "boolean" && !data) {
        // no records found. probably failed login
        setLoginState(true, true);
      } else {
        let dat = Object.assign({}, fbData);
        dat[SUBJECT_LIST_DIR] = data[SUBJECT_LIST_DIR];
        dat[TIMETABLE_DIR] = data[TIMETABLE_DIR];
        dat[SUBJECT_DATA_DIR] = data[SUBJECT_DATA_DIR];
        dat.startEndDate = [
          new Date(data[START_DATE_DIR]),
          new Date(data[END_DATE_DIR]),
        ];
        StorageManager.getAttendanceData((data) => {
          dat[ATTENDANCE_DATA_DIR] = data;
          setFbData(dat);
          StorageManager.updateCache(dat);
        });
      }
    });
  }

  useEffect(fetchData, []);

  return (
    <>
      <Header signout={signout} editFields={() => setLoginState(true, true)} />
      <Container fluid className="article">
        {!showCalendar || isDesktopSize ? (
          <Col
            lg={7}
            md={12}
            className={
              isDesktopSize
                ? "d-none d-lg-inline-block"
                : "d-block d-lg-none card-width-max"
            }
          >
            <CardList
              startEndDate={fbData.startEndDate}
              allSubjects={fbData[SUBJECT_LIST_DIR]}
              subjectData={fbData[SUBJECT_DATA_DIR]}
              timetable={fbData[TIMETABLE_DIR]}
              toggleCalendar={toggleCalendar}
              cacheUpdater={fetchData}
            />
          </Col>
        ) : (
          ""
        )}

        {showCalendar || isDesktopSize ? (
          <>
            <Col
              lg={4}
              md={12}
              className={
                (isDesktopSize
                  ? "d-none d-lg-inline-block"
                  : "d-block d-lg-none calender-sm") + " calender-col"
              }
            >
              {!isDesktopSize ? (
                <Button onClick={toggleCalendar}>Back to Cards</Button>
              ) : (
                ""
              )}

              <h5>
                {showCalendar && clickedSubject != "0"
                  ? `${clickedSubject?.code} : ${clickedSubject?.name}`
                  : "Select a subject to see overview"}
              </h5>
              <CalendarView
                range={fbData.startEndDate}
                selectedSubject={clickedSubject?.code}
                attendanceData={fbData[ATTENDANCE_DATA_DIR]}
                timetable={fbData[TIMETABLE_DIR]}
              />
            </Col>
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Homepage;
