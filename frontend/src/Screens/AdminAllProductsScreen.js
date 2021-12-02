import Button from '@restart/ui/esm/Button'
import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listShops } from '../Actions/shopActions.js'
import Loader from '../Components/Loader'
import Message from '../Components/Message.js'
import './AdminAllProductsScreen.css'

const AdminAllProducts = ({ history }) => {
  const dispatch = useDispatch()
  const shopList = useSelector((state) => state.shopList)
  const { loading, error, shops } = shopList

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const deleteHandler = (id) => {
    console.log('delete')
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listShops())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row>
        {/* <Col md={3}>
          <ListGroup>
            <Link to='/profile' className='link'>
              <ListGroup.Item action>Profile</ListGroup.Item>
            </Link>
            <Link to='/myorders' className='link'>
              <ListGroup.Item action>Orders</ListGroup.Item>
            </Link>
            {userInfo && userInfo.isAdmin && (
              <Link to='/admin/userlist' className='link'>
                <ListGroup.Item action>Users</ListGroup.Item>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link to='/admin/productlist' className='link'>
                <ListGroup.Item action>Products</ListGroup.Item>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link to='/admin/orderlist' className='link'>
                <ListGroup.Item action>Orders</ListGroup.Item>
              </Link>
            )}
          </ListGroup>
        </Col> */}
        <Col>
          <h1>Shops</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {shops?.map((shop) => (
                <>
                  <h3>{shop.name}</h3>
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
                                onClick={() => deleteHandler(product._id)}
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

export default AdminAllProducts

// <Table striped bordered hover responsive className='table-sm'>
//   {shops.map((shop) => (
//     <>
//       {/* <h3>
//         {shop.name}
//         <span>
//           <Link to={`/shop/${shop._id}`}>#{shop._id}</Link>
//         </span>
//       </h3> */}
//       <p>{shop.name}</p>

//     </>
//   ))}
// </Table>
