import React, { useEffect, useMemo, useState } from "react";
import { CategoryModel } from "../models/categoyModel";
import catalogApi from "../services/catalogApi";
import { ListGroup, ListGroupItem, Table } from "reactstrap";
import { Link } from "react-router-dom";

interface PropTypes{
    currentCategory:CategoryModel,
    changeCategory(x:CategoryModel):void
}
function MainPageSideMenu(props:PropTypes) {
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
        {categories.map((x) => (
          <ListGroupItem
            active={x.id === props.currentCategory.id}
            onClick={() => props.changeCategory(x)}
            key={x.id}
          >
            {x.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
}
export default MainPageSideMenu;
