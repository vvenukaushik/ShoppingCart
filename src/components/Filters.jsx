import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  const [rate, setRate] = useState(3);
  const {
    prodState: { byStock, byRating, bySearch, sortBy, sort },
    prodDispatch,
  } = CartState();
  return (
    <div className="filters">
      <span className="title"> Filters</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={"inline1"}
          onChange={() =>
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={"inline2"}
          onChange={() => {
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            });
          }}
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={"inline3"}
          checked={byStock}
          onChange={() => {
            prodDispatch({
              type: "FILTER_BY_STOCK",
              payload: byStock,
            });
          }}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}> Rating: </label>
        <Rating rating={byRating} style={{ cursor: "pointer" }} onClick={(i) => prodDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })} />
      </span>
      <Button
        variant="light"
        onClick={() => {
          prodDispatch({
            type: "CLEAR_ALL_FILTERS",
          });
        }}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
