import { Button } from "react-bootstrap";
import Subjectfield from "../components/Subjectfield";
import { useState } from "react";
import StorageManager from "../methods/StorageManager";

function AddSubjects({ next }) {
  const [inputFields, setInputFields] = useState(
    StorageManager.getSubjectsFromCache(),
  );
  let [focusedInput, setFocusedInput] = useState(0);
  const [addedSubjects, setAddedSubjects] = useState(true);
  StorageManager.getSubjectsFromCache(setInputFields);
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
    for (let i = 0; i < subjectCodes.length; i++) {
      let code = subjectCodes[i].value.trim();
      let name = subjectNames[i].value.trim();
      if (code.length > 0) {
        subjects.push({ code, name });
      }
    }
    if (subjects.length > 0) {
      StorageManager.setSubjects(subjects, true);
      next();
    } else {
      setAddedSubjects(false);
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
        style={{ border: "1px solid black", padding: "20px" }}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleAdd();
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Subjects</h2>
        {inputFields.map((value, index) => (
          <Subjectfield
            key={index}
            value={value}
            onDelete={() => handleDelete(index)}
          />
        ))}
        {addedSubjects ? "" : <p>Please add Subjects</p>}

        <Button onClick={handleAdd}>Add Subject</Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleNext}
        >
          Next
        </Button>
      </form>
    </div>
  );
}
export default AddSubjects;
