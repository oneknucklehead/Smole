import React, { Fragment, useEffect } from 'react'
import { Col, Row, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  createProduct,
  createShop,
  productDelete,
  sellerShopsList,
} from '../Actions/shopActions.js'
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
  SHOP_CREATE_RESET,
  SHOP_DETAILS_RESET,
} from '../Constants/shopConstants.js'
import Loader from '../Components/Loader'
import Message from '../Components/Message.js'
import './SellerAllProductsScreen.css'
import { LinkContainer } from 'react-router-bootstrap'

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

  const shopCreate = useSelector((state) => state.shopCreate)
  const {
    loading: loadingShopCreated,
    error: errorShopCreated,
    success: successShopCreated,
    shop: createdShop,
  } = shopCreate

  const productCreated = useSelector((state) => state.productCreated)
  const {
    loading: loadingProductCreated,
    error: errorProductCreated,
    success: successProductCreated,
    product: createdProduct,
  } = productCreated

  const deleteHandler = (shopid, productid) => {
    if (window.confirm('are you sure you want to delete this product?')) {
      dispatch(productDelete(shopid, productid))
    }
  }
  const createShopHandler = () => {
    dispatch(createShop())
  }
  const createProductHandler = (shopid) => {
    dispatch(createProduct(shopid))
  }

  useEffect(() => {
    dispatch({ type: SHOP_CREATE_RESET })

    if (!userInfo && !userInfo?.isSeller) {
      history.push('/login')
    }
    if (successShopCreated) {
      history.push(`/seller/shop/${createdShop._id}/edit`)
    }
    if (successProductCreated) {
      history.push(
        `/seller/${createdProduct.shopid}/product/${
          createdProduct.products[createdProduct.products.length - 1]._id
        }/edit`
      )
      // console.log(createdProduct[createdProduct.length - 1]._id)
      dispatch({ type: PRODUCT_CREATE_RESET })
    } else {
      dispatch({ type: SHOP_DETAILS_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch(sellerShopsList())
    }
  }, [
    dispatch,
    history,
    userInfo,
    result,
    successShopCreated,
    createdShop,
    successProductCreated,
    createdProduct,
  ])

  return (
    <>
      <Row>
        <Col>
          <h1>Shops</h1>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'right' }}>
          <Button variant='dark' onClick={createShopHandler}>
            + Create Shop
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
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
              {loadingShopCreated && <Loader />}
              {errorShopCreated && (
                <Message variant='danger'>{errorShopCreated}</Message>
              )}
              {loadingProductCreated && <Loader />}
              {errorProductCreated && (
                <Message variant='danger'>{errorProductCreated}</Message>
              )}
              {result && (
                <Message variant='success' dismissible='true'>
                  {result.message}
                </Message>
              )}
              {shops?.map((shop) => (
                <Fragment key={shop._id}>
                  <Row className='my-2 align-items-center'>
                    <h3>
                      {' '}
                      <LinkContainer to={`/seller/shop/${shop._id}/edit`}>
                        <button className='editShopBtn'>Edit</button>
                      </LinkContainer>
                      <button
                        className='editShopBtn'
                        onClick={() => createProductHandler(shop._id)}
                      >
                        + Add product
                      </button>
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
                        <Fragment key={product._id}>
                          <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                              <LinkContainer
                                to={`/seller/${shop._id}/product/${product._id}/edit`}
                              >
                                <button className='editBtn'>
                                  <i className='fas fa-edit'></i>
                                </button>
                              </LinkContainer>
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
                        </Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Fragment>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default SellerAllProductsScreen
