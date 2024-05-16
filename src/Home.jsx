import React, { useEffect, useState } from "react";
import "./styles/home.css";
import CardList from "./components/CardList";
import Header from "./Header";
import { Button, Col, Container } from "react-bootstrap";
import CalendarView from "./Calendar";
import StorageManager from "./methods/StorageManager";

const Homepage = ({ setLoginState } = props) => {
	function signout() {
		setLoginState(false, false);
	}

	const [showCalendar, setShowCalendar] = useState(false);
	const [clickedSubject, setClickedSubject] = useState("");

	const toggleCalendar = (dat) => {
		if (dat) {
			setClickedSubject(dat);
		}
		setShowCalendar(prev => !prev);
	};

	const [items, setItems] = useState([]);
	const [absentDays, setAbsentDays] = useState({});
	useEffect(() => {
		StorageManager.getAttendenceData(setAbsentDays)
	}, []);

	useEffect(() => {
		StorageManager.getSubjects(setItems);
	}, []);

	return (
		<>
			<Header signout={signout} />
			<Container fluid className="article">
				<Col lg={7} className="d-none d-lg-inline-block panes">
					<CardList items={items || []} toggleCalendar={toggleCalendar} />
				</Col>
				<Col lg={4} className="d-none d-lg-inline-block panes">
					<CalendarView subjectDetails={absentDays[clickedSubject?.code]} />
				</Col>
				{showCalendar ? (
					<Col md={12} className="d-block d-lg-none panes calender-sm">
						<Button onClick={toggleCalendar}>Back to Cards</Button>
						<CalendarView subjectDetails={absentDays[clickedSubject?.code]} />
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
