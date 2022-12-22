import React from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button} from 'reactstrap';
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/userSlice'

const ItemCard = (props) => {
    const dispatch = useDispatch()
    
    function addToCart(productId) {
        let all_Items = JSON.parse(localStorage.getItem("all_Items")) || [];
        all_Items.push(productId);
        localStorage.setItem("all_Items", JSON.stringify(all_Items));
        dispatch(addItem({amount: all_Items.length}));
    }
  return (
    <>
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

            <Button color='success' size='sm' onClick={()=>{addToCart(props.id)}}>
                Add to card
            </Button>
            </CardBody>
        </Card>
    </>
  )
}

export default ItemCard