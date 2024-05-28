/**
 * @typedef {Object} Inst
 * @property {Date} date
 * @property {number} hour
 */

/**
 *
 * @param {Array<Inst>} insts
 */
export function compressAttendanceData(insts) {
  let stream = "";
  for (let inst of insts) {
    let [yy, mm, dd] = inst.date.toISOString().split("-");
    dd = dd.substring(0, 2);
    yy = yy.substring(2, 4);
    stream += parseInt(yy + mm + dd + inst.hour) + " ";
  }
  return stream.trimEnd();
}

/**
 * @param {string} strData
 * @returns {Array<Inst>}
 */
export function extractAttendanceData(strData) {
  let insts = strData.split(" ");
  let converted = [];
  for (let inst of insts) {
    let date = inst.substring(0, 6);
    let hour = inst.substring(6);

    let yyyy = "20" + date.substring(0, 2),
      mm = date.substring(2, 4),
      dd = date.substring(4, 6);
    converted.push({
      date: new Date(yyyy + "-" + mm + "-" + dd),
      hour: hour,
    });
  }
  return converted;
}

/**
 *
 * @param {Array<Array<string>>} arr
 * @param {Array<string>} allowlist
 */
export function removeNonExistantEntries(arr, allowlist) {
  for (let i in arr) {
    for (let j in arr[i]) {
      if (allowlist.indexOf(arr[i][j]) < 0) {
        arr[i][j] = "";
      }
    }
  }
  return arr;
}

/**
 * converts given date to yyyy-m(m)-dd form
 * @param {Date|number|string} date
 * @returns {string};
 */
export function getDate(date) {
  date = new Date(date);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

export function isFuture(date, dateNow) {
  return date > dateNow && dateNow.getDate() != date.getDate();
}
