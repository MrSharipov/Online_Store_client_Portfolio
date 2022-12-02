import AdminNavbar from './AdminNavbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [categoryId, setCategoryId] = useState('');

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
        await axios.post("http://localhost:3040/categories", {name}, config)
        .then((res)=>{
            alert('Category is successfully created');
            window.location.replace("/addcategory")
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest();
    }


    //////// Edit category ///////////
    
    function editCategory(id, index){
        setName(categories[index].name);
        setIsUpdate(true);
        setCategoryId(id);
    }

    async function sendUpdateReq(){
        await axios.put("http://localhost:3040/categories/" + categoryId, {name}, config)
        .then((res)=> {
            alert("Successfully updated")
            window.location.replace("/addcategory")

        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }

    ////////////// End ///////////////



    ////////// Remove category ///////

    async function removeCategory(id) {
        await axios.delete("http://localhost:3040/categories/" + id, config)
        .then((res)=> {
            alert("Successfully deleted")
            window.location.replace("/addcategory")

        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }

    ////////////// End ///////////////


  return (
    <div className="box">
      <div className="menu">
        <AdminNavbar />
      </div>
      <div className='container flex_center'>
           <div className='myFlex'>
                <Form onSubmit={handleSubmit}>
                <h4>Create/Update Category</h4>
                    <FormGroup floating>
                    <Input
                        id="exampleName"
                        name="name"
                        placeholder="Email"
                        type="text"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <Label for="exampleName">
                        Category name...
                    </Label>
                    </FormGroup>
                    {!isUpdate ? 
                        <Button type='submit' color="primary">
                        Create
                        </Button> :
                        <Button color="primary" onClick={sendUpdateReq}>
                        Update
                        </Button>
                    }
                    
                </Form>
                <div>
                    <h4>All categories:</h4>
                    {categories.map((ctg, index) => (<h5 className='p-2' key={ctg.id}>- {ctg.name} <BiEdit onClick={()=>{editCategory(ctg.id, index)}} color='green' size={'25px'} cursor={'pointer'} /> <RiDeleteBinLine color='red' size={'25px'} cursor={'pointer'} onClick={()=>{removeCategory(ctg.id)}} /></h5>))}
                </div>
              
           </div>
            
    </div>
    </div>
  )
}

export default AddCategory