const express = require('express')
const MovieController = require('../controller/MovieController')
const AuthenticateToken = require('../config/JWTAuthanticate')

const MovieRouter = express.Router()

MovieRouter.post('/add', AuthenticateToken,  MovieController.createMovie) // create new user
 MovieRouter.get('/all', MovieController.FindAll) // create new user
 MovieRouter.put('/:id', MovieController.updateMovie) 
 MovieRouter.delete('/:id', MovieController.deleteMovie) 
 MovieRouter.post('/upload-csv', MovieController.readCSVfile) 


module.exports = MovieRouter