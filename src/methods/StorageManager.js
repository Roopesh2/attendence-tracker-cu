/**
 * Manages user data including login details
 *
 * ### localStorage Schema
 * isLogged <bool> : whether logged in or not
 * subjects <Array<Object>> : list of entered subjects
 * timetable <Object<String, Array>> : 2d array of table
 *
 */

import { db } from "./firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  END_DATE_DIR,
  NO_CLASS_DIR,
  ATTENDANCE_DATA_DIR,
  START_DATE_DIR,
  SUBJECT_DATA_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
  TIMETABLE_EMPTY,
  USER_DIR,
  PRESENTS_DIR,
} from "./consts";
import AuthManager from "./AuthManager";
import { getDate } from "./file_ops";

const StorageManager = {
  /**
   * clears everything
   *
   */
  clear: () => localStorage.clear(),

  /**
   * stores array of subjects as string separated by ::
   * @param {Array<Object>} subjects List of subjects
   * @param {boolean} saveToCache whether to store it now and then store it in cloud
   */
  setSubjectList: async (subjects, saveToCache = false) => {
    if (saveToCache) {
      localStorage.setItem(SUBJECT_LIST_DIR, JSON.stringify(subjects));
    } else {
      console.log(subjects);
      await updateDoc(doc(db, USER_DIR, AuthManager.getUID()), {
        [SUBJECT_LIST_DIR]: subjects,
      });
    }
  },

  /**
   * Returns data.
   * @param {Function} callback
   */
  fetchData: async (callback) => {
    let uid = AuthManager.getUID();
    if (!uid) {
      callback(false);
      return;
    }
    try {
      const docSnap = await getDoc(doc(db, USER_DIR, uid));
      if (docSnap.exists()) {
        let data = docSnap.data();
        data["timetable"] = JSON.parse(data["timetable"]);
        callback(data);
      } else {
        callback(false);
      }
    } catch (err) {
      // couldnt retrieve possible
      console.trace(err);
      if (String(err).indexOf("permission-denied") < 0) alert(err);
    }
  },

  /**
   * Caches data in local storage
   * @param {Object} data
   */
  updateCache: (data) => {
    for (let key of Object.keys(data)) {
      localStorage.setItem(key, JSON.stringify(data[key]));
    }
  },

  /**
   *
   * @param {Array<Array<string>>} timetable
   * @param {Array<Object>} subjectList
   * @param {Object} subjectData
   * @param {number} startDate start date stored as millis
   * @param {number} endDate end date stored as millis
   * @param {Function} callback
   */
  initializeFields: (
    timetable,
    subjectList,
    subjectData,
    startDate,
    endDate,
    callback,
  ) => {
    let dat = {
      [TIMETABLE_DIR]: JSON.stringify(timetable),
      [SUBJECT_LIST_DIR]: subjectList,
      [SUBJECT_DATA_DIR]: subjectData,
      [START_DATE_DIR]: parseInt(startDate),
      [END_DATE_DIR]: parseInt(endDate),
    };
    try {
      let uid = AuthManager.getUID();

      setDoc(doc(db, USER_DIR, uid), dat).then(() => {
        const attendanceCollRef = collection(
          db,
          USER_DIR,
          uid,
          ATTENDANCE_DATA_DIR,
        );
        try {
          // checks if the subject attendance exists, if not it will create new one
          subjectList.forEach(async (subject, _) => {
            const docRef = doc(attendanceCollRef, String(subject.code));
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
              await setDoc(docRef, {
                [PRESENTS_DIR]: {},
                [NO_CLASS_DIR]: {},
              });
            }
          });
          callback(true);
        } catch (error) {
          console.error("Error checking or creating collection: ", error);
          callback(false);
        }
      });
    } catch (err) {
      console.error("couldn't post inital data", dat);
      callback(false);
    }
  },

  getSubjectListFromCache: () => {
    let subj_data = JSON.parse(localStorage.getItem(SUBJECT_LIST_DIR));
    return subj_data || [];
  },
  /**
   * Saves timetable
   * @param {Array<Array<string>>} timetable timetable
   * @param {boolean} saveToCache whether to store it now and then store it in cloud
   */
  setTimeTable: (timetable, saveToCache = false) => {
    timetable = JSON.stringify(timetable);
    if (saveToCache) {
      localStorage.setItem(TIMETABLE_DIR, timetable);
    } else {
      console.log(timetable);
      setDoc(
        doc(db, USER_DIR, AuthManager.getUID()),
        {
          [TIMETABLE_DIR]: timetable,
        },
        { merge: true },
      );
    }
  },

  /**
   * Saves subjects data
   * @param {Array<Array<string>>} subj_data subjects array
   * @param {boolean} saveToCache whether to store it now and then store it in cloud
   */
  setSubjectData: async (subj_data, saveToCache = false) => {
    if (saveToCache) {
      localStorage.setItem(SUBJECT_DATA_DIR, subj_data);
    } else {
      await setDoc(
        doc(db, USER_DIR, AuthManager.getUID()),
        {
          [SUBJECT_DATA_DIR]: subj_data,
        },
        { merge: true },
      );
    }
  },

  getSubjectDataFromCache: () => {
    return JSON.parse(localStorage.getItem(SUBJECT_DATA_DIR));
  },

  /**
   * @param {Function} callback
   */
  getTimeTable: async (callback) => {
    const docSnap = await getDoc(doc(db, USER_DIR, AuthManager.getUID()));
    if (docSnap.exists()) {
      callback(JSON.parse(docSnap.data().timetable));
    } else {
      callback(TIMETABLE_EMPTY);
    }
  },

  getTimeTableFromCache: () => {
    return JSON.parse(localStorage.getItem(TIMETABLE_DIR)) || TIMETABLE_EMPTY;
  },

  getAttendanceData: async (callback) => {
    const obj = {
      [PRESENTS_DIR]: {},
      [NO_CLASS_DIR]: {},
    };
    try {
      const attendanceCollRef = collection(
        db,
        USER_DIR,
        AuthManager.getUID(),
        ATTENDANCE_DATA_DIR,
      );
      const collSnap = await getDocs(attendanceCollRef);
      if (!collSnap.empty) {
        collSnap.forEach((doc) => {
          obj[PRESENTS_DIR][doc.id] = doc.data()[PRESENTS_DIR];
          obj[NO_CLASS_DIR][doc.id] = doc.data()[NO_CLASS_DIR];
        });
      }
    } catch (err) {
      alert("Couldn't fetch attendance data");
      console.error("error reading document, returning {}", err);
    }

    // cache
    localStorage.setItem("attendance", JSON.stringify(obj));
    callback(obj);
  },

  setAttendanceData: (code, newAttendance, callback = () => {}) => {
    try {
      const topLevelRef = doc(db, USER_DIR, AuthManager.getUID());
      let toplevel = StorageManager.getSubjectDataFromCache();
      toplevel[code] = newAttendance;
      updateDoc(topLevelRef, {
        [SUBJECT_DATA_DIR]: toplevel,
      })
        .then(() =>
          StorageManager.updateAttendanceColl(code, newAttendance, callback),
        )
        .catch((err) => {
          callback(false);
          console.error("Failed to update status: ", err);
        });
    } catch (err) {
      callback(false);
      console.error("Failed to update status: ", err);
    }
  },

  updateAttendanceColl: (code, newAttendance, callback) => {
    const attendanceCollRef = doc(
      db,
      USER_DIR,
      AuthManager.getUID(),
      ATTENDANCE_DATA_DIR,
      code,
    );
    let date = getDate(newAttendance.lastUpdate);

    // append present list
    switch (newAttendance.lastStatus) {
      case "Present":
        updateAttendance(PRESENTS_DIR);
        break;
      case "No Class":
        updateAttendance(NO_CLASS_DIR);
        break;
      default:
        callback(true);
    }
    function updateAttendance(dir) {
      updateDoc(attendanceCollRef, {
        // https://stackoverflow.com/a/49151326/13265356
        [`${dir}.${date}`]: arrayUnion(newAttendance.lastUpdate),
      }).then(() => {
        callback(true);
      });
    }
  },

  /**
   * Directly sets a key:value pair to localstorage
   * @param {string} key
   * @param {string} value
   */
  setCache: (key, value) => {
    localStorage.setItem(key, value);
  },
  /**
   * retrieves from localstorage
   * @param {string} key
   * @returns {string}
   */
  getCache: (key) => localStorage.getItem(key),
};

export default StorageManager;
