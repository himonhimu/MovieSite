const express = require('express')
const RattingController = require('../controller/RattingController')
const AuthenticateToken = require('../config/JWTAuthanticate')

const RattingRouter = express.Router()

RattingRouter.post('/add', AuthenticateToken, RattingController.createRatting) // create new ratting
RattingRouter.get('/all', RattingController.FindAll) // get all ratting
RattingRouter.get('/select-movie/:movie_id', RattingController.FilterByMovie) // find selected movie rattings

RattingRouter.get('/avarage-ratting/:movie_id', RattingController.avarageRatting) //Mongodb aggregation 
RattingRouter.put('/:id', RattingController.updateMovie)
RattingRouter.delete('/:id', RattingController.deleteMovie)


module.exports = RattingRouter