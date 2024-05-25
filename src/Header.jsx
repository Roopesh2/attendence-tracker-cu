import Button from "react-bootstrap/Button";
import "./styles/header.css";

/**
 * 
 * @param {Object} param0 
 * @param {Function} param0.signout 
 * @param {Function} param0.editFields
 * @returns 
 */
const Header = ({ signout, editFields }) => (
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
