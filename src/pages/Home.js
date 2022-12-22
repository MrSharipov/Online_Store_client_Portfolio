import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
    const getCategories = async() => {
        await axios.get("http://localhost:3040/categories/all")
        .then((res) => {
            setCategories(res.data);
          })
          .catch((error) => {
            alert(error.response.data.message);
            navigate('/login')
          })  
        }
        getCategories();
    },[navigate]);

    const CardList = categories.map(ctg =>
        <div key={ctg.id}>
        {ctg.Products.length !== 0 ?
          <>
            <h1 className='pt-3 pb-3'>{ctg.name}</h1>
            <div className='flexBox'>
            {ctg.Products.map(product => 
                <ItemCard
                    key={product.id} 
                    id={product.id} 
                    name={product.name}
                    link={product.link}
                    price={product.price}
                    desc={product.desc}
                />)}
            </div>
          </> : " "}
        </div>)


    
  return (
    <>
    <div className='container'>
        {CardList}
    </div>
    <Footer /> 
    </>
  )
}

export default Home