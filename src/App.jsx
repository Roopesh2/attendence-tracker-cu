import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";

function App() {
	const [isLogged, _setLoginState] = useState(checkLoginFromCache());
	function setLoginState(state) {
		_setLoginState(state);
		localStorage.setItem("isLogged", state);
		// if (!state) localStorage.clear();
	}
	return (
		<>
			{isLogged ?
				<Homepage setLoginState={setLoginState} />
				:
				<FormView setLoginState={setLoginState} />
			}
		</>
	);
}

function checkLoginFromCache() {
	return localStorage.getItem("isLogged");
}
export default App;
