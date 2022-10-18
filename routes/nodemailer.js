const route = require('express').Router()
const config = require("../config");
const nodeMailer = require("nodemailer");


route.post('/', (req, res) => {
   
   var f=req.body;
 
        var URL = "smtps://" + config.SMTPS_EMAIL + ":" + config.SMTPS_PASSWORD + "@" + config.SMTPS_URL;

        var transporter = nodeMailer.createTransport({
          host: "mail.verotownhall.com",
          port: 587,
          secure: false, // use TLS
          auth: {
            user: "donotreply@verotownhall.com",
            pass: "bd3dP29!"
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
          }
        });
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from:"VEROHive <donotreply@verotownhall.com>", // sender address
            to: f.To, // list of receivers
            subject: f.subject, // Subject line
            text: f.text, // plaintext body
            html: f.html // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            if (info != undefined) {
              console.log('Message sent: ' + info.response);
              res.send("Success")
            } else {
                console.log("error sending mail");
              
            }
        });
    

   
})

exports = module.exports = route