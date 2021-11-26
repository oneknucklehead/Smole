import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer.js'
import { useDispatch, useSelector } from 'react-redux'
import './ShippingScreen.css'

const ShippingScreen = ({ history }) => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [landmark, setLandmark] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <FormContainer>
      <h3>Delivery To</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='House no., Building Name, Street name, Area*'
            value={address}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='landmark'>
          <Form.Label>Landmark</Form.Label>
          <Form.Control
            type='text'
            placeholder='landmark'
            value={landmark}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setLandmark(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Postal code'
            value={postalCode}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='State'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='State'
            value={state}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='Country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            style={{ borderRadius: '5px' }}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <button className='saveBtn'>Continue to payment</button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
