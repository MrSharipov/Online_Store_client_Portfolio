import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <ul className="container">
        <li>
          <h1>
            <Link to="/">Online Store</Link>
          </h1>
        </li>
        <div className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      </ul>
      <hr />
      {props.children}
    </>
  );
};

export default Navbar;
