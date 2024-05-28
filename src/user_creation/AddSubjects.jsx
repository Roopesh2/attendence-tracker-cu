import { Button } from "react-bootstrap";
import Subjectfield from "../components/Subjectfield";
import { useState } from "react";
import StorageManager from "../methods/StorageManager";
import { SUBJ_EMPTY } from "../methods/consts";

function AddSubjects({ next, close }) {
  const _cache = StorageManager.getSubjectListFromCache();
  const [inputFields, setInputFields] = useState(
    _cache.length ? _cache : SUBJ_EMPTY,
  );
  let [focusedInput, setFocusedInput] = useState(0);
  const [error, setError] = useState("");
  const handleAdd = () => {
    setInputFields((prevComponents) => [...prevComponents, ""]);
    setFocusedInput(++focusedInput);
  };

  const handleDelete = (index) => {
    if (inputFields.length > 1) {
      setInputFields((prevComponents) =>
        prevComponents.filter((_, i) => i !== index),
      );
    } else {
      getInputElements()[0][0].value = "";
      getInputElements()[1][0].value = "";
    }
  };

  const getInputElements = () => [
    document.querySelectorAll(".subjects-container .subject-code-input"),
    document.querySelectorAll(".subjects-container .subject-name-input"),
  ];
  const handleNext = () => {
    let subjectFields = getInputElements();
    let subjectCodes = subjectFields[0];
    let subjectNames = subjectFields[1];
    let subjects = [];
    let codes = [];
    for (let i = 0; i < subjectCodes.length; i++) {
      let code = subjectCodes[i].value.trim();
      let name = subjectNames[i].value.trim();
      if (code.length > 0) {
        if (codes.indexOf(code) > -1) {
          // collision
          setError("Subject codes must be unique");
          return;
        }
        codes.push(code);
        subjects.push({ code, name });
      }
    }
    if (subjects.length > 0) {
      StorageManager.setSubjectList(subjects, true);
      next();
    } else {
      setError("Please add subjects");
    }
  };
  return (
    <div
      className="max-width subjects-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleAdd();
        }}
      >
        <div className="heading">
          <h2>Add Subjects</h2>
          <Button onClick={close} className="btn-close"></Button>
        </div>
        <div
          style={{
            overflow: "scroll",
          }}
        >
          {inputFields.map((value, index) => (
            <Subjectfield
              key={index}
              value={value}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
        <p className="wrong">{error}</p>
        <Button onClick={handleAdd}>Add Subject</Button>
        <Button variant="outline-primary" onClick={handleNext}>
          Next
        </Button>
      </form>
    </div>
  );
}
export default AddSubjects;
