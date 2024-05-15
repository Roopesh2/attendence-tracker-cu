import { useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import TimeTable from "./user_creation/TimeTable";
import AuthManager from "./methods/AuthManager";
import AddSubjects from "./user_creation/AddSubjects";
import DataInitiation from "./user_creation/DataInitiation";
import FirebaseApp from "./methods/firebase";

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
					<div class="center-container">
  					<h1 class="tagline">Go.Track.Leave</h1>
					<FormView setLoginState={setLoginState} />
					</div>
					
				}
			</div>
			{/* <DataInitiation setSignup={() => setLoginState(true, false)}/> */}
		</>
	);
}

export default App;
