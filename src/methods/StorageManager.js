/** 
 * Manages user data including login details
 * 
 * ### localStorage Schema
 * isLogged <bool> : whether logged in or not
 * email <String>
 * password <String>
 * subjects <Array> : list of entered subjects
 * timetable <Object<String, Array>> : 2d array of table
 * 
*/

const StorageManager = {
  /**
   * stores array of subjects as string separated by ::
   * @param {Array<String>} subjects List of subjects
   */
  setSubjects: (subjects) => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  },

  /**
   * Returns subjects entered.
   * @returns {Array<String>}
   */
  getSubjects: () => {
    return JSON.parse(localStorage.getItem("subjects"));
  },

  setTimeTable: (table) => {
    localStorage.setItem("timetable", JSON.stringify(subjects));
  },

  setTimeTable: (table) => {
    localStorage.setItem("timetable", JSON.stringify(subjects));
  }
};

StorageManager.setSubjects([1, 3, "ds: S"]);
console.log(StorageManager.getSubjects());
export default StorageManager;
