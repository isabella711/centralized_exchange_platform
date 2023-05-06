import { callExternalApi } from "../api";
import { useEffect, useRef, useState } from "react";
export default function useGetTrans(transIdArr) {
  const [externalTransHistory, setExternalTransHistory] = useState([]);
  const [transXrpHistory, setXrpTransHistory] = useState([]);

  const searchXrpTx = async () => {
    const response = await callExternalApi(
      "b9f3a0ca419220940a83f4fe73428d8e6dcb8b0ca7d572017d73bcf4180fa70d",
      "xrpTx"
    );
    console.log(`searchXrpTx>>>`, response.data.result.Amount);
    setXrpTransHistory(response.data.result.Amount);
    return;
  };

  const searchTransaction = (transIdArr) => {
    let tArr = [];
    console.log(`transIdArr<<<<>>>`, transIdArr);
    transIdArr?.map(async (t) => {
      if (t.tx_id !== null) {
        const eachT = await callExternalApi(t.tx_id, "solTransaction");
        const eachSolDetail = {
          txId: t.tx_id,
          amount:
            eachT.data.result.meta.postBalances[1] -
            eachT.data.result.meta.preBalances[1],
          time: Date(eachT.data.result.blockTime)
            .toString()
            .split(" GMT+0800 ")
            .join(" "),
          type: "solana",
        };
        console.log(`eachSolDetail`, eachSolDetail);
        tArr.push(eachSolDetail);
      }
      if (
        t.transactioner_A_currency_type === "USD" &&
        t.transactioner_B_currency_type === "USD" &&
        t.tx_id == null
      ) {
        console.log(`eachUSDdetail`, t.transactioner_A_currency_amount);
        const eachUsdDetail = {
          txId: "N/A",
          amount: t.transactioner_A_currency_amount,
          time: t.transaction_date.toString(),
          type: "USD",
        };
        tArr.push(eachUsdDetail);
      }
      if (
        t.transactioner_A_currency_type === "USD" &&
        t.transactioner_B_currency_type === "btc"
      ) {
      }
    });

    setExternalTransHistory(tArr);
    return;
  };

  useEffect(() => {
    searchTransaction(transIdArr);
    searchXrpTx();
  }, []);

  return { externalTransHistory, transXrpHistory };
}
