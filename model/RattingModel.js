const  mongoose  = require("mongoose");

const RattingSchema = mongoose.Schema({
    movie_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    rating_value: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('movie_rattings', RattingSchema)