import { Button } from "react-bootstrap";

const Header = ({ signout } = props) =>
	<header>
		<h1>Attendence Report</h1>
		<Button onClick={signout} variant="outline-dark">
			Sign Out
		</Button>
	</header>
export default Header;