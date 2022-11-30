import React, { useState } from 'react'
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function getToken(name, email, password){
        try{
            const res = await axios.post("http://localhost:3040/auth/signup", {name, email, password});
            localStorage.setItem("store_access_token", res.data.access_token);
            navigate("/");
        }
        catch(err){
            alert(err.response.data.message);
        }
       
    }

    function handleSubmit(e) {
        e.preventDefault();
        getToken(name, email, password)
    }
  return (
    <div className='container flex_center'>
    <h1>Sign Up</h1>
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
            {' '}
            <FormGroup floating>
            <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Label for="examplePassword">
                Password
            </Label>
            </FormGroup>
            {' '}
            <Button type='submit' color="primary">
            Sign up
            </Button>
            <FormText className='fs-6'>  Or <Link to="/login">log in</Link> now</FormText>
        </Form>
    </div>
  )
}

export default SignUp