import React from "react";
import "../styles/card.css";
import Card from "./Card";

const CardList = ({ items } = prop) => (
  <div className="cardList">
    {items.map((item, index) => (
      <Card key={index} item={item} />
    ))}
  </div>
);

export default CardList;
