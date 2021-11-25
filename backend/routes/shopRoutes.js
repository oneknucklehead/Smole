import express from 'express'
import {
  getShops,
  getShopProducts,
  getProductById,
} from '../controllers/shopControllers.js'
const router = express.Router()

router.route('/shop').get(getShops)

router.route('/shop/:shopid').get(getShopProducts)

router.route('/:shopid/product/:productid').get(getProductById)

export default router
