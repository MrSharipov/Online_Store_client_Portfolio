import AdminNavbar from './AdminNavbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("store_access_token")
        }
    }

    useEffect(()=> {
        const getProduct = async () => {
            await axios.get("http://localhost:3040/products/" + id, config)
            .then((res)=> {
                setName(res.data.name);
                setLink(res.data.link);
                setDesc(res.data.desc);
                setPrice(res.data.price);
                setCategoryId(res.data.categoryId);
                console.log(res.data.desc)
            })
            .catch((err)=> {
                alert(err.response.data.message);
                if(err.response.data.statusCode === 401) navigate('/login')
            })
        }

        async function getCategories(){
            await axios.get("http://localhost:3040/categories/all", config)
            .then((res)=>{
                setCategories(res.data);
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        }
        getCategories()
        getProduct()
        // eslint-disable-next-line
    },[])

    async function sendRequest(name, link, price, desc){
        await axios.put("http://localhost:3040/products/" + id, {name, link, price, categoryId, desc}, config)
        .then((res)=> {
            alert("Successfully updated")
            navigate("/");
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
       
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest(name, link, price, desc)
    }

  return (
    <div className="box">
      <div className="menu">
        <AdminNavbar />
      </div>
      <div className='container flex_center'>
    <h1>Update Product</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup floating>
            <Input
                id="exampleName"
                name="email"
                placeholder="Email"
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Label for="exampleName">
                Name
            </Label>
            </FormGroup>
            <FormGroup floating>
            <Input
                id="exampleSelect"
                name="select"
                placeholder="Select category"
                type="select"
                value={categoryId}
                onChange={(e)=>{setCategoryId(e.target.value)}}
            >
                <option value="">Select category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </Input>
            <Label for="exampleEmail">
                Select category
            </Label>
            </FormGroup>
            <FormGroup floating>
            <Input
                id="exampleLink"
                name="link"
                placeholder="Image link"
                type="text"
                value={link}
                onChange={(e)=>{setLink(e.target.value)}}
            />
            <Label for="exampleEmail">
                Link for image
            </Label>
            </FormGroup>
            <FormGroup floating>
            <Input
                id="examplePrice"
                name="price"
                placeholder="Price"
                type="text"
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}
            />
            <Label for="examplePrice">
                Price
            </Label>
            </FormGroup>
            <FormGroup floating>
            <Input
                id="exampleDesc"
                name="desc"
                placeholder="Description"
                type="textarea"
                value={desc}
                onChange={(e)=>{setDesc(e.target.value)}}
            />
            <Label for="examplePrice">
            Description
            </Label>
            </FormGroup>
            <Button type='submit' color="primary">
            Create
            </Button>
        </Form>
    </div>
    </div>
  )
}

export default EditProduct