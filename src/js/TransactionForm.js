import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../css/TransactionForm.css";
export default function TransactionForm() {
  return (
    <div className="centered-div">
      <div className="col-md-8">
        <div className="bg-white">
          <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              {" "}
              <button
                className="nav-link active"
                id="faq_tab_1-tab"
                data-bs-toggle="tab"
                data-bs-target="#faq_tab_1"
                type="button"
                role="tab"
                aria-controls="faq_tab_1"
                aria-selected="true"
              >
                <div className="d-flex flex-column lh-lg">
                  {" "}
                  <i></i> <span>Buy</span>{" "}
                </div>
              </button>{" "}
            </li>
            <li className="nav-item" role="presentation">
              {" "}
              <button
                className="nav-link"
                id="faq_tab_2-tab"
                data-bs-toggle="tab"
                data-bs-target="#faq_tab_2"
                type="button"
                role="tab"
                aria-controls="faq_tab_2"
                aria-selected="false"
              >
                <div className="d-flex flex-column lh-lg">
                  {" "}
                  <i></i> <span>Sell</span>{" "}
                </div>
              </button>{" "}
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade active show"
              id="faq_tab_1"
              role="tabpanel"
              aria-labelledby="faq_tab_1-tab"
            >
              <div className="container p-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the amount"
                  />{" "}
                </div>

                <div className="input-group mb-3">
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Please choose</option>
                    <option value="1">Bitcoin</option>
                    <option value="2">Ehereum</option>
                    <option value="3">Solana</option>
                    <option value="4">XRP</option>
                    <option value="5">LTC</option>
                  </select>{" "}
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  {" "}
                  <button className="btn btn-success custom-button px-5">
                    Buy
                  </button>{" "}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="faq_tab_2"
              role="tabpanel"
              aria-labelledby="faq_tab_2-tab"
            >
              <div className="container p-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the amount"
                  />{" "}
                </div>

                <div className="input-group mb-3">
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Please choose</option>
                    <option value="1">Bitcoin</option>
                    <option value="2">Ehereum</option>
                    <option value="3">Solana</option>
                    <option value="4">XRP</option>
                    <option value="5">LTC</option>
                  </select>{" "}
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  {" "}
                  <button className="btn btn-success custom-button px-5">
                    Sell
                  </button>{" "}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="faq_tab_3"
              role="tabpanel"
              aria-labelledby="faq_tab_3-tab"
            >
              <div className="container p-3 mt-4">
                <div className="input-group mb-3">
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search hotels..."
                  />{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />{" "}
                </div>
                <div className="input-group mb-3">
                  {" "}
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Rooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>{" "}
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Members</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="3">Four</option>
                    <option value="3">Five</option>
                  </select>{" "}
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  {" "}
                  <button className="btn btn-success custom-button px-5">
                    Search Hotels
                  </button>{" "}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="faq_tab_4"
              role="tabpanel"
              aria-labelledby="faq_tab_4-tab"
            >
              <div className="container p-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      {" "}
                      <select
                        className="form-select form-control"
                        id="inputGroupSelect02"
                      >
                        <option selected>Select Airline</option>
                        <option value="1">Indigo</option>
                        <option value="2">Air India</option>
                        <option value="3">Air Asthana</option>
                      </select>{" "}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      {" "}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Flight Number"
                      />{" "}
                      <button
                        className="btn btn-outline-secondary custom-button"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
