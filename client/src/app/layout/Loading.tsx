import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  message?: string;
}

const Loading = ({ message = "Loading..." }: Props) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
