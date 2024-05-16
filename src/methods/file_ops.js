/**
 * @typedef {Object} Inst
 * @property {Date} date
 * @property {number} i
 */

/**
 *
 * @param {Array<Inst>} insts
 */
export function compressAttendenceData(insts) {
  let stream = "";
  for (let inst of insts) {
    let [yy, mm, dd] = inst.date.toISOString().split("-");
    dd = dd.substring(0, 2);
    yy = yy.substring(2, 4);
    stream += parseInt(yy + mm + dd + inst.i) + " ";
  }
  return stream.trimEnd();
}

/**
 * @param {string} strData
 * @returns {Array<Inst>}
 */
export function extractAttendenceData(strData) {
  let insts = strData.split(" ");
  let converted = [];
  for (let inst of insts) {
    let date = inst.substring(0, 6);
    let index = inst.substring(6);

    let yyyy = "20" + date.substring(0, 2),
      mm = date.substring(2, 4),
      dd = date.substring(4, 6);
    converted.push({
      date: new Date(yyyy + "-" + mm + "-" + dd),
      i: index,
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
  for (let i in arr){
    for(let j in arr[i]) {
      if (allowlist.indexOf(arr[i][j]) < 0) {
        arr[i][j] = ""
      }
    }
  }
  return arr;
}