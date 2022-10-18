const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Admin = require('./db').Admin
const bcrypt = require('bcrypt');
passport.serializeUser(function(user, done){
    done(null, user)
})
passport.deserializeUser(function(user, done){ 
    done(null, user)
})
passport.use('local-signup', new LocalStrategy((function (username, password, done){
    // Include logic that searches the application database
    // for an existing username, if no username exists, create
    // and save it to the database along with a hashed
    // version of the password
    Admin.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        pass = user.password;
        bcrypt.compare(password, pass, function(err, res) {
            if(res)  return done(null, username)
            else  return done(null, false, {message: 'Password is incorrect'})
        });   
        // return done(null, user)
    }).catch((err) => {
       
        return done(err)
    })
  })));
// passport.use(new LocalStrategy(function (username, password, done) {
//     console.log("rj2",password)
   
// }))

exports = module.exports = passport