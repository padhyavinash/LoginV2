var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Userd');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.type = req.body.type;                // new logic added

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      console.log('inside login err');
      return;
    }

    // If a user is found
    if(user){
      console.log('inside login success');
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      console.log('inside login success end');
     
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};