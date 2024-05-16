import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles/form.css";
import AuthManager from './methods/AuthManager';

export const FormView = ({ setLoginState }) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [passwordSame, setPasswordSame] = useState(true);
	const [emailInvalidMessage, setEmailInalidMessage] = useState("");
	const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
	const toggleVisibility = () => {
		setIsSignUp(!isSignUp);
	};

	function signUpCallback(success, errorCode = "", errorMessage = "") {
		if (success) {
			setLoginState(true, true);
		} else {
			console.log(errorCode);
			switch (errorCode) {
				case "auth/invalid-email":
					setEmailInalidMessage("Invalid email");
					break;
				case "auth/invalid-password":
					setPasswordInvalidMessage("Invalid password");
					break;
				case "auth/email-already-in-use":
					setEmailInalidMessage("Email already in use");
					break;
				default:
					alert(errorMessage);
			}
		}
	}
	const validateEmail = (evt) => {
		const email = evt.target?.value || "";
		setEmailInalidMessage(AuthManager.validateEmail(email));
	}

	const validatePassword = (evt) => {
		const password = evt.target?.value || "";
		setPasswordInvalidMessage(
			AuthManager.validatePassword(password)
		);
	}

	function submit(event) {
		event.preventDefault();
		var inputs = event.target.querySelectorAll("input");
		var email = inputs[0].value;
		var password = inputs[1].value;
		if (isSignUp) {
			var confirmPassword = inputs[2].value;
			if (password !== confirmPassword) {
				setPasswordSame(false);
			} else if (
				passwordInvalidMessage == "" &&
				emailInvalidMessage == ""
			) {
				setPasswordSame(true);
				AuthManager.signUp(email, password, signUpCallback);
			}
		} else {
			if (AuthManager.login(email, password)) {
				setLoginState(true, false);
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
			<Form onSubmit={submit} style={{
				flexStart:"start"
			}}>
				<h1>{isSignUp ? "Sign Up" : "Login"}</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label className='input-label'>Email address</Form.Label>
					<Form.Control onBlur={validateEmail} type="email" placeholder="Enter email" />
					<p style={{ color: 'red' }}>{emailInvalidMessage}</p>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label className='input-label'>Password</Form.Label>
					<Form.Control onBlur={validatePassword} type="password" placeholder="Password" />
					<p style={{ color: 'red' }}>{passwordInvalidMessage}</p>
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