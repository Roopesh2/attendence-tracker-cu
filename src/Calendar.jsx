import React, { useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calender.css";
import { extractAttendanceData } from "./methods/file_ops";

function CalendarView({ subjectDetails = {} }) {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  let dates = extractAttendanceData(subjectDetails?.data?.times || "") || [];
  function tileClassName({ date, view }) {
    if (view == "month") {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
      for (let absData of dates) {
        let absDate = absData.date;
        if (
          date.getDate() == absDate.getDate() &&
          date.getMonth() == absDate.getMonth() &&
          date.getFullYear() == absDate.getFullYear()
        ) {
          return "absent";
        }
      }
      return "present";
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
