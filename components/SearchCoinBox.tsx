import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { teal } from "@mui/material/colors";

const SearchCoinBox = ({ handleOnChange, defaultValue }) => {
  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false")
      .then((res) => res.json())
      .then((data) => {
        setCoinList(
          data.map((coin) => {
            return {
              id: coin.id,
              label: coin.name,
              symbol: coin.symbol,
            };
          })
        );
      });
  }, []);
  return (
    <Autocomplete
      blurOnSelect
      defaultValue={defaultValue}
      disableClearable
      disablePortal
      id="search-coin-box"
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={handleOnChange}
      options={coinList}
      sx={{ minWidth: "580px" }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: null,
          }}
          InputLabelProps={{ style: { display: "none" } }}
          placeholder="Search Here"
          variant="standard"
          sx={{
            ".MuiInputBase-input.MuiInput-input": {
              fontSize: "48px",
            },
            "& .MuiInput-input:hover": {
              backgroundColor: teal[50],
            },
          }}
          fullWidth
        />
      )}
    />
  );
};

export default SearchCoinBox;
