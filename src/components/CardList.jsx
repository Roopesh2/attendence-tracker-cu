import React from "react";
import "../styles/card.css";
import Card from "./Card";
import { Row } from "react-bootstrap";
import { NULL_ATT_STATUS, SUBJ_HOUR_INDEX_LOOKUP } from "../methods/consts";

/**
 *
 * @param {Object} param0
 * @param {Array} param0.items
 * @param {Function} param0.toggleCalender
 * @param {Array} param0.today
 * @returns
 */
const CardList = ({
  allSubjects = [],
  subjectData,
  toggleCalendar,
  subjectsToday,
}) => {
  let currentSubject = "";
  let attendanceStatus = [];
  let _allSubjects = [...allSubjects];
  if (Array.isArray(subjectsToday) && subjectsToday.length > 0) {
    const hourNow = new Date().getHours();

    if (isWorkingHour(hourNow)) {
      // in the working hour
      // find current subject if any
      let currentSubjectIndex = SUBJ_HOUR_INDEX_LOOKUP[hourNow];
      currentSubject = subjectsToday[currentSubjectIndex];
      attendanceStatus = Object.assign(
        {},
        subjectData[currentSubject] || NULL_ATT_STATUS,
      );

      // sort current subject to top
      for (let i = 0; i < allSubjects.length; i++) {
        if (allSubjects[i].code == currentSubject) {
          _allSubjects = [
            _allSubjects[i],
            ..._allSubjects.splice(i).splice(1),
            ..._allSubjects,
          ];
          break;
        }
      }
    }
  }
  return (
    <Row
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {Array.isArray(_allSubjects) && _allSubjects.length > 0
        ? _allSubjects.map((subject, index) => (
            <Card
              key={index}
              data={subject}
              attendanceStatus={
                subject.code == currentSubject
                  ? attendanceStatus
                  : addNoUpdate(subjectData[subject.code] || {})
              }
              onClick={() => toggleCalendar(subject)}
            />
          ))
        : "Loading subjects"}
    </Row>
  );
};

function addNoUpdate(obj) {
  let s = JSON.parse(JSON.stringify(obj));
  s.noupdate = true;
  return s;
}

function isWorkingHour(hour) {
  return hour >= 9 && hour < 16 && hour != 12;
}

export default CardList;
