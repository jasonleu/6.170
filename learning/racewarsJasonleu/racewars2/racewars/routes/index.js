var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var data = require('../data/fritter-data-mongoose');
var mongoose = require('mongoose');
var id = 1;

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var challenges = data.Challenge;
  challenges.find({}).exec(function(err,allChallenges){
    if (err){
        res.send("There was a problem connecting to database");
    }else{
//        console.log(allChallenges);
        res.render('index/index', { title: 'Home', master: "",challenges: allChallenges });
    }
  }
  )
});

router.get('/master', function(req, res) {
  var db = req.db;
  var challenges = data.Challenge;
  challenges.find({}).exec(function(err,allChallenges){
    if (err){
        res.send("There was a problem connecting to database");
    }else{
//        console.log(allChallenges);
        res.render('index/index', { title: 'Home', master: true,challenges: allChallenges });
    }
  }
  )
});

router.post('/postChallenge', function(req,res){
    var db = req.db;
    var challengePosted = req.body.challenge;
    var challenges = data.Challenge;
    var newChallenge = new data.Challenge({
        _id: id,
        text: challengePosted,
        winner: ""
    });
    newChallenge.save(function(error){
        if (error){
           res.send("There was a problem connecting to database");
       }else{
           res.redirect("/");    
        }
    });
    id+=1;

});

router.post('/winner/:challengeid', function(req,res){
    var db = req.db;
    var challengeId = req.param('challengeid');
    var winner = req.body.winnerID;
    var challenges = data.Challenge;
    challenges.findOneAndUpdate({_id:challengeId},{winner:winner}, function(err,docs){
      if (err){
          console.log(err);
            console.log('Problem connecting to database');      
      }else{
          res.redirect("/");
      }
    }
   );
});





module.exports = router;
