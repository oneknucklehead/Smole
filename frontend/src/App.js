import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/shop/:shopid' component={ProductListScreen} />
            <Route
              path='/:shopid/product/:productid'
              component={ProductScreen}
              exact
            />
            <Route path='/cart/:shopid?/:productid?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/orders' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
