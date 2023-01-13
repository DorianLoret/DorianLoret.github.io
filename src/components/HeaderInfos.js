import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setHeaderData] = useState([]);
  const [btcData, setBtcData] = useState();
  const [ethData, setEthData] = useState();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setHeaderData(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setBtcData(res.data.data.market_cap_percentage.btc));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setEthData(res.data.data.market_cap_percentage.eth));
  }, []);

  return (
    <div className="header-container">
      <ul className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" />
            Watch Tower
          </h1>
        </li>
        <li>
          Crypto-monnaies :{" "}
          {headerData.active_cryptocurrencies &&
            headerData.active_cryptocurrencies.toLocaleString()}
        </li>
        <li>Marchés : {headerData.markets && headerData.markets}</li>
      </ul>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Market Cap :{" "}
          <PercentChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>BTC Dominance : {btcData && btcData.toFixed(1) + "%"}</li>
        <li>ETH Dominance : {ethData && ethData.toFixed(1) + "%"}</li>
      </ul>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
