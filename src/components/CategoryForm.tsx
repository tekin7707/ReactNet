import React, { useState } from "react";
import { RootState } from "../app/store";

function CategoryForm() {
  const [name, setName] = useState("");
  const [xstatus, setStatus] = useState("1");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(name, xstatus);
  };

  return (
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
          <label htmlFor="xstatus">Status</label>
          <select onChange={(e) => setStatus(e.target.value)} value={xstatus}>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Tree</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-add">
            Add Category
          </button>
        </div>
      </form>
    </section>
  );
}

export default CategoryForm;
