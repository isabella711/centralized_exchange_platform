import axios from "axios";
const xrpl = require("xrpl");

export const callApi = async () => {
  try {
    await axios.get("http://localhost:4000/testing").then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const postApi = async (params) => {
  try {
    const id = 1;
    await axios
      .post("http://localhost:4000/testing", {
        amount: params.amount,
        id,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log("Error", error);
  }
};

export const putApi = async (params) => {
  try {
    const id = 1;
    await axios
      .put("http://localhost:4000/testing", {
        amount: params.amount,
        id,
      })
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteApi = async (params) => {
  try {
    const id = 1;
    await axios
      .delete("http://localhost:4000/testing", {
        amount: params.amount,
        id,
      })
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.log("Error", error);
  }
};

export const userLogin = async (email, password) => {
  // console.log(`APii,`, email, password);
  try {
    const loginInfo = await axios.post("http://localhost:4000/login", {
      email: email,
      password: password,
    });
    return loginInfo;
  } catch (error) {
    console.log("Error", error.response.data);
    return { msg: error.response.data };
  }
};

export const userRegister = async (email, password) => {
  // console.log(`APii,`, email, password);
  try {
    const registerRes = await axios.post("http://localhost:4000/register", {
      email: email,
      password: password,
    });
    return registerRes;
  } catch (error) {
    console.log("Error", error.response.data);
    return { msg: error.response.data };
  }
};

export const getUserWallets = async (id) => {
  // console.log(`APii,`, email, password);
  try {
    const wallets = await axios.get("http://localhost:4000/wallets", {
      params: {
        id: id,
      },
    });
    return wallets;
  } catch (error) {
    console.log("Error>>>", error);
    return error;
  }
};

export const callExternalApi = async (address, type) => {
  if (type === "sol") {
    try {
      const call = await axios.post("https://api.devnet.solana.com", {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [
          `${address}`,
          {
            encoding: "base58",
          },
        ],
      });
      return call;
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (type === "eth") {
    try {
      const call = await axios.get(
        `https://api-sepolia.etherscan.io/api
         ?module=account
         &action=balance
         &address=${address}
         &tag=latest
         &apikey=4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC`.replace(/\s/g, ""),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log("eth called");
      // const etherscanApi = require("etherscan-api").init(
      //   "4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC",
      //   "sepolia"
      // );
      // const call = etherscanApi.account
      //   .balance(address)
      //   .then((balance) => {
      //     console.log(`call>>>`, call);
      //     return balance.result / 10e17;
      //   })
      //   .catch((err) => {
      //     console.log(`err>>>eth`, err);
      //   });
      return call;
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (type === "btc") {
    try {
      const result = await axios.get(
        `https://blockstream.info/testnet/api/address/${address}/txs`
      );
      return result;
    } catch (error) {
      console.log("Error", error);
    }
  }

  // if (type === "xrp") {
  //   try {
  //     let config = {
  //       headers: {
  //         "X-Api-Key": "707430bfc2710166ada57a17c1c0baaf06a8b631",
  //         Accept: "application/json",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Access-Control-Allow-Headers": "*",
  //       },
  //       data: {},
  //     };
  //     await axios
  //       .get(
  //         `http://rest.cryptoapis.io/blockchain-data/xrp-specific/testnet/addresses/${address}/balance`,
  //         // "https://rest.cryptoapis.io/blockchain-data/ethereum/goerli/addresses/0x0902a667d6a3f287835e0a4593cae4167384abc6/balance?context=yourExampleString",
  //         config
  //       )
  //       .then((res) => {
  //         console.log(`....res>>>`, res.data);
  //       });
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }
};

export const xrpFetch = async (account) => {
  try {
    const net = "wss://s.altnet.rippletest.net:51233";
    const client = new xrpl.Client(net);

    await client.connect();
    const response = await client.request({
      command: "account_info",
      account: account,
      ledger_index: "validated",
    });
    client.disconnect();
    return response;
  } catch (error) {
    console.log("Error", error);
  }

  // if (type === "btc") {
  //   try {
  //     await axios
  //       .get(`https://blockstream.info/testnet/api/address/${address}/txs`)
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }

  // if (type === "xrp") {
  //   try {
  //     let config = {
  //       headers: {
  //         "X-Api-Key": "707430bfc2710166ada57a17c1c0baaf06a8b631",
  //         Accept: "application/json",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Access-Control-Allow-Headers": "*",
  //       },
  //       data: {},
  //     };
  //     await axios
  //       .get(
  //         `https://rest.cryptoapis.io/blockchain-data/xrp-specific/testnet/addresses/${address}`,
  //         // "https://rest.cryptoapis.io/blockchain-data/ethereum/goerli/addresses/0x0902a667d6a3f287835e0a4593cae4167384abc6/balance?context=yourExampleString",
  //         config
  //       )
  //       .then((res) => {
  //         console.log(`....res>>>`, res.data);
  //       });

  //   // fetch(
  //   //   `https://rest.cryptoapis.io/blockchain-data/xrp-specific/testnet/addresses/${address}`,
  //   //   config
  //   // )
  //   //   .then((response) => {
  //   //     response.json();
  //   //     console.log(`response>>>`, response);
  //   //   }) // one extra step
  //   //   .then((data) => {
  //   //     console.log(`>>>>`, data);
  //   //   });
  // } catch (error) {
  //   console.log("Error", error);
  // }
  // }
};
// callExternalApi("0x0902a667d6a3f287835e0a4593cae4167384abc6", "eth");
// callExternalApi("rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt", "xrp");
