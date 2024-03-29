import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((accm, val) => accm + Number(val.price) * val.qty, 0));
  }, [cart]);
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{item.name}</span>
                </Col>
                <Col md={2}>
                  <span>$ {item.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={item.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: item.id, qty: e.target.value },
                      });
                    }}>
                    {[...Array(item.inStock).keys()].map((value) => (
                      <option key={value + 1}>{value + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}>
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters" style={{ width: "30%" }}>
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total} </span>
        <Button type="button" disabled={cart.length === 0}>
          {" "}
          Proceed to Checkout{" "}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
