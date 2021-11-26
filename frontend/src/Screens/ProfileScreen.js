import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import { updateUserDetails, userDetails } from '../Actions/userActions.js'
import './ProfileScreen.css'
const ProfileScreen = ({ history, location, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [errorPass, setErrorPass] = useState('')

  const [componentToMount, setComponentToMount] = useState('')

  const dispatch = useDispatch()
  const details = useSelector((state) => state.details)
  const { loadingUser, error, user } = details

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const updateDetails = useSelector((state) => state.updateDetails)
  const { success } = updateDetails

  const updateHandler = (e) => {
    e.preventDefault()
    if (password !== cPassword) {
      setErrorPass('Passwords not matched.')
    } else {
      setErrorPass('')
      dispatch(updateUserDetails({ id: user._id, name, email, password }))
    }
  }
  useEffect(() => {
    const component = match.path.split('/')[1]
    setComponentToMount(component)
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(userDetails('profile'))
      } else {
        if (!loadingUser) {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }
  }, [dispatch, history, userInfo, user, loadingUser, match])

  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <ListGroup>
              <Link to='/profile' className='link'>
                <ListGroup.Item action>Profile</ListGroup.Item>
              </Link>
              <Link to='/orders' className='link'>
                <ListGroup.Item action>Orders</ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>

          <Col md={9}>
            {componentToMount === 'profile' && (
              <>
                <h3>My Profile</h3>
                <Form onSubmit={updateHandler}>
                  <ListGroup>
                    <Row>
                      <Col lg={4}>
                        <ListGroup.Item className='py-5'>
                          <Form.Group controlId='email'>
                            <Form.Label className='my-3'>
                              Email Address
                            </Form.Label>
                            <Form.Control
                              type='email'
                              placeholder='Enter email*'
                              value={email}
                              style={{
                                borderRadius: '20px',
                                cursor: 'not-allowed',
                              }}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled
                            ></Form.Control>
                          </Form.Group>
                          {error && (
                            <div className='my-3'>
                              <Message variant='danger'>{error}</Message>
                            </div>
                          )}
                          {success && (
                            <div className='my-3'>
                              <Message variant='success'>
                                Profile updated successfully!
                              </Message>
                            </div>
                          )}
                        </ListGroup.Item>
                      </Col>
                      <Col lg={8}>
                        <ListGroup.Item>
                          <p className='heading'>General Information</p>
                          <hr />
                          <Row>
                            <Col lg={6}>
                              <Form.Group controlId='name'>
                                <Form.Label className='my-3'>Name *</Form.Label>
                                <Form.Control
                                  type='name'
                                  placeholder='Enter Name*'
                                  value={name}
                                  style={{ borderRadius: '5px' }}
                                  onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group controlId='password'>
                                <Form.Label className='my-3'>
                                  Password
                                </Form.Label>
                                <Form.Control
                                  type='password'
                                  placeholder='Choose new password*'
                                  value={password}
                                  style={{ borderRadius: '5px' }}
                                  onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Form.Group controlId='cPassword'>
                                <Form.Label className='my-3'>
                                  Confirm Password
                                </Form.Label>
                                <Form.Control
                                  type='password'
                                  placeholder='Confirm Password*'
                                  value={cPassword}
                                  style={{ borderRadius: '5px' }}
                                  onChange={(e) => setCPassword(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              {errorPass && (
                                <p style={{ color: 'red' }}>{errorPass}</p>
                              )}
                            </Col>
                          </Row>

                          <hr />
                          <div className='btnContainer'>
                            <button className='saveButton'>Save</button>
                          </div>
                        </ListGroup.Item>
                      </Col>
                    </Row>
                  </ListGroup>
                </Form>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  )
}
export default ProfileScreen
