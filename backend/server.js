// To use constants from the .env file
require('dotenv').config()
const cors = require('cors')

const express = require('express')
const articleRoutes = require('./routes/apis')
const mongoose = require('mongoose')



// Start the express server
const app = express()

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Middleware to make response as json 
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/articles', articleRoutes)

// Connection to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Connected to the Database & Listening on Port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
