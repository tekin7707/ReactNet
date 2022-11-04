import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { AppDispatch, RootState } from "../app/store";
import { CatalogModel, CategoryModel } from "../models/categoyModel";
import catalogApi from "../services/catalogApi";
import MainPageSideMenu from "./MainPageSideMenu";

function MainPage() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [currentCategory, setCategory] = useState<CategoryModel>({ id: 0 });
  const [catalogs, setCatalog] = useState<Array<CatalogModel>>([]);

  useEffect(() => {
    console.log("useEffect", currentCategory);

    if (currentCategory.id ?? 0 > 0) {
      var response = catalogApi.GetCatalogListAsync(currentCategory.id);
      response
        .then((x) => {
          setCatalog(x.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, currentCategory, navigate]);

  return (
    <div>
      <h1>Mainpage </h1>

      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <MainPageSideMenu
              currentCategory={currentCategory}
              changeCategory={(_currentCategory: CategoryModel) => {
                setCategory(_currentCategory);
              }}
            ></MainPageSideMenu>
          </div>
          <div className="col-sm-9">
            {(currentCategory.id ?? 0) > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>picture</th>
                    <th>name</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogs.length > 0 ? (
                    catalogs?.map((x, index) => (
                      <tr key={x.id}>
                        <td>{index + 1}</td>
                        <th>
                          {" "}
                          <img src={x.thumbUrl} width="80"></img>{" "}
                        </th>
                        <th>
                           <Link to={"/catalog/"+x.id}>{x.name}</Link>

                          </th>
                        <th>{x.description}</th>
                      </tr>
                    ))
                  ) : (
                    <tr key={0}>
                      <td colSpan={5}>Any catalog not found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            ) : (
              <> category not selected</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
