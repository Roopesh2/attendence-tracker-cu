import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles/form.css";
import AuthManager from './methods/AuthManager';

export const FormView = (props) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [passwordSame, setPasswordSame] = useState(true);
	const toggleVisibility = () => {
		setIsSignUp(!isSignUp);
	};

	function submit(event) {
		event.preventDefault();
		var inputs = event.target.querySelectorAll("input");
		var email = inputs[0].value;
		var password = inputs[1].value;
		if (isSignUp) {
			var confirmPassword = inputs[2].value;
			if (password !== confirmPassword) {
				setPasswordSame(false);
			} else {
				setPasswordSame(true);
				AuthManager.signUp(email, password);
				props.setLoginState(true);
			}

		} else {
			if (AuthManager.login(email, password)) {
				props.setLoginState(true);
			} else {
				alert("credentials doesn't match")
			}
		}
	}
	return (
		<div className="max-width center" style={{
				// backgroundImage: "url('../public/bakcground.png')",
				backgroundSize: "contain"
		}}>
			<Form onSubmit={submit}>
				<h1>{isSignUp ? "Sign Up" : "Login"}</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label className='input-label'>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label className='input-label'>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				{
					isSignUp &&
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label className='input-label'>Confirm password</Form.Label>
						<Form.Control type="password" placeholder="Confirm password" />
						{!passwordSame && <p style={{ color: 'red' }}>Password do not match!</p>}
					</Form.Group>
				}

				<Button variant="primary" type="submit">
					Submit
				</Button>
				<a>{isSignUp ? "Already" : "Don't"} have an account?
					<span style={{ fontWeight: 700 }} onClick={toggleVisibility}>{isSignUp ? " Login" : " Sign Up"}</span></a>
			</Form>
		</div>
	);
};