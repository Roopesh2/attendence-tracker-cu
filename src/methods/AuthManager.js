
/**
 * Manages user auth states
 */
const AuthManager = {
	/**
   * Returns whether use has logged in or not
   * @returns {boolean}
   */
  isLoggedIn: () => {
    return localStorage.getItem("isLogged");
  },

  /**
   * Marks user as logged out
   */
  logOut: () => {
    localStorage.setItem("isLogged", false);
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
  login: (email, password) => {
    let matches = localStorage.getItem('email') == email.trim() &&
      localStorage.getItem('password') == password.trim();
		if (matches) {
			AuthManager.setLoggedIn();
			return true;
		}
		return false;
  },
  
  /**
   * Signs Up the user
   * @param {string} email 
   * @param {string} password 
   */
  signUp: (email, password) => {
    localStorage.setItem('email', email.trim());
    localStorage.setItem('password', password.trim());
    AuthManager.setLoggedIn();
  },

	clearLoginStates: () => {
		localStorage.removeItem("email");
		localStorage.removeItem("password");
		localStorage.removeItem("isLogged");
	}

}

export default AuthManager;