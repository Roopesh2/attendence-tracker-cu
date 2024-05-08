import { useState } from 'react';
import './App.css'
import { FormView } from './form'
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './home';

function App() {
	const [isLogged, _setLoginState] = useState(checkLoginFromCache());
	function setLoginState(state) {
		_setLoginState(state);
		localStorage.setItem("isLogged", state)
	}
	return (
		<>
			{isLogged ? <Homepage />: <FormView setLoginState={setLoginState}/>}
			
		</>
	)
}

function checkLoginFromCache() {
	return localStorage.getItem("isLogged");
}
export default App
