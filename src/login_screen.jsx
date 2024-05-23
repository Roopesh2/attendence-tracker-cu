import { FormView } from "./Form";
import "./styles/login_screen.css";

export function LoginScreen({ setLoginState }) {
  return (
    <div className="login-container">
      <div className="app-details">
        <h2>Welcome</h2>
        <img src="../public/logo-2.png" />
      </div>
      <div className="login-form">
        <h1 className="app-name">Track Well</h1>
        <FormView setLoginState={setLoginState} />
      </div>
    </div>
  );
}
