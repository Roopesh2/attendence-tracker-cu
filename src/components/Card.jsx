import { Col, Button, ButtonGroup } from "react-bootstrap";

const Card = ({ item, onClick }) => (
	<Col md={12} lg={6} onClick={onClick} style={{
		cursor: "pointer"
	}}>
		<div className="card">
			<h5>{item.code}</h5>
			<p>{item.name}</p>
			<ButtonGroup>
				<Button variant="success">Present</Button>
				<Button variant="danger">Absent</Button>
			</ButtonGroup>
		</div>
	</Col>
);
export default Card;
