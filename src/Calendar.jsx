import React, { useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calender.css";

/**
 *
 * @param {Object} param0
 * @param {Array<number>} param0.dates
 * @param {Array<Date>} param0.range
 * @returns
 */
function CalendarView({ dates = [], range = [] }) {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  let _dates = [...dates];
  function tileClassName({ date, view }) {
    if (view == "month") {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
      for (let absData of _dates) {
        let absDate = new Date(absData);
        if (
          date.getDate() == absDate.getDate() &&
          date.getMonth() == absDate.getMonth() &&
          date.getFullYear() == absDate.getFullYear()
        ) {
          return "present";
        }
      }
      return "absent";
    }
  }

  return (
    <div>
      <Calender
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        minDate={range[0]}
        maxDate={range[1]}
      />
    </div>
  );
}

export default CalendarView;
