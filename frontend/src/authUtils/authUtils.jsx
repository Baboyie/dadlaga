// authUtils.js
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // returns true if token exists
  };
  