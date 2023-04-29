import { useState, useCallback } from "react";

export const useUpdateCoin = (coinType) => {
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinType}`);
  const [coinInfo, setCoinInfo] = useState();
  ws.onmessage = (event) => {
    setCoinInfo(JSON.parse(event.data).p);
    //console.log(JSON.parse(event.data));
  };
  //console.log(coinInfo);
  return coinInfo;
};
