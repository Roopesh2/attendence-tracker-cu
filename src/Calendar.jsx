import { useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calender.css";
import { NO_CLASS_DIR, PRESENTS_DIR, TIMETABLE_EMPTY } from "./methods/consts";
import { getDate, isFuture, isWeekday } from "./methods/file_ops";

/**
 *  @typedef {Object} AttendanceData
 * @prop {Object<string, Object<string, Array<number>>} presents
 * @prop {Object<string, Object<string, Array<number>>} no_class
 *
 */

/**
 *
 * @param {Object} param0
 * @param {AttendanceData} param0.attendanceData
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

  let presentDates = attendanceData[PRESENTS_DIR]?.[selectedSubject] || {},
    noClassDates = attendanceData[NO_CLASS_DIR]?.[selectedSubject] || {};
  function tileClassName({ date: calendarDate, view }) {
    if (view == "month") {
      const dateNow = new Date();

      if (isFuture(calendarDate, dateNow)) {
        return "future";
      }

      if (!isWeekday(calendarDate)) {
        return "weekend";
      }
      if (selectedSubject == undefined || selectedSubject == "") return "";

      let hoursInDay = 0,
        subjectsList = timetable[calendarDate.getDay() - 1],
        calendarDateStr = getDate(calendarDate);
      for (let i = 0; i < subjectsList.length; i++) {
        if (subjectsList[i] == selectedSubject) hoursInDay++;
      }
      if (noClassDates[calendarDateStr] != undefined) {
        hoursInDay -= noClassDates[calendarDateStr].length;
      }

      if (hoursInDay == 0) {
        return "no-class";
      }

      //--- there was class

      const presentDateTS = presentDates[calendarDateStr];
      if (presentDateTS == undefined || presentDateTS.length == 0)
        return "absent";

      // present
      if (presentDateTS.length == hoursInDay) {
        return "present";
      } else {
        return "partial-present";
      }
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
