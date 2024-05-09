import React, { useState } from 'react';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalenderView() {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div>
      <Calender
        onChange={onChange}
        value={date}
      />
    </div>
  );
}

export default CalenderView;
