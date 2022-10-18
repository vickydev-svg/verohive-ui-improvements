const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
({
  path: "/io/webrtc",
});
var kurento = require("kurento-client");
var minimist = require("minimist");
const imageUploadRoute = require("./routes/upload");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const passport = require("./passport");
const bodyParser = require("body-parser");
const { use } = require("passport");
const { prototype } = require("aws-sdk/clients/applicationautoscaling");
const { all } = require("./routes/upload");
var allpins = [];

// variables
var kurentoClient = null;
var iceCandidateQueues = {};

// constants
var argv = minimist(process.argv.slice(2), {
  default: {
    as_uri: "ws://localhost:65000/",
    ws_uri: "ws://192.99.36.138:8888/kurento",
    // ws_uri:'ws://85.93.89.126:8888/kurento'
  },
});

// express routing
app.use(express.static(__dirname + "/build"));

app.set("view engine", "hbs");
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "somesecretstring",
  })
);
app.use(passport.initialize());
app.use(passport.session());
var port = process.env.PORT || 65000;

const rooms = {};
const messages = {};
const file = {};
// app.get('/', (req, res) => res.send('Hello World!!!!!'))
const chats = {};
var users = [];
var removableData = [];
var removableid = [];

//https://expressjs.com/en/guide/writing-middleware.html
app.use(express.static(__dirname + "/build"));

app.use("/public", require("./routes/public"));
// app.use('/private', require('./routes/private'))
app.use("/nodemailer", require("./routes/nodemailer"));
app.use("/follow", require("./routes/follow"));

app.use("/api/v1/upload", imageUploadRoute);

app.use("/", require("./routes/root"));

app.get("/:room", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.post("/:room", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ data: req.body });
});

// signaling
io.on("connection", function (socket) {
  console.log("a user connected");
  const peers = io.of("/webrtcPeer");

  // keep a reference of all socket connections
  // let connectedPeers = new Map()

  peers.once("connection", (socket) => {
    const room = socket.handshake.query.room;
    rooms[room] =
      (rooms[room] && rooms[room].set(socket.id, socket)) ||
      new Map().set(socket.id, socket);
    messages[room] = messages[room] || [];
    file[room] = file[room] || [];
    // chats[room] = chats[room] || []
    // connectedPeers.set(socket.id, socket)

    console.log(socket.id, room);
    socket.emit("connection-success", {
      success: socket.id,
      peerCount: rooms[room].size,
      messages: messages[room],
      file: file[room],
      // chats: chats[room]
    });
    const disconnectedPeer = (socketID) => {
      users = [];
      const _connectedPeers = rooms[room];
      for (const [_socketID, _socket] of _connectedPeers.entries()) {
        _socket.emit("peer-disconnected", {
          peerCount: rooms[room].size,
          socketID,
        });
      }
    };

    socket.on("disconnect-to-specific-user", (data) => {
      console.log("disconnect-to-specific-user", data);

      // users.push(data.payload)
      // console.log("djdj",users)
      // messages[room] = [...messages[room], JSON.parse(data.payload)]
      const _connectedPeers = rooms[room];

      for (const [socketID, _socket] of _connectedPeers.entries()) {
        if (socketID == data.socketID.local) {
          _socket.emit("disconnect-to-specific-user", {
            data: data.payload, //connectedPeers.size,
          });
        }
      }
      // chats[room] = [...chats[room], JSON.parse(data.payload)]
    });
    socket.on("mute-mic-to-specific-user", (data) => {
      console.log("mute-mic-to-specific-user", data);
      // users.push(data.payload)
      // console.log("djdj",users)
      // messages[room] = [...messages[room], JSON.parse(data.payload)]
      const _connectedPeers = rooms[room];
      console.log("ss", _connectedPeers);
      for (const [socketID, _socket] of _connectedPeers.entries()) {
        if (socketID == data.socketID.local) {
          _socket.emit("mute-mic-to-specific-user", {
            data: data.payload, //connectedPeers.size,
          });
        }
      }
      // chats[room] = [...chats[room], JSON.parse(data.payload)]
    });
    socket.on("new-message", (data) => {
      console.log("new-message", JSON.parse(data.payload));

      messages[room] = [...messages[room], JSON.parse(data.payload)];
    });
    socket.on("new-file", (data) => {
      console.log("Ddd", data);
      file[room] = [...file[room], JSON.parse(data.payload)];
      // messages[room] = [...messages[room], JSON.parse(data.payload)]
    });

    // socket.on('disconnect', () => {
    //     console.log('disconnected')
    //     // connectedPeers.delete(socket.id)
    //     socket.broadcast.emit("messageks", {
    //         event: 'participantLeft',
    //         userID: socket.id
    //     })
    //     rooms[room].delete(socket.id)
    //     users = []

    //     messages[room] = rooms[room].size === 0 ? null : messages[room]
    //     disconnectedPeer(socket.id)
    // })

    // ************************************* //
    // NOT REQUIRED
    // ************************************* //
    socket.on("socket-to-disconnect", (socketIDToDisconnect) => {
      users = [];
      console.log("disconnected");
      // connectedPeers.delete(socket.id)
      rooms[room].delete(socketIDToDisconnect);
      messages[room] = rooms[room].size === 0 ? null : messages[room];
      disconnectedPeer(socketIDToDisconnect);
    });

    socket.on("file-send-room", function (file) {
      console.log(file);
      socket.to(channel).emit("file-out-room", file);
    });
    socket.on("file-send-room-result", function (file) {
      console.log(file);
      socket.to(channel).emit("file-out-room-result", file);
    });
  });

  socket.on("roommine", (room) => {
    socket.join(room);
    console.log(room, "sky");
    socket.in(room).on("new-user-joined", (name) => {
      console.log("New User", name, room);
      users[socket.id] = name;
      socket.in(room).broadcast.emit("user-joined", name);
    });

    socket.in(room).on("send", (message) => {
      socket
        .in(room)
        .broadcast.emit("receive", {
          message: message,
          name: users[socket.id],
        });
    });

    socket.in(room).on("disconnect", (message) => {
      socket.in(room).broadcast.emit("left", users[socket.id]);
    });
  });

  socket.on("imrecording", (room) => {
    console.log("im recording");

    socket.broadcast.emit("heisrecording", room);
  });

  socket.emit("youarehost", () => {
    console.log("you are host");
  });
  socket.on("stopedrecording", (data) => {
    socket.broadcast.emit("hestopedrecording", data);
  });

  socket.on("removeme", (data) => {
    socket.broadcast.emit("removeHim", data);
  });

 

  socket.on("waitingRoom", () => {
    socket.emit("yourid", socket.id);
  });

  socket.on("allowme", (data) => {
    // console.log(data,"sky in the hill")
    socket.broadcast.emit("inreqtohost", data);
  });
  socket.on("imgoingBackFromReception", (data) => {
    console.log(data, "sky in the hill");
    socket.broadcast.emit("heIsGoingBackFromReception", data);
  });
  socket.on("requestRejected", (data) => {
    socket.broadcast.emit("requestRejectedForYou", data);
  });

  socket.on("hostwaslatethanyou", (data) => {
    // console.log(data,"yourhostwaslate")
    socket.broadcast.emit("yourhostwaslate", data);
  });

  socket.on("hostinfo", (data) => {
    socket.broadcast.emit("yourhostinfo", data);
    console.log(data, "host Info");
  });
  socket.on("greenscreenforme", (data) => {
    console.log(data, "greensreen");
    socket.broadcast.emit("reqGreenScreen", data);
    console.log(data, "greensreen done");
  });
  socket.on("saymygsbginfo", (data) => {
    console.log(data, "saymygsbginfo");
    socket.broadcast.emit("informuseraboutgs", data);
  });
  socket.on("closemygreenscreen", (data) => {
    socket.broadcast.emit("closehisgreenscreen", data);
  });
  // socket.on('hostinfo',(data)=>{
  //     console.log('hostinfo',data)
  //     socket.broadcast.emit('myhostinfo',data)
  // })

  // socket.on('imattendee', (data) => {
  //     console.log('imattendee fhjhffhj', data)
  //     socket.broadcast.emit('addmeasattendeee', data);

  // })

  socket.on("showframestouser", (data) => {
    console.log("frames", data);
    socket.broadcast.emit("openyourframe", data);
  });

  socket.on("hanguphimfrommeeting", (data) => {
    console.log(data, "so sorry host removed me");
    //socket.broadcast.emit('hostremovedyou', data);
    socket.broadcast.emit("hostremovedhim", data);
    socket.emit("hostremovedhim", data);
  });

  socket.on("camoffhimfrommeeting", (data) => {
    console.log(data, "so sorry host mute cam me");
    socket.broadcast.emit("hostcamoffyou", data);
  });

  socket.on("mutehimfrommeeting", (data) => {
    console.log(data, "so sorry host mute me");
    socket.broadcast.emit("hostmuteyou", data);
  });

  socket.on("imraisinghand", (data) => {
    socket.broadcast.emit("heisraisinghand", data);
  });

  socket.on("imdowninghand", (data) => {
    socket.broadcast.emit("heisdowninghand", data);
  });

  socket.on("youcancome", (waiterid,data) => {
    socket.broadcast.emit("comeinroom", waiterid,data);
    console.log("you are allowed", waiterid);
  });

  // socket.on('imcominginroom', () => {
  //     // socket.emit('removeHim', removableData)
  //     // socket.emit('inreqtohost',hostlate)
  //     // console.log(hostlate[0],"yoooooo")
  //     // socket.to(data.roomName).emit('imNewAttendee',data.name)

  // })
  socket.on("youarenowinrec", (data) => {
    socket.broadcast.emit("youareinrecbyhost", data);
  });
  socket.on("youarenowinrecfull", (data) => {
    socket.broadcast.emit("youareinrecbyhostfull", data);
  });
  socket.on("youarenowinrecnofull", (data) => {
    socket.broadcast.emit("youareinrecbyhostnofull", data);
  });
  
  
  socket.on("messageksc", function (message) {
    console.log("Message received: ", message.event);

    switch (message.event) {
      case "joinRoom":
        joinRoom(
          socket,
          message.userName,
          message.roomName,
          message.veroKey,
          message.meetingperson,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        break;

      case "receiveVideoFrom":
        receiveVideoFrom(
          socket,
          message.userid,
          message.roomName,
          message.sdpOffer,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        break;

      case "candidate":
        addIceCandidate(
          socket,
          message.userid,
          message.roomName,
          message.candidate,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        break;
    }
  });

  socket.on("base64 file", function (msg) {
    // console.log('received base64 file from' + msg.username,msg.type);
    socket.username = msg.username;

    // socket.broadcast.emit('base64 image', //exclude sender
    socket.in(msg.room).broadcast.emit(
      "base64file", //include sender

      {
        username: socket.username,
        file: msg.file,
        fileName: msg.fileName,
        type: msg.type,
      }
    );
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("messageks", {
      event: "participantLeft",
      userID: socket.id,
    });

    console.log("disconnected", socket.id);

    // connectedPeers.delete(socket.id)
  });

  socket.on("close-the-room", (data) => {
    socket.broadcast.emit("close-the-room-for-all", data);
  });
});

// signaling functions
function joinRoom(
  socket,
  username,
  roomname,
  veroKey,
  meetingperson,
  callback
) {
  getRoom(socket, roomname, (err, myRoom) => {
    if (err) {
      return callback(err);
    }

    myRoom.pipeline.create("WebRtcEndpoint", (err, outgoingMedia) => {
      if (err) {
        return callback(err);
      }

      var user = {
        id: socket.id,
        name: username,
        veroKey: veroKey,
        meetingperson,
        outgoingMedia: outgoingMedia,
        incomingMedia: {},
      };

      let iceCandidateQueue = iceCandidateQueues[user.id];
      if (iceCandidateQueue) {
        while (iceCandidateQueue.length) {
          let ice = iceCandidateQueue.shift();
          console.error(
            `user: ${user.name} collect candidate for outgoing media`
          );
          user.outgoingMedia.addIceCandidate(ice.candidate);
        }
      }

      user.outgoingMedia.on("OnIceCandidate", (event) => {
        let candidate = kurento.register.complexTypes.IceCandidate(
          event.candidate
        );
        socket.emit("messageks", {
          event: "candidate",
          userid: user.id,
          candidate: candidate,
        });
      });

      socket.to(roomname).emit("messageks", {
        event: "newParticipantArrived",
        userid: user.id,
        username: user.name,
        veroKey: user.veroKey,
        meetingperson: user.meetingperson,
      });

      var existingUsers = [];

      socket.on('existing-users-list',data=>{
        existingUsers=[]
        data.forEach(element => {
          existingUsers.push(element)
             console.log(data,'existing-users-list',existingUsers)
         
        });
         
      })

     
    //   socket.on('exissting-users-list',data=>{})
      socket.on("disconnect", () => {
        for (let i in myRoom.participants) {
          if (socket.id == myRoom.participants[i].id) {
            if (myRoom.participants[i].meetingperson !== "host") {
              console.log("removing client", myRoom.participants[i]);

              delete myRoom.participants[i];
            }
          }
        }
      });

      for (let i in myRoom.participants) {
        if (myRoom.participants[i].veroKey != user.veroKey) {
          existingUsers.push({
            id: myRoom.participants[i].id,
            name: myRoom.participants[i].name,
            veroKey: myRoom.participants[i].veroKey,
            meetingperson: myRoom.participants[i].meetingperson,
          });
        }

        // socket.to(roomname).emit("register-this-user-data",{
        //     id: myRoom.participants[i].id,
        //     name: myRoom.participants[i].name,
        //     veroKey: myRoom.participants[i].veroKey,
        //     meetingperson: myRoom.participants[i].meetingperson,
        //   });
      }

      socket.emit("messageks", {
        event: "existingParticipants",
        existingUsers: existingUsers,
        userid: user.id,
        veroKey: user.veroKey,
        meetingperson: user.meetingperson,
      });

      console.log(existingUsers,'existingUsers');

      // socket.to(roomname).on('disconnect', () => {

      //     for (let i in myRoom.participants) {
      //         console.log(myRoom.participants)
      //         if (myRoom.participants[i].id === socket.id) {
      //             socket.broadcast.emit("messageks", {
      //                 event: 'participantLeft',
      //                 userID: socket.id
      //             });

      //             console.log('disconnected',socket.id);
      //             delete myRoom.participants[i]
      //         }

      //     }

      //     // connectedPeers.delete(socket.id)

      // })
      myRoom.participants[user.id] = user;
      
    });
  });
}

function receiveVideoFrom(socket, userid, roomname, sdpOffer, callback) {
  getEndpointForUser(socket, roomname, userid, (err, endpoint) => {
    if (err) {
      return callback(err);
    }

    endpoint.processOffer(sdpOffer, (err, sdpAnswer) => {
      if (err) {
        return callback(err);
      }

      socket.emit("messageks", {
        event: "receiveVideoAnswer",
        senderid: userid,
        sdpAnswer: sdpAnswer,
      });

      endpoint.gatherCandidates((err) => {
        if (err) {
          return callback(err);
        }
      });
    });
  });
}

function addIceCandidate(socket, senderid, roomname, iceCandidate, callback) {
  let user = io.sockets.adapter.rooms[roomname].participants[socket.id];
  if (user != null) {
    let candidate = kurento.register.complexTypes.IceCandidate(iceCandidate);
    if (senderid == user.id) {
      if (user.outgoingMedia) {
        user.outgoingMedia.addIceCandidate(candidate);
      } else {
        iceCandidateQueues[user.id].push({ candidate: candidate });
      }
    } else {
      if (user.incomingMedia[senderid]) {
        user.incomingMedia[senderid].addIceCandidate(candidate);
      } else {
        if (!iceCandidateQueues[senderid]) {
          iceCandidateQueues[senderid] = [];
        }
        iceCandidateQueues[senderid].push({ candidate: candidate });
      }
    }
    callback(null);
  } else {
    callback(new Error("addIceCandidate failed"));
  }
}

// useful functions
function getRoom(socket, roomname, callback) {
  var myRoom = io.sockets.adapter.rooms[roomname] || { length: 0 };
  var numClients = myRoom.length;

  console.log(roomname, " has ", numClients, " clients");

  if (numClients == 0) {
    socket.join(roomname, () => {
      myRoom = io.sockets.adapter.rooms[roomname];
      getKurentoClient((error, kurento) => {
        kurento.create("MediaPipeline", (err, pipeline) => {
          if (error) {
            return callback(err);
          }

          myRoom.pipeline = pipeline;
          myRoom.participants = {};
          callback(null, myRoom);
        });
      });
    });
  } else {
    socket.join(roomname);
    callback(null, myRoom);
  }
}

function getEndpointForUser(socket, roomname, senderid, callback) {
  var myRoom = io.sockets.adapter.rooms[roomname];
  var asker = myRoom.participants[socket.id];
  var sender = myRoom.participants[senderid];

  if (asker.id === sender.id) {
    return callback(null, asker.outgoingMedia);
  }

  if (asker.incomingMedia[sender.id]) {
    sender.outgoingMedia.connect(asker.incomingMedia[sender.id], (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, asker.incomingMedia[sender.id]);
    });
  } else {
    myRoom.pipeline.create("WebRtcEndpoint", (err, incoming) => {
      if (err) {
        return callback(err);
      }

      asker.incomingMedia[sender.id] = incoming;

      let iceCandidateQueue = iceCandidateQueues[sender.id];
      if (iceCandidateQueue) {
        while (iceCandidateQueue.length) {
          let ice = iceCandidateQueue.shift();
          console.error(
            `user: ${sender.name} collect candidate for outgoing media`
          );
          incoming.addIceCandidate(ice.candidate);
        }
      }

      incoming.on("OnIceCandidate", (event) => {
        let candidate = kurento.register.complexTypes.IceCandidate(
          event.candidate
        );
        socket.emit("messageks", {
          event: "candidate",
          userid: sender.id,
          candidate: candidate,
        });
      });

      sender.outgoingMedia.connect(incoming, (err) => {
        if (err) {
          return callback(err);
        }
        callback(null, incoming);
      });
    });
  }
}

function getKurentoClient(callback) {
  if (kurentoClient !== null) {
    return callback(null, kurentoClient);
  }

  kurento(argv.ws_uri, function (error, _kurentoClient) {
    if (error) {
      console.log(
        "Could not find media server at aloted address " + argv.ws_uri
      );
      return callback(
        "Could not find media server at address" +
          argv.ws_uri +
          ". Exiting with error " +
          error
      );
    }

    kurentoClient = _kurentoClient;
    callback(null, kurentoClient);
  });
}

const server = app.listen(port, () =>
  console.log(`VEROHive listening on port ${port}!`)
);

io.listen(server);
