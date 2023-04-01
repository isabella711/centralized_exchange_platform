import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { Link, useNavigate } from "react-router-dom";
import { Card, Image, Text } from "@mantine/core";

export function Products(props) {
  const coin = useUpdateCoin(props.ticket);
  const priceChange = Number(useGetPriceChange(props.details)).toFixed(2);
  const coinTrim = Number(coin).toFixed(2);
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      // target="_blank"
    >
      <Card.Section>
        <Image src={props.image} height={300} />
      </Card.Section>

      <Text weight={500} size="xl" mt="xl">
        {props.name}
      </Text>

      <Text mt="xl" color="dimmed" size="xl">
        Current Price: ${coinTrim}
        24h Price Change: {priceChange}%
      </Text>
    </Card>
  );
}
