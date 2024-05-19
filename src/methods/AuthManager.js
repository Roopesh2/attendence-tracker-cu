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

  onAuthStateChanged: (fx) => {
    getAuth().onAuthStateChanged(fx)
  },
  /**
   * checks if use has logged in or not.
   * @returns {boolean}
   */
  isLoggedIn: () => {
    return AuthManager.getUID() != "";
  },

  /**
   * Marks user as logged out
   */
  logOut: () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
        alert("couldnt sign out" + error);
      });
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

  /**
   *
   * @param {string} uid
   */
  setUID: (uid) => {
    localStorage.setItem("uid", uid);
  },

  /**
   *
   * @param {Function} callback
   * @return {string}
   */
  getUID: () => {
    return getAuth().currentUser?.uid || "";
  },
};

export default AuthManager;
