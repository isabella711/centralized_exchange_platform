import { callExternalApi, xrpTx } from "../api";
import { useEffect, useRef, useState } from "react";
const xrpl = require("xrpl");
export default function useGetTrans(transIdArr) {
  const [transHistory, setTransHistory] = useState([]);
  const [transXrpHistory, setXrpTransHistory] = useState([]);

  const searchXrpTx = async () => {
    const response = await xrpTx(
      "b9f3a0ca419220940a83f4fe73428d8e6dcb8b0ca7d572017d73bcf4180fa70d"
    );
    console.log(`searchXrpTx>>>`, response);
    setXrpTransHistory(response.result.Amount);
    return;
  };

  const searchTransaction = (transIdArr) => {
    let tArr = [];
    transIdArr?.map(async (t) => {
      if (t.tx_id !== null) {
        const eachT = await callExternalApi(t.tx_id, "solTransaction");
        const eachDetail = {
          txId: t.tx_id,
          amount:
            eachT.data.result.meta.postBalances[1] -
            eachT.data.result.meta.preBalances[1],
          time: new Date(eachT.data.result.blockTime),
          type: "solana",
        };
        console.log(`eachDetail`, eachDetail);
        tArr.push(eachDetail);
      }
    });
    setTransHistory(tArr);
    return;
  };

  useEffect(() => {
    searchTransaction(transIdArr);
    searchXrpTx();
  }, []);

  return { transHistory, transXrpHistory };
}
