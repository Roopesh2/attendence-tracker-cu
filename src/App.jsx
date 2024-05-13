import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import TimeTable from "./TimeTable";
import AuthManager from "./methods/AuthManager";

function App() {
	const [isLogged, _setLoginState] = useState(AuthManager.isLoggedIn());
	function setLoginState(state) {
		_setLoginState(state);
	}
	return (
		<>
		{/* <div className="max-width">
			{isLogged ?
				<Homepage setLoginState={setLoginState} />
				:
				<FormView setLoginState={setLoginState} />
			}
		</div> */}
		<TimeTable />
		</>
	);
}

export default App;
