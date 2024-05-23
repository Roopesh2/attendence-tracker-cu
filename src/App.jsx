import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Home";
import AuthManager from "./methods/AuthManager";
import DataInitiation from "./user_creation/DataInitiation";
import { LoginScreen } from "./login_screen";

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
          <LoginScreen setLoginState={setLoginState} />
        )}
      </div>
    </>
  );
}

export default App;
