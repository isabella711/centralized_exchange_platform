import React, { Component } from "react";
import "../css/UserProfile.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { callExternalApi } from "../api";
const { xrpFetch } = require("../api");

export default function UserProfile() {
  //XRP
  console.log("xrpresult:", xrpFetch());

  //SOL
  // const [solBalance, setSolBalance] = useState();
  // useEffect(() => {
  //   callExternalApi(
  //     "Ai5qKTxmXjJow3TkexjEWRDYq2Xd4s8X9GC9C3KKmZWS",
  //     "sol"
  //   ).then(res=>{setSolBalance(res.data.result.value)})
  // }, []);

  //ETH
  // useEffect(() => {
  //   const result = callExternalApi("4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC", "eth");
  //   console.log("result", result);
  // }, []);

  return (
    <div className="maincontainer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-4 col-xl-3 order-2 order-lg-1">
            <div class="card mb-2">
              <div class="card-body text-center">
                <img
                  src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png"
                  alt="Jassa Jas"
                  class="img-fluid rounded-circle mb-2"
                  width="128"
                  height="128"
                />
                <h1 class="card-title mb-0">Jassa Jas</h1>
              </div>
            </div>

            <div class="card mb-3">
              <div class="card-header">
                <div class="card-actions float-right">
                  <div class="dropdown show">
                    <a href="#" data-toggle="dropdown" data-display="static">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-horizontal align-middle"
                      ></svg>
                    </a>
                  </div>
                </div>
                <h1 class="card-title mb-0">Your Assets</h1>
              </div>
              <div class="card-body text-center">
                <div class="media">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
                    width="56"
                    height="56"
                    class="rounded-circle mr-2"
                    alt=""
                  />
                  <p class="my-1">
                    <strong>Bitcoin</strong>
                  </p>
                  <p>
                    <Link to={``}>
                      <button class="button button5">See Details</button>
                    </Link>
                  </p>
                </div>

                <hr class="my-2" />

                <div class="media">
                  <img
                    src="https://thegivingblock.com/wp-content/uploads/2021/07/Ethereum-ETH-Logo.png"
                    width="56"
                    height="56"
                    class="rounded-circle mr-2"
                    alt=""
                  />

                  <div class="media-body">
                    <p class="my-1">
                      <strong>Ethereum</strong>
                    </p>
                  </div>
                  <p>
                    <Link to={``}>
                      <button class="button button5">See Details</button>
                    </Link>
                  </p>
                </div>

                <hr class="my-2" />

                <div class="media">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                    width="56"
                    height="56"
                    class="rounded-circle mr-2"
                    alt=""
                  />
                  <div class="media-body">
                    <p class="my-1">
                      <strong>Solana</strong>
                    </p>
                  </div>
                  <p>
                    <Link to={``}>
                      <button class="button button5">See Details</button>
                    </Link>
                  </p>
                </div>

                <hr class="my-2" />

                <div class="media">
                  <img
                    src="https://finvesting.net/wp-content/uploads/2022/03/xrp-icon-freelogovectors.net_.png"
                    width="56"
                    height="56"
                    class="rounded-circle mr-2"
                    alt=""
                  />
                  <div class="media-body">
                    <p class="my-1">
                      <strong>XRP</strong>
                    </p>
                  </div>
                  <p>
                    <Link to={``}>
                      <button class="button button5">See Details</button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-20 col-lg-15 col-xl-9 order-3 order-lg-3">
            <div class="card">
              <div class="card-body h-100">
                <div class="media">
                  <div class="media-body"></div>
                </div>

                <div class="media">
                  <div class="media-body">
                    <div class="media mt-3">
                      <div class="media-body">
                        <div class="card-header">
                          <h1 class="card-title mb-0">Balance</h1>
                        </div>
                        <div class="card-body text-center">
                          {/* <h2>{solBalance}</h2> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div class="media">
                  <div class="media-body">
                    <div>
                      <div class="card-header">
                        <h1 class="card-title mb-0">Transaction History</h1>
                      </div>
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>User Name</th>
                            <th>Address</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Send</td>
                            <td>2023-1-1</td>
                            <td>100</td>
                            <td>Otto</td>
                            <td>12345678</td>
                            <td>completed</td>
                          </tr>
                          <tr>
                            <td>Send</td>
                            <td>2023-3-1</td>
                            <td>200</td>
                            <td>Jacob</td>
                            <td>87654321</td>
                            <td>completed</td>
                          </tr>
                          <tr>
                            <td>Receive</td>
                            <td>2023-4-22</td>
                            <td>200</td>
                            <td>Alice</td>
                            <td>14725836</td>
                            <td>pending</td>
                          </tr>
                        </tbody>
                      </Table>
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
