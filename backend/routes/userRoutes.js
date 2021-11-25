import express from 'express'
import {
  authUser,
  getProfile,
  registerUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getProfile)

export default router
