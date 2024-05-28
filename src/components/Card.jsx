import { useState } from "react";
import { Col, Button, ButtonGroup, Container } from "react-bootstrap";
import StorageManager from "../methods/StorageManager";
import { isWeekday } from "../methods/file_ops";

/**
 *
 * @param {Object} param0
 * @param {Object} param0.data
 * @param {Function} param0.onClick
 * @param {Object} param0.attendanceStatus
 * @returns
 */
const Card = ({
  subjectData,
  timetable,
  onClick,
  attendanceStatus,
  startEndDate,
  cacheUpdater,
}) => {
  let _hasLastUpdate = attendanceStatus.lastUpdate != undefined;
  let _alreadyMarkedAttendance =
    _hasLastUpdate &&
    isSameHourOfDay(new Date(attendanceStatus.lastUpdate), new Date());
  let _markingStat = _alreadyMarkedAttendance
    ? attendanceStatus.lastStatus
    : "";

  const getColor = (status) =>
    status == "Absent"
      ? "#DC3545"
      : status == "Present"
        ? "#198754"
        : "#6c757d";

  const [isMarking, setIsMarking] = useState(false);
  let totalHours = 0;
  const [cardData, setCardData] = useState({
    markedStatus: _markingStat,
    alreadyMarkedAttendance: _alreadyMarkedAttendance,
    markedColor: getColor(_markingStat),
    presenceCount: {
      presents: attendanceStatus.presents || 0,
      no_class: attendanceStatus.no_class || 0,
    },
  });

  if (isValidDate(startEndDate[0])) {
    totalHours =
      computeTotalSubjectHours(
        startEndDate[0],
        new Date(),
        timetable,
        subjectData.code,
      ) - cardData.presenceCount.no_class;
  }

  const setPresence = (evt) => {
    evt.stopPropagation();

    const status = evt.target.innerText;
    const timeNow = new Date().getTime();

    let newAttendanceStatus = {
      presents: attendanceStatus.presents, // total present
      no_class: attendanceStatus.no_class, // total non-class
      lastUpdate: timeNow, // last updated
      lastStatus: status, // whether absent or present
    };

    if (status == "Present") {
      newAttendanceStatus.presents++;
    } else if (status == "No Class") {
      newAttendanceStatus.no_class++;
    }

    setIsMarking(true);

    StorageManager.setAttendanceData(
      subjectData.code,
      newAttendanceStatus,
      (success) => {
        if (success) {
          console.log(status);
          setCardData({
            alreadyMarkedAttendance: true,
            markedColor: getColor(status),
            markedStatus: status,
            presenceCount: {
              presents: newAttendanceStatus.presents,
              no_class: newAttendanceStatus.no_class,
            },
          });
          cacheUpdater();
        } else {
          alert("Couldn't update attendance");
        }
        setIsMarking(false);
      },
    );
  };

  let showAttendanceMarker =
    attendanceStatus.noupdate != true || cardData.alreadyMarkedAttendance;

  if (subjectData != undefined)
    return (
      <Col
        md={12}
        lg={6}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="card" onClick={onClick}>
          <div className="flex-col">
            <div>
              <h5>{subjectData.code}</h5>
              <p>{subjectData.name}</p>
            </div>
            <div className="attendance">
              {cardData.presenceCount.presents}/{totalHours}
            </div>
          </div>

          {showAttendanceMarker ? <hr /> : ""}

          {showAttendanceMarker ? (
            cardData.alreadyMarkedAttendance ? (
              <InfoBar
                color={cardData.markedColor}
                info={
                  "Marked " +
                  cardData.markedStatus +
                  (cardData.markedStatus == "No Class" ? " today" : "")
                }
              />
            ) : isMarking ? (
              <InfoBar color={"var(--text-color)"} info={"Marking..."} />
            ) : (
              <ButtonGroup>
                <Button onClick={setPresence} variant="success">
                  Present
                </Button>
                <Button onClick={setPresence} variant="danger">
                  Absent
                </Button>
                <Button onClick={setPresence} variant="secondary">
                  No Class
                </Button>
              </ButtonGroup>
            )
          ) : (
            ""
          )}
        </div>
      </Col>
    );
  else {
    return <></>;
  }
};

function computeTotalSubjectHours(start, end, timetable, subjectCode) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const oneDay = 24 * 60 * 60 * 1000;
  let totalHours = 0;

  for (let d = startDate; d <= endDate; d = new Date(d.getTime() + oneDay)) {
    if (isWeekday(d)) {
      let weekI = d.getDay() - 1;
      for (let slot = 0; slot < timetable[weekI].length; slot++) {
        if (timetable[weekI][slot] == subjectCode) {
          totalHours++;
        }
      }
    }
  }
  return totalHours;
}

function InfoBar({ color, info }) {
  return (
    <Container
      style={{
        width: "100%",
        border: "1px solid " + color,
        borderRadius: "7px",
        padding: "7px",
        textAlign: "center",
        color: color,
        cursor: "default",
      }}
      onClick={(evt) => evt.stopPropagation()}
    >
      {info}
    </Container>
  );
}

function isSameHourOfDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours()
  );
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
export default Card;
