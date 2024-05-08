import { useState } from 'react';
import './App.css'
import { FormView } from './form'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
	const [isLogged, _setLoginState] = useState(checkLoginFromCache());
	function setLoginState(state) {
		_setLoginState(state);
		localStorage.setItem("isLogged", state)
	}
	return (
		<>
			{isLogged ? <p>Hello</p>: <FormView setLoginState={setLoginState}/>}
		</>
	)
}

function checkLoginFromCache() {
	return localStorage.getItem("isLogged");
}
export default App
