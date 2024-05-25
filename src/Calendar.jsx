import { useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calender.css";
import { NO_CLASS_DIR, PRESENTS_DIR, TIMETABLE_EMPTY } from "./methods/consts";

/**
 *
 * @param {Object} param0
 * @param {Object} param0.attendanceData
 * @param {string|undefined} param0.selectedSubject
 * @param {Array<Date>} param0.range
 * @param {Array<Array<string>>} param0.timetable
 */
function CalendarView({
  attendanceData = {},
  selectedSubject,
  range = [],
  timetable = TIMETABLE_EMPTY,
}) {
  const [currentDate, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  let presentDates = attendanceData[PRESENTS_DIR]?.[selectedSubject] || [],
    noClassDates = attendanceData[NO_CLASS_DIR]?.[selectedSubject] || [];
  function tileClassName({ date, view }) {
    if (view == "month") {
      const dateNow = new Date();

      if (dateNow < date && dateNow.getDate() != date.getDate()) {
        return "future";
      }

      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }

      if (timetable[date.getDay() - 1].indexOf(selectedSubject) < 0) {
        return "no-class";
      }

      for (let presentDate of presentDates) {
        presentDate = new Date(presentDate);
        if (isSameDate(date, presentDate)) {
          return "present";
        }
      }

      for (let noClassDate of noClassDates) {
        noClassDate = new Date(noClassDate);
        if (isSameDate(date, noClassDate)) {
          return "no-class";
        }
      }

      return "absent";
    }
  }

  return (
    <div>
      <Calender
        onChange={onChange}
        value={currentDate}
        tileClassName={tileClassName}
        minDate={range[0]}
        maxDate={range[1]}
      />
    </div>
  );
}

function isSameDate(date1, date2) {
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
}

export default CalendarView;
