import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../css/TransactionForm.css";
export default function TransactionForm() {
  return (
    <div
      className="transaction-container d-flex flex-column min-vh-100 justify-content-center align-items-center"
      style={{ borderWidth: 5 }}
    >
      <h2>Transaction</h2>
      <div className="col-md-6">
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
                  <button class="button button5">Buy</button>{" "}
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
                  <button class="button button5">Sell</button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
