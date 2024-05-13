
/**
 * Manages user auth states
 */
const AuthManager = {
	/**
   * Returns whether use has logged in or not
   * @returns {boolean}
   */
  isLoggedIn: () => {
    localStorage.getItem("isLogged");
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
    return localStorage.getItem('email') == email.trim() &&
      localStorage.getItem('password') == password.trim();
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

}

export default AuthManager;