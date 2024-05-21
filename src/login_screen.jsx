import { FormView } from "./Form";
import "./styles/login_screen.css";

export function LoginScreen({ setLoginState }) {
  return (
    <div className="center-container">
      <div className="left">
        <h1>Welcome</h1>
        <img src="../public/logo-2.png" width="400px" />
      </div>
      <div className="right">
        <h1 className="name">Track Well</h1>
        <FormView setLoginState={setLoginState} />
      </div>
    </div>
  );
}
