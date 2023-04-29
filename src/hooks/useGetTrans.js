import { callExternalApi } from "../api";
import { useEffect, useRef, useState } from "react";
export default function useGetTrans(transIdArr) {
  const [transHistory, setTransHistory] = useState([]);

  const searchTransaction = (transIdArr) => {
    let tArr = [];
    transIdArr.map(async (t) => {
      if (t.tx_id !== null) {
        const eachT = await callExternalApi(t.tx_id, "solTransaction");
        const eachDetail = {
          txId: t.tx_id,
          amount:
            eachT.data.result.meta.postBalances[1] -
            eachT.data.result.meta.preBalances[1],
          time: new Date(eachT.data.result.blockTime),
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
  }, []);

  return { transHistory };
}
