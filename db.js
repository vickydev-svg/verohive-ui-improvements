const Sequelize = require('sequelize');

const db = new Sequelize(
    // 'userdb',
    // 'userdb',
    // 'userdb',

    // 'verohvor_userdb',
    // 'verohvor_userdb',
    // 'Aakash@2704',
    
    'userdbv',
    'userdbv',
    'Aakash@2704',
   

    {
        dialect: 'mysql',
        host: '192.99.36.138',
       
    }
)

const Users = db.define('users', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    privateKey:{type:Sequelize.STRING,
    unique:true},
    organization: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    bio: {
        type: Sequelize.STRING,
        allowNull: true
    },
    FACEBOOK: {
        type: Sequelize.STRING,
        allowNull: true
    },
    FACEBOOKLIVE: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Twitter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Youtube: {
        type: Sequelize.STRING,
        allowNull: true
    },
    YoutubeLive: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Instagram: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Weblink1: {
        type: Sequelize.STRING,
        allowNull: true
    },
   Weblink2: {
        type: Sequelize.STRING,
        allowNull: true
    },
   roompin: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    LinkedIn: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    links: {
        type: Sequelize.STRING,
        allowNull: true
    }
    ,
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    ProfilePic:Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    age:{
        type:Sequelize.BOOLEAN,
        allowNull: false,
    },
    termsandconditions:{
        type:Sequelize.BOOLEAN,
        allowNull: false,
    },
    verified:Sequelize.STRING,
    userType:Sequelize.STRING,
    verifyPin: {
        type: Sequelize.STRING,
        allowNull: true,
       
    },
    userVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
       
    },
    
})


const Admin = db.define('admin', {
 
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    ProfilePic:Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
    
})

const Follow = db.define('follow', {
 
    privateKeyrequested: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    privateKeyfollow: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    emailrequested: {
        type: Sequelize.STRING,
        allowNull: false,
      
    },
    fullnamerequested:{
        type: Sequelize.STRING,
        allowNull: false,
    }
    
})

const Following = db.define('following', {
 
    privateKeyrequested: {
        type: Sequelize.STRING,
        allowNull: false,
  
    },

    privateKeyfollow: {
        type: Sequelize.STRING,
        allowNull: false,
      
    },
    emailrequested: {
        type: Sequelize.STRING,
        allowNull: false,
      
    },
    emailaccepted: {
        type: Sequelize.STRING,
        allowNull: false,
      
    },
    fullnamerequested:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fullnameaccepted:{
        type: Sequelize.STRING,
        allowNull: false,
    }

    
})

const TempAttendee = db.define('TempAttendee', {
    privateKey:{type:Sequelize.STRING,
    unique:true},
   
    
    username: {
        type: Sequelize.STRING,
        allowNull: false,

    },
   
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
   
    email: {
        type: Sequelize.STRING,
        allowNull: false,
       
    },
  
   
    
})

db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users,
    Follow,
    Following,
    Admin,
    TempAttendee
}