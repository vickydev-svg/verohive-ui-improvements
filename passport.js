const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users
const bcrypt = require('bcrypt');
passport.serializeUser(function(user, done){
    done(null, user)
})
passport.deserializeUser(function(user, done){ 
    done(null, user)
})

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("ffjjf",password)
    Users.findOne({
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
}))

exports = module.exports = passport