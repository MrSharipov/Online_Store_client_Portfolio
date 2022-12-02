import React from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button} from 'reactstrap';

const ItemCard = (props) => {
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

            <Button color='success' size='sm'>
                Add to card
            </Button>
            </CardBody>
        </Card>
    </>
  )
}

export default ItemCard