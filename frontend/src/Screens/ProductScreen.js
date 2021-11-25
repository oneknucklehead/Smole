import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import './ProductScreen.css'
import { productDetail } from '../Actions/shopActions.js'
import Message from '../Components/Message.js'
import { clearCart } from '../Actions/cartActions.js'

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [diffShop, setDiffShop] = useState(false)
  var diffShopSetter = false
  const [qty, setQty] = useState(1)
  const [itemSize, setItemSize] = useState('')
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  cartItems &&
    cartItems.length > 0 &&
    cartItems?.map((item) => {
      if (item.shopId !== match.params.shopid) {
        // setDiffShop(true)
        // diffShop = true
        // console.log(diffShop)
        // useEffect(() => {
        diffShopSetter = true
        // }, [])
        return diffShopSetter
      }
    })
  const [open, setOpen] = useState(false)
  const dropdownHandler = () => {
    setOpen(!open)
  }
  const addToCartHandler = () => {
    if (itemSize !== '' && !diffShop)
      history.push(
        `/cart/${match.params.shopid}/${match.params.productid}?qty=${qty}?size=${itemSize}`
      )
  }
  const clearCartHandler = () => {
    dispatch(clearCart())
    // diffShop = false
    setDiffShop(false)
    diffShopSetter = false
  }
  const sizeHandler = (e) => {
    setItemSize(e.target.value)
  }
  useEffect(() => {
    dispatch(productDetail(match.params.shopid, match.params.productid))
    if (diffShopSetter) {
      setDiffShop(true)
    }
  }, [match, dispatch, diffShopSetter])

  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back Home
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='warning'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid thumbnail />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='productName'>{product.name}</h2>
                <p className='category'>{product.category}</p>
                {/* <p className='shopName'> By {shop.name}</p> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className='fw-bold'>
                Price: Rs. {product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <div className='my-2 fw-bold'>Please select size.</div>
                </Row>
                <Row>
                  <ul className='sizeContainer'>
                    {product.sizes?.map((size) => (
                      <li style={{ listStyle: 'none' }}>
                        <input
                          type='radio'
                          id={size}
                          value={size}
                          name='sizeSelector'
                          disabled={product.countInStock === 0}
                          onClick={sizeHandler}
                        ></input>
                        <label for={size}>
                          <span>{size}</span>
                        </label>
                      </li>
                    ))}
                  </ul>

                  {product.countInStock !== 0 && itemSize === '' ? (
                    <Message variant='danger' color='red'>
                      Please select size.
                    </Message>
                  ) : (
                    ''
                  )}
                </Row>

                <Row>
                  <div className='my-2 fw-bold'>
                    {product.countInStock > 0 &&
                      `Total ${product.countInStock} left`}
                  </div>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <form>
                    <label for='qty' className='fw-bold'>
                      Quantity
                    </label>
                    <select
                      value={qty}
                      id='qty'
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((count) => (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </ListGroup.Item>
              )}
              <ListGroup.Item variant='flush'>
                <Row className='fw-bold my-2'>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {diffShop && (
                <ListGroup.Item>
                  <Message>
                    You can only add items from one single shop to your cart at
                    a time. You can clear your cart if you wish.
                  </Message>
                  <div className='d-grid gap-2'>
                    <button
                      className='button'
                      onClick={clearCartHandler}
                      style={{
                        backgroundColor:
                          cartItems.length !== 0 ? '#37bdae' : 'gray',
                        cursor:
                          cartItems.length !== 0 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </ListGroup.Item>
              )}
              {/* {cartItems &&
                cartItems.length > 0 &&
                cartItems?.map((item) => (
                  <ListGroup.Item>
                    {match.params.shopid !== item.shopId && (
                      <>
                        <Message>
                          You can only add items from one single shop to your
                          cart at a time. You can clear your cart if you wish.
                        </Message>
                        <div className='d-grid gap-2'>
                          <button
                            className='button'
                            onClick={clearCartHandler}
                            style={{
                              backgroundColor:
                                cartItems.length !== 0 ? '#37bdae' : 'gray',
                              cursor:
                                cartItems.length !== 0
                                  ? 'pointer'
                                  : 'not-allowed',
                            }}
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    )}
                  </ListGroup.Item>
                ))} */}
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <button
                    onClick={addToCartHandler}
                    className='button'
                    disabled={diffShop === true || product.countInStock === 0}
                    style={{
                      backgroundColor:
                        product.countInStock > 0 && diffShop === false
                          ? '#37bdae'
                          : 'gray',
                      cursor:
                        product.countInStock > 0 && diffShop === false
                          ? 'pointer'
                          : 'not-allowed',
                    }}
                  >
                    {product.countInStock > 0 ? 'Add to Cart' : 'Out Of Stock'}
                  </button>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='dropdownContainer' onClick={dropdownHandler}>
                  Description:<span>{open ? '▲' : '▼'}</span>
                </div>
                <div style={{ display: open ? '' : 'none' }}>
                  {product.description}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
