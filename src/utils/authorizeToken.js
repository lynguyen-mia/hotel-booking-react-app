import { Navigate } from "react-router-dom";

export function getToken() {
  // get token from local storage
  const tokenJSON = localStorage.getItem("token");
  const token = JSON.parse(tokenJSON);
  return token;
}

export function authorizeToken() {
  const token = getToken();
  if (!token) {
    return Navigate("/auth");
  }
  return null;
}
