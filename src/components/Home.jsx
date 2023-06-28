import React from "react";
import { CartState } from "../context/Context";
import Product from "./Product";
import Filters from "./Filters";
import "./styles.css";
const Home = () => {
  const {
    state: { products },
    prodState: { sort, byStock, bySearch, byRating },
  } = CartState();

  let transFormedProducts = [...products];
  if (sort) {
    transFormedProducts = transFormedProducts.sort((a, b) => (sort === "lowToHigh" ? a.price - b.price : b.price - a.price));
  }
  if (byRating) {
    transFormedProducts = transFormedProducts.filter((item) => item.ratings === byRating);
  }
  if (!byStock) {
    transFormedProducts = transFormedProducts.filter((item) => item.inStock > 0);
  }
  if (bySearch) {
    transFormedProducts = transFormedProducts.filter((item) => item.name.toLowerCase().includes(bySearch.toLowerCase()));
  }
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transFormedProducts.map((product) => (
          <Product prod={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
