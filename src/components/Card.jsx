import { Col } from "react-bootstrap";

const Card = ({ item, onClick }) => (
	<Col md={12} lg={6} onClick={onClick} style={{
		cursor: "pointer"
	}}>
		<div className="card">
			<h5>{item.title}</h5>
			<p>{item.description}</p>
		</div>
	</Col>
);
export default Card;
