import { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import { CategoryModel } from "../models/categoyModel";
import catalogApi from "../services/catalogApi";

function Categories() {
  const [categories, setCategories] = useState<Array<CategoryModel>>([]);
  const [category, setCategory] = useState<CategoryModel>();

  useEffect(() => {
    var promise = catalogApi.GetCategoryListAsync();
    promise
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categories]);

  useEffect(() => {
    console.log(category);
    setName(category?.name ?? "");
    setId(category?.id ?? 0);
  }, [category]);

  const [name, setName] = useState("");
  const [id, setId] = useState(0);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-add"
        onClick={() => {
          setCategory({});
        }}
      >
        Add
      </button>
      {category && (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="baslik"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block btn-add">
                Save
              </button>
            </div>
          </form>
        </section>
      )}

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories?.map((x, index) => (
              <tr key={x.id}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" as const }}>{x.name}</td>
                <td>
                  {" "}
                  <Badge color="info" onClick={() => setCategory(x)}>
                    edit
                  </Badge>{" "}
                  <Badge color="danger" onClick={() => {}}>
                    X
                  </Badge>{" "}
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

export default Categories;
