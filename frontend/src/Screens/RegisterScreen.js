import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Form, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import FormContainer from '../Components/FormContainer.js'
import { userLogin } from '../Actions/userActions.js'
import './LoginScreen.css'

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)
  const { loading, error, userInfo } = login

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const RegisterHandler = (e) => {
    e.preventDefault()
    console.log(email + ' ' + password)
    // dispatch(userLogin({ email, password }))
  }
  //   useEffect(() => {
  //     if (userInfo) {
  //       history.push(redirect)
  //     }
  //   }, [history, redirect, userInfo])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <div className='formContainer'>
            <p className='header'>Register with Smole</p>
            {error && <Message variant='danger'>{error}</Message>}
            <Row className='navContainer'>
              <NavLink
                to='/login'
                className={(isActive) =>
                  isActive ? 'navLink selectedLogin' : 'navLink'
                }
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                className={(isActive) =>
                  isActive ? 'navLink selectedRegister' : 'navLink'
                }
              >
                Register
              </NavLink>
            </Row>
            <Row className='infoContainer'>
              <Form onSubmit={RegisterHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label className='my-3'>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label className='my-3'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col className='d-grid my-4'>
                    <button className='registerButton'>Register</button>
                  </Col>
                </Row>
              </Form>
              <Row style={{ textAlign: 'center' }}>
                <Col>
                  Already a customer?{' '}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/register'}
                  >
                    Login
                  </Link>
                </Col>
              </Row>
            </Row>
          </div>
        </FormContainer>
      )}
    </>
  )
}
export default RegisterScreen
