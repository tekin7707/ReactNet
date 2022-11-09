import axios from "axios";

const API_BASE_URL = "http://localhost:5000/services/";

const checkOutAsync = async (cart: any, user: any) => {
  console.log(user, cart);
  return "OK";
};

const getOrdersAsync = async () => {
    console.log("getOrdersAsync");
    
  var config = {
    method: "get",
    url: API_BASE_URL + "Reservations",
    headers: {},
  };

  const response = await axios(config);
  return response.data;
};

const getOrderAsync = async (id: any) => {
  var config = {
    method: "get",
    url: API_BASE_URL + "Reservations/" + id,
    headers: {},
  };
  const response = await axios(config);
  return response.data;
};

const deleteOrderAsync = async (id: any) => {
  var config = {
    method: "delete",
    url: API_BASE_URL + "Reservations/" + id,
    headers: {},
  };
  const response = await axios(config);
  return response.data;
};

const addOrderAsync = async (order: any) => {
  var data = JSON.stringify(order);

  var config = {
    method: "post",
    url: API_BASE_URL + "Reservations",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};

const checkoutApi = { checkOutAsync,getOrdersAsync,getOrderAsync };
export default checkoutApi;
