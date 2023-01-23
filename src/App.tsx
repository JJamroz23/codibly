import { Box, Paper } from "@mui/material";
import InputComponent from "./components/Input";
import TableBox from "./components/Table";

const App = () => {
  return (
    <Paper sx={{ maxWidth: "70vw", p: 3, m: "auto" }}>
      <Box display="flex" flexDirection="column" gap={3} alignItems="center">
        <InputComponent />
        <TableBox />
      </Box>
    </Paper>
  );
};

export default App;
