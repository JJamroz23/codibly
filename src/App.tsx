import { Box, Paper } from "@mui/material";
import SearchInput from "./components/SearchInput";
import ProductsTable from "./components/Table";

const App = () => {
  return (
    <Paper sx={{ maxWidth: "70vw", p: 3, m: "auto" }}>
      <Box display="flex" flexDirection="column" gap={3} alignItems="center">
        <SearchInput />
        <ProductsTable />
      </Box>
    </Paper>
  );
};

export default App;
