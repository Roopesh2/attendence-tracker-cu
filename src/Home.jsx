import React, { useEffect, useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";
import StorageManager from "./methods/StorageManager";
import { getAttendenceData, getSubjects } from "./methods/firestore";

const Homepage = ({ setLoginState } = props) => {
	// const items = StorageManager.getSubjects();

	function signout() {
		setLoginState(false, false);
	}

	const [showCalendar, setShowCalendar] = useState(false);

	const toggleCalendar = () => {
		setShowCalendar(prev => !prev);
	};

	const [items, setItems] = useState([]);
	const [sub, setSub] = useState(false);
	useEffect(() => {
    getAttendenceData(setSub);
  }, []);

	useEffect(() => {
    getSubjects(setItems);
  }, []);

	return (
		<>
			<Header signout={signout} />
			<Container fluid className="article">
				<Col lg={7} className="d-none d-lg-inline-block panes">
					<CardList items={items || []} toggleCalendar={toggleCalendar} />
				</Col>
				<Col lg={4} className="d-none d-lg-inline-block panes">
					<CalendarView />
				</Col>
				{showCalendar ? (
					<Col md={12} className="d-block d-lg-none panes calender-sm">
						<Button onClick={toggleCalendar}>Back to Cards</Button>
						<CalendarView />
					</Col>
				) : (
					<Col md={12} className="d-block d-lg-none panes">
						<CardList items={items || []} toggleCalendar={toggleCalendar} />
					</Col>
				)}
			</Container>
		</>
	);
};

export default Homepage;
