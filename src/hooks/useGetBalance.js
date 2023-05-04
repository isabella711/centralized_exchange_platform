import { useState, useCallback, useEffect } from "react";
const { callExternalApi } = require("../api");

export default function useGetBalance(wallets) {
  // const btcCurrent = useUpdateCoin("btcusdt@ticker");
  const [xrpBalance, setXrpBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [solBalance, setSolBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ltcBalance, setLtcBalance] = useState(0);
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
          ?.classicAddress ?? null;
      callExternalApi(xrpAddress, "xrp").then((res) => {
        let balance = res.data;
        setXrpBalance(balance * 0.000001);
      });
      callExternalApi(ethAddress, "eth").then((res) => {
        setEthBalance(res.data.result * 0.000000000000000001);
      });
      callExternalApi(solAddress, "sol").then((res) => {
        setSolBalance(res.data.result.value * 0.000000001);
      });
      callExternalApi(ltcAddress, "ltc").then((res) => {
        setLtcBalance(res.data);
      });
      callExternalApi(btcAddress, "btc").then((res) => {
        console.log(`res.data.length>>>`, res.data);
        if (res.data.length === 0) {
          setBtcBalance(0 * 0.00000001);
          return;
        }
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

  return {
    xrpBalance,
    ethBalance,
    solBalance,
    btcBalance,
    ltcBalance,
    // btcCurrent,
  };
}
