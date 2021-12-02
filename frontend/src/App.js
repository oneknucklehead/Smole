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
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import OrdersListScreen from './Screens/OrdersListScreen'
import AdminAllUsersScreen from './Screens/AdminAllUsersScreen'
import AdminAllProductsScreen from './Screens/AdminAllProductsScreen'
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
            <Route path='/myorders' component={OrdersListScreen} />
            <Route path='/admin/userlist' component={AdminAllUsersScreen} />
            <Route
              path='/admin/productlist'
              component={AdminAllProductsScreen}
            />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
