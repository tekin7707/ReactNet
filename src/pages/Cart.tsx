import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Table } from "reactstrap";
import { AppDispatch, RootState } from "../app/store";
import { removeFromCart, getTotals } from "../features/cart/cartSlice";
import { getCatalog, getCatalogs } from "../features/category/categorySlice";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const cart = useSelector((state: RootState) => state.cart);

  const [cartItemList, setCartItemList] = useState(cartItems);

  useEffect(() => {
    console.log("useEffect");

    dispatch(getCatalogs(0)).then((x: any) => {
      if ((x?.payload?.data?.length ?? 0) > 0) {
        const _catalogs = x.payload.data;
        const newArray = cartItems.map((item: any) => {
          let existingIndex = _catalogs.findIndex((x: any) => x.id === item.id);
          return { ...item, thumbUrl: _catalogs[existingIndex]?.thumbUrl };
        });
        setCartItemList(newArray);
      }
    });
    dispatch(getTotals());
  }, [cart, cartItems, dispatch]);

  return (
    <>
      <div className="mb-3">
        <div className="form-control">Cart items</div>
      </div>
      <div className="mb-3">
        <div className="form-control">
          <button className="btn btn-primary pull-right" onClick={()=>{     
            navigate("/checkout")
          }}>Checkout</button>
        </div>
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
              {cartItemList.map((x: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <th> <img src={x?.thumbUrl ?? ""} width="120px"/> </th>
                  <td style={{ float: "left" }}>{x.name}</td>
                  <td>{x.quantity}</td>
                  <td style={{ float: "right" }}>{x.unitprice}</td>
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
              {cartItemList.length > 0 ? (
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
