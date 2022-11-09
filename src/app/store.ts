import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice"
import orderReducer from "../features/order/orderSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category:categoryReducer,
    cart:cartReducer,
    order : orderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
