const USER_DIR = "user_data",
  SUBJECT_LIST_DIR = "subject_list",
  TIMETABLE_DIR = "timetable",
  SUBJ_EMPTY = [{ name: "", code: "" }],
  TIMETABLE_EMPTY = Array(5)
    .fill()
    .map(() => Array(6).fill("")),
  POPUP_BOX_SHADOW = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  SUBJECT_DATA_DIR = "subject_data",
  PRESENTS_DIR = "presents",
  NULL_ATT_STATUS = {
    presents: 0,
    total: 0,
    lastUpdate: undefined,
    lastStatus: "",
  },
  SUBJ_HOUR_INDEX_LOOKUP = {
    9: 0,
    10: 1,
    11: 2,
    13: 3,
    14: 4,
    15: 5,
  };

export {
  USER_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
  SUBJ_EMPTY,
  TIMETABLE_EMPTY,
  POPUP_BOX_SHADOW,
  SUBJECT_DATA_DIR,
  PRESENTS_DIR,
  NULL_ATT_STATUS,
  SUBJ_HOUR_INDEX_LOOKUP
};
