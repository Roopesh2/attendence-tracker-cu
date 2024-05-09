import { Col } from "react-bootstrap";

const Card = ({ item } = prop) => (
	<Col md={12} lg={6} >
		<div className="card">
			<h5>{item.title}</h5>
			<p>{item.description}</p>
		</div>
	</Col>
);
export default Card;
