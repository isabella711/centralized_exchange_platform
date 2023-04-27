import React, { useEffect, useState } from "react";

// importing material UI components
import Typography from "@mui/material/Typography";
const { xrpFetch, callExternalApi } = require("../api");

export default function Header(props) {
  const [xrpBalance, setXrpBalance] = useState();
  const [ethBalance, setEthBalance] = useState();
  const { isAuthenticated, wallets } = props;
  useEffect(() => {
    if (wallets.length > 0) {
      const xrpAddress =
        wallets?.find((wallet) => wallet.currency_type === "XRP")
          .classicAddress ?? null;

      const ethAddress =
        wallets?.find((wallet) => wallet.currency_type === "ETH")
          .wallet_address ?? null;
      xrpFetch(xrpAddress).then((res) => {
        let balance = res.result.account_data.Balance;
        setXrpBalance(balance);
      });
      callExternalApi(ethAddress, "eth").then((res) => {
        setEthBalance(res.data);
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
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {JSON.stringify(wallets)}
      xrpBalance : {xrpBalance}
      ethBalance:{ethBalance}
    </Typography>
  );
}
