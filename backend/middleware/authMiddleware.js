import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_KEY)
      req.user = await User.findById(decode.userId).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, Token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorised, No token found')
  }
})
export { protect }
