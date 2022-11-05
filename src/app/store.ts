import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category:categoryReducer,
    cart:cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
