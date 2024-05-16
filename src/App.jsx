import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import AuthManager from "./methods/AuthManager";
import DataInitiation from "./user_creation/DataInitiation";

function App() {
	const [isLogged, _setLoginState] = useState(AuthManager.isLoggedIn());
	const [isSignUp, _setIsSignUp] = useState(false);

	/**
	 * 
	 * @param {boolean} loginState whether successful or not
	 * @param {boolean} isSignUp
	 */
	function setLoginState(loginState, isSignUp) {
		_setLoginState(loginState);
		if (loginState) AuthManager.setLoggedIn(); else AuthManager.logOut();
		_setIsSignUp(isSignUp);
	}

	return (
		<>
			<div className="max-width">
				{isLogged ?
					isSignUp ?
						<DataInitiation setSignup={() => setLoginState(true, false)} />
						: <Homepage setLoginState={setLoginState} />
					:
					<FormView setLoginState={setLoginState} />
				}
			</div>
			{/* <DataInitiation setSignup={() => setLoginState(true, false)}/> */}
		</>
	);
}

export default App;
