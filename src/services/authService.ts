
import { LoginModel, UserModel } from "../models/loginmodel";

const getLocalToken = () => {
  let token: LoginModel = {};
  let json = localStorage.getItem("mttoken") ?? "";
  if (json.length > 10) {
    token = JSON.parse(json);
    return token;
  }
  return null;
};

const getLocalUser = () => {
  let user: UserModel = {};
  let json = localStorage.getItem("mtuser") ?? "";
  if (json.length > 10) {
    user = JSON.parse(json);
    return user;
  }
  return null;
};

const logout=()=>{
  localStorage.removeItem("mttoken");
  localStorage.removeItem("mtuser");
}

const authService={
  getLocalToken,
  getLocalUser,
  logout 
}

export default authService
