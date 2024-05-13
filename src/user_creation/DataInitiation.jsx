import { useState } from "react";
import AddSubjects from "./AddSubjects";
import TimeTable from "./TimeTable";

function DataInitiation({ setSignup }) {
	const [view, setView] = useState("subjects");


	function displayView() {
		switch (view) {
			case "subjects":
				return <AddSubjects next={() => setView("timetable")} />
			case "timetable":
				return <TimeTable next={setSignup} previous={() => setView("subjects")} />
		}
	}

	return (
		<>
			{displayView()}
		</>
	)
}

export default DataInitiation;