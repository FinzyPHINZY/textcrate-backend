require('dotenv').config()

const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./routes/notes')

mongoose.set('strictQuery', false)

logger.info('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('SUCCESS: connected to MongoDB successfully')
  })
  .catch((error) => {
    logger.error('FAILED: error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.get('/health', (req, res) => {
  res.status(200).send({
    message: 'health ok!',
  })
})

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
