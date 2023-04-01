import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { Link, useNavigate } from "react-router-dom";
import { Space, Card, Image, Text, MantineProvider } from "@mantine/core";

export function Products(props) {
  const coin = useUpdateCoin(props.ticket);
  const priceChange = Number(useGetPriceChange(props.details)).toFixed(2);
  const coinTrim = Number(coin).toFixed(2);
  const navigate = useNavigate();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Text: {
            styles: {
              root: { fontSize: 20 },
            },
          },
        },
      }}
    >
      <Card
        shadow="xl"
        padding="xl"
        component="a"
        // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        // target="_blank"
      >
        <Card.Section>
          <Image src={props.image} height={300} />
        </Card.Section>

        <Card.Section>
          <Text weight={1000} mt="xl">
            {props.name}
          </Text>

          <Text mt="xl" color="dimmed">
            Current Price: ${coinTrim}
            <Space h="xl" />
            24h Price Change: {priceChange}%
          </Text>
        </Card.Section>
      </Card>
    </MantineProvider>
  );
}
