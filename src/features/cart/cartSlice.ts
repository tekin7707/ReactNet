import { createSlice } from "@reduxjs/toolkit";

const localCartItems = localStorage.getItem("mtCartItems")
  ? JSON.parse(localStorage.getItem("mtCartItems") ?? "")
  : [];

const initialState = {
  cartItems: localCartItems,
  message: "first",
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (x: any) => x.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("mtCartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (x: any) => x.id === action.payload
      );
      console.log(action.payload);

      if (existingIndex >= 0) {
        let removeId = state.cartItems[existingIndex].id;
        const nextCartItems = state.cartItems.filter(
          (x: any) => removeId != x.id
        );
        state.cartItems = nextCartItems;
        console.log(nextCartItems);

        localStorage.setItem("mtCartItems", JSON.stringify(state.cartItems));
      }
    },
    getTotals(state) {
      let total = 0,
        quantity = 0;
      for (let index = 0; index < state.cartItems.length; index++) {
        const element = state.cartItems[index];
        quantity += element.quantity;
        total += element.unitprice * element.quantity;
      }

      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
