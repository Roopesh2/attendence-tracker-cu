import React from "react";

const CardList = ({ items }) => {
  return <div>{items.map((item, index) => Card(item, index))}</div>;
};

const Card = (item, index) => (
  <div
    key={index}
    style={{
      margin: "10px",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: 10,
      width: "100%",
      boxShadow:
        "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
    }}
  >
    <h2>{item.title}</h2>
    <p>{item.description}</p>
  </div>
);
export default CardList;
