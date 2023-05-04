import { useState, useCallback } from "react";

export const useUpdateCoin = (coinType) => {
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinType}`);
  const [btcCurrent, setBtcCurrent] = useState();
  ws.onmessage = (event) => {
    setBtcCurrent(JSON.parse(event.data).a);
  };
  //console.log(coinInfo);
  return btcCurrent;
};
