import React, { useEffect } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPen,
  FaFile,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUser, logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";

import { Navbar, NavbarBrand, NavbarText } from "reactstrap";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token, user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser(token.access_token));
    }
  }, [token, navigate]);

  return (
    <div>
      <Navbar>
        <NavbarBrand>reactstrap</NavbarBrand>
        <NavbarText>
          <Link to="/">home</Link>
        </NavbarText>
        {token ? (
          <>
            <NavbarText>
              <Link to="/">
                <FaPen /> Create
              </Link>
            </NavbarText>
            <NavbarText>
              <Link to="/profile">
                <FaFile /> Profile
              </Link>
            </NavbarText>
            {user.email === "admin@belek.com" && (
              <NavbarText>
                <Link to="/admin">
                  <FaFile /> admin
                </Link>
              </NavbarText>
            )}
            <NavbarText>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Exit
              </button>
            </NavbarText>
          </>
        ) : (
          <>
            <NavbarText>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </NavbarText>
            <NavbarText>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </NavbarText>
          </>
        )}
      </Navbar>
    </div>
  );
}

export default Header;
