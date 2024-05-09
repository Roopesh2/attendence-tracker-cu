import React from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";

const Homepage = ({ setLoginState } = props) => {
  const items = [
    { title: "001-LAT", description: "Linear algebra and transformation" },
    { title: "002-ELS", description: "Environment and life sciences" },
    { title: "003-ICP", description: "Introduction to cyber physical systems" },
    { title: "004-OOPS", description: "Object oriented programming" },
    { title: "005-DE ", description: "Digital Electronics" },
    { title: "006-CHE", description: "Chemistry" },
    { title: "007-PHY", description: "Physics" },
    { title: "008-BE", description: "Basic Electrical " },
    { title: "009-BELAB", description: "Basic Electrical Laboratory" },
    { title: "010-DELAB", description: "Digital Elctronics laboratory" },
  ];

  function signout() {
    setLoginState(false);
  }
  return (
    <div className="max-width">
      <Header signout={signout} />
			<article>
				<CardList items={items} />
			</article>
    </div>
  );
};

export default Homepage;
