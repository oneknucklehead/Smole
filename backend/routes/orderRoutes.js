import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrder,
  getUserOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getUserOrder)
router.route('/:id').get(protect, getOrder)
// router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
