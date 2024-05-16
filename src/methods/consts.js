const USER_DIR = "user_data",
  SUBJECT_LIST_DIR = "subject_list",
  TIMETABLE_DIR = "timetable",
  SUBJ_EMPTY = [{ name: "", code: "" }],
  TIMETABLE_EMPTY = Array(days.length)
    .fill()
    .map(() => Array(hours.length).fill(""));

export {
  USER_DIR,
  SUBJECT_LIST_DIR,
  TIMETABLE_DIR,
  SUBJ_EMPTY,
  TIMETABLE_EMPTY,
};
