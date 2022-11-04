import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import { AppDispatch, RootState } from "../app/store";
import { CatalogModel, CategoryModel } from "../models/categoyModel";
import {
  getCatalogs,
  deleteCatalog,
} from "../features/category/categorySlice";
import catalogApi from "../services/catalogApi";
import { useNavigate } from "react-router-dom";
import { CatalogForm } from "./CatalogForm";

function Catalogs() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryModel>({});
  const [catalog, setCatalog] = useState<CatalogModel>();
  const [categoryId, setCategoryId] = useState<any>(0);
  const [categories, setCatecories] = useState<Array<CategoryModel>>([]);
  const [catalogs, setCatalogs] = useState<Array<CatalogModel>>([]);
  const [page, refreshPage] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const { datas, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    catalogApi
      .GetCategoryListAsync()
      .then((x) => {
        setCatecories(x.data);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const _getCatalogs = (id: any) => {
    dispatch(getCatalogs(id)).then((response) => {
      setCatalogs(response.payload.data);
    });
  };

  useEffect(() => {
    _getCatalogs(categoryId);
  }, [categoryId]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {isFormOpen && (
        <CatalogForm
          setIsFormOpen={setIsFormOpen}
          catalog={catalog ?? {}}
          categories={categories ?? []}
          refreshCatalogs={() => {
            console.log("refreshCatalogs");

            _getCatalogs(categoryId);
          }}
        />
      )}
      <div className="mb-3">
        <select
          id="sctgr"
          className="form-control dropdown"
          onChange={(e: any) => setCategoryId(e.target.value)}
        >
          <option key={0} value="0">
            All categories
          </option>

          {categories.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <Button
          className={"float: right;"}
          onClick={() => {
            setCatalog({});
            setIsFormOpen(true);
          }}
        >
          Add new
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {catalogs.length > 0 ? (
            catalogs?.map((x, index) => (
              <tr key={x.id}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" as const }}>{x.name}</td>
                <td>
                  {" "}
                  <Badge
                    color="info"
                    onClick={() => {
                      setCatalog(x);
                      setIsFormOpen(true);
                    }}
                  >
                    edit
                  </Badge>{" "}
                  <Badge
                    color="danger"
                    onClick={() => {
                      dispatch(deleteCatalog(x?.id ?? 0)).finally(() =>
                        _getCatalogs(categoryId)
                      );
                    }}
                  >
                    X
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr key={0}>
              <td colSpan={5}>Any catalog not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Catalogs;
