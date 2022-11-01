import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoryModel } from "../../models/categoyModel";
import { LoginModel } from "../../models/loginmodel";
import catalogApi from "../../services/catalogApi";

const initialState = {
  datas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const createCategory = createAsyncThunk<any, CategoryModel,{ state: RootState}>(
  "catalog/categories",
  async (category, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token.access_token;
      return await catalogApi.createCategoryAsync(category, token);
    } catch (error: any) {
      const mesaj =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(mesaj);
    }
  }
);

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
