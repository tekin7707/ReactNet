import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { getCatalog, getCatalogs } from "../features/category/categorySlice";
import { CatalogModel } from "../models/categoyModel";
import { addToCart } from "../features/cart/cartSlice";

function WebCatalog(props: any) {
  const { id } = useParams();
  const [catalog,setCatalog] = useState<CatalogModel>();

  const dispatch = useDispatch<AppDispatch>();

  const _getCatalogs = (id: any) => {
    dispatch(getCatalog(id)).then((response) => {
      setCatalog(response.payload.data);
    }).finally(()=>{
        console.log(catalog);
    });
  };

  useEffect(()=>{
    _getCatalogs(id)
  },[])
  return (
  <>
  <div className="mb-3">WebCatalog {id}</div>

  <button onClick={()=>{
    dispatch(addToCart(catalog));
  }}>add to cart   
  </button>
  <br></br>
  {JSON.stringify(catalog)}

  </>
  )
}

export default WebCatalog;
