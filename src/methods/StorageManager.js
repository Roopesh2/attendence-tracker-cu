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
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {
  SUBJECT_LIST_DIR,
  SUBJ_EMPTY,
  TIMETABLE_DIR,
  TIMETABLE_EMPTY,
  USER_DIR,
} from "./consts";
import AuthManager from "./AuthManager";

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
  setSubjects: async (subjects, saveToCache = false) => {
    if (saveToCache) {
      localStorage.setItem(SUBJECT_LIST_DIR, JSON.stringify(subjects));
    } else {
      await setDoc(
        doc(db, USER_DIR, AuthManager.getUID()),
        {
          subject_list: JSON.stringify(subjects),
        },
        { merge: true },
      );
    }
  },

  /**
   * Returns subjects entered.
   * @param {Function} callback
   */
  getSubjects: async (callback) => {
    let uid = AuthManager.getUID();
    if (!uid) {
      callback(false);
      return;
    }
    const docSnap = await getDoc(doc(db, USER_DIR, uid));
    if (docSnap.exists()) {
      let list = docSnap.data()[SUBJECT_LIST_DIR];
      callback(JSON.parse(list));
    } else {
      callback([]);
    }
  },

  getSubjectsFromCache: () => {
    return JSON.parse(localStorage.getItem(SUBJECT_LIST_DIR)) || SUBJ_EMPTY;
  },
  /**
   * Saves subjects data
   * @param {Array<Array<string>>} timetable subjects array
   * @param {boolean} saveToCache whether to store it now and then store it in cloud
   */
  setTimeTable: async (timetable, saveToCache = false) => {
    if (saveToCache) {
      localStorage.setItem(TIMETABLE_DIR, JSON.stringify(timetable));
    } else {
      await setDoc(
        doc(db, USER_DIR, AuthManager.getUID()),
        {
          timetable: JSON.stringify(timetable),
        },
        { merge: true },
      );
    }
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
    return JSON.parse(localStorage.getItem(TIMETABLE_DIR)) || [];
  },

  getAttendenceData: async (callback) => {
    try {
      const coll = collection(db, USER_DIR, AuthManager.getUID(), "absents");
      const collSnap = await getDocs(coll);
      const obj = {};
      if (!collSnap.empty) {
        try {
          collSnap.forEach((doc) => {
            obj[doc.id] = {
              subject: doc.id,
              data: doc.data(),
            };
          });
          callback(obj);
        } catch (error) {
          callback({});
          console.log(error);
        }
      } else {
        callback({});
        // console.log("no absent records", collSnap);
      }
    } catch (err) { }
  },

  setAttendenceData: async (arr, callback = () => {}) => {
    try {
      const coll = collection(db, USER_DIR, AuthManager.getUID(), "absents");
      const collSnap = await getDocs(coll);
      const obj = {};

      
    } catch (err) { }
  },
};

export default StorageManager;
