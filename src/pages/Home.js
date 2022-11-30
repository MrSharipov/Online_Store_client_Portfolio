import React, { useEffect, useState } from 'react'
import Category from '../components/Category'

const Home = () => {
    const [catgories, setCategories] = useState([]);
    useEffect(()=>{
        console.log("Salom")
    },[]);
  return (
    <>

        <Category />
    </>
  )
}

export default Home