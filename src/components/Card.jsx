import { Col, Button, ButtonGroup } from "react-bootstrap";

const Card = ({ item, onClick, isAttendenceTime } = props) => {

	/**
	 * 
	 * @param {Event} evt 
	 */
	const doSomething = (evt) => {
		evt.stopPropagation();
	}

  return <Col
    md={12}
    lg={6}
    onClick={onClick}
    style={{
      cursor: "pointer",
    }}
  >
    <div className="card">
      <h5>{item.code}</h5>
      <p>{item.name}</p>
      {isAttendenceTime ? <ButtonGroup>
        <Button onClick={doSomething} variant="success">Present</Button>
        <Button onClick={doSomething} variant="danger">Absent</Button>
      </ButtonGroup> : ""}
    </div>
  </Col>
};
export default Card;
