import axios from "axios";

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

  if (type === "xrp") {
    console.log("type === xrp");
    const res = await axios.get(
      "http://rest.cryptoapis.io/blockchain-data/xrp/testnet/addresses/rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt/balance?context=yourExampleString",
      {
        headers: {
          "X-Api-Key": "707430bfc2710166ada57a17c1c0baaf06a8b631",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
  }
};
