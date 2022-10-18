import React, { Component } from "react";
import kurentoUtils from "kurento-utils";
import io, { Socket } from "socket.io-client";
import logo from "./verohivelogo.png";
import gmail from "./gmail.png";
import a from "./verifybadges/a.png";
import b from "./verifybadges/b.png";
import g from "./verifybadges/g.png";
import p from "./verifybadges/p.png";
import r from "./verifybadges/r.png";
import y from "./verifybadges/y.png";
import userpic from "./verifybadges/user.png";
import * as Api from "./api";
import Linkify from "react-linkify";
import Toggle from "react-toggle";
import Privacypolicy from "./privacypolicy";
import copyrightlogo from "./imgs/CopyrightVERO.png";
import welcome from "./welcome.jpg"
import {
  FacebookShareCount,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LineShareButton,
  LinkedinIcon,
  PinterestIcon,
  PinterestShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";
import { Overlay } from "react-portal-overlay";
import TermsCondition from "./TermsCondition";
let currentStream;
class messangerLanding extends Component {
    
  videoEle = React.createRef();
  selectEle = React.createRef();
  state = {
    username: "",
    id: "",
    privatekey: "",
    firstname: "",
    lastname: "",
    email: "",
    organization: "",
    bio: "",
    city: "",
    country: "",
    links: "",
    key: "",
    baconIsReady: false,
    followuser: [],
    write: "",
    following: [],
    invitenewuser: "",
    mailsentsuccessfully: "",
    SenderName: "",
    enterroomname: "",
    enterroomid: "",
    open: false,
    room_code: "",
    userName: "",
    devices: [],
    camMode: ""
  };

  componentDidMount() {
    // const {username}=this.props;
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      let devices = mediaDevices;
      devices = devices.filter((device) => {
        return device.kind === "videoinput";
      });
      if (devices.length) {
        console.log("Devices:", devices);
        this.setState({
          devices: devices
        });
        if (devices.length > 0) {
          this.setState({
            camMode: devices[0].deviceId
          });
          this.startCam(devices[0].deviceId)
        }
      } else {
        console.log("Cannot access to mediaSources!");
      }
    });

    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };

    var username = "guest";
    this.setState({
      id: "guest",
    });


    // var divRoomSelection = document.getElementById('roomSelection');
    // // var divMeetingRoom = document.getElementById('meetingRoom');

    // // var inputRoom = document.getElementById('room');
    // var inputName = document.getElementById('name');
    // var participants = {};
    // var mysocketm = io();
    // var roomName;
    // var userName;

    // var myuser = "camTest";
    // divRoomSelection.style = "display: none";

    // // divMeetingRoom.style = "display:flex;flex-wrap: wrap;position:absolute;left:40px;top:60px";
    // function autojoinmeet() {
    //     roomName = Math.random();
    //     inputName.value = myuser;
    //     console.log(roomName)
    //     if (roomName === '' || userName === '') {
    //         console.log('Room and Name are required!');
    //     } else {
    //         var message = {
    //             event: 'joinRoom',
    //             userName: myuser,
    //             roomName: roomName
    //         }
    //         sendMessage(message);

    //     }
    // }


    // document.getElementById('camCheck').onclick = function () {
    //     if (document.getElementById('camCheck').style.color == "blue") {

    //         document.getElementById('camCheck').style.color = "red";

    //     } else {
    //         document.getElementById('camCheck').style.color = "blue"
    //     }

    //     autojoinmeet()
    // }
    // document.getElementById('camCheck').click();
    // mysocketm.on('messageks', message => {
    //     console.log('Message received: ' + message.event);

    //     switch (message.event) {
    //         case 'newParticipantArrived':
    //             receiveVideo(message.userid, message.username);
    //             break;
    //         case 'existingParticipants':
    //             onExistingParticipants(message.userid, message.existingUsers);
    //             break;
    //         case 'receiveVideoAnswer':
    //             onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
    //             break;
    //         case 'candidate':
    //             addIceCandidate(message.userid, message.candidate);
    //             break;
    //     }
    // });


    // // handlers functions
    // const receiveVideo=(userid, username) =>{

    // }




    // const onExistingParticipants=(userid, existingUsers) =>{

    //     var video = document.getElementById('checkCam');
    //     video.poster="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroTH_placeholder.jpg";
      
    //     video.id = userid;

    //     video.style.width = "200px"
    //     video.style.maxHeight = "200px"
    //     video.style.marginLeft='auto'
    //     video.style.borderRadius="10px"
    //     // var myheight = (video.style.width / 16) * 9
    //     // video.style.height = myheight
    //     video.autoplay = true;
    //     video.controls = true;

    //     var user = {
    //         id: userid,
    //         username: userName,
    //         video: video,
    //         rtcPeer: null
    //     }


    //     participants[user.id] = user;

    //     var constraints = {
    //         audio: true,
    //         // video: {
    //         //   mandatory: {
    //         //     minWidth: 1280,
    //         //     minHeight: 720,
    //         //     maxFrameRate: 15,
    //         //     minFrameRate: 15
    //         //   },

    //         //   optional: [{ aspectRatio: 16 / 9 }]
    //         // }
    //         video: {
    //             frameRate: {
    //                 min: 1, ideal: 15, max: 30
    //             },
    //             width: {
    //                 min: 640, ideal: 1280, max: 1280
    //             },
    //             height: {
    //                 min: 360, ideal: 720, max: 720
    //             }
    //         }
    //     };

    //     var options = {
    //         localVideo: video,
    //         mediaConstraints: constraints,
    //         onicecandidate: onIceCandidate
    //     }



    //     user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
    //         function (err) {
    //             if (err) {
    //                 return console.error(err);
    //             }
    //             this.generateOffer(onOffer)
    //         }
    //     );

    //     existingUsers.forEach(function (element) {
    //         receiveVideo(element.id, element.name);
    //     });

    //     var onOffer = function (err, offer, wp) {
    //         console.log('sending offer');
    //         var message = {
    //             event: 'receiveVideoFrom',
    //             userid: user.id,
    //             roomName: roomName,
    //             sdpOffer: offer
    //         }
    //         sendMessage(message);
    //     }

    //     function onIceCandidate(candidate, wp) {
    //         console.log('sending ice candidates');
    //         var message = {
    //             event: 'candidate',
    //             userid: user.id,
    //             roomName: roomName,
    //             candidate: candidate
    //         }
    //         sendMessage(message);

    //     }








        // videomute.onclick = function () {

        //     const mediaStream = video.srcObject;
        //     const videoTracks = mediaStream.getVideoTracks();
        //     if (videomute.style.color == "blue") {

        //         videomute.style.color = "red"

        //         videoTracks.forEach(track => track.enabled = false)
        //     }
        //     else if (videomute.style.color == "red") {
        //         videomute.style.color = "blue"


        //         videoTracks.forEach(track => track.enabled = true)
        //     }



        // }

        // audiomute.onclick = function () {
        //     const mediaStream = video.srcObject;
        //     const AudioTracks = mediaStream.getAudioTracks();
        //     if (audiomute.style.color == "blue") {

        //         audiomute.style.color = "red"
        //         AudioTracks.forEach(track => track.enabled = false)
        //     }
        //     else if (audiomute.style.color == "red") {
        //         audiomute.style.color = "blue"
        //         AudioTracks.forEach(track => track.enabled = true)
        //     }
        // }

    //     function dispose() {
    //         if (user.rtcPeer) {
    //             user.rtcPeer.dispose();
    //             user.rtcPeer = null;
    //         }
    //         video.remove()
    //     }

    // }


    // function onReceiveVideoAnswer(senderid, sdpAnswer) {
    //     participants[senderid].rtcPeer.processAnswer(sdpAnswer);
    // }



    // function addIceCandidate(userid, candidate) {
    //     participants[userid].rtcPeer.addIceCandidate(candidate);
    // }

    // // utilities

    // function sendMessage(message) {
    //     console.log('sending ' + message.event + ' message to server');
    //     // mysocketm.emit('imcominginroom', () => {
    //     //     console.log('I m joining the room')
    //     // })
    //     mysocketm.emit('messageksc', message);

    // }
  }

  
  // sendemail = (enteredemail) => {
  //   console.log("rjha", enteredemail)
  //   // const enteredemail = prompt("Enter email to invite ")
  //   // const enteredemail = this.state.emailinvite
  //   // navigator.clipboard.writeText(this.props.location.state.room_code);
  //   fetch("/nodemailer", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       To: enteredemail,
  //       subject: "VEROHive Meeting Invitation" + this.state.write,
  //       text: "Your invitation Code is" + this.state.write,
  //       html: `<img src="./verohivelogo.png" style="width: 30%;">
  //       <h1 style="color: #5b5b5b;">VEROHive Meeting Invitation</h1>
  //       <h3 style="color: #757575;">Click the link below to respond to the invitation.</h3>

  //     <br>

  //       <h4 style="color: #757575;">Cheers!</h4>
  //       <h4 style="color: #757575;">VEROHive Team</h4>
  //       `

  //     })
  //   })

  //     .then(() => {

  //       console.log("ddd")
  //       //  this.verify()
  //       this.setState({ show: false })
  //       alert("Mail sent successfully")
  //     })
  //     .catch(err => console.log(err))

  // }
  stopCam = () => {
    console.log("Stop Camera");
    if (this.isRunning()) {
      const stream = this.videoEle.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  };
  
  
  isRunning = () => {
    const stream = this.videoEle.current.srcObject;
    return stream && stream.getTracks;
  };
  
  startCam = async (deviceId) => {
    console.log("Start Camera");
    try {
      if (typeof currentStream !== "undefined") {
        this.stopCam(currentStream);
      }
  
      const videoConstraints = {};
      if (this.state.camMode === "") {
        videoConstraints.facingMode = "environment";
        videoConstraints.width= { min: 640, ideal: 1920, max: 1920 };
        videoConstraints.height= { min: 400, ideal: 1080 };
        videoConstraints.aspectRatio= 1.777777778;
        videoConstraints.frameRate= { max: 30 };
      } else {
        videoConstraints.deviceId = { exact:deviceId };
        videoConstraints.width= { min: 640, ideal: 1920, max: 1920 };
        videoConstraints.height= { min: 400, ideal: 1080 };
        videoConstraints.aspectRatio= 1.777777778;
        videoConstraints.frameRate= { max: 30 };
       
      }
  
      const constraints = {
        video: videoConstraints,
       
        audio: false
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
  
      currentStream = stream;
      this.videoEle.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };
  changeSource = (e) => {
    console.log("Change to:", e.target.value);
    this.setState({
      camMode: e.target.value
    });
    if (this.isRunning()) {
      this.stopCam();
      this.startCam(e.target.value);
    }
  };
  

  openclose = () =>
    this.setState({
      show: true,
    });

  //invitenewuser
  handleChange(event) {
    // do something with event.target.checked
    this.setState({
      baconIsReady: event.target.checked,
    });
  }
  contact = () => {
    this.props.history.push("/contact", {
      username: this.state.id,
    });
  };

  meetingmediaserver = () => {
    this.props.history.push("/meeting");
  };
  TermsCondition = () => {
    this.props.history.push("/TermsCondition", {
      username: this.state.id,
    });
  };

  meetingScheduler = () => {
    this.props.history.push("/meetingScheduler", {
      username: this.state.id,
    });
  };

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
    });
  };
  publicProfile = () => {
    this.props.history.push("/publicProfile", {
      username: this.state.id,
    });
  };

  Messanger = () => {
    this.props.history.push("/chat", {
      username: this.state.id,
    });
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };

  sayHello = () => {
    console.log("Hello");
    fetch("/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        localStorage.removeItem("user");
        this.props.history.push("/login");
        window.location.reload();
        console.log("ff", res);
      })
      .catch((err) => console.log(err));
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = (e) => {
    function makeid(length) {
      var result           = [];
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
   charactersLength)));
     }
     return result.join('');
  }
  
    var mylocalvar = parseInt(window.location.hash.substr(1));
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var randnow =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString()+makeid(7);
    this.setState({
      [e.target.name]: e.target.value,
      room_code:mylocalvar,
      privatekey:randnow,
      firstName:this.state.userName
    });
  };

  joinRoom = () => {
    console.log("hello");
    if (!this.state.room_code) {
      return console.log('error,no room id');
      // alert("Enter the room id");
    }else if(!this.state.userName){
      return this.setState({ enterroomid: "Enter Your Name" });
    }
    else if(!this.state.email){
      return this.setState({ enterroomid: "Enter Your Email" });
    }
    else{
      const {
        firstName,
        lastName,
        userName,
        email,
        privatekey
      } = this.state;
      
     
          fetch("/TempAttendee", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              userName,
              privatekey,
              email,
            }),
          })
            .then(() => {
              this.props.history.push({
                pathname: "/waitingRoom",
                search:
                  "?" + new URLSearchParams({ id: this.state.room_code }).toString(),
                state: {
                  type: "client",
                  room_code: this.state.room_code,
                  username: this.state.userName,
                  privatekey: this.state.privatekey,
                  email: this.state.email,
                  firstname: this.state.userName,
                  lastName: "",
                  isViaLink:'true',
                  camMode:this.state.camMode
                },
              });
              
            })
            .catch((err) => console.log(err));
  
    
       
      
    }
    // API.get('/rooms/join/'+this.state.room_code, {

    // }).then((res) => {
    // 	console.log("dd",res)
    // 	// this.props.flashHandler('success', 'Room Joined!');
    // 	this.setState({ room_name: res.data.data.room_name, type: 'client' })
    

      
      
  
    // }).catch((error) => {
    // 	this.props.flashHandler('error', 'Room is full!');
    // });
  };

  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      [field]: value.trim(),
    });
  };
  // viewfollow = () => {
  //   const { email, privatekey, key } = this.state;
  //   fetch("/follow/followrequests", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       privatekey
  //     })
  //   })
  //     .then(response => response.json())
  //     .then((res) => {
  //       console.log("Dd", res)
  //       this.setState({ followuser: res })
  //     })
  //     .catch(err => console.log(err))
  // }

  // acceptrequest = (email) => {
  //   const { firstname, lastname } = this.state;
  //   const fullnameaccepted = firstname + lastname
  //   const emailaccepted = this.state.email
  //   fetch("/follow/acceptrequests", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email,
  //       emailaccepted,
  //       fullnameaccepted
  //     })
  //   })
  //     .then((res) => {
  //       console.log("Dd", res)
  //       alert("connected successfully")
  //       this.viewfollow()
  //       this.viewfollowing()
  //     })
  //     .catch(err => console.log(err))
  // }
  // follow = () => {
  //   const { email, privatekey, key, firstname, lastname } = this.state;
  //   var fullname = firstname + lastname
  //   if (key == privatekey) {
  //     alert("You can't follow yourself")

  //   }
  //   else {
  //     fetch("/follow", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({

  //         email,
  //         privatekey,
  //         fullname,
  //         key
  //       })
  //     })
  //       .then((res) => {
  //         console.log("rohan", res)
  //         if (res.status == 401) {
  //           alert("already connected")
  //         }
  //         else {
  //           alert("Follow request sent successfully")
  //         }

  //       })
  //       .catch(err => console.log(err))
  //   }

  // }
  // viewfollowing = () => {
  //   this.setState({ following: [] })
  //   const privatekey = this.state.privatekey
  //   fetch("/follow/following", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       privatekey
  //     })
  //   })
  //     .then(response => response.json())
  //     .then((res) => {
  //       console.log("Dd", res)
  //       this.setState({ following: res })
  //     })
  //     .catch(err => console.log(err))
  //   fetch("/follow/followinga", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       privatekey
  //     })
  //   })
  //     .then(response => response.json())
  //     .then((res) => {
  //       console.log("Dd", res)
  //       if (this.state.following.length == undefined) {
  //         this.setState({ following: res })
  //       }
  //       else {
  //         console.log("here")
  //         for (var i = 0; i < res.length; i++) {
  //           this.state.following.push(res[i])
  //         }

  //         this.setState({ following: this.state.following })
  //       }

  //     })
  //     .catch(err => console.log(err))
  // }
  // Upload1_To_AWS_S3 = () => {
  //   var that = this;
  //   const { email } = this.state;
  //   // console.log("Dddd", this.state.image)
  //   let formData = new FormData();
  //   formData.append("photo", this.state.image);
  //   try {
  //     const res = Api.uploadImageToAwsS3(formData)
  //     res.then(function (value) {
  //       // console.log(value); // "Success"
  //       // that.setState({
  //       //   image: value
  //       // })
  //       fetch("/updateProfilePic", {
  //         method: "post",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           email,
  //           value

  //         })
  //       })

  //         .then(() => {

  //           alert("profile pic changed successfully")
  //           that.setState({
  //             image1: value
  //           })

  //         })
  //         .catch(err => console.log(err))
  //     })

  //   } catch (e) {

  //   }

  // }

  // async onSubmit(e) {
  //   e.preventDefault();
  //   const { username } = this.state;

  //   this.props.history.push({
  //     pathname: '/videochat',
  //     search: "?" + new URLSearchParams({ id: username }).toString(),
  //     state: { username: this.state.id }
  //   })

  // }

  render() {
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    };

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    };

    const opencontact = () => {
      document.querySelector(".contactbar").classList.add("open");
    };

    const closecontact = () => {
      document.querySelector(".contactbar").classList.remove("open");
    };
    const shareUrl = "https://verohive.org/register";
    const title = "VEROHive";

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    return (
      <div className="home-main">
        <div className="header">
          <div className="brand">
            {/* <button onClick={openMenu}>&#9776;</button> */}
          </div>
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "45%" }}>
          V4.1.1
          </h4>
        </div>

        {this.state.enterroomid != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "2.4rem",
              position: "absolute",
              top: "30%",
              left: "40%",
              width: "300px",
              height: "200px",
            }}
          >
            <br></br>
            <br></br>{" "}
            <span style={{ marginTop: "100px" }}>
              {" "}
              {this.state.enterroomid}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                  width: "100px",
                }}
                onClick={() =>
                  this.setState({
                    enterroomid: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.mailsentsuccessfully != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "2.4rem",
              position: "absolute",
              top: "30%",
              left: "40%",
              width: "300px",
              height: "200px",
            }}
          >
            <br></br>
            <br></br>{" "}
            <span style={{ marginTop: "100px" }}>
              {" "}
              {this.state.mailsentsuccessfully}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                  width: "100px",
                }}
                onClick={() =>
                  this.setState({
                    mailsentsuccessfully: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.enterroomname != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "2.4rem",
              position: "absolute",
              top: "30%",
              left: "40%",
              width: "300px",
              height: "200px",
            }}
          >
            <br></br>
            <br></br>{" "}
            <span style={{ marginTop: "100px" }}>
              {" "}
              {this.state.enterroomname}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                  width: "100px",
                }}
                onClick={() =>
                  this.setState({
                    enterroomname: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        <div></div>

        <div className="profile-container" style={{width:'80%',maxWidth:'80%',right:'10%',maxHeight:'80vh',overflowY:'scroll'}}>
        <div style={{backgroundColor:'#033a5a',flexWrap:'wrap',padding:'10px',display:'flex',justifyContent:'space-evenly',marginLeft:'40px'}} id="infoBar-link"
           
      
           >
             <a  href="https://www.verohive.com/" target="_blank">
               Learn about VeroHive
             </a>
             <a 
               href="https://www.verohive.com/verohive-town-hall/"
               target="_blank"
             >
               Town Hall
             </a>
             <a 
               href="https://www.verohive.com/video-podcasting/"
               target="_blank"
             >
               Video Podcasting
             </a>
             <a href="https://www.verohive.com/verohive-faq/" target="_blank">
               VeroHive FAQ
             </a>
             <a 
               href="https://www.verohive.com/megahoot-pricing-and-plans/"
               target="_blank"
             >
               Pricing and Plans
             </a>
             <a href="https://www.megahoot.com/" target="_blank">
               MegaHoot Tech
             </a>
           </div>
       
          <ul>
            <form onSubmit={(e)=>{e.preventDefault()}}  style={{fontWeight:"bold",backgroundColor:'#f5f5f5',padding:'10px',color:'black',overflowY:'auto',marginTop:'-20px'}}>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
           
               
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
               
                     <ul style={{display:'flex',alignItems:'left',flexWrap:'wrap',flexDirection:'column',justifyContent:'center',maxWidth:'70%'}}>
                   
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                    <div style={{maxWidth:'60%',marginTop:'16px',width:'60%'}}>
                       <img src={welcome} style={{width:'100%',maxHeight:'120px'}}></img>
                      
                    </div>
                   
                     <div>
    <video 
              style={{width:'200px',margin:'10px',borderRadius:'10px',maxHeight:'125px'}} id="checkCam" autoPlay ref={this.videoEle}
              poster= "https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroTH_placeholder.jpg"

              ></video> 
               <p style={{color:'red',textAlign:'left',fontSize:'12px',fontWeight:'lighter',maxWidth:'200px'}}>IF YOU DON'T SEE YOURSELF HERE THEN YOU MUST ALLOW YOUR BROWSER TO ACCESS YOUR CAMERA</p>
                 
               <p style={{fontSize:'15px',fontWeight:'lighter'}}>Camera Selection: <select   style={{padding:'5px',margin:'10px',border:'1px solid black',width:'60px',minWidth:'60px'}}
                    onChange={this.changeSource}>
            {this.state.devices.length > 0
              ? this.state.devices.map((device, index) => {
                  return (
                    <option key={index} value={device.deviceId}>
                      {device.label || "Camera " + (index + 1)}
                    </option>
                  );
                })
              : null}
          </select>
          </p> 

                     </div>
                 
                    </div>
                    <p style={{fontSize:'15px',fontWeight:'lighter'}}>Room Id: {parseInt(window.location.hash.substr(1))}</p>
               
                
                  <div>
                  <p style={{fontSize:'15px',fontWeight:'lighter'}}>Enter Your Name that you want to appear in Meeting</p>
                


                    <span style={{fontSize:'15px',fontWeight:'lighter'}}>Name:</span>
                    <input
                      className="checkmeet" style={{padding:'5px',margin:'10px',border:'1px solid black',width:'70%'}}
                      onChange={(event) => {
                        this.inputHandler(event);
                      }}
                      type="text"
                      name="userName"
                      placeholder="Enter Your Name"
                      value={this.state.userName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div>
                    <span style={{fontSize:'15px',fontWeight:'lighter'}}>Email:</span>
                    <input type="email"
                      className="checkmeet" style={{padding:'5px',margin:'10px',border:'1px solid black',width:'70%'}}
                      onChange={(event) => {
                        this.inputHandler(event);
                      }}
                      type="text"
                      name="email"
                      placeholder="Enter Your Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                 
               
                  
               
                </ul>
                <ul style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              
               
                </ul>
                
                </div>
             
               
           
               
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="btn-login"
                    style={{
                     
                      width:'300px',
                      fontSize:'16px'
                    }}
                    onClick={() => {
                      this.joinRoom();
                    }}
                  >
                    Enter
                  </button>
                 
                </div>
                <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
              </div>
            </form>
          </ul>
        </div>
      
        <div className="footer">
          <img src={copyrightlogo} style={{ width: "20px" }}></img>MegaHoot Technologies, Inc All Rights Reserved
          <button
            onClick={() => this.openModal()}
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              backgroundColor: "#033a5a",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1.6rem",
            }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => this.TermsCondition()}
            style={{
              cursor: "pointer",
              backgroundColor: "#033a5a",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1.6rem",
            }}
          >
            Terms & Conditions
          </button>{" "}
        </div>
      </div>
  
  
  
  );
  }
}

export default messangerLanding;
