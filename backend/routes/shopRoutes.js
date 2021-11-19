import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Shops from '../models/shopModel.js'

//@desc     Fetch all shops
//@route    GET /api/shop
//@access   Public
router.get(
  '/shop',
  asyncHandler(async (req, res) => {
    const shops = await Shops.find({})
    res.json(shops)
  })
)

//@desc     Fetch single shop
//@route    GET /api/shop/:shopid
//@access   Public
router.get(
  '/shop/:shopid',
  asyncHandler(async (req, res) => {
    const shop = await Shops.findById(req.params.shopid)
    if (shop) {
      res.json(shop)
    } else {
      res.status(404)
      throw new Error('Shop not found')
    }
  })
)

//@desc     Fetch single product
//@route    GET /api/:shopid/product/:productid
//@access   Public
router.get(
  '/:shopid/product/:productid',
  asyncHandler(async (req, res) => {
    const shop = await Shops.findById(req.params.shopid)
    const product = shop.products.find(
      (product) => product.id === req.params.productid
    )
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  })
)

export default router
