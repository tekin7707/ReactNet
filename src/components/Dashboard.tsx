import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import SideMenu from "./SideMenu";
import Categories from "./Categories";
import Catalogs from "./Catalogs";
import Orders from "./Orders";

function Dashboard() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [currentMenu, setMenu] = useState<string>("");

  useEffect(() => {
    console.log("useEffect", currentMenu);
  }, [token, currentMenu, navigate]);

  const renderCurrentSelection = () => {
    switch (currentMenu) {
      case "Categories":
        return <Categories></Categories>;

      case "Catalogs":
        return <Catalogs></Catalogs>;

        case "Orders":
          return <Orders></Orders>;
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
