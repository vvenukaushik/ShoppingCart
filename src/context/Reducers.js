import React from "react";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
    case "CHANGE_CART_QTY":
      return { ...state, cart: state.cart.filter((item) => (item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty)) };
    default:
      return state;
  }
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, bySearch: action.payload };
    case "CLEAR_ALL_FILTERS":
      return {
        byStock: false,
        byRating: 0,
        bySearch: "",
        sort: "",
      };
    default:
      return state;
  }
};
