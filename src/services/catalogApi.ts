import axios from "axios";
import { CategoryModel } from "../models/categoyModel";
const qs = require("qs");

const API_URL = "http://localhost:5000/services/Catalog/";

const GetCatalogListAsync = async (categoryId: number=0) => {
  var config = {
    method: "get",
    url: API_URL + "catalogs"+(categoryId>0?("/GetAllByCategoryId/"+categoryId):""),
  };

  const response = await axios(config);

  return response.data;
};

const GetCategoryListAsync = async () => {
  var config = {
    method: "get",
    url: API_URL + "categories",
  };

  const response = await axios(config);

  return response.data;
};

const createCategoryAsync = async (category: CategoryModel, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "categories", category, config);

  return response.data;
};

const catalogApi = {
  createCategoryAsync,
  GetCatalogListAsync,
  GetCategoryListAsync,
};

export default catalogApi;
