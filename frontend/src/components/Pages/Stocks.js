import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// ask how to use procces.env
export default function Stocks() {
  const [stocks, setStocks] = useState();
  useEffect(() => {
    const ac = new AbortController();
    fetch(
      "https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c5700c6ae1msh12bde36c477fe55p1ec385jsn37c9d32b7dce",
          "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
        },
      }
      // `https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=10m&last=1000&token=${process.env.REACT_APP_IEX_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setStocks(data.data));
    return () => ac.abort();
  }, []);
  if (stocks) {
    console.log(stocks);
  }
  return (
    <Wrapper>
      <StockInfo>
        {stocks &&
          stocks.map((stock) => {
            return (
              <Link to={`/stocks/${stock.symbol}/${stock.name}`}>
                {stock.symbol}
              </Link>
            );
          })}
      </StockInfo>
    </Wrapper>
  );
}

const StockInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  background-color: #2196f3;
  padding: 10px;
`;
const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
`;
