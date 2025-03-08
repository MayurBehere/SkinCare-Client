import { Box, Typography } from "@mui/material";

function Main() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "grey.300",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Main Page - Upload Image
      </Typography>
    </Box>
  );
}

export default Main;