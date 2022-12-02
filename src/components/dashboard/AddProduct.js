import AdminNavbar from './AdminNavbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();

    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("store_access_token")
        }
    }

    useEffect(()=> {
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
        // eslint-disable-next-line
    },[])

    async function sendRequest(){
        await axios.post("http://localhost:3040/products", {name, link, categoryId, price, desc}, config)
        .then((res)=>{
            alert('Product successfully created');
            navigate("/");
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest();
    }

  return (
    <div className="box">
      <div className="menu">
        <AdminNavbar />
      </div>
      <div className='container flex_center'>
    <h1>Create Product</h1>
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

export default AddProduct