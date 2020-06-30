import { verifyJwt } from "./api";

export const TOKEN_KEY = "@dotfootdelivery-Token"

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

export const isAuthenticated = async () => {
  let isAuthenticated;
  await verifyJwt()
  .then(res => res.json())
  .then(data => {
    if (data.auth === false) {
      logout();
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
  })
  return isAuthenticated;
}