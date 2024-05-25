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
  timetable,
  startEndDate,
  cacheUpdater,
}) => {
  let currentSubject = "";
  let attendanceStatus = [];
  let _allSubjects = [...allSubjects];
  let subjectsToday = timetable[new Date().getDay() - 1];
  if (Array.isArray(subjectsToday) && subjectsToday.length > 0) {
    const hourNow = new Date().getHours() - 8;

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
    <Row className="card-list">
      {Array.isArray(_allSubjects) && _allSubjects.length > 0
        ? _allSubjects.map((subject, index) => (
            <Card
              key={index}
              subjectData={subject}
              startEndDate={startEndDate}
              timetable={timetable}
              attendanceStatus={
                subject.code == currentSubject
                  ? attendanceStatus
                  : addNoUpdate(subjectData[subject.code] || {})
              }
              onClick={() => toggleCalendar(subject)}
              cacheUpdater={cacheUpdater}
            />
          ))
        : "Loading subjects"}
    </Row>
  );
};

function addNoUpdate(obj) {
  let s = Object.assign({}, obj);
  s.noupdate = true;
  return s;
}

function isWorkingHour(hour) {
  return hour >= 9 && hour < 16 && hour != 12;
}

export default CardList;
