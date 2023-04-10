import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DownIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import UpIcon from "@mui/icons-material/KeyboardArrowUpSharp";

const CoinDetailBox = ({ coinID }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [percent24, setPercent24] = useState(0);

  const getPercentColor = ({ palette }) => {
    if (percent24 === 0) return "initial";
    if (percent24 > 0) return palette.primary.main;
    return palette.error.main;
  };

  useEffect(() => {
    if (!coinID) return;
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setImageSrc(data.image?.small);
        setSymbol(data.symbol);
        setPrice(data.market_data?.current_price?.thb.toLocaleString("en-US"));
        const price_change_percentage_24h: number =
          data.market_data?.price_change_percentage_24h.toFixed(2);
        setPercent24(price_change_percentage_24h);
      });
  }, [coinID]);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      columnGap={3}
    >
      <Box pt={0.5}>
        <img src={imageSrc} />
      </Box>
      <Typography textTransform="uppercase" fontSize="40px">
        {symbol}
      </Typography>
      <Typography fontSize="32px">{`฿${price}`}</Typography>
      <Box display="flex" alignItems="center">
        {percent24 < 0 && <DownIcon color="error" />}
        {percent24 > 0 && <UpIcon color="primary" />}
        <Typography fontSize="28px" color={getPercentColor}>
          {`${percent24}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CoinDetailBox;
