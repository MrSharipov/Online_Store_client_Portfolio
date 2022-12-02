import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button} from 'reactstrap';

const UserProduct = (props) => {
    const navigate = useNavigate()
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("store_access_token")
        }
    }

    async function removeProduct(id) {
        await axios.delete("http://localhost:3040/products/" + id, config)
        .then((res)=>{
           alert("Product successfully removed")
           navigate('/');
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }
  return (
        <Card className='cardWidth'>
            <CardImg
            alt="Card image cap"
            src={props.link}
            top
            width="100%"
            />
            <CardBody>
            <CardTitle tag="h5">
                {props.name}
            </CardTitle>
            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
                {'$' + props.price}
            </CardSubtitle>
            <CardText>
                {props.desc}
            </CardText>
            <span className='me-5'>⭐⭐⭐⭐⭐ ({Math.floor(Math.random() * 200)})</span>
            <br />
            <Link to={`/editproduct/${props.id}`} >
                <Button color='success' size='sm' className='me-2'>
                    Edit
                </Button>
            </Link>
                <Button color='danger' size='sm' onClick={()=> {removeProduct(props.id)}}>
                    Delete
                </Button>
            
            </CardBody>
        </Card>
  )
}

export default UserProduct