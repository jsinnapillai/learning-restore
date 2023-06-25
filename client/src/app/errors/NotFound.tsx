import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 100 }}>
      <Typography variant="h3">
        OOps - we could not find what you are looking for
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Back to Catalog
      </Button>
    </Container>
  );
};

export default NotFound;
