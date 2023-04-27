import React, { useEffect, useState } from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../AuthContext";
const { xrpFetch } = require("../api");

export default function Header(props) {
  const [xrpBalance, setXrpBalance] = useState();
  const { isAuthenticated, wallets } = props;

  useEffect(() => {
    console.log(`>>>wallets`, wallets);
    const xrpAddress = wallets.find(
      (wallet) => wallet.currency_type === "XRP"
    ).classicAddress;
    console.log(`>>>xrpAddress`, xrpAddress);

    xrpFetch(xrpAddress).then((res) => {
      let balance = res.result.account_data.Balance;
      console.log(`>>>xrpBalance`, balance);
      setXrpBalance(balance);
    });
  }, []);
  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {JSON.stringify(wallets)}xrpBalance : {xrpBalance}
    </Typography>
  );
}
