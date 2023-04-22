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
      await axios
        .post("https://api.devnet.solana.com", {
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [
            `${address}`,
            {
              encoding: "base58",
            },
          ],
        })
        .then((res) => {
          console.log("api", res.data.result.value);
          return res.data.result.value;
        });
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (type === "btc") {
    try {
      await axios
        .get(`https://blockstream.info/testnet/api/address/${address}/txs`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (type === "xrp") {
    try {
      let config = {
        headers: {
          "X-Api-Key": "707430bfc2710166ada57a17c1c0baaf06a8b631",
        },
      };
      await axios
        .get(
          `https://rest.cryptoapis.io/blockchain-data/xrp-specific/testnet/addresses/${address}/transactions`,
          config
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error", error);
    }
  }
};
