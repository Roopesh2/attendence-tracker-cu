import { Button } from "react-bootstrap";
import Subjectfield from "../Subjectfield";
import { useState } from "react";

function AddSubjects({ next }) {

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
		<div className="max-width" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<form style={{ border: '1px solid black', padding: '20px' }}>
				<h2 style={{ textAlign: 'center' }}>Add Subjects</h2>
				{components.map((component, index) => (
					<Subjectfield key={index} onDelete={() => handleDelete(index)} />
				))}
				<Button onClick={handleAdd}>Add Subject</Button>
				<Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Next</Button>
			</form>
		</div>
	);
}
export default AddSubjects;
