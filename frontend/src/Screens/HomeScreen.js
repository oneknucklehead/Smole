import React, { useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import './HomeScreen.css'
import { listShops } from '../Actions/shopActions.js'
import Message from '../Components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const shopList = useSelector((state) => state.shopList)
  const { loading, error, shops } = shopList
  useEffect(() => {
    dispatch(listShops())
  }, [dispatch])

  return (
    <>
      <h1>Shops</h1>
      {loading ? (
        <div className='loader'>
          <Loader />
        </div>
      ) : error ? (
        <Message variant='warning' color='red'>
          {error}
        </Message>
      ) : (
        <Row>
          {shops.map((shop) => (
            <Col key={shop._id} sm={12} md={6} lg={3} xl={3} className='my-2 '>
              <Card border='light'>
                <div className='cardContents'>
                  <h2>{shop.name}</h2>
                  <p className='tagline'>"{shop.tagline}"</p>
                  <p>{shop.description}</p>
                  <Link
                    to={`/shop/${shop._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='viewButton'>view</div>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
