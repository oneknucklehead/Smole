import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../Components/Rating'

const Product = ({ product, shopId }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/${shopId}/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/${shopId}/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text>
        <Card.Text as='h3'>Rs.{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
