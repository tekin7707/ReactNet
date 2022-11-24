import React, { useEffect, useMemo, useState } from "react";
import { CategoryModel } from "../models/categoyModel";
import catalogApi from "../services/catalogApi";
import { ListGroup, ListGroupItem, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

interface PropTypes {
  currentMenu: string;
  changeMenu(x: string): void;
}
function SideMenu(props: PropTypes) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Array<CategoryModel>>([]);

  useMemo(async () => {
    console.log(props);
    console.log("useMemo");
    var response = await catalogApi.GetCategoryListAsync();
    setCategories(response.data);
  }, []);

  return (
    <>
      <ListGroup>
        <ListGroupItem
          active={"Categories" === props.currentMenu}
          onClick={() => props.changeMenu("Categories")}
        >
          Categories (Core 6)
        </ListGroupItem>
        <ListGroupItem active={"Catalogs" === props.currentMenu} onClick={() => props.changeMenu("Catalogs")}>
          Catalogs (Core 6)
        </ListGroupItem>
        <ListGroupItem active={"Orders" === props.currentMenu} onClick={() => props.changeMenu("Orders")}>
          Orders (AWS Lambda)
        </ListGroupItem>
        <ListGroupItem active={"Settings" === props.currentMenu} onClick={() => props.changeMenu("Settings")}>
          Settings
        </ListGroupItem>                
      </ListGroup>

      {/* <ListGroup>
        {categories.map((x) => (
          <ListGroupItem
            active={x.id === props.currentCategory.id}
            onClick={() => props.changeCategory(x)}
            key={x.id}
          >
            {x.name}
          </ListGroupItem>
        ))}
      </ListGroup> */}
    </>
  );
}
export default SideMenu;
