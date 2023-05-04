import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetBalance from "../hooks/useGetBalance";
// importing material UI components
import Typography from "@mui/material/Typography";
const { callExternalApi } = require("../api");

export default function Header(props) {
  const { loading, user, balance } = useSelector((state) => state.user);
  const { isAuthenticated, wallets } = props;
  const { xrpBalance, ethBalance, solBalance, btcBalance, ltcBalance } =
    useGetBalance(wallets);
  console.log(
    `{ xrpBalance, ethBalance, solBalance, btcBalance, ltcBalance }>>>`,
    { xrpBalance, ethBalance, solBalance, btcBalance, ltcBalance }
  );
  console.log("header balance: ", user?.user_name);

  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <div style={{ flexDirection: "column" }}>
      <p style={{ fontSize: 30 }}>
        Hi, wellcome {user?.user_name}. Your unconfirmed Balance: ${" "}
      </p>
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
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <div>
            {walletArrKey[key]} : {balance}
          </div>
        </Typography>
      </div>
    );
  });
  return <>{component}</>;
};
