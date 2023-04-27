import { useEffect, useRef, useState } from "react";

export default function useWebSocket(coinType) {
  const [isPaused, setPause] = useState(false);
  const [coinInfo, setCoinInfo] = useState();
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${coinType}`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const message = JSON.parse(e.data).p;
      setCoinInfo(message);
    };
  }, [isPaused]);
  useEffect(() => {
    setTimeout(() => {
      setPause(!isPaused);
    }, 5000);
  }, [setPause, isPaused]);

  return { isPaused, setPause, ws, coinInfo };
}
