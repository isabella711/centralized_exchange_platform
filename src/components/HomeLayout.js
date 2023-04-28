import React, { useCallback,useEffect,useState } from "react";
import { Products } from "../components/products";
import contents from "../js/content";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";
import Card from "../js/Card";
import {callExternalApi }from "../api"

export default function HomeLayout({ children }) {
  const [result, setResult] = useState('');
  const [balance, setBalance] = useState('');
  //   const child = useCallback(() => <Card />, []);
  useEffect(() => {
    callExternalApi("0x4C18f2a647a57651D6755a959C988Eb8bf4f5Aaf","eth")
    .then(response =>{
      const balance =response.data.result;
       console.log(balance);
       setResult(response);
      setBalance(balance);
    }).catch(error => {
        console.log(error);
      });
  },[]);

  return <>
  {children}
  </>;
}
