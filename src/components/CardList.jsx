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
  return obj;
}

/**
 *
 * @param {Object} param0
 * @param {Array} param0.items
 * @returns
 */
const CardList = ({ items, toggleCalendar, today }) => {
  let currentSubjectIndex = -1;
  let _items = [...items];
  if (Array.isArray(today) && today.length > 0) {
    const hourNow = new Date().getHours();
    const subjectT = transformToObj(items, "code", "name");

    if (isWorkingHour(hourNow)) {
      // in the working hour
      // find current subject if any
      currentSubjectIndex = subjHourIndexLookup[hourNow];
    }

    // generate subject list from today's time table
    _items = [];
    for (let code of today) {
      _items.push(subjectT[code]);
    }
  }

  return (
    <Row
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {Array.isArray(_items) && _items.length > 0
        ? _items.map((item, index) => (
            <Card
              key={index}
              item={item}
              showAttendanceMarker={index == currentSubjectIndex}
              onClick={() => toggleCalendar(item)}
            />
          ))
        : "Loading subjects"}
    </Row>
  );
};

function isWorkingHour(hour) {
  return hour >= 9 && hour < 16 && hour != 12;
}

export default CardList;
