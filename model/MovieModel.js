const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
    },
    duration: {
        type: String,
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
    },
    actor_names: {
        type: Array,
    },
    poster_link: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('movies', MovieSchema)