import { Button } from "react-bootstrap";
import Subjectfield from "../components/Subjectfield";
import { useEffect, useState } from "react";
import StorageManager from "../methods/StorageManager";
import { POPUP_BOX_SHADOW } from "../methods/consts";

function AddSubjects({ next, close }) {
  const [inputFields, setInputFields] = useState(StorageManager.getSubjectsFromCache());
  let [focusedInput, setFocusedInput] = useState(0);
  const [addedSubjects, setAddedSubjects] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const handleAdd = () => {
    setInputFields((prevComponents) => [...prevComponents, ""]);
    setFocusedInput(++focusedInput);
  };

  useEffect(() => {
    if (inputFields[0].code == "") {
      StorageManager.getSubjects((s) => {
        setInputFields(s);
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
    }
  }, [])

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
        style={{
          border: "0",
          boxShadow: POPUP_BOX_SHADOW,
          padding: "20px",
          maxHeight: "70vh"
        }}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleAdd();
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Subjects <Button variant="outline-primary" onClick={close}>X</Button></h2>
        {
          isLoading ? "Loading subjects..." : <div style={{
            overflow: "scroll",
          }}>
            {inputFields.map((value, index) => (
              <Subjectfield
                key={index}
                value={value}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>}
        {addedSubjects ? "" : <p>Please add Subjects</p>}

        <Button onClick={handleAdd}>Add Subject</Button>
        <Button
          variant="outline-primary"
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
