import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Subjectfield({ onDelete, value }) {

	return (
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">
				<Button variant="link" onClick={onDelete}>X</Button>
			</InputGroup.Text>
			<Form.Control
				placeholder="Subject code"
				aria-label="Subject code"
				aria-describedby="basic-addon1"
				className='subject-code-input'
				defaultValue={value.code}
				required
			/>
			<Form.Control
				placeholder="Name"
				aria-label="Subject name"
				className='subject-name-input'
				aria-describedby="basic-addon1"
				defaultValue={value.name}
				required
			/>
		</InputGroup>
	);
}

export default Subjectfield;