import React from "react";
import "../styles/card.css";
import Card from "./Card";
import { Row } from "react-bootstrap";

const CardList = ({ items } = prop) => (
	<Row>
		{items.map((item, index) => (
			<Card key={index} item={item} />
		))}
	</Row>
);

export default CardList;
