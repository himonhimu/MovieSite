const MovieSchema = require('../model/MovieModel')
const jwt = require('jsonwebtoken')
const AdminUserController = require('./AdminUserController')
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const UploadCSVFile = require('../config/UploadCSVFile');

class MovieController {

    static createMovie = async (req, res) => {
        try {
            const newMovie = new MovieSchema({
                title: req.body.title,
                release_date: req.body.release_date,
                duration: req.body.duration,
                director: req.body.director,
                genre: req.body.genre,
                actor_names: req.body.actor_names,
                poster_link: req.body.poster_link,
            })
           let isExist =  await AdminUserController.checkAdminExist(req.user.user_name)
            console.log(isExist);
            if (isExist) {
                res.status(201).json(newMovie)
            }else{
                res.sendStatus(403)
            }
            
        } catch (error) {
            res.send({ message: error.message })
        }
    }
   
    
    static FindAll = async (req, res) => {
        try {
            let user = await MovieSchema.find()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static updateMovie = async (req, res) => {
        try {
            let id = req.params.id
            let movie = await MovieSchema.findOne({ '_id': id })
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
            await MovieSchema.deleteOne({ '_id': id })
            res.status(200).send('movie deleted successfully')
            // res.send('find one user')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }


    static readCSVfile = async (req, res) => {
        try {
         let results =   await UploadCSVFile.UploadCSVFile(req)
         let finalArray = []
         results.forEach(element => {
            const actorNames = [];
            Object.keys(element).forEach(function (key) {
                if (key.includes('actor_names')) {
                    actorNames.push(element[key])
                    delete element[key]
                }
              });
             element = {
                ...element,
                actor_names:actorNames
             }
             finalArray.push(element)
         });
        
          let mresult =  await  MovieSchema.insertMany(finalArray)
           res.send(mresult)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

}


module.exports = MovieController