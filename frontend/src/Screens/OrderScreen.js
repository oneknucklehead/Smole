import React, { useEffect } from 'react'
import { ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import './PlaceOrderScreen.css'
import { getOrderDetails } from '../Actions/orderActions.js'

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const orderId = match.params.id
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    )
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h4>
        Order No.: <span>{order._id}</span>
      </h4>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <div className='addressContainer'>
                Deliver To:{' '}
                <span className='postalAndName'>
                  {order.user.name}, {order.shippingAddress.postalCode}
                </span>
              </div>
              <p className='address'>
                {order.shippingAddress.address},
                {order.shippingAddress.landmark &&
                  order.shippingAddress.landmark + ','}{' '}
                {order.shippingAddress.city}, {order.shippingAddress.state},{' '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup className='my-4'>
            <ListGroup.Item>
              <h4 className='paymentHeader'>Payment Method:</h4>
              <p className='my-0'>Method: {order.paymentMethod}</p>
              {order.isPaid ? (
                <p className='my-0'>
                  Payment Status: Paid on
                  <span style={{ color: 'green' }}>{order.paidAt}</span>
                </p>
              ) : (
                <p className='my-0'>
                  Payment Status: <span style={{ color: 'red' }}>Not paid</span>
                </p>
              )}
              {order.isDelivered ? (
                <p className='my-0'>
                  Delivery Status: Delivered on
                  <span style={{ color: 'green' }}>{order.deliveredAt}</span>
                </p>
              ) : (
                <p className='my-0'>
                  Delivery Status:{' '}
                  <span style={{ color: 'red' }}>Not Delivered</span>
                </p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className='paymentHeader'>Order Items:</h4>
              {order.orderItems.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/${item.shopId}/product/${item.productId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
                          <p className='categoryStyle'>{item.category}</p>
                          <ListGroup horizontal>
                            <ListGroup.Item>Size: {item.size}</ListGroup.Item>
                            <ListGroup.Item>
                              Quantity: {item.quantity}
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = Rs.
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          {/* <BillingComponent /> */}
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
