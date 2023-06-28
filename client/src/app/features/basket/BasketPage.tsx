import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";

import { useStoreContext } from "../../context/StoreContext";
import BasketSummary from "./BasketSummary";

const BasketPage = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    isLoading: false,
    name: "",
  });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ isLoading: true, name: name });
    agent.Basket.addItem(productId, 1)
      .then((response) => setBasket(response))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ isLoading: false, name: "" }));
  };

  const handleRemoveItem = (
    productId: number,
    quantity: number = 1,
    name: string
  ) => {
    setStatus({ isLoading: true, name: name });
    agent.Basket.removeItem(productId, 1)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ isLoading: false, name: "" }));
  };

  if (!basket)
    return <Typography variant="h3">Your Basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Sub Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.productName}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.productName}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignContent="space-between"
                    alignItems="center"
                    gap="5"
                  >
                    <LoadingButton
                      loading={
                        status.isLoading &&
                        status.name === "remove" + item.productId
                      }
                      color="error"
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          "remove" + item.productId
                        )
                      }
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={
                        status.isLoading &&
                        status.name === "Add" + item.productId
                      }
                      color="secondary"
                      onClick={() =>
                        handleAddItem(item.productId, "Add" + item.productId)
                      }
                    >
                      <Add />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.isLoading &&
                      status.name === "delete" + item.productId
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "delete" + item.productId
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid xs={6}></Grid>
        <Grid xs={6}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained"></Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
