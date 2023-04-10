import { Typography } from "@mui/material";
import { red, teal } from "@mui/material/colors";
import { createChart, ColorType, BarData } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

const ChartComponent = (props) => {
  const { data, timeRange } = props;

  const chartContainerRef = useRef(null);
  const [ohlc, setOhlc] = useState("");
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
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
      upColor: teal[400],
      downColor: red[400],
      borderVisible: false,
      wickUpColor: teal[400],
      wickDownColor: red[400],
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
        setIsUp(open < close);
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
      <Typography
        color={({ palette }) =>
          isUp ? palette.primary.main : palette.error.main
        }
      >
        {ohlc}
      </Typography>
      <div ref={chartContainerRef} />
    </>
  );
};

export default ChartComponent;
