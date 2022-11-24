import axios from "axios";
import { LoginModel } from "../models/loginmodel";
const qs = require("qs");

const API_TOKEN_URL = "https://localhost:5001/connect/";
const API_URL = "https://localhost:5001/api/user/";

const logout = () => {
  localStorage.removeItem("mttoken");
  localStorage.removeItem("mtuser");
};

const siteTokenAsync = async () => {
  var data = qs.stringify({
    client_id: "WebMvcClient",
    client_secret: "secret",
    grant_type: "client_credentials",
  });

  var config = {
    method: "post",
    url: API_TOKEN_URL + "token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const response = await axios(config);

  if (response.data) {
    localStorage.setItem("mttoken", JSON.stringify(response.data));
  }

  return response.data;
};

const loginAsync = async (loginData: LoginModel) => {
  var data = qs.stringify({
    client_id: "WebMvcClientForUser",
    client_secret: "secret",
    grant_type: "password",
    username: loginData.email,
    password: loginData.password,
  });

  var config = {
    method: "post",
    url: API_TOKEN_URL + "token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const response = await axios(config);

  if (response.data) {
    localStorage.setItem("mttoken", JSON.stringify(response.data));
  }

  return response.data;
};

const getUserAsync = async (_token: string) => {
  var data = qs.stringify({});
  var config = {
    method: "get",
    url: API_URL + "getuser",
    headers: {
      Authorization: "Bearer " + _token,
    },
    data: data,
  };

  const response = await axios(config);
 
  if (response.data) {
    localStorage.setItem("mtuser", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const authService = {
  siteTokenAsync,
  loginAsync,
  logout,
  getUserAsync,
};

export default authService;
