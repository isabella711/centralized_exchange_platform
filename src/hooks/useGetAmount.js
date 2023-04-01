import { useState, useCallback } from "react";

export const useGetAmount = (coinType) => {
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinType}`);
  const [ticker, setTicker] = useState();
  const [hightestPrice, setHighestPrice] = useState();
  const [lowestPrice, setLowestPrice] = useState();
  const [priceChange, setPriceChange] = useState();
  const [volume, setVolume] = useState();
  const [amount, setAmount] = useState();

  ws.onmessage = (event) => {
    setAmount(JSON.parse(event.data).A);
  };

  return amount;
};
