import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { CatalogModel, CategoryModel } from "../models/categoyModel";
import {
  createCatalog,
  updateCatalog,
} from "../features/category/categorySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface PropTypes {
  setIsFormOpen: any;
  catalog: CatalogModel;
  categories: CategoryModel[];
  refreshCatalogs():void
}

export const CatalogForm = (props: PropTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(props.catalog?.name ?? "");
  const [category, setCategory] = useState(props.catalog?.categoryId ?? 0);
  const [price, setPrice] = useState(props.catalog?.price ?? 0);
  const [description, setDescription] = useState(
    props.catalog?.description ?? ""
  );
  const [picture, setPicture] = useState<File>();
  const [message, setMessage] = useState("");

  const pictureChange = (event: any) => {
    const file = event.target.files[0];
    setPicture(file);
    console.log(file);
    // setPicture({
    //   picturePreview: URL.createObjectURL(event.target.files[0]),
    //   pictureAsFile: event.target.files[0],
    // });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(name, category);

    let catalog = {
      id: props.catalog?.id ?? 0,
      name: name,
      description: description,
      price: price,
      categoryId: category,
      userId: "1",
      PhotoFormFile: picture,
    };
    console.log(catalog);
    if (catalog.id == 0) {
      dispatch(createCatalog(catalog))
      .then((response) => {
        props.setIsFormOpen(false);
        props.refreshCatalogs();

    })
    .catch((err) => setMessage(err.error.message));

    } else {
      dispatch(updateCatalog(catalog))
        .then((response) => {
          props.setIsFormOpen(false);
          props.refreshCatalogs();
        })
        .catch((err) => setMessage(err.error.message));
    }
  };

  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() => props.setIsFormOpen(false)}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h4 className={styles.heading}>Catalog</h4>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => props.setIsFormOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "3px" }} />
          </button>
          <div className={styles.modalContent}>
            <section className="form">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    onChange={(e) => setCategory(parseInt(e.target.value))}
                    value={category}
                  >
                    <option key={0} value="0">
                      Select category
                    </option>
                    {props.categories.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger"></span>
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="text-danger"></span>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <span className="text-danger"></span>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                  />
                  <span className="text-danger"></span>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="PhotoFormFile">
                    Photo
                  </label>

                  <input
                    type="file"
                    id="PhotoFormFile"
                    className="form-control"
                    //value={picture}
                    onChange={(e) => pictureChange(e)}
                  />
                </div>

                <div className="mb-3">
                <span className="text-danger">{message}</span>
                </div>

                <div className="form-group">
                  <div className={styles.modalActions}>
                    <div className={styles.actionsContainer}>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => props.setIsFormOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={styles.deleteBtn}
                        // onClick={() => props.setIsFormOpen(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
