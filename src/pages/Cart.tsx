import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Table } from "reactstrap";
import { AppDispatch, RootState } from "../app/store";
import {
  removeFromCart,
  getTotals,
} from "../features/cart/cartSlice";
import { getCatalogs } from "../features/category/categorySlice";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const cart = useSelector((state: RootState) => state.cart);

  const cat = useSelector((state: RootState) => state.category);

  
  useEffect(() => { 
    dispatch(getTotals());
  }, [cart, dispatch]);
  
  return (
    <>
      <div className="mb-3">
        <div className="form-control">Cart items</div>
      </div>
      <div className="mb-3">
        <div className="form-control">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>picture</th>
                <th>name</th>
                <th>quantity</th>
                <th>unit price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((x: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <th>{x.id}</th>
                  <td style={{"float":"left"}}>{x.name}</td>
                  <td>{x.quantity}</td>
                  <td style={{"float":"right"}}>{x.unitprice}</td>
                  <td>
                    <Badge
                      className="warning"
                      onClick={() => {
                        dispatch(removeFromCart(x.id));
                      }}
                    >
                      X
                    </Badge>
                  </td>
                </tr>
              ))}
              {cartItems.length > 0 ? (
                <tr key="-1">
                  <td colSpan={5}>Total</td>
                  <td colSpan={1}>TL {cart.cartTotalAmount}</td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Cart;
