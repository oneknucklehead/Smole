import asyncHandler from 'express-async-handler'
import Shops from '../models/shopModel.js'

//@desc     Fetch all shops
//@route    GET /api/shop
//@access   Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shops.find({})
  res.json(shops)
})

//@desc     Fetch single shop
//@route    GET /api/shop/:shopid
//@access   Public
const getShopProducts = asyncHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopid)
  if (shop) {
    res.json(shop)
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

//@desc     Fetch single product
//@route    GET /api/:shopid/product/:productid
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
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

export { getShops, getShopProducts, getProductById }
