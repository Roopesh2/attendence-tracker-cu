import { useState } from "react";
import Subjectfield from "../Subjectfield";
import { Button } from "react-bootstrap";

function AddSubjects ({next})  {

	const [components, setComponents] = useState([{}]);
	const handleAdd = () => {
	  setComponents(prevComponents => [...prevComponents, {}]);
	};
	const handleDelete = (index) => {
	  if (components.length > 1) {
		setComponents(prevComponents => prevComponents.filter((component, i) => i !== index));
	  }
	};
	
	const handleNext = () => {
		let subjectFields = document.querySelector("#subjects-container").childNodes;
		console.log(subjectFields);
		next();
	}
	return (
	  <div>
			<div id="subjects-container">
				{components.map((component, index) => (
					<Subjectfield key={index} onDelete={() => handleDelete(index)} />
				))}
			</div>
		<Button onClick={handleAdd}>Add Component</Button>
		<hr />
		<Button onClick={handleNext}>Next</Button>
	  </div>
  ); 
}
export default AddSubjects;