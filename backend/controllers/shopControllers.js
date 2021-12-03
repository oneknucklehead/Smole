import asyncHandler from 'express-async-handler'
import Shops from '../models/shopModel.js'
import User from '../models/userModel.js'

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

// //@desc     Delete single product
// //@route    DELETE /api/:shopid/product/:productid
// //@access   Private/Admin
// const deleteProductById = asyncHandler(async (req, res) => {
//   const shop = await Shops.findById(req.params.shopid)
//   const product = shop.products.find(
//     (product) => product.id === req.params.productid
//   )
//   await Shops.findOneAndUpdate(
//     { _id: req.params.shopid },
//     { $pull: { products: { _id: req.params.productid } } },
//     { safe: true, multi: false }
//   )
//   if (product) {
//     res.json({ message: 'Deleted succesfully', data: product })
//   } else {
//     res.status(404)
//     throw new Error('Product Not Found')
//   }
// })

//@desc     Delete single product
//@route    DELETE /api/:shopid/product/:productid
//@access   Private
const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user && req.user.isAdmin) {
    const shop = await Shops.findById(req.params.shopid)
    const product = shop?.products.find(
      (product) => product.id === req.params.productid
    )
    const success = await Shops.findOneAndUpdate(
      { _id: req.params.shopid },
      { $pull: { products: { _id: req.params.productid } } },
      { safe: true, multi: false }
    )
    if (success) {
      res.json({ message: 'Deleted succesfully', data: product })
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  } else if (req.user && req.user.isSeller) {
    const shop = await Shops.findById(req.params.shopid)
    const product = shop.products.find(
      (product) => product.id === req.params.productid
    )
    const success = await Shops.findOneAndUpdate(
      { user: req.user._id, _id: req.params.shopid },
      { $pull: { products: { _id: req.params.productid } } },
      { safe: true, multi: true }
    )
    if (success) {
      res.json({ message: 'Deleted product successfully', data: product })
    } else {
      res.status(404)
      throw new Error('Product Not Found for your id')
    }
  } else {
    res.status(404)
    res.json({ message: 'Not Authorized as a seller or an admin' })
  }
})
//@desc     Delete single shop
//@route    DELETE /api/:shopid
//@access   Private/Admin
const deleteShopById = asyncHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopid)
  // const product = shop.products.find(
  //   (product) => product.id === req.params.productid
  // )
  // await Shops.findOneAndUpdate(
  //   { _id: req.params.shopid },
  //   { $pull: { products: { _id: req.params.productid } } },
  //   { safe: true, multi: false }
  // )
  if (shop) {
    res.json({ message: 'Shop deleted successfully', data: shop })
    await shop.remove()
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})
const sellerShops = asyncHandler(async (req, res) => {
  const shops = await Shops.find({ user: req.user._id })
  if (shops) {
    res.json(shops)
  } else {
    res.status(401)
    throw new Error('Shop not found')
  }
})

export {
  getShops,
  getShopProducts,
  getProductById,
  deleteShopById,
  deleteProduct,
  sellerShops,
}
