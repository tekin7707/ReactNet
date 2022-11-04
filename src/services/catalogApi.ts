import axios from "axios";
import { CatalogModel, CategoryModel } from "../models/categoyModel";
var FormData = require("form-data");

const API_BASE_URL = "http://localhost:5000/services/";
const API_URL = API_BASE_URL + "Catalog/";

const GetCatalogAsync = async (id: number = 0) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "catalogs" +
      (id > 0 ? "/" + id : ""),
  };

  const response = await axios(config);

  return response.data;
};

const GetCatalogListAsync = async (categoryId: number = 0) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "catalogs" +
      (categoryId > 0 ? "/GetAllByCategoryId/" + categoryId : ""),
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

const deleteCategoryAsync = async (id: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "categories/" + id, config);

  return response.data;
};

const createCatalogAsync = async (catalog: CatalogModel, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "catalogs", catalog, config);

  return response.data;
};

const deleteCatalogAsync = async (id: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "catalogs/" + id, config);

  return response.data;
};

const updateCatalogAsync = async (catalog: CatalogModel, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "catalogs", catalog, config);

  return response.data;
};

const uploadPhotoAsync = async (photo: any, token: string) => {
  var data = new FormData();
  data.append("photo", photo);

  var config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  const response = await axios.post(
    API_BASE_URL + "photo/photos",
    data,
    config
  );

  return response.data;
};

const catalogApi = {
  createCatalogAsync,
  deleteCatalogAsync,
  updateCatalogAsync,
  createCategoryAsync,
  deleteCategoryAsync,
  GetCatalogAsync,
  GetCatalogListAsync,
  GetCategoryListAsync,
  uploadPhotoAsync,
};

export default catalogApi;
