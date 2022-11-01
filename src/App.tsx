import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./pages/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import WebComponent from "./pages/WebComponent";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Routes>
          <Route path="/" element={<WebComponent></WebComponent>}></Route>
          <Route path="/admin" element={<Dashboard></Dashboard>}></Route>
          <Route path="/admin/category" element={<Dashboard></Dashboard>}></Route>
          <Route path="/admin/catalog" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
