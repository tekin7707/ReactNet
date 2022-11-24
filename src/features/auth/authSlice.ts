import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginModel, UserModel } from "../../models/loginmodel";
import authApi from "../../services/authApi";
import authService from "../../services/authService";

const _token: any = authService.getLocalToken();
const _user: any = authService.getLocalUser();

const initialState = {
  user: _user ? _user : null,
  token: _token ? _token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

export const login = createAsyncThunk(
  "auth/loginAsync",
  async (user: LoginModel, thunkAPI) => {
    try {
      return await authApi.loginAsync(user);
    } catch (error: any) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.error_description
          ? error.response.data.error_description
          : error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUserAsync",
  async (_token: string, thunkAPI) => {
    try {
      return await authApi.getUserAsync(_token);
    } catch (error: any) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.error_description
          ? error.response.data.error_description
          : error.toString();
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder //createAsyncThunk buradan geliyor
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload);
        
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
