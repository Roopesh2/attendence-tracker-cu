import React from "react";
import "./card.css";


const CardList = ({ items } = prop) => (
	<div className="cardList">
		{items.map((item, index) =>
			<Card key={index} item={item} />
		)}
	</div>
);

const Card = ({ item } = prop) => (
	<div className="card">
		<h5 style={{
			fontWeight: 600
		}}>{item.title}</h5>
		<p>{item.description}</p>
	</div>
);
export default CardList;
