var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index/index', { title: 'Home' });
});

router.post('/login', function(req, res) {
  var db = req.db;
  var email = req.body.email;
  var password = req.body.password;

  var users = db.get('usercollection');

  users.findOne({ "email": email}, function(err, user) {
    if (err) {
      res.send(err, 400);
      return
    }

    if (!user) {
        res.render('index/index',{title: 'Home', Error: "nouser"});

    } else if (!passwordHash.verify(password, user.password)) {
      res.render('index/index', {title: 'Home', Error: "wrongpassword"})
    } else {
      res.cookie('firstName', user.firstName);
      res.cookie('email', email);
      res.cookie('lastName', user.lastName);
      res.redirect("/blog");
    }
  });

});


router.post('/register', function(req, res) {
  var db = req.db;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = passwordHash.generate(req.body.password);

  var users = db.get('usercollection');

  users.findOne({ "email": email}, function(err, user) {
    if (err) {
      res.send(err, 400);
      return
    }

    if (!user) {
        users.insert({"firstName": firstName, "lastName": lastName, "email":email, "password":password}, function(err, docs){
		  if(err){
			 res.send("There was a problem");
		  }else{
              res.cookie('email', email);
              res.cookie('firstName', firstName);
              res.cookie('lastName', lastName);
              res.redirect("/blog");
		  }
	    });
    } else {
            res.render('index/index', {title: 'Home', Error: "useralreadyexists"})


    }
  });

});



module.exports = router;
