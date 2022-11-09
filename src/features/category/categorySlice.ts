import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { RootState } from "../../app/store";
import { CatalogModel, CategoryModel } from "../../models/categoyModel";
import { LoginModel } from "../../models/loginmodel";
import catalogApi from "../../services/catalogApi";

const xdatas: any[] = [];

const initialState = {
  datas: xdatas,
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
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.datas.push(action.payload);
        }
      )
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.datas=action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCatalogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCatalogs.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.datas=action.payload;
      })
      .addCase(getCatalogs.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(
        createCatalog.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.datas.push(action.payload);
        }
      )
      .addCase(createCatalog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(
        updateCatalog.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.datas.push(action.payload);
        }
      )
      .addCase(updateCatalog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getCatalogs = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("catalog/catalogs", async (categoryId: any, thunkAPI) => {
  try {
    return await catalogApi.GetCatalogListAsync(categoryId);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCatalog = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("catalog/catalogs", async (id: any, thunkAPI) => {
  try {
    return await catalogApi.GetCatalogAsync(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCatalog = createAsyncThunk<
  any,
  CatalogModel,
  { state: RootState }
>("catalog/createCatalog", async (catalog: CatalogModel, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.token.access_token;
    console.log(catalog, token);

    if (catalog.PhotoFormFile) {
      await catalogApi
        .uploadPhotoAsync(catalog.PhotoFormFile, token)
        .then((x) => {
          catalog.picture = x.data;
        });
    }

    return await catalogApi.createCatalogAsync(catalog, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCatalog = createAsyncThunk<
  any,
  CatalogModel,
  { state: RootState }
>("catalog/updateCatalog", async (catalog: CatalogModel, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.token.access_token;
    console.log(catalog, token);

    if (catalog.PhotoFormFile) {
      await catalogApi
        .uploadPhotoAsync(catalog.PhotoFormFile, token)
        .then((x) => {
          catalog.picture = x.data;
        });
    }

    return await catalogApi.updateCatalogAsync(catalog, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCatalog = createAsyncThunk<
  any,
  number,
  { state: RootState }
>("catalog/deleteCatalog", async (id: number, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.token.access_token;
    return await catalogApi.deleteCatalogAsync(id, token);
  } catch (error: any) {
    const mesaj =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(mesaj);
  }
});

export const getCategories = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("catalog/categories", async (_, thunkAPI) => {
  try {
    return await catalogApi.GetCategoryListAsync();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCategory = createAsyncThunk<
  any,
  CategoryModel,
  { state: RootState }
>("catalog/createCategory", async (category: CategoryModel, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.token.access_token;
    console.log(category, token);
    return await catalogApi.createCategoryAsync(category, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCategory = createAsyncThunk<
  any,
  number,
  { state: RootState }
>("catalog/deleteCategory", async (id: number, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.token.access_token;
    return await catalogApi.deleteCategoryAsync(id, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
