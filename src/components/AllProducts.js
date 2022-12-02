import React, { useEffect, useState } from "react";
import AdminNavbar from "./dashboard/AdminNavbar";
import UserProduct from "./dashboard/UserProduct";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("store_access_token")
    }
}

  useEffect(()=> {
    async function getProducts () {
      await axios.get("http://localhost:3040/products/all", config)
      .then((res)=>{
        setProducts(res.data);
      })
      .catch((err)=> {
        alert(err.response.data.message);
        if(err.response.data.statusCode === 401) navigate('/login')
      })
    }
    getProducts();
    // eslint-disable-next-line
  },[])


  return (
    <div className="box">
      <div className="menu">
        <AdminNavbar />
      </div>
      <div className="content">
        <div className="flexBox container">
          {products.map(product => <UserProduct key={product.id} id={product.id} name={product.name} link={product.link} desc={product.desc} price={product.price} />)}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
