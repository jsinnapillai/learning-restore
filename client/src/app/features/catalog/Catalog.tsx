import React, { useEffect, useState } from "react";
import { Product } from "../../../models/products";
import agent from "../../api/agent";
import Loading from "../../layout/Loading";
import ProductsList from "./ProductsList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    // fetch("http://localhost:5000/api/Products/")
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data))
    //   .catch((error) => console.log(error));
  }, []);

  if (loading) return <Loading message="Catalog Loading ..." />;

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
