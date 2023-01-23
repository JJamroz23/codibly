import { TextField, Box } from "@mui/material";

const InputComponent = () => {
  return (
    <Box>
      <TextField
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
    </Box>
  );
};

export default InputComponent;
