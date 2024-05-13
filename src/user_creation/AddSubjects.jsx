import { Button } from "react-bootstrap";
import Subjectfield from "../Subjectfield";
import { useState } from "react";
import StorageManager from "../methods/StorageManager";

function AddSubjects({ next }) {

	const [components, setComponents] = useState([{}]);
	const [addedSubjects, setAddedSubjects] = useState(true);
	const handleAdd = () => {
		setComponents(prevComponents => [...prevComponents, {}]);
	};
	const handleDelete = (index) => {
		if (components.length > 1) {
			setComponents(prevComponents => prevComponents.filter((component, i) => i !== index));
		}
	};

	const handleNext = () => {
		let subjectFields = document.querySelectorAll(".subjects-container input");
		let subjects = [];
		for (let inputElement of subjectFields) {
			let subject = inputElement.value.trim();
			if (subject.length > 0) {
				subjects.push(subject);
			}
		}
		if (subjects.length > 0) {
			StorageManager.setSubjects(subjects);
			next();
		} else {
			setAddedSubjects(false);
		}
	}
	return (
		<div className="max-width subjects-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<form style={{ border: '1px solid black', padding: '20px' }}>
				<h2 style={{ textAlign: 'center' }}>Add Subjects</h2>
				{components.map((component, index) => (
					<Subjectfield key={index} onDelete={() => handleDelete(index)} />
				))}
				{addedSubjects ? "" : <p>Please add Subjects</p>}

				<Button onClick={handleAdd}>Add Subject</Button>
				<Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleNext}>Next</Button>
			</form>
		</div>
	);
}
export default AddSubjects;
