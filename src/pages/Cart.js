import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
// import { redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';


const Cart = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const all_Items = JSON.parse(localStorage.getItem("all_Items")) || [];

    useEffect(()=> {
        const getProduct = async (id) => {
            await axios.get("http://localhost:3040/products/" + id)
            .then((res)=> {
               setSelectedProducts(prev => [...prev, res.data]);
            })
            .catch((err)=> {
                console.log(err.response.data.message)
            })
        }
        all_Items.forEach(item => {
          getProduct(item)
        });
        // eslint-disable-next-line
    },[])

    function remove() {
      localStorage.removeItem("all_Items");
      window.location.reload();
    }

  return (
    <>
      <Table className='container my-5'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
        {console.log(selectedProducts)}
          {selectedProducts.map((item, index) => (
            <CartItem key={index} id={item.id}  name = {item.name} link = {item.link} price = {item.price} remove = {remove} />
            ))}
        </tbody>
      </Table>
    </> 
  )
}

export default Cart