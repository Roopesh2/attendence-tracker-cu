import React from "react";
import "../styles/card.css";
import Card from "./Card";
import { Row } from "react-bootstrap";

const CardList = ({ items, toggleCalendar }) => (
	<Row  style={{
		alignItems: "stretch"
	}}>
	
		{items.map((item, index) => (
			<Card key={index} item={item} onClick={() => toggleCalendar(item)}/>
		))}

	</Row>
);

export default CardList;
