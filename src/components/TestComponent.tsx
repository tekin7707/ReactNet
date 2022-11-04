import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { getCategories } from "../features/category/categorySlice";

function TestComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { datas, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(getCategories([]));
  }, [navigate]);

  return (
    <>
      {isLoading ? <span>Loading</span> : <></>}
      {isSuccess ? <span>isSuccess</span> : <></>}
      {isError ? <span>isError</span> : <></>}
      {message ? <span>{message}</span> : <></>}

      <div>TestComponent</div>
      {JSON.stringify(datas)}
    </>
  );
}

export default TestComponent;
