import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      data-testid="loader"
      sx={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
