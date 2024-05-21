import { FormView } from "./Form";

export function LoginScreen(setLoginState) {
  return <div className="center-container">
    <div className="left">
      <h1 style={{ color: "white", fontSize: "100px", paddingRight: "250px", margin: "2rem", maxWidth: "500px" }}>Welcome</h1>
      <img src="../public/logo.png" width="400px" />
    </div>
    <div className="right">
      <h1 className="tagline">Track Well</h1>
      <FormView setLoginState={setLoginState} />
    </div>
  </div>;
}

