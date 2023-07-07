const RattingSchema = require('../model/RattingModel')
const UserController = require('./UserController')

class RattingController {

    static createRatting = async (req, res) => {
        try {
            const newRatting = new RattingSchema({
                movie_id: req.body.movie_id,
                user_id: req.body.user_id,
                rating_value: req.body.rating_value,
                review: req.body.review,
            })
            const isExist = await UserController.checkUserExist(req.user.user_name)
            if (isExist) {
                await newRatting.save()
                res.send(newRatting)
            } else{
                res.sendStatus(403)
            }           
        } catch (error) {
            res.send({ message: error.message })
        }
    }
   
    
    static avarageRatting = async (req, res) => {
        try {
            let ratting = await RattingSchema.aggregate([
                {
                  $group: {
                    _id: "$movie_id",
                    average_rating: { $avg: "$rating_value" }
                  }
                }
              ])
            res.status(200).send(ratting)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    static FilterByMovie = async (req, res) => {
        try {
            let rattings = await RattingSchema.find({movie_id:req.params.movie_id})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    static FindAll = async (req, res) => {
        try {
            let user = await RattingSchema.find()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    static FilterByMovie = async (req, res) => {
        try {
            let user = await RattingSchema.find({movie_id:req.params.movie_id})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static updateMovie = async (req, res) => {
        try {
            let id = req.params.id
            let movie = await RattingSchema.findOne({ '_id': id })
            movie.title = req.body.title || movie.title
            movie.release_date = req.body.release_date || movie.release_date
            movie.duration = req.body.duration || movie.duration
            movie.director = req.body.director || movie.director
            movie.genre = req.body.genre || movie.genre
            movie.actor_names = req.body.actor_names || movie.actor_names
            movie.poster_link = req.body.poster_link || movie.poster_link
            await movie.save()
            res.status(200).send(movie)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }
    static deleteMovie = async (req, res) => {
        try {
            let id = req.params.id
            await RattingSchema.deleteOne({ '_id': id })
            res.status(200).send('movie deleted successfully')
            // res.send('find one user')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

}

module.exports = RattingController