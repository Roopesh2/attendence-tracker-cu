import { Col, Button, ButtonGroup } from "react-bootstrap";

const Card = ({ item, onClick }) => (
	<Col md={12} lg={6} onClick={onClick} style={{
		cursor: "pointer"
	}}>
		<div className="card">
			<h5>{item.title}</h5>
			<p>{item.description}</p>
			<ButtonGroup>
				<Button variant="success">Present</Button>
				<Button variant="danger">Absent</Button>
			</ButtonGroup>
		</div>
	</Col>
);
export default Card;
