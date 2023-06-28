import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, filterReducer } from "./Reducers";
const Cart = createContext();

const Context = ({ children }) => {
  const stockArr = [0, 3, 5, 7, 9];
  const ratingArr = [1, 2, 3, 4, 5];
  //faker.seed(99);
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({ category: "product" }), //faker.image.url(),
    inStock: stockArr[Math.floor(Math.random() * stockArr.length)],
    // fastDelivery: faker.random.boolean(),
    ratings: ratingArr[Math.floor(Math.random() * ratingArr.length)],
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [prodState, prodDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    sort: "",
    bySearch: "",
  });
  return <Cart.Provider value={{ state, prodState, dispatch, prodDispatch }}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
