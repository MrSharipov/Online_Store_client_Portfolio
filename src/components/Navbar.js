import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { addItem } from '../redux/userSlice'


const Navbar = (props) => {
  let decodedJwt;
  let token = localStorage.getItem("store_access_token");
  const currentTime = new Date().getTime();
  let isLogged = false;
  if(!!token){
    decodedJwt = jwt_decode(token);
    var jwtExpTime = decodedJwt.exp * 1000;
    isLogged = (!!token && jwtExpTime - currentTime > 0);
  }

  function logOut() {
    localStorage.clear();
    window.location.replace("/login");
  }

  const dispatch = useDispatch()
  const all_Items = JSON.parse(localStorage.getItem("all_Items")) || [];
  dispatch(addItem({amount: all_Items.length}));
  const count = useSelector((state) => state.user.itemAmount)

 
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
          <li className="cartItem">
            <Link to="/yourbag">Cart</Link><span className="count">{count}</span>
          </li>
         
            {isLogged ?  <li><Link to="/admin">Dashboard</Link></li>: ""}

          <li>
             {!isLogged ? <Link to="/login">Login</Link> : 
             <button className="logout" onClick={()=>{logOut()}}>Log out</button>}
          </li>
        </div>
      </ul>
      <hr />
      {props.children}
    </>
  );
};

export default Navbar;
