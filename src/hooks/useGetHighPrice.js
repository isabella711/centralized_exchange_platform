import { useState, useCallback } from "react";

export const useGetHighPrice = (coinType) => {
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinType}`);
  const [ticker, setTicker] = useState();
  const [hightestPrice, setHighestPrice] = useState();
  const [lowestPrice, setLowestPrice] = useState();
  const [priceChange, setPriceChange] = useState();
  const [volume, setVolume] = useState();
  const [amount, setAmount] = useState();

  ws.onmessage = (event) => {
    setHighestPrice(JSON.parse(event.data).h);
  };

  return hightestPrice;
};
