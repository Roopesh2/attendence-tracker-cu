import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./form.css"

export const FormView = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const toggleVisibility = () => {
    setIsSignUp(!isSignUp);
  };
	return (
		<Form>
			<h1>{ isSignUp ? "Sign Up" : "Login" }</h1>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label className='input-label'>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label className='input-label'>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			{isSignUp && <Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label className='input-label'>Confirm password</Form.Label>
				<Form.Control type="password" placeholder="Confirm password" />
			</Form.Group>}
			
			<Button variant="primary" type="submit" onClick={submit()}>
				Submit
			</Button>
			<a>{isSignUp ? "Already": "Don't"} have an account?
			<span style={{fontWeight: 700}} onClick={toggleVisibility}>{isSignUp ? " Login" : " Sign Up"}</span></a>
		</Form>
	);
};