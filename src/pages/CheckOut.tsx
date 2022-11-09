import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { CheckoutUserModel } from "../models/cartModel";
import checkoutApi from "../services/checkoutApi"
export default function CheckOut() {
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.userName);
  const [surname, setSurname] = useState(user?.userName);
  const [address, setAddress] = useState(user?.address);

  useEffect(() => {
    console.log(user);
    if(!user)
    navigate("/login");
  }, [user]);

  return (
    <>
      <div className="mb-3">
        <div className="form-control">Check out {user?.email}</div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <button
            className="btn btn-primary pull-right"
            onClick={() => {
              let _user: CheckoutUserModel = {
                name: name,
                surname: surname,
                email: "",
              };
              checkoutApi.checkOutAsync(_user,cart.cartItems).then((response)=>{
                console.log(response);
                
              })  
            }}
          >
            Checkout
          </button>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
            value={name ?? ""}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
            name="surname"
            value={surname ?? ""}
            onChange={(e: any) => setSurname(e.target.value)}
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            aria-label="Address"
            name="address"
            value={address ?? ""}
            onChange={(e: any) => setAddress(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
