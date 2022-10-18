const route = require('express').Router()
const config = require("../config");
const Follow = require('../db').Follow
const Following = require('../db').Following


route.post('/', (req, res) => {
    Follow.findAll({ where: {privateKeyfollow:req.body.privatekey,privateKeyrequested:req.body.key}, raw: true }).then((users) => {
        console.log("kd",users)
        if(users.length>0)
        {
            res.status(401).send("failure")
        }
        if(users.length==0)
        {
            Follow.findAll({ where: {privateKeyfollow:req.body.key,privateKeyrequested:req.body.privatekey}, raw: true }).then((users) => {
              console.log("km",users)
              if(users.length>0)
              {
                res.status(401).send("failure")
            }
                if(users.length==0)
              {
                Following.findAll({ where: {privateKeyfollow:req.body.privatekey,privateKeyrequested:req.body.key,emailrequested:req.body.email}, raw: true }).then((users) => {
                    if(users.length>0)
        {
            res.status(401).send("failure")
        }
                    if(users.length==0)
                    {
                        
                        Following.findAll({ where: {privateKeyfollow:req.body.key,privateKeyrequested:req.body.privatekey,emailrequested:req.body.email}, raw: true }).then((users) => {
                            if(users.length>0)
                            {
                                res.status(401).send("failure")
                            }
                            if(users.length==0)
                            {
                                Following.findAll({ where: {privateKeyfollow:req.body.privatekey,privateKeyrequested:req.body.key,emailaccepted:req.body.email}, raw: true }).then((users) => {
                                    if(users.length>0)
                                    {
                                        res.status(401).send("failure")
                                    }
                                    if(users.length==0)
                                    {
                                        Following.findAll({ where: {privateKeyfollow:req.body.key,privateKeyrequested:req.body.privatekey,emailaccepted:req.body.email}, raw: true }).then((users) => {
                                            if(users.length>0)
                                            {
                                                res.status(401).send("failure")
                                            }
                                            if(users.length==0)
                                            {
                                                Follow.create ({
                                                    privateKeyrequested:req.body.privatekey,
                                                    privateKeyfollow: req.body.key,
                                                    emailrequested:req.body.email,
                                                    fullnamerequested:req.body.fullname
                                                
                                                  }).then(() => {
                                                      res.send("success")
                                                  })
                                            }
                                           
                                        })
                                    }
                                   
                                })
                            }
                           
                        })
                    }
                   
                })
           
              }
            })
        }
      
    })

   

   
})

route.post('/followrequests', (req, res) => {
   
    Follow.findAll({ where: {privateKeyfollow:req.body.privatekey}, raw: true }).then((users) => {
        res.status(200).send(users)
    })


   
})
route.post('/following', (req, res) => {
   
    Following.findAll({ where: {privateKeyfollow:req.body.privatekey}, raw: true }).then((users) => {
        if(users.length>0)
        {
            res.status(200).send(users)
        }
       
    })
   
    // Following.findAll({ where: {privateKeyrequested:req.body.privatekey}, raw: true }).then((users) => {
    //     if(users.length>0)
    //     {
    //         res.status(200).send(users)
    //     }
       
    // })

   
})
route.post('/followinga', (req, res) => {
   
    // Following.findAll({ where: {privateKeyfollow:req.body.privatekey}, raw: true }).then((users) => {
    //     if(users.length>0)
    //     {
    //         res.status(200).send(users)
    //     }
       
    // })
   
    Following.findAll({ where: {privateKeyrequested:req.body.privatekey}, raw: true }).then((users) => {
        if(users.length>0)
        {
            res.status(200).send(users)
        }
       
    })

   
})
route.post('/acceptrequests', (req, res) => {
   
    Follow.findOne({ where: {emailrequested:req.body.email}, raw: true }).then((users) => {
        Following.create ({
            privateKeyrequested:users.privateKeyrequested,
            fullnamerequested:users.fullnamerequested,
            privateKeyfollow: users.privateKeyfollow,
            emailrequested:users.emailrequested,
            emailaccepted:req.body.emailaccepted,
            fullnameaccepted:req.body.fullnameaccepted
        
          }).then(() => {
             
        Follow.destroy({
            where: { emailrequested: req.body.email}
          })
          .then((deletedEmail) => {
            res.sendStatus(201).send(deletedEmail)
          })
    
          })
    
    })


   
})

exports = module.exports = route