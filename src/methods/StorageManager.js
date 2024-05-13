/** 
 * Manages user data including login details
 * 
 * ### localStorage Schema
 * isLogged <bool> : whether logged in or not
 * email <String>
 * password <String>
 * subjects <Array<Object>> : list of entered subjects
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
    return JSON.parse(localStorage.getItem("subjects")) || [{}];
  },

	/**
	 * Saves subjects data
	 * @param {Array<Array<string>>} subjects subjects array
	 */
  setTimeTable: (subjects) => {
    localStorage.setItem("timetable", JSON.stringify(subjects));
  },

	/**
	 * returns timetable
	 * @returns {Array<Array<string>>}
	 */
  getTimeTable: () => {
    return JSON.parse(localStorage.getItem("timetable") || "[]");
  }
};

export default StorageManager;
