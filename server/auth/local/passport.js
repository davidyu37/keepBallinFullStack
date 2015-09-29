var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: '很抱歉\n此Email還沒註冊\nThis email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: '很抱歉\n密碼錯誤\nThis password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};