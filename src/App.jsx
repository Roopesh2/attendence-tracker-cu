import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import AuthManager from "./methods/AuthManager";
import AddSubjects from "./user_creation/AddSubjects";

function App() {
	const [isLogged, _setLoginState] = useState(AuthManager.isLoggedIn());
	const [isSignUp, _setIsSignUp] = useState(false);

	/**
	 * 
	 * @param {boolean} state whether successful or not
	 * @param {boolean} isSignUp
	 */
	function setLoginState(state, isSignUp) {
		_setLoginState(state);
		_setIsSignUp(isSignUp);
	}
	return (
		<>
		<div className="max-width">
			{isLogged ?
				isSignUp ? 
					<AddSubjects />
				: <Homepage setLoginState={setLoginState} />
				:
				<FormView setLoginState={setLoginState} />
			}
		</div>
		</>
	);
}

export default App;
