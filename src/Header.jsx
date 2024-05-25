import Button from "react-bootstrap/Button";
import "./styles/header.css";
const Header = ({ signout, editFields } = props) => (
  <header>
    <h1>Attendance Report</h1>

    <div className="flex-inline-container">
      <Button onClick={editFields} variant="outline-dark">
        Edit subjects
      </Button>

      <Button onClick={signout} variant="outline-dark">
        Sign Out
      </Button>
    </div>
  </header>
);
export default Header;
