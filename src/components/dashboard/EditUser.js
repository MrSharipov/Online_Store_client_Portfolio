import AdminNavbar from './AdminNavbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("store_access_token")
        }
    }

    useEffect(()=> {
        const getUser = async () => {
            await axios.get("http://localhost:3040/users", config)
            .then((res)=> {
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch((err)=> {
                alert(err.response.data.message);
                if(err.response.data.statusCode === 401) navigate('/login')
            })
        }
        getUser()
        // eslint-disable-next-line
    },[])

    async function updateUser(name, email, password){
        console.log(name)
        console.log(email)
        console.log(password)

    }
    
    function handleSubmit(e) {
        e.preventDefault();
        updateUser(name, email, password)
    }

  return (
    <div className="box">
      <div className="menu">
        <AdminNavbar />
      </div>
      <div className='container flex_center'>
    <h1>Edit User</h1>
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
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Label for="exampleEmail">
                Email
            </Label>
            </FormGroup>
            <FormGroup floating>
            <Input
                id="examplePassword"
                name="password"
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Label for="examplePassword">
                New Password
            </Label>
            </FormGroup>
            <Button type='submit' color="primary">
            Update
            </Button>
        </Form>
    </div>
    </div>
  )
}

export default EditUser