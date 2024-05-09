const Card = ({ item } = prop) => (
  <div className="card">
    <h5>{item.title}</h5>
    <p>{item.description}</p>
  </div>
);
export default Card;
