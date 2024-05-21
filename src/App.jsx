import { useEffect, useState } from "react";
import "./styles/app.css";
import { FormView } from "./Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import AuthManager from "./methods/AuthManager";
import DataInitiation from "./user_creation/DataInitiation";

function App() {
  const [isLogged, _setLoginState] = useState("");
  const [isSignUp, _setIsSignUp] = useState(false);

  useEffect(() => {
    AuthManager.onAuthStateChanged((usr) => {
      if (usr) {
        _setLoginState(true);
      } else {
        _setLoginState(false);
      }
    });
  }, []);
  /**
   *
   * @param {boolean} loginState whether successful or not
   * @param {boolean} isSignUp
   */
  function setLoginState(loginState, isSignUp) {
    if (!loginState) AuthManager.logOut();
    _setLoginState(loginState);
    _setIsSignUp(isSignUp);
  }

  return (
    <>
      <div className="max-width">
        {isLogged === "" ? (
          <p>Loading</p>
        ) : isLogged ? (
          isSignUp ? (
            <DataInitiation setSignup={() => setLoginState(true, false)} />
          ) : (
            <Homepage setLoginState={setLoginState} />
          )
        ) : (
          <div className="center-container">
            <div className="left">
              <h1 style={{color:"white",fontSize:"100px",paddingRight:"250px",margin:"2rem",maxWidth:"500px"}}>Welcome</h1>
              <img src="../public/logo.png" width="400px"/>
            </div>
            <div className="right">
              <h1 className="tagline">Track Well</h1>
              <FormView setLoginState={setLoginState} />
            </div>
          </div>
        )}
      </div>
      {/* <DataInitiation setSignup={() => setLoginState(true, false)}/> */}
    </>
  );
}

export default App;
