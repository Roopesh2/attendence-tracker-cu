import React, { useState } from 'react';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/calender.css';

function CalendarView() {
	const [date, setDate] = useState(new Date());

	const onChange = date => {
		setDate(date);
	};

	function tileClassName({ date, view }) {
		if (view == "month") {
			if (date.getDay() == 0 || date.getDay() == 6) {
				return "weekend";
			}
			const specificDate = new Date(2024, 4, 6);
			const specificDate2 = new Date(2024, 4, 7);
			if (date.getDate() === specificDate.getDate() &&
				date.getMonth() === specificDate.getMonth() &&
				date.getFullYear() === specificDate.getFullYear()) {
				return 'present';
			} else {
				return 'absent'
			}
		}
	}

	return (
		<div>
			<Calender
				onChange={onChange}
				value={date}
				tileClassName={tileClassName}
			/>
		</div>
	);
}

export default CalendarView;
