import axios from "axios";
import jwtDecode from "jwt-decode";
import { addItem, getItem, removeItem } from "./LocaleStorage";

export function HasAuthentificated() {
  const token = getItem("evanetvousToken");
  const result = {
    tokenData: tokenIsValid(token),
  };
  console.log(token);

  if (result.tokenData === result) {
    removeItem("evanetvousToken");
  }
  return result;
}

export async function login(credentials) {
  return await axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then((response) => {
      console.log(response);
      addItem("evanetvousToken", response.data.token);
      return response.data.token;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function logout() {
  removeItem("evanetvousToken");
}

function tokenIsValid(token) {
  if (!token) {
    return undefined;
  }

  const tokenDecoded = jwtDecode(token);
  console.log(tokenDecoded);

  if (tokenDecoded.exp * 1000 > new Date().getTime()) {
    return tokenDecoded;
  }
  return undefined;
}
