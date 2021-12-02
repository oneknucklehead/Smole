import express from 'express'
import {
  authUser,
  getProfile,
  updateProfile,
  registerUser,
  adminGetUsers,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, adminGetUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)

export default router
