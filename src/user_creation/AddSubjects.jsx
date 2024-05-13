import Subjectfield from "../Subjectfield";

function AddSubjects ()  {

	const [components, setComponents] = useState([{}]);
	const handleAdd = () => {
	  setComponents(prevComponents => [...prevComponents, {}]);
	};
	const handleDelete = (index) => {
	  if (components.length > 1) {
		setComponents(prevComponents => prevComponents.filter((component, i) => i !== index));
	  }
	};
	
	return (
	  <div>
		{components.map((component, index) => (
		  <Subjectfield key={index} onDelete={() => handleDelete(index)} />
		))}
		<Button onClick={handleAdd}>Add Component</Button>
	  </div>
  ); 
}
export default AddSubjects;