import Button from '@restart/ui/esm/Button'
import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  listShops,
  productDelete,
  sellerShopsList,
} from '../Actions/shopActions.js'
import Loader from '../Components/Loader'
import Message from '../Components/Message.js'
import './AdminAllProductsScreen.css'

const SellerAllProductsScreen = ({ history }) => {
  const dispatch = useDispatch()
  const sellerShops = useSelector((state) => state.sellerShops)
  const { loading, error, shops } = sellerShops

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const productDeleted = useSelector((state) => state.productDeleted)
  const {
    loading: loadingDeleted,
    error: errorDeleted,
    result,
  } = productDeleted

  const deleteHandler = (shopid, productid) => {
    if (window.confirm('are you sure you want to delete this product?')) {
      dispatch(productDelete(shopid, productid))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isSeller) {
      dispatch(sellerShopsList())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, result])

  return (
    <>
      <Row>
        <Col>
          <h1>Shops</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {loadingDeleted && <Loader />}
              {errorDeleted && (
                <Message variant='danger'>{errorDeleted}</Message>
              )}
              {result && <Message variant='success'>{result.message}</Message>}
              {shops?.map((shop) => (
                <>
                  <Row className='my-2'>
                    <h3>
                      {' '}
                      <Link to={`/shop/${shop._id}`}>{shop.name}</Link>
                    </h3>
                  </Row>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shop.products.map((product) => (
                        <>
                          <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                              <button
                                variant='danger'
                                className='deleteBtn'
                                onClick={() =>
                                  deleteHandler(shop._id, product._id)
                                }
                              >
                                <i className='fas fa-trash'></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default SellerAllProductsScreen
