var express = require('express');
var router = express.Router();
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;


/* GET blog homepage. */
router.get('/', function(req, res) {
  var db = req.db;
  var fullname = req.cookies.firstName +" " + req.cookies.lastName;
  
  var collection = db.get('freets');
     

  collection.find({}, {"sort": {"date" : -1}} ,function(e,docs){
      res.render('blog/blog', { title: 'Blog', fullname: fullname, email: req.cookies.email, 'posts':docs, editID: '' });
  })
   
    
}); 

router.get('/logout',function(req,res){
    res.clearCookie('firstName');
    res.clearCookie('lastName');
    res.clearCookie('email');
    res.redirect('/');
})

router.get('/edit/:id', function(req, res) {
  var db = req.db;
  var fullname = req.cookies.firstName +" " + req.cookies.lastName;
  var editID = req.param('id');
  
  var collection = db.get('freets');
     

  collection.find({}, {"sort": {"date" : -1}} ,function(e,docs){
      res.render('blog/blog', { title: 'Blog', fullname: fullname, email: req.cookies.email, 'posts':docs, editID: editID });
  })
  
  
   
}); 

router.post('/edit/:id', function(req, res) {
  var db = req.db;
  var fullname = req.cookies.firstName +" " + req.cookies.lastName;
  var editID = req.param('id');
  var changedFreet = req.body.changedFreet;
  var collection = db.get('freets');
  var id= ObjectID(editID);
     
  var firstName = req.cookies.firstName;
  var lastName = req.cookies.lastName;
  var email = req.cookies.email;
  collection.find({_id:id}, function(err,docs){
        if(err){
            res.send("There was a problem connecting to database");
        }else{
          var oldDate = docs[0].date;    
          collection.remove({_id:id}, function(err,docs){  
              if(err){
                    res.send("There was a problem connecting to database");
              }else{
                    collection.insert({"fullname": firstName+" "+ lastName, "email":email, "body":changedFreet, "date": oldDate}, function(err, docs){
		               if(err){
			              res.send("There was a problem connecting to database");
		              }else{
                          res.redirect("/blog");
		              }
                    })
            }
          })                 
        }
  })
    
    
  
  
  
  
}); 


router.post('/', function(req, res) {
  var db = req.db;
  var firstName = req.cookies.firstName;
  var lastName = req.cookies.lastName;
  var email = req.cookies.email;
  var freet = req.body.freet;
  var collection = db.get('freets');

  collection.insert({"fullname": firstName+" "+ lastName, "email":email, "body":freet, "date": moment().format('MMMM Do YYYY, h:mm:ss a')}, function(err, docs){
		  if(err){
			 res.send("There was a problem connecting to database");
		  }else{
              res.redirect("/blog");
		  }
  })


});

router.post('/delete/:id', function(req, res) {
   var db = req.db;
    var collection = db.get('freets');
    var id = ObjectID(req.param('id'));
    
    collection.remove({_id:id}, function(err,docs){
        if(err){
            res.send("There was a problem connecting to database");
        }else{
            res.redirect("/blog");
        }
    })
});

module.exports = router;
