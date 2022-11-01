import React, { useEffect, useMemo, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getUser } from "../features/auth/authSlice";
import catalogApi from "../services/catalogApi";
import { CatalogModel, CategoryModel } from "../models/categoyModel";
import CategoryForm from "./CategoryForm";
import SideMenu from "./SideMenu";
import { Table } from "reactstrap";
import Categories from "./Categories";
import Catalogs from "./Catalogs";

function Dashboard() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [currentMenu, setMenu] = useState<string>("");
  const [currentCategory, setCategory] = useState<CategoryModel>({ id: 0 });
  const [catalogs, setCatalog] = useState<Array<CatalogModel>>([]);

  useEffect(() => {
    console.log("useEffect", currentMenu);
  }, [token, currentMenu, navigate]);

  const renderCurrentSelection = () => {
    switch (currentMenu) {
      case "Categories":
        return <Categories></Categories>;

      case "Catalogs":
        return <Catalogs></Catalogs>;
      default:
        return null;
    }
  };
  return (
    <div>
      <h1>Dashboard - {user && user.userName}</h1>

      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <SideMenu
              currentMenu={currentMenu}
              changeMenu={(_currentMenu: string) => {
                setMenu(_currentMenu);
              }}
            ></SideMenu>
          </div>
          <div className="col-sm-9">
            <div className="container">{renderCurrentSelection()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
