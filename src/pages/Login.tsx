import React, { useState, useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, login, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";
import { LoginModel } from "../models/loginmodel";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token, user, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData((prior) => ({
      ...prior,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    //console.log(formData);
    const userData: LoginModel = {
      email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || token) {
      navigate("/");
    }
    dispatch(reset());
  }, [token, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUserCheck /> Login
        </h1>
        <br></br>
        <span onClick={()=>{setFormData({ email:"admin@belek.com",password:"Test777777*"})}}> admin@belek.com : Test777777* </span>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
