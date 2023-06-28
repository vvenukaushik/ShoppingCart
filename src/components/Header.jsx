import React from "react";
import { Container, Navbar, FormControl, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    prodDispatch,
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: "80px" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            // style={{ width: 400 }}
            placeholder="Search"
            className="m-auto"
            onChange={(e) => {
              prodDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}></FormControl>
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px"></FaShoppingCart>
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img src={prod.image} alt={prod.name} className="cartItemImg" />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>$ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>Go to Cart</Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}> Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
