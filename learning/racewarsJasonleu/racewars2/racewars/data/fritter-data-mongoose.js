var mongoose = require('mongoose');

//user schema
var challengeSchema = mongoose.Schema({
    _id: Number,
    text: String,
    winner: String
});


//create the models
var Challenge = mongoose.model('Challenge', challengeSchema);




exports.Challenge = Challenge;
