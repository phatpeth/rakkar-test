import { Typography } from "@mui/material";
import { createChart, ColorType, BarData } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
    timeRange,
  } = props;

  const chartContainerRef = useRef(null);
  const [ohlc, setOhlc] = useState("");

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current?.clientWidth,
      height: 300,
      handleScroll: { mouseWheel: false },
      localization: {
        locale: "en-US",
        dateFormat: "MMMM dd, yyyy",
      },
      timeScale: {
        timeVisible: true,
      },
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    newSeries.setData(data);
    chart.timeScale().fitContent();
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const { open, high, low, close } = param.seriesData.get(
          newSeries
        ) as BarData;
        setOhlc(`O: ${open}  H: ${high}  L: ${low}  C: ${close}`);
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, timeRange]);

  return (
    <>
      <Typography>{ohlc}</Typography>
      <div ref={chartContainerRef} />
    </>
  );
};

export default ChartComponent;
