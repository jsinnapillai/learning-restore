import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../../models/products";
import ProductsCard from "./ProductsCard";

interface Props {
  products: Product[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductsCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ProductsList;
