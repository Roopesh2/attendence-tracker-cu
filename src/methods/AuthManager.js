import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * Manages user auth states
 */
const AuthManager = {
  /**
   * Returns whether use has logged in or not
   * @returns {boolean}
   */
  isLoggedIn: () => {
    return localStorage.getItem("isLogged") == "true";
  },

  /**
   * Marks user as logged out
   */
  logOut: () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.setItem("isLogged", false);
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
        alert("couldnt sign out" + error);
      });
  },

  /**
   * Marks user as logged in
   */
  setLoggedIn: () => {
    localStorage.setItem("isLogged", true);
  },

  /**
   * checks if user credentials matches
   * @param {string} email
   * @param {string} password
   * @returns {boolean}
   */
  login: (email, password, callback) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        AuthManager.setUID(user.uid);
        callback(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        callback(false, errorCode, errorMessage);
      });
    // let matches = localStorage.getItem('email') == email.trim() &&
    // 	localStorage.getItem('password') == password.trim();
    // if (matches) {
    // 	AuthManager.setLoggedIn();
    // 	return true;
    // }
    // return false;
  },

  /**
   * Signs Up the user
   * @param {string} email
   * @param {string} password
   * @param {Function} callback
   */
  signUp: (email, password, callback) => {
    // localStorage.setItem('email', email.trim());
    // localStorage.setItem('password', password.trim());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        AuthManager.setLoggedIn();
        // StorageManage
        AuthManager.setUID(user.uid);
        callback(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        callback(false, errorCode, errorMessage);
      });
  },
  /**
   *
   * @param {string} email
   * @returns {string}
   */
  validateEmail: (email) => {
    return /^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid Email";
  },

  /**
   *
   * @param {string} password
   * @returns {string}
   */
  validatePassword: (password) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (password.length < minLength) {
      return "Password must be at least " + minLength + " characters long";
    }
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!lowercaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!numberRegex.test(password)) {
      return "Password must contain at least one number";
    }
    if (!specialCharacterRegex.test(password)) {
      return "Password must contain at least one special character";
    }

    return "";
  },

  clearLoginStates: () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isLogged");
  },

  /**
   *
   * @param {string} uid
   */
  setUID: (uid) => {
    localStorage.setItem("uid", uid);
  },

  /**
   *
   * @return {string}
   */
  getUID: () => {
    return localStorage.getItem("uid");
  },
};

export default AuthManager;
