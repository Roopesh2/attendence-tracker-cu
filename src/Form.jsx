import { InputGroup } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./styles/form.css";
import AuthManager from "./methods/AuthManager";
import StorageManager from "./methods/StorageManager";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FormView = ({ setLoginState }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSame, setPasswordSame] = useState(true);
  const [emailInvalidMessage, setEmailInalidMessage] = useState("");
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const showPassHandler1 = () => {
    setShowPass1((prev) => !prev);
  };
  const showPassHandler2 = () => {
    setShowPass2((prev) => !prev);
  };
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmailInalidMessage("");
    setPasswordInvalidMessage("");
  };
  StorageManager.clear();
  const signUpCallback = (success, errorCode = "", errorMessage = "") => {
    setIsLoading(false);
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
          console.trace(errorCode, errorMessage);
      }
    }
  };
  const validateEmail = (evt) => {
    const email = evt.target?.value || "";
    setEmailInalidMessage(AuthManager.validateEmail(email));
  };

  const validatePassword = (evt) => {
    const password = evt.target?.value || "";
    setPasswordInvalidMessage(AuthManager.validatePassword(password));
  };

  function submit(event) {
    event.preventDefault();
    var inputs = event.target.querySelectorAll("input");
    var email = inputs[0].value || "";
    var password = inputs[1].value || "";
    if (isSignUp) {
      var confirmPassword = inputs[2].value;
      if (password !== confirmPassword) {
        setPasswordSame(false);
      } else if (passwordInvalidMessage == "" && emailInvalidMessage == "") {
        setPasswordSame(true);
        setIsLoading(true);
        AuthManager.signUp(email, password, signUpCallback);
      }
    } else {
      setIsLoading(true);
      AuthManager.login(email, password, (success, _) => {
        setIsLoading(false);
        if (success) {
          setLoginState(true, false);
        } else {
          setPasswordInvalidMessage("invalid login details");
        }
      });
    }
  }
  return (
    <Form onSubmit={submit}>
      <h1 className="heading">{isSignUp ? "Sign Up" : "Login"}</h1>
      <Form.Group className="mb-3 no-margin" controlId="formBasicEmail">
        <Form.Label className="input-label">Email address</Form.Label>
        <Form.Control
          onBlur={validateEmail}
          type="email"
          placeholder="Enter email"
          required
        />
        {emailInvalidMessage != "" ? (
          <p className="wrong">{emailInvalidMessage}</p>
        ) : (
          ""
        )}
      </Form.Group>

      <Form.Group className="mb-3 no-margin" controlId="formBasicPassword">
        <Form.Label className="input-label">Password</Form.Label>
        <InputGroup>
          <Form.Control
            onBlur={isSignUp ? validatePassword : () => {}}
            type={showPass1 ? "Text" : "password"}
            placeholder="Password"
            required
          />
          <InputGroup.Text onClick={showPassHandler1}>
            {showPass1 ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {passwordInvalidMessage != "" ? (
          <p className="wrong">{passwordInvalidMessage}</p>
        ) : (
          ""
        )}
      </Form.Group>
      {isSignUp && (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="input-label">Confirm password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPass2 ? "Text" : "password"}
              placeholder="Confirm password"
              required
            />
            <InputGroup.Text onClick={showPassHandler2}>
              {showPass2 ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          {!passwordSame && <p className="wrong">Password do not match!</p>}
        </Form.Group>
      )}

      <Button
        variant="outline-primary"
        type="submit"
        disabled={isLoading ? true : false}
      >
        {isLoading ? "Please wait.. " : "Submit"}
      </Button>
      <a>
        {isSignUp ? "Already" : "Don't"} have an account?
        <b onClick={toggleAuthMode}>{isSignUp ? " Login" : " Sign Up"}</b>
      </a>
    </Form>
  );
};
