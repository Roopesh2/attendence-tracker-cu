import { useEffect, useState } from "react";
import { Col, Button, ButtonGroup, Container } from "react-bootstrap";
import StorageManager from "../methods/StorageManager";

/**
 *
 * @param {Object} param0
 * @param {Object} param0.data
 * @param {Function} param0.onClick
 * @param {Object} param0.attendanceStatus
 * @returns
 */
const Card = ({ data, onClick, attendanceStatus }) => {
  let _hasLastUpdate = attendanceStatus.lastUpdate != undefined;

  const [alreadyMarkedAttendence, setAlreadyMarkedAttendence] = useState(
    _hasLastUpdate
      ? isSameHourOfDay(new Date(attendanceStatus.lastUpdate), new Date())
      : false,
  );

  const [markedStatus, setMarkedStatus] = useState(
    alreadyMarkedAttendence ? attendanceStatus.lastStatus : "",
  );

  const getColor = (status) => (status == "Absent" ? "#DC3545" : "#198754");
  const [markedColor, setMarkedColor] = useState(getColor(markedStatus));
  const [isMarking, setIsMarking] = useState(false);
  const [presenceCount, setPresenceCount] = useState({
    presents: attendanceStatus.presents || 0,
    total: attendanceStatus.total || 0,
  });
  const setPresence = (evt) => {
    evt.stopPropagation();

    const status = evt.target.innerText;
    const timeNow = new Date().getTime();

    let newAttendanceStatus = {
      presents: attendanceStatus.presents, // total present
      total: attendanceStatus.total + 1, // total classes
      lastUpdate: timeNow, // last updated
      lastStatus: status, // whether absent or present
    };

    if (status == "Present") {
      newAttendanceStatus.presents++;
    }
    setIsMarking(true);
    StorageManager.setAttendanceData(
      data.code,
      newAttendanceStatus,
      (success) => {
        if (success) {
          console.log(status);
          setAlreadyMarkedAttendence(true);
          setMarkedColor(getColor(status));
          setMarkedStatus(status);
          setPresenceCount({
            presents: newAttendanceStatus.presents,
            total: newAttendanceStatus.total,
          });
        } else {
          alert("Couldn't update attendance");
        }
        setIsMarking(false);
      },
    );
  };

  let showAttendanceMarker =
    attendanceStatus.noupdate != true || alreadyMarkedAttendence;

  if (data != undefined)
    return (
      <Col
        md={12}
        lg={6}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="card">
          <div className="flex-col">
            <div>
              <h5>{data.code}</h5>
              <p>{data.name}</p>
            </div>
            <div className="attendence">
              {presenceCount.presents}/{presenceCount.total}
            </div>
          </div>

          {showAttendanceMarker ? <hr /> : ""}

          {showAttendanceMarker ? (
            alreadyMarkedAttendence ? (
              <InfoBar color={markedColor} info={"Marked " + markedStatus} />
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

export default Card;
