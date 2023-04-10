import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { timeRanges } from "../types";
import type { TTimeRange } from "../types";

const ToggleTimeRange = ({
  onChange: handleChange,
  value,
}: ToggleButtonGroupProps) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {timeRanges.map((time: TTimeRange) => (
        <ToggleButton sx={{ width: "60px" }} value={time} key={time}>
          {time}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleTimeRange;
