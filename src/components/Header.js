import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// importing material UI components
import Typography from "@mui/material/Typography";
const { xrpFetch, callExternalApi } = require("../api");

export default function Header(props) {
  const { loading, user, balance } = useSelector((state) => state.user);
  const [xrpBalance, setXrpBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [solBalance, setSolBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ltcBalance, setLtcBalance] = useState(0);
  const { isAuthenticated, wallets } = props;
  console.log("header balance: ", user?.user_name);

  console.log(`wallets..>>`, wallets ?? "error");
  useEffect(() => {
    if (wallets?.length > 0 && wallets !== undefined) {
      const xrpAddress =
        wallets?.find((wallet) => wallet.currency_type === "XRP")
          ?.classicAddress ?? null;
      const ethAddress =
        wallets?.find((wallet) => wallet.currency_type === "ETH")
          ?.wallet_address ?? null;
      const solAddress =
        wallets?.find((wallet) => wallet.currency_type === "SOL")
          ?.wallet_address ?? null;
      const btcAddress =
        wallets?.find((wallet) => wallet.currency_type === "BTC")
          ?.wallet_address ?? null;
      const ltcAddress =
        wallets?.find((wallet) => wallet.currency_type === "LTC")
          ?.wallet_address ?? null;
      xrpFetch(xrpAddress).then((res) => {
        let balance = res.result.account_data.Balance;
        setXrpBalance(balance * 0.00000001);
      });
      callExternalApi(ethAddress, "eth").then((res) => {
        setEthBalance(res.data.result * 0.000000000000000001);
      });
      callExternalApi(solAddress, "sol").then((res) => {
        setSolBalance(res.data.result.value * 0.000000001);
      });
      callExternalApi(ltcAddress, "ltc").then((res) => {
        setLtcBalance(res.data.result.value * 0.000000001);
      });
      callExternalApi(btcAddress, "btc").then((res) => {
        console.log(`res.data.length>>>`, res.data);
        if (res.data.length === 0) {
          setBtcBalance(0 * 0.00000001);
          return;
        }
        console.log(`res.data[0].vout>>>`, res.data);
        let arr = [];
        let data = res.data;
        // let vin = res.data[0].vin.find(
        //   (v) => v.prevout.scriptpubkey_address === btcAddress
        // )?.prevout.scriptpubkey;

        // let vout = res.data[0].vout.find(
        //   (v) => v.scriptpubkey_address === btcAddress
        // )?.scriptpubkey;

        data.forEach((tx) => {
          let fromVin = tx.vin.find(
            (v) => v.prevout.scriptpubkey_address === btcAddress
          )?.prevout.value;
          let fromVout = tx.vout.find(
            (v) => v.scriptpubkey_address === btcAddress
          )?.value;
          arr.push(fromVout ?? fromVin);
        });
        Array.prototype.getUnique = function () {
          var uniques = [];
          for (var i = 0, l = this.length; i < l; ++i) {
            if (this.lastIndexOf(this[i]) == this.indexOf(this[i])) {
              uniques.push(this[i]);
            }
          }
          return uniques;
        };
        console.log(`arr`, arr);
        const sum = arr
          .getUnique()
          .reduce((partialSum, a) => partialSum + a, 0);
        console.log(`arr`, sum);
        setBtcBalance(sum * 0.00000001);
      });
    }
  }, []);
  useEffect(() => {
    // }, []);
    // const result = callExternalApi(
    //   "rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt",
    //   "xrp"
    // ).then((res) => {
    //   console.log(`<<<eth`, res);
    // });
    // console.log("result", result);
  }, []);

  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <div style={{ flexDirection: "column" }}>
      <p>Hi, wellcome {user?.user_name}</p>
      <div style={{ flexDirection: "row", display: "flex", padding: 5 }}>
        <EachBalance
          balanceArr={[
            balance,
            btcBalance,
            ethBalance,
            solBalance,
            xrpBalance,
            ltcBalance,
          ]}
        />
      </div>
    </div>
  );

  // return <EachBalance balance={xrpBalance} />;
}

const EachBalance = ({ balanceArr }) => {
  const walletArrKey = ["USD", "BTC", "ETH", "SOL", "XRP", "LTC"];
  const component = balanceArr.map((balance, key) => {
    if (
      balance === undefined ||
      balance?.toString().toLowerCase().includes("error")
    ) {
      return <></>;
    }
    return (
      <div
        style={{
          "&:hover": { color: "#CC9900" },
          margin: "auto",
          padding: "3vh 5vh",
          borderRadius: "3vh",
          backgroundColor: "white",
          border: "solid",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div>
            {walletArrKey[key]} : {balance}
          </div>
        </Typography>
      </div>
    );
  });
  return <>{component}</>;
};
