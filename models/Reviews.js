const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    name : String,
    content: String,
    rating: Number
})

const ReviewsModel = mongoose.model('reviews', ReviewsSchema);

module.exports = ReviewsModel;
