import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Addcomponent({ onDelete }) {
    return (
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <Button variant="link" onClick={onDelete}>X</Button>
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
    );
}

export default Addcomponent 