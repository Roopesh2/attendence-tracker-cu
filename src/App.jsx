import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import TimeTable from "./TimeTable";

function App() {
	const [isLogged, _setLoginState] = useState(checkLoginFromCache());
	function setLoginState(state) {
		_setLoginState(state);
		localStorage.setItem("isLogged", state);
		// if (!state) localStorage.clear();
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

function checkLoginFromCache() {
	return localStorage.getItem("isLogged");
}
export default App;
