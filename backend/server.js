import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import shopRoutes from './routes/shopRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import imageUploadRoutes from './routes/imageUploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'
import path from 'path'
// import fileUpload from 'express-fileupload'
// import { upload } from './controllers/uploadController.js'
// import asyncHandler from 'express-async-handler'

//Image Upload endpoint

connectDB()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API is running')
})
app.use('/api', shopRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', imageUploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
