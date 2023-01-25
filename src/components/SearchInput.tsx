import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectProductsSearchText,
  setPage,
  setSearchId,
} from "../store/slices/productsSlice";

const SearchInput = () => {
  const searchId = useAppSelector(selectProductsSearchText);
  const [value, setValue] = useState(String(searchId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value === String(searchId)) return;
    const timeout = setTimeout(() => {
      dispatch(setSearchId(Number(value)));
      dispatch(setPage(1));
    }, 350);
    return () => clearTimeout(timeout);
  }, [dispatch, value, searchId]);

  return (
    <Box>
      <TextField
        onChange={({ target: { value } }) =>
          setValue(Number(value) < 0 ? "0" : value)
        }
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={value}
        onKeyPress={(event) => {
          if (event?.key === "-" || event?.key === "+") {
            event.preventDefault();
          }
          if (event?.key === "e") {
            event.preventDefault();
          }
        }}
      />
    </Box>
  );
};

export default SearchInput;
