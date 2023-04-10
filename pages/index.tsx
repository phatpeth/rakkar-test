import ChartComponent from "../components/Chart";
import Layout from "../components/Layout";
import Head from "next/head";
import SearchCoinBox from "../components/SearchCoinBox";
import { Grid } from "@mui/material";
import ToggleTimeRange from "../components/ToggleTimeRange";
import { useEffect, useState } from "react";
import { TTimeRange } from "../types";

const getDays = (timeRange: TTimeRange) => {
  if (timeRange === "24h") return 1;
  if (timeRange === "Max") return "max";
  if (timeRange === "1y") return 365;
  return timeRange.replace("d", "");
};

const App = () => {
  const [timeRange, setTimeRange] = useState<TTimeRange>("14d");
  const [coinID, setCoinID] = useState("");
  const [chartData, setChartData] = useState(null);
  const [trendingCoin, setTrendingCoin] = useState(null);

  if (!trendingCoin) {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        const coin = data.coins[0].item;
        setCoinID(coin.id);
        setTrendingCoin({
          id: coin.id,
          label: coin.name,
          symbol: coin.symbol,
        });
      });
  }

  useEffect(() => {
    if (!coinID) return;
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinID}/ohlc?vs_currency=thb&days=${getDays(
        timeRange
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setChartData(
          data.map((tick) => {
            return {
              time: +tick[0] / 1000,
              open: tick[1],
              high: tick[2],
              low: tick[3],
              close: tick[4],
            };
          })
        );
      });
  }, [coinID, timeRange]);

  const handleOnChange = (_, data) => {
    const { id, label: name, symbol } = data;
    setCoinID(id);
  };

  const handleOnTimeRangeChange = (_, data: TTimeRange) => {
    setTimeRange(data);
  };

  if (!chartData) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Coin Search</title>
      </Head>
      <Layout>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item mb={2}>
            <SearchCoinBox
              handleOnChange={handleOnChange}
              defaultValue={trendingCoin}
            />
          </Grid>
          <Grid item mb={2}>
            <ToggleTimeRange
              onChange={handleOnTimeRangeChange}
              value={timeRange}
            />
          </Grid>
        </Grid>
        <ChartComponent data={chartData} timeRange={timeRange}></ChartComponent>
      </Layout>
    </>
  );
};

export default App;
