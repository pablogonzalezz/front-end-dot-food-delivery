export const TOKEN_KEY = "@dotfootdelivery-Token"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getLogin = () => localStorage.getItem("login");
export const login = (token, login) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("login", login);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("login");
};
