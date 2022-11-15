import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Spinner, Table } from "reactstrap";
import { AppDispatch, RootState } from "../app/store";
import { getOrders, reset } from "../features/order/orderSlice";

function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { datas, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.order
  );

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    console.log("useEffect");

    if (isError) {
      console.log(message);
    }

    if(isSuccess){
      console.log("isLoading");
      <Spinner></Spinner>
    }

    dispatch(getOrders(0));
    console.log(datas);

    return () => {
      dispatch(reset());
    };

  }, [navigate, isError, message, dispatch]);

  if(isLoading){
    console.log("isLoading");
    <Spinner/>
  }


  return (
    <>
      <div className="mb-3">
        <div className="form-control">Orders</div>
      </div>
      <div className="mb-3">
        <div className="form-control">
          <button
            className="btn btn-primary pull-right"
            onClick={() => {
              // navigate("/checkout")
              console.log("test");

              dispatch(getOrders(0));
            }}
          >
            Test
          </button>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-control">
          <Table border={1}>
            <thead>
              <tr>
                <th>#</th>
                <th>Created date</th>
                <th>name</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((x: any, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>
                    {x.CreatedDate}
                  </th>
                  <th>
                    {x.User?.Name +" "+x.User?.Surname}
                    </th>
                  <th style={{ float: "left" }}>
                    {x.Price}
                    </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Orders;
