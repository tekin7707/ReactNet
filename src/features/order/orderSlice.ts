import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import checkoutApi from "../../services/checkoutApi";

const xdatas: any[] = [];

const initialState = {
  datas: xdatas,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.datas = action.payload;
      })
      .addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getOrders = createAsyncThunk<any, any, { state: RootState }>(
  "order/orders",
  async (id:any,thunkAPI) => {
    try {
        console.log("getOrders slice");
        
      return await checkoutApi.getOrdersAsync();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const { reset } = orderSlice.actions;
export default orderSlice.reducer;