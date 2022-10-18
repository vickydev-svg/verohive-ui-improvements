const route = require("express").Router();
const passport = require("../passport");
const passport1 = require("../passport1");
const Users = require("../db").Users;
const Admin = require("../db").Admin;
const TempAttendee = require("../db").TempAttendee;
const bcrypt = require("bcrypt");
const saltrounds = 10;
// route.get('/login', (req, res) => {
//     res.render('login')
// })
// route.get('/signup', (req, res) => {
//     res.render('signup')
// })
route.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);
route.post(
  "/adminlogin",
  passport1.authenticate("local-signup", {
    failureRedirect: "/eRDRVJMnbc3qExHQE2sn",
    successRedirect: "/admindashboardeRDRVJMnbc3qExHQE2sn",
  })
);
route.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});
// Route for getting some data about our user to be used client side
route.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});
route.post("/updatepassword", (req, res) => {
  bcrypt.hash(req.body.password, saltrounds, function (err, hash) {
    if (err) throw err;

    Users.update(
      {
        password: hash,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    ).then(() => {
      res.send("success");
    });
  });
});
route.post("/updateProfilePic", (req, res) => {
  Users.update(
    {
      ProfilePic: req.body.value,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  ).then(() => {
    res.send("success");
  });
});
route.post("/updateprofile", (req, res) => {
  Users.update(
    {
      organization: req.body.organization,
      bio: req.body.bio,
      city: req.body.city,
      country: req.body.country,
      links: req.body.links,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      FACEBOOK: req.body.FACEBOOK,
      FACEBOOKLIVE: req.body.FACEBOOKLIVE,
      Twitter: req.body.Twitter,
      LinkedIn: req.body.LinkedIn,
      Youtube: req.body.Youtube,
      YoutubeLive: req.body.YoutubeLive,
      Instagram: req.body.Instagram,
      Weblink1: req.body.Weblink1,
      Weblink2: req.body.Weblink2,
      roompin: req.body.roompin,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  ).then(() => {
    res.send("success");
  });
});

route.post("/updateUserVerificationStatus", (req, res) => {
  Users.update(
    {
      email: req.body.email,
      userVerified: req.body.userVerified,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  ).then(() => {
    res.send("success");
  });
});

route.post("/adminupdate", (req, res) => {
  console.log("ss", req);

  Users.update(
    {
      verified: req.body.username,
      userType: req.body.password,
    },
    {
      where: {
        email: req.body.id,
      },
    }
  ).then(() => {
    res.send("success");
  });
});
route.post("/getuser", (req, res) => {
  Users.findOne({ where: { username: req.body.username }, raw: true }).then(
    (user) => {
      res.send(user);
    }
  );
});
route.post("/findAllUsers", (req, res) => {
  Users.findAll().then((user) => {
    res.send(user);
  });
});
route.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});
route.post("/signup", (req, res) => {
  console.log("fjnfj", req);
  bcrypt.hash(req.body.password, saltrounds, function (err, hash) {
    if (err) throw err;
    Users.create({
      id: req.body.rand,
      username: req.body.username,
      privateKey: req.body.privateKey,
      roompin: req.body.roompin,
      password: hash,
      firstName: req.body.firstName,
      email: req.body.email,
      lastName: req.body.lastName,
      age: req.body.checked,
      termsandconditions: req.body.checked1,
      userVerified: req.body.userVerified,
      verifyPin: req.body.verifyPin,
    }).then((createdUser) => {
      res.redirect("/login");
    });
  });
});
route.post("/adminsignup", (req, res) => {
  console.log("fjnfj", req);
  bcrypt.hash(req.body.password, saltrounds, function (err, hash) {
    if (err) throw err;
    Admin.create({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      email: req.body.email,
      lastName: req.body.lastName,
    }).then((createdUser) => {
      res.send("success");
    });
  });
});

route.post("/TempAttendee", (req, res) => {
  console.log("fjnfj", req);
  TempAttendee.create({
    username: req.body.userName,
    firstName: req.body.firstName,
    email: req.body.email,
    lastName: req.body.lastName,
    privateKey: req.body.privatekey,
  }).then((createdUser) => {
    res.send("success");
  });
});

exports = module.exports = route;
