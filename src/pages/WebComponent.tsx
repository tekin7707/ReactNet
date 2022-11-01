import React, { Component } from "react";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class WebComponent extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
              <Routes>
                <Route></Route>
              </Routes>

            <div className="col-sm-12">
              W E B C O M P O N E N T - SEARCH BOX
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">1</div>
            <div className="col-sm-3">2</div>
            <div className="col-sm-3">3</div>
            <div className="col-sm-3">4</div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <MainPage></MainPage>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">FOOTER</div>
          </div>
        </div>
      </div>
    );
  }
}
