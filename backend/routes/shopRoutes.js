import express from 'express'
import {
  getShops,
  getShopProducts,
  getProductById,
  deleteShopById,
  deleteProduct,
  sellerShops,
} from '../controllers/shopControllers.js'
import { protect, admin, seller } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/shop').get(getShops)
router.route('/seller/shops').get(protect, seller, sellerShops)

router
  .route('/shop/:shopid')
  .get(getShopProducts)
  .delete(protect, admin, deleteShopById)

router
  .route('/:shopid/product/:productid')
  .get(getProductById)
  .delete(protect, deleteProduct)

export default router
