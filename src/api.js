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
        console.log(res);
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
      console.log("eth called");
      const etherscanApi = require("etherscan-api").init(
        "4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC",
        "sepolia"
      );
      const call = etherscanApi.account.balance(address).then((balance) => {
        return balance.result / 10e17;
      });
      return call;
    } catch (error) {
      console.log("Error", error);
    }
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
};

export const xrpFetch = async () => {
  try {
    const net = "wss://s.altnet.rippletest.net:51233";
    const client = new xrpl.Client(net);

    const xrpWallet = async () => {
      await client.connect();
      console.log("Connected, funding wallet.");
      const response = await client.request({
        command: "account_info",
        account: "rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt",
        ledger_index: "validated",
      });
      console.log(`xrp ++++response>>>`, response.result.account_data.Balance);
      client.disconnect();
    };

    console.log(`rey>>>>`, xrpWallet());
  } catch (error) {
    console.log("Error", error);
  }
};
