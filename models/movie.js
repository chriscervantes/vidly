const {genreSchema} = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');


const Movie = mongoose.model('Movies',new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:15
    },
    genres:{
        required: true,
        type:genreSchema
    },
    numberInStock : {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255    
    }
}));

function validateMovies(movie) {
    const schema = {
      title: Joi.string().min(5).required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }  

exports.Movie = Movie;
exports.validate = validateMovies;
