import React, { useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";

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

	const [showCalendar, setShowCalendar] = useState(false);

	const toggleCalendar = () => {
		setShowCalendar(prev => !prev);
	};
	return (
		<>
			<Header signout={signout} />
			<Container fluid className="article">
				<Col lg={7} className="d-none d-lg-inline-block panes">
					<CardList items={items} toggleCalendar={toggleCalendar} />
				</Col>
				<Col lg={4} className="d-none d-lg-inline-block panes">
					<CalendarView />
				</Col>
				{showCalendar ? (
					<Col md={12} className="d-block d-lg-none panes calender-sm">
						<Button onClick={toggleCalendar}>Back to Cards</Button>
						<CalendarView  />
					</Col>
				) : (
					<Col md={12} className="d-block d-lg-none panes">
						<CardList items={items} toggleCalendar={toggleCalendar} />
					</Col>
				)}
			</Container>
		</>
	);
};

export default Homepage;
