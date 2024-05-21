import { useState } from "react";
import AddSubjects from "./AddSubjects";
import TimeTable from "./TimeTable";
import SetClassTime from "./SetClassTime";

function DataInitiation({ setSignup }) {
  const [view, setView] = useState("subjects");
  function getView(view) {
    switch (view) {
      case "subjects":
        return (
          <AddSubjects close={setSignup} next={() => setView("classtime")} />
        );
      case "classtime":
        return (
          <SetClassTime
            close={setSignup}
            previous={() => setView("subjects")}
            next={() => setView("timetable")}
          />
        );
      default:
        return (
          <TimeTable
            close={setSignup}
            next={setSignup}
            previous={() => setView("classtime")}
          />
        );
    }
  }
  return getView(view);
}

export default DataInitiation;
