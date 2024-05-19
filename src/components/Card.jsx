import { useState } from "react";
import { Col, Button, ButtonGroup, Container } from "react-bootstrap";

/**
 *
 * @param {Object} param0
 * @param {Function} param0.onClick
 * @param {Object} param0.item
 * @returns
 */
const Card = ({ item, onClick, attendenceStatus } = props) => {
  const [marked, setMarked] = useState(attendenceStatus);
  const [markedColor, setMarkedColor] = useState("#fff");
  const setPresence = (evt) => {
    evt.stopPropagation();
    const status = evt.target.innerText;
    if (status == "Absent") {
      setMarkedColor("#DC3545");
    } else {
      setMarkedColor("#198754");
    }
    setMarked(status);
  };
  let showAttendenceMarker = typeof marked == "string";
  if (item != undefined)
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
          <h5>{item.code}</h5>
          <p>{item.name}</p>

          {showAttendenceMarker ? <hr /> : ""}

          {showAttendenceMarker ? (
            marked ? (
              <Container
                style={{
                  width: "100%",
                  border: "1px solid " + markedColor,
                  borderRadius: "7px",
                  padding: "7px",
                  textAlign: "center",
                  color: markedColor,
                  cursor: "default",
                }}
                onClick={(evt) => evt.stopPropagation()}
              >
                Marked {marked}
              </Container>
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
export default Card;
