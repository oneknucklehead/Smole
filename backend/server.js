import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import shopRoutes from './routes/shopRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'

connectDB()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API is running')
})
app.use('/api', shopRoutes)
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)