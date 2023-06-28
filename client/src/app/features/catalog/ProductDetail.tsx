import { Divider, Grid, Table, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableRow from "@mui/material/TableRow/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../models/products";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import NotFound from "../../errors/NotFound";
import Loading from "../../layout/Loading";

const ProductDetail = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setIsloading(false));
  }, [id, item]);

  const handleinputChange = (event: any) => {
    let va = parseInt(event.target.value);
    if (va >= 0) setQuantity(va);
  };

  const handleUpdateCart = () => {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updateQuantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  };

  if (isloading) return <Loading message="Product Loading ..." />;

  if (!product) return <NotFound />;

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{product.name} </Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <Typography variant="h4" color="secondary">
            {(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in Stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleinputChange}
                variant="outlined"
                type="number"
                label="quantity in Cart"
                value={quantity}
              />
            </Grid>
            <Grid xs={6}>
              <LoadingButton
                disabled={
                  item?.quantity === quantity || (!item && quantity === 0)
                }
                loading={submitting}
                onClick={handleUpdateCart}
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
              >
                {item ? "update Quantity" : " Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductDetail;
