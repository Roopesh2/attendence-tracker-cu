const USER_DIR = "user_data",
  SUBJECT_LIST_DIR = "subject_list",
  TIMETABLE_DIR = "timetable",
  SUBJ_EMPTY = [{ name: "", code: "" }],
  TIMETABLE_EMPTY = Array(5)
    .fill()
    .map(() => Array(6).fill("")),
  POPUP_BOX_SHADOW = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";

export {
  USER_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
  SUBJ_EMPTY,
  TIMETABLE_EMPTY,
  POPUP_BOX_SHADOW
};
