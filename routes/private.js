const route = require('express').Router()
route.get('/', (req, res) => {
    if (req.user) {
      //  res.sendFile(__dirname + '../src/Home')
  //  res.redirect('/private')
    } else {
        res.redirect('/login')
    }
})

exports = module.exports = route