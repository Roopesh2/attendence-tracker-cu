import { useState } from "react";
import AddSubjects from "./AddSubjects";
import TimeTable from "./TimeTable";

function DataInitiation({ setSignup }) {
  const [view, setView] = useState("subjects");
  return view == "subjects" ?
    <AddSubjects close={setSignup} next={() => setView("timetable")} />
    : (
      <TimeTable next={setSignup} previous={() => setView("subjects")} />
    );
}

export default DataInitiation;
