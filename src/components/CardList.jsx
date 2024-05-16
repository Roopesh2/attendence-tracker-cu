import React, { useEffect } from "react";
import "../styles/card.css";
import Card from "./Card";
import { Row } from "react-bootstrap";

const subjHourIndexLookup = {
  9: 0,
  10: 1,
  11: 2,
  13: 3,
  14: 4,
  15: 5,
};

/**
 * Tranforms a array of object to dic with a given
 * key and value in arrayObjects
 * @param {Array<Object>} arr
 * @param {string} key
 * @param {string} value
 * @returns {Object}
 */
function transformToObj(arr, key, value) {
  let obj = {};
  for (let entry of arr) {
    let keyval = entry[key];
    obj[keyval] = entry;
  }
  console.log(obj);
  return obj;
}

/**
 *
 * @param {Object} param0
 * @param {Array} param0.items
 * @returns
 */
const CardList = ({ items, toggleCalendar, today }) => {
  let todaySubject;
  if (Array.isArray(today) && today.length > 0) {
    // find current subject if any
    const hourNow = new Date().getHours();
    const minNow = new Date().getMinutes();
    const subjectT = transformToObj(items, "code", "name");
    if (isWorkingHour(hourNow)) {
      // in the working hour
      let subjIndex = subjHourIndexLookup[hourNow];
      let currentSubjCode = today[subjIndex];
      todaySubject = (
        <Card
          key={subjIndex}
          item={subjectT[currentSubjCode]}
          isAttendenceTime={true}
          onClick={() => toggleCalendar(subjectT[currentSubjCode])}
        />
      );

      //remove this subject
      for (let i in items) {
        if (items[i].code == currentSubjCode) {
          items.splice(i, 1);
          break;
        }
      }
    }
  } else {
  }
  return (
    <Row
      style={{
        alignItems: "stretch",
      }}
    >
      {todaySubject ? todaySubject : ""}
      {items.map((item, index) => (
        <Card
          key={index}
          item={item}
          isAttendenceTime={false}
          onClick={() => toggleCalendar(item)}
        />
      ))}
    </Row>
  );
};

function isWorkingHour(hour) {
  return hour >= 9 && hour < 16 && hour != 12;
}

export default CardList;
