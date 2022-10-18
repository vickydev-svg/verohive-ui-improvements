import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "./verohivelogo.png";
import gmail from "./gmail.png";
import a from "./verifybadges/a.png";
import b from "./verifybadges/b.png";
import g from "./verifybadges/g.png";
import p from "./verifybadges/p.png";
import r from "./verifybadges/r.png";
import y from "./verifybadges/y.png";
import verogo from "./imgs/verogo.png";
import userpic from "./verifybadges/user.png";
import * as Api from "./api";
import Linkify from "react-linkify";
import Toggle from "react-toggle";
import Privacypolicy from "./privacypolicy";
import copyrightlogo from "./imgs/CopyrightVERO.png";
import infoicon from "./imgs/infoicon.png";
import kurentoUtils from "kurento-utils";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import { FaShareAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdPersonalVideo } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import axios from "axios";
import "./home.css";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
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
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import Membership from "./Membership";

var socket = io();
let currentStream;
class Home extends Component {
  videoEle = React.createRef();
  selectEle = React.createRef();
  state = {
    updateProfile: false,
    open: false,
    contactPop: false,
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
    joinhost_code: "",
    infobox: "",
    infoboxcontainer: "",
    Twitter: "",
    roompin: "",
    youarenothost: "",
    facingMode: "environment",
    facingModeButtonText: "Back Camera",
    isElectronNotifier: false,
    membershipLevel: "",
    showMembership: false,
    devices: [],
    camMode: "",
    upgradeMembership: "",
    linkedIn: "",
    facebook: "",
    facebookLive: "",
    twitter: "",
    instagram: "",
    youtube: "",
    youtubeLive: "",
    otherWebsite1: "",
    otherWebsite2: "",
    meetingTime: false,
  };

  componentDidMount() {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      let devices = mediaDevices;
      devices = devices.filter((device) => {
        return device.kind === "videoinput";
      });
      if (devices.length) {
        console.log("Devices:", devices);
        this.setState({
          devices: devices,
        });
        if (devices.length > 0) {
          this.setState({
            camMode: devices[0].deviceId,
          });
          this.startCam(devices[0].deviceId);
        }
      } else {
        console.log("Cannot access to mediaSources!");
      }
    });

    const isElectron = () => {
      // Renderer process
      if (
        typeof window !== "undefined" &&
        typeof window.process === "object" &&
        window.process.type === "renderer"
      ) {
        // document.getElementById('host-room-id').style.display = 'flex';
        // document.getElementById('create-a-new-room').style.display = 'flex';
        this.setState({
          isElectronNotifier: true,
        });
      }

      // Main process
      if (
        typeof process !== "undefined" &&
        typeof process.versions === "object" &&
        !!process.versions.electron
      ) {
        this.setState({
          isElectronNotifier: true,
        });
      }

      if (
        typeof navigator === "object" &&
        typeof navigator.userAgent === "string" &&
        navigator.userAgent.indexOf("Electron") >= 0
      ) {
        this.setState({
          isElectronNotifier: true,
        });
      }
    };
    isElectron();

    console.log("dd", this.props.location.state.username);
    var username = this.props.location.state.username;
    this.setState({
      id: this.props.location.state.username,
    });

    fetch("http://localhost:65000/getuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("ff", res);
        this.setState({
          privatekey: res.privateKey,
          firstname: res.firstName,
          lastname: res.lastName,
          email: res.email,
          organization: res.organization,
          verified: res.verified,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          image1: res.ProfilePic,
          Twitter: res.Twitter,
          roompin: res.roompin,
        });
        const emailforStatus = res.email;
        this.setState({
          upgradeMembership: emailforStatus,
        });
        axios
          .get(
            `https://megahoot.org/mh_api_check_email.php?email=${emailforStatus}`
          )
          .then((res) => {
            if (res.data.member_level) {
              if (res.data.member_level == "Member") {
                let statusData = res.data.member_level;
                this.setState({
                  membershipLevel: statusData,
                });
              } else {
                let statusData = res.data.member_level + " " + "Member";
                this.setState({
                  membershipLevel: statusData,
                });
              }
            } else {
              this.setState({
                membershipLevel: "Guest Member",
              });
            }
          });
      })
      .catch((err) => console.log(err));

    window.onbeforeunload = () => {
      window.setTimeout(() => {
        this.props.history.push("/private", {
          username: this.state.id,
        });
      }, 0);
      window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
    };
  }

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
        videoConstraints.width = { min: 640, ideal: 1920, max: 1920 };
        videoConstraints.height = { min: 400, ideal: 1080 };
        videoConstraints.aspectRatio = 1.777777778;
        videoConstraints.frameRate = { max: 30 };
      } else {
        videoConstraints.deviceId = { exact: deviceId };
        videoConstraints.width = { min: 640, ideal: 1920, max: 1920 };
        videoConstraints.height = { min: 400, ideal: 1080 };
        videoConstraints.aspectRatio = 1.777777778;
        videoConstraints.frameRate = { max: 30 };
      }

      const constraints = {
        video: videoConstraints,

        audio: false,
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
      camMode: e.target.value,
    });
    if (this.isRunning()) {
      this.stopCam();
      this.startCam(e.target.value);
    }
  };

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
  //skytest

  // }

  openclose = () =>
    this.setState({
      show: true,
    });

  newinvite = () => {
    console.log("dd", this.props.location.state.username);
    var username = this.props.location.state.username;
    this.setState({
      id: this.props.location.state.username,
    });
    // console.log("rjha", enteredemail)
    // const enteredemail = prompt("Enter email to invite ")
    const shareemail = this.state.invitenewuser;
    // const userown = this.state.username
    // navigator.clipboard.writeText(this.props.location.state.room_code);
    fetch("/getuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("ff", res);
        this.setState({
          privatekey: res.privateKey,
          firstname: res.firstName,
          lastname: res.lastName,
        });
      })
      .catch((err) => console.log(err));

    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        To: shareemail,
        subject: "VEROHive Member Invitation",
        text:
          "VEROHive Invitation From" +
          this.state.firstname +
          "" +
          this.state.lastname,
        html: `<a href="https://verohive.net/"><img src="https://farma-consumer.s3.ap-south-1.amazonaws.com/c230d91721664885cf6c0cf1b1c6c70f.png" style="width: 20%;"></a>
        
        <h4>${
          this.state.firstname + " " + this.state.lastname
        } is sharing their VERO Number with you so that you can connect on the secure video conferencing and collaboration platform VEROHive.</h4>
         <h4>Their VERO Number is:</h4>
        <h2>${this.state.privatekey}</h2>
        <p style="color: black;">
        <br>
        Just log into your VEROHive account and click on the contacts link that can be found in the side panel, paste their VERO Number in the Enter VERO Number slot and connect.
        <br><br>
        If you are not a member yet, you can click here and Register for FREE.  <a href="https://verohive.net/register">Signup Now</a>
       <br><br>
       VEROHive,  it's not working from home, it's working from anywhere!
        <br>
        <br>
    
        </p>
        
       
     
       
  
      <br>
      
       
        
        
        <h4 style="color: #757575;">Cheers!</h4>
        <h4 style="color: #757575;">The VEROHive Team!</h4>
        `,
      }),
    })
      .then(() => {
        console.log("ddd");
        //  this.verify()
        this.setState({ invitenewuser: "" });
        this.setState({ SenderName: "" });
        this.setState({ mailsentsuccessfully: "Mail sent successfully" });
        // alert("Mail sent successfully")
      })
      .catch((err) => console.log(err));
  };
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
  miniapp = () => {
    this.props.history.push("/Miniapp", {
      username: "guest",
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

  Membership = () => {
    this.props.history.push("/Membership", {
      email: this.state.email,
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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  infohostjoin = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox:
        "If you scheduled a Vero Meeting then you can add the Room ID associated with that meeting here and press the green arrow so you can join as the Vero Host.",
    });
  };
  infohostcreate = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox:
        "Here is where you can create a Vero Room at any time, just pick a name for your room and you will automatically enter the room once you press the green arrow, once in the room you can invite others to the Vero Meeting.",
    });
  };

  infoattendeejoin = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox:
        "If you received an invitation via email then this is where you enter that Room ID and press the green arrow. You will be sent to a waiting room until the host brings you into the Vero Meeting.",
    });
  };

  joinRoom = () => {
    function detectWebcam(callback) {
      let md = navigator.mediaDevices;
      if (!md || !md.enumerateDevices) return callback(false);
      md.enumerateDevices().then((devices) => {
        callback(devices.some((device) => "videoinput" === device.kind));
      });
    }

    detectWebcam(function (hasWebcam) {
      if (!hasWebcam) {
        return this.setState({ enterroomid: "Your Camera is not connected" });
      }
    });
    console.log("hello");
    if (!this.state.room_code) {
      return this.setState({ enterroomid: "Enter the room id" });
      // alert("Enter the room id");
    }

    // API.get('/rooms/join/'+this.state.room_code, {

    // }).then((res) => {
    // 	console.log("dd",res)
    // 	// this.props.flashHandler('success', 'Room Joined!');
    // 	this.setState({ room_name: res.data.data.room_name, type: 'client' })

    this.props.history.push({
      pathname: "/waitingRoom",
      search:
        "?" + new URLSearchParams({ id: this.state.room_code }).toString(),

      state: {
        type: "client",
        room_code: this.state.room_code,
        username: this.state.id,
        privatekey: this.state.privatekey,
        email: this.state.email,
        firstname: this.state.firstname,
        lastName: this.state.lastname,
        organization: this.state.organization,
        camMode: this.state.camMode,
      },
    });
    // }).catch((error) => {
    // 	this.props.flashHandler('error', 'Room is full!');
    // });
  };

  joinhostnow = () => {
    console.log(this.state.joinhost_code);
    var scheduledroomcode = this.state.joinhost_code;
    var firstsixdigit = scheduledroomcode.toString();
    if (this.state.roompin == firstsixdigit.substring(0, 6)) {
      this.props.history.push({
        pathname: "/videochat",
        search:
          "?" +
          new URLSearchParams({ id: this.state.joinhost_code }).toString(),
        state: {
          type: "host",
          room_code: this.state.joinhost_code,
          // room_name:this.state.room_name,
          username: this.state.id,
          privatekey: this.state.privatekey,
          email: this.state.email,
          firstname: this.state.firstname,
          lastName: this.state.lastname,
          organization: this.state.organization,
          camMode: this.state.camMode,
        },
      });
    } else {
      this.setState({
        youarenothost: "you are not the host of this room",
      });
    }
  };
  createRoom = () => {
    // console.log('hello')
    function detectWebcam(callback) {
      let md = navigator.mediaDevices;
      if (!md || !md.enumerateDevices) return callback(false);
      md.enumerateDevices().then((devices) => {
        callback(devices.some((device) => "videoinput" === device.kind));
      });
    }

    detectWebcam(function (hasWebcam) {
      if (!hasWebcam) {
        return this.setState({ enterroomid: "Your Camera is not connected" });
      }
    });
    if (!this.state.room_name) {
      return this.setState({ enterroomname: "Enter the room name" });
      // alert("Enter the room name");
    }

    var rand, mailOptions, host, link;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var rand5 = Math.floor(Math.random() * 100 + 54);

    rand =
      rand1.toString() +
      rand2.toString() +
      rand3.toString() +
      rand4.toString() +
      rand5.toString();

    // rand = rand1.toString()+ Math.random().toString(36) +rand2.toString()+ Math.random().toString(36);

    // if (this.state.room_name == '') {
    //   this.props.flashHandler('error', "You didn't enter a room name!");
    //   return;
    // }
    // var rand, mailOptions, host, link;
    // var rand1 = Math.floor((Math.random() * 100) + 54);
    // var rand2 = Math.floor((Math.random() * 100) + 54);
    // var rand3 = Math.floor((Math.random() * 100) + 54);
    // rand = rand1.toString() + rand2.toString() + rand3.toString();
    // let userData = JSON.parse(localStorage.getItem('userData'));
    // let userID = userData.id;

    // API.post('/rooms/create', {
    //   name: this.state.room_name,
    //   creatorId: userID
    // }).then((res) => {
    //   console.log(res.data.data.roomCode);
    //   this.setState({
    //     type: 'host',
    //     room_code: res.data.data.roomCode
    //   });
    //Should get room code here and set its state
    // this.props.flashHandler('success', 'Room Joined!');

    this.props.history.push({
      pathname: "/videochat",
      search: "?" + new URLSearchParams({ id: rand }).toString(),
      state: {
        type: "host",
        room_code: rand,
        room_name: this.state.room_name,
        username: this.state.id,
        privatekey: this.state.privatekey,
        email: this.state.email,
        firstname: this.state.firstname,
        lastName: this.state.lastname,
        organization: this.state.organization,
        camMode: this.state.camMode,
      },
    });
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
  handleCloseMeetingTime = () => {
    this.setState({
      meetingTime: false,
    });
  };
  handleCloseUpdatePop = () => {
    this.setState({
      updateProfile: false,
    });
  };
  handleCloseContactPop = () => {
    this.setState({
      contactPop: false,
    });
  };
  handleClickOpenMeetingTime = () => {
    this.setState({
      meetingTime: true,
    });
  };
  handleClickOpenUpdatePop = () => {
    this.setState({
      updateProfile: true,
    });
  };
  handleClickOpenChatPop = () => {
    this.setState({
      contactPop: true,
    });
  };
  render() {
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    };

    // const openSidebar = () =>{
    //   onClick={() =>
    //     this.setState({
    //       enterroomid: "",
    //     })
    //   }
    // }

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    };

    const opencontact = () => {
      document.querySelector(".contactbar").classList.add("open");
    };

    const closecontact = () => {
      document.querySelector(".contactbar").classList.remove("open");
    };
    const shareUrl = "https://verohive.net/register";
    const title = "VeroTownhall";

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1em",
          },
        },
      },
    });

    return (
      <>
        {/* MEETING SCHEDULE POPUP */}
        <Dialog
          className="metting_dialog dialog"
          open={this.state.meetingTime}
          onClose={() => {
            this.handleCloseMeetingTime();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "#204C6D",
              borderBottom: "2px solid #204C6D",
            }}
          >
            SCHEDULE YOUR MEETINGS
          </DialogTitle>
          <DialogContent className="metting_dialog_content">
            <DialogContentText
              id="alert-dialog-description"
              className="metting_dialog_content_text"
            >
              <div className="email_and_button">
                <TextField
                  fullWidth
                  label="Type Attendee Email Address"
                  id="fullWidth"
                  className="metting_textField"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      margin: "20px 0px 0px 0px",
                      color: "black",
                    },
                  }}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontSize: 15,
                      margin: "0 0 0 0px",
                      fontWeight: 500,
                      color: "#204C6D",
                    },
                  }}
                />
                <Button
                  className="email_metting_button"
                  variant="contained"
                  startIcon={<ContactsIcon />}
                >
                  Add From Contacts
                </Button>
              </div>
              <div className="metting_title">
                <TextField
                  fullWidth
                  label="Meeting Title"
                  id="fullWidth"
                  className="metting_textField"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      margin: "20px 0px 0px 0px",
                      color: "black",
                    },
                  }}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontSize: 15,
                      margin: "0 0 0 0px",
                      fontWeight: 500,
                      color: "#204C6D",
                    },
                  }}
                />
              </div>

              <div className="meeting_date">
                <TextField
                  type="datetime-local"
                  fullWidth
                  id="fullWidth"
                  className="metting_textField"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      margin: "20px 0px 0px 0px",
                      color: "black",
                    },
                  }}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontSize: 15,
                      margin: "0 0 0 0px",
                      fontWeight: 500,
                      color: "#204C6D",
                    },
                  }}
                />
              </div>

              <div className="metting_message">
                <TextField
                  fullWidth
                  label="Message"
                  id="fullWidth"
                  className="metting_textField"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      margin: "20px 0px 0px 0px",
                      color: "black",
                    },
                  }}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontSize: 15,
                      margin: "0 0 0 0px",
                      fontWeight: 500,
                      color: "#204C6D",
                    },
                  }}
                />
                <Button
                  className="email_metting_button"
                  variant="contained"
                  startIcon={<ScheduleIcon />}
                >
                  Schedule Meeting
                </Button>
              </div>
              {/* <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              InputProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 500,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                },
              }}
              InputLabelProps={{
                style: { fontSize: 15, margin: "0 0 0 10px" },
              }}
            /> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              onClick={() => {
                this.handleCloseMeetingTime();
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/* MEETING SCHEDULE POPUP */}
        {/* UPDATE POPUP */}
        <Dialog
          className="dialog"
          open={this.state.updateProfile}
          onClose={() => {
            this.handleCloseUpdatePop();
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>UPDATE PROFILE</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              className="dialog_content"
              style={{
                width: "100%",
                height: "100vh",
              }}
            >
              <form
                action=""
                className="update_profile_form"
                style={{
                  width: "100%",
                  height: "90%",
                }}
              >
                <div
                  className="update_form_left_part"
                  style={{
                    width: "100%",
                    height: "10%",
                  }}
                >
                  <Box
                    className="material_ui_box"
                    component="form"
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: "25ch",
                      },
                    }}
                    style={{ width: "100%", height: "100%" }}
                    noValidate
                    autoComplete="off"
                  >
                    <div
                      className="read_only"
                      style={{
                        width: "100%",
                        height: "100%",

                        margin: "0",
                        padding: "0",
                      }}
                    >
                      <TextField
                        id="standard-read-only-input"
                        label="First Name"
                        defaultValue="Vicky"
                        InputProps={{
                          readOnly: true,
                          style: {
                            fontSize: 15,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            margin: "20px 0px 0px 10px",
                          },
                        }}
                        variant="standard"
                        InputLabelProps={{
                          style: { fontSize: 20, margin: "0 0 0 10px" },
                        }}
                      />

                      <TextField
                        id="standard-read-only-input"
                        label="Last Name"
                        defaultValue="Kumar"
                        InputProps={{
                          readOnly: true,
                          style: {
                            fontSize: 15,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            margin: "20px 0px 0px 20px",
                          },
                        }}
                        variant="standard"
                        InputLabelProps={{
                          style: { fontSize: 20 },
                        }}
                      />
                    </div>
                    <div className="write_only " style={{ width: "100%" }}>
                      <TextField
                        id="standard-basic"
                        label="City"
                        variant="standard"
                        name="city"
                        // onChange={handleChange}
                        InputProps={{
                          style: {
                            fontSize: 15,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            margin: "20px 0px 0px 0px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 15, marginLeft: "0px" },
                        }}
                      />

                      <TextField
                        id="standard-basic"
                        label="Country"
                        variant="standard"
                        name="country"
                        // onChange={handleChange}
                        InputProps={{
                          style: {
                            fontSize: 15,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            margin: "20px 0px 0px 0px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 15, marginLeft: "0px" },
                        }}
                      />

                      <TextField
                        id="standard-basic"
                        label="Organisation"
                        variant="standard"
                        name="organisation"
                        // onChange={handleChange}
                        InputProps={{
                          style: {
                            fontSize: 15,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            margin: "20px 0px 0px 0px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 15, marginLeft: "0px" },
                        }}
                      />
                    </div>
                  </Box>
                </div>

                <div className="update_form_right_part ">
                  <div className="two_inputs" style={{ width: "100%" }}>
                    <TextField
                      id="standard-read-only-input"
                      label="First Name"
                      defaultValue="Vicky"
                      InputProps={{
                        readOnly: true,
                        style: {
                          fontSize: 10,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                          margin: "20px 0px 0px 10px",
                        },
                      }}
                      variant="standard"
                      InputLabelProps={{
                        style: { fontSize: 20, margin: "0px 0px 0px 10px" },
                      }}
                    />

                    <TextField
                      id="standard-read-only-input"
                      label="Email"
                      defaultValue="vickydevsvg@gmail.com"
                      InputProps={{
                        readOnly: true,
                        style: {
                          fontSize: 10,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "86%",
                          margin: "20px 0px 0px 20px",
                        },
                      }}
                      variant="standard"
                      InputLabelProps={{
                        style: { fontSize: 20 },
                      }}
                    />
                  </div>
                  <p className="website_links">WEBSITE LINKS</p>
                  <div
                    className="small_field_inputs"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="LinkedIn"
                      variant="standard"
                      // onChange={handleLinks}
                      name="linkedIn"
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Facebook"
                      variant="standard"
                      name="facebook"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Facebook Live"
                      variant="standard"
                      name="facebookLive"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Twitter"
                      variant="standard"
                      name="twitter"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Instagram"
                      variant="standard"
                      name="instagram"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Youtube"
                      variant="standard"
                      name="youtube"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Youtube Live"
                      variant="standard"
                      name="youtubeLive"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Other Website"
                      variant="standard"
                      name="otherWebsite1"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                    <TextField
                      className="small_links"
                      id="standard-basic"
                      label="Other Website"
                      variant="standard"
                      name="otherWebsite2"
                      // onChange={handleLinks}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                  </div>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        this.handleClickOpenUpdatePop();
                      }}
                      style={{ position: "relative", top: "90%" }}
                      variant="contained"
                      disableElevation
                    >
                      UPDATE
                    </Button>
                  </DialogActions>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* UPDATE POPUP */}
        {/*  */}
        {/*  CONTACT POPUP*/}
        <Dialog
          className="dialog"
          open={this.state.contactPop}
          onClose={() => {
            this.handleCloseContactPop();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              textAlign: "center",
              fontSize: "3rem",
              color: "#204C6D",
              borderBottom: "2px solid #204C6D",
            }}
          >
            CONTACT
          </DialogTitle>
          <DialogContent className="dialog_content">
            <DialogContentText
              id="alert-dialog-description"
              className="dialog_content_text"
            >
              <div className="email_contact">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  name="email"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "80%",
                      margin: "20px 0px 0px 10px",
                    },
                  }}
                  InputLabelProps={{
                    style: { fontSize: 20, margin: "0 0 0 10px" },
                  }}
                  // onChange={handleChange}
                />

                <Button
                  className="contact_button"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Contact
                </Button>
              </div>

              <div className="loader">
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress color="success" />
                </Stack>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                this.handleCloseContactPop();
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/*  CONTACT POPUP END*/}
        <div className="sidebar_navbar">
          {/* <Contact
          close_contact={() => setShowContactPopup(false)}
          show_contact={showContactPopup}
        /> */}
          {/* <DashboardPopup close={() => setShowModal(false)} show={showModal} />
           */}
          {/* <MettingPopup
          close_metting={() => setShowMettingPopup(false)}
          show_metting={showMettingPopup}
        /> */}
          <div className="hamburger">
            <GiHamburgerMenu
              style={{ color: "white", fontSize: "2rem" }}
              onClick={() => {
                this.setState({
                  open: !this.state.open,
                });
              }}
            />
          </div>
        </div>
        <div
          className={
            this.state.open ? "sidebar_wrapper" : "sidebar_wrapper active"
          }
        >
          <div className="user_upperpart">
            <div className="user_photo_logout">
              <div className="user_photo">
                {this.state.image1 ? (
                  <img
                    alt=""
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              {/* <p className="welcome">Welcome {JSON.parse(auth).userName}</p> */}
              <p style={{ color: "white", fontSize: "1rem" }}>
                Welcome {this.state.id}
              </p>
              <div className="user_logout">
                <button
                  className="sidebar_logout"
                  onClick={() => this.sayHello()}
                >
                  LOGOUT
                </button>
              </div>
            </div>
            <div
              className="share_button"
              onDoubleClick={() =>
                this.setState({
                  show: false,
                })
              }
              onClick={() => {
                this.setState({
                  show: true,
                });
              }}
            >
              <FaShareAlt
                style={{
                  fontSize: "3rem",
                  color: " #2e80af",
                  marginRight: "5px",
                }}
              />
            </div>
          </div>

          <div className="user_lower_part">
            <ul className="user_lower_part_list">
              <li className="user_lower_part_list_items">
                <a href="#" className="user_lower_part_list_items_links">
                  <MdDashboard
                    className="common"
                    style={{ color: " #fe6a68" }}
                  />
                  <span className="user_links">Dashboard</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a
                  href="#"
                  className="user_lower_part_list_items_links"
                  variant="outlined"
                  onClick={() => {
                    this.handleClickOpenUpdatePop();
                  }}
                >
                  <MdTipsAndUpdates
                    className="common"
                    style={{ color: " #fe6a68" }}
                  />
                  <span className="user_links">Update Profile</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a
                  href="#"
                  className="user_lower_part_list_items_links"
                  onClick={() => {
                    this.publicProfile();
                  }}
                >
                  <CgProfile className="common" />
                  <span className="user_links">Public Profile</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a href="#" className="user_lower_part_list_items_links">
                  <MdPersonalVideo className="common" />
                  <span className="user_links">Background</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a
                  href="#"
                  className="user_lower_part_list_items_links"
                  onClick={() => this.handleClickOpenChatPop()}
                >
                  <MdOutlineContactPhone className="common" />
                  <span className="user_links">Contacts</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a
                  href="#"
                  className="user_lower_part_list_items_links"
                  // onClick={() => this.meetingScheduler()}
                  onClick={() => {
                    this.handleClickOpenMeetingTime();
                  }}
                >
                  <MdMeetingRoom className="common" />
                  <span className="user_links">Schedule Meeting</span>
                </a>
              </li>

              <li className="user_lower_part_list_items">
                <a
                  href="https://megahoot.org/upgrade/?source=PO39IDH98023FJNIOEDPFJ290U846H3U58H93HFE9PDSNIPDONF092H74U803H6T57-056I4KMH89T64J39JE28HE8722GD76F23VBF8B42I3NYVB89032UNV894-HNG983HE7DHC982H2HFH943Y6JEDSG87DGCS8NCV3R89256784Y6NVY729WE45161YDSAVYU-32Y78DC92378Y4D7892YJ489728&e=vickydevsvg@gmail.com&string=FD7EFWF89292H32JD092T8934H913BHD1GD8Y91BD91U2N9F8H4389FG3HJ0J01JH8D902HJ10DHJ213GD1789GB94TH5Y9G8YURVN8928923H98C4"
                  className="user_lower_part_list_items_links"
                  target="_blank"
                >
                  <MdCardMembership className="common" />
                  <span className="user_links">Upgrade Membership</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="user_wrapper">
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

          {this.state.youarenothost != "" ? (
            <div
              style={{
                zIndex: "10000000",
                backgroundColor: "white",
                padding: "10px",
                color: "grey",
                fontSize: "2.4rem",
                position: "absolute",
                top: "36%",
                left: "23%",
                width: "272px",
                height: "158px",
                backgroundColor: "#033a5a",
                border: "1px solid #2e2e4c",
                textAlign: "center",
                boxShadow:
                  "3px 9px 16px rgba(152, .149, .149, 0.4) ,-3px -3px 10px rgba(255, .255, .255, 0.06),inset 14px 14px 26px rgb(0, .0, .0, 0.3),inset -3px -3px 15px rgba(206, .196, .196, 0.05)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <br></br>
              <br></br>{" "}
              <span style={{ marginTop: "-54px", color: "white" }}>
                {" "}
                {this.state.youarenothost}
                <br></br>
              </span>
              <span>
                <button
                  style={{
                    backgroundColor: "#4FADD3",
                    color: "white",
                    border: "none",
                    width: "100px",
                    padding: "1rem",
                    marginTop: "20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    boxShadow:
                      "3px 9px 16px rgb(0 0 0 / 40%), -3px -3px 10px rgb(255 255 255 / 6%), inset 14px 14px 26px rgb(0 0 0 / 30%), inset -3px -3px 15px rgb(255 255 255 / 5%)",
                    borderWwidth: "1px 0px 0px 1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                  onClick={() =>
                    this.setState({
                      youarenothost: "",
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
                ></button>
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
          {this.state.infoboxcontainer != "" ? (
            <div
              className="wrapper"
              style={{
                zIndex: "100000",
                width: "30vw",
                minWidth: "300px",
                top: "44vh",
                left: "35vw",
              }}
            >
              {this.state.infobox}

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
                      infoboxcontainer: "",
                    })
                  }
                >
                  close
                </button>
              </span>
            </div>
          ) : null}

          {/* sidebar */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="dashboard_user_info">
            <div className="dashboard_info">
              {/* <h1 className="name">{JSON.parse(auth).userName}</h1> */}

              <p className="username common_content">
                {/* {JSON.parse(auth).firstName} */}
                Username: &nbsp;&nbsp;{this.state.id}
              </p>
              <br />
              <p className="veronumber common_content">
                VERO Number: {this.state.privatekey}
              </p>
              <br />
              <p className="organisation common_content">
                Organization: {this.state.organization}
              </p>
              <br />
              <p className="country common_content">
                Country: {this.state.country}
              </p>
              <br />
              <p className="city common_content">City: {this.state.city}</p>
              <br />
            </div>

            <div className="dashboard_video">
              <video
                style={{
                  width: "200px",
                  marginLeft: "auto",
                  borderRadius: "10px",
                  maxHeight: "200px",
                }}
                id="checkCam"
                ref={this.videoEle}
                poster="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroMain_placeholder.jpg"
                autoPlay
              ></video>
            </div>
          </div>
          <div className="dashboard_user_social_media_info">
            <h1 className="twitter common_content ">
              Twitter:: &nbsp;{this.state.Twitter}
            </h1>
            <h1 className="email common_content ">
              Email:: &nbsp;{this.state.email}
            </h1>
            <h1 className="member_level common_content ">
              Member Level : {this.state.membershipLevel}
            </h1>
            <span className="option">
              <label
                htmlFor="camera"
                style={{ marginLeft: "0px", fontSize: "2rem" }}
              >
                Camera:
              </label>
              <select
                name=""
                onChange={this.changeSource}
                id="camera"
                style={{
                  width: "40%",
                  height: "30%",
                  fontSize: "1rem",
                  borderRadius: "10px",
                  outline: "none",
                }}
              >
                {this.state.devices.length > 0
                  ? this.state.devices.map((device, index) => {
                      return (
                        <option
                          key={index}
                          value={device.deviceId}
                          style={{ width: "40%", fontSize: "2rem" }}
                          className="option_value"
                        >
                          {device.label || "Camera " + (index + 1)}
                        </option>
                      );
                    })
                  : null}
              </select>
            </span>
          </div>

          <div className="room_id">
            <div className="room_content">
              <div className="room_name">Host Room Id</div>
              <div className="room_input_field">
                <TextField
                  id="standard-basic"
                  label="Enter a scheduled Room Id"
                  variant="standard"
                  name="joinhost_code"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      margin: "20px 0px 0px 10px",
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 10,
                      margin: "0 0 0 10px",
                      color: "white",
                    },
                  }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  value={this.state.joinhost_code}
                />
              </div>
              <div className="room_button">
                <Button
                  variant="contained"
                  onClick={() => {
                    this.joinhostnow();
                  }}
                >
                  ENTER
                </Button>
              </div>
            </div>
            <div className="room_content">
              <div className="room_name">Create a New Room</div>
              <div className="room_input_field">
                <TextField
                  id="standard-basic"
                  label="Enter A Name For Your Room"
                  variant="standard"
                  name="room_name"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      margin: "20px 0px 0px 10px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 10,
                      margin: "0 0 0 10px",
                      color: "white",
                    },
                  }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                />
              </div>
              <div className="room_button">
                <Button
                  variant="contained"
                  onClick={() => {
                    this.createRoom();
                  }}
                >
                  ENTER
                </Button>
              </div>
            </div>
            <div className="room_content">
              <div className="room_name">Attendee Only</div>
              <div className="room_input_field">
                <TextField
                  id="standard-basic"
                  label="Enter The Meeting Room Id"
                  variant="standard"
                  name="room_code"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      margin: "20px 0px 0px 10px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 10,
                      margin: "0 0 0 10px",
                      color: "white",
                    },
                  }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                />
              </div>
              <div className="room_button">
                <Button
                  variant="contained"
                  onClick={() => {
                    this.joinRoom();
                  }}
                >
                  ENTER
                </Button>
              </div>
            </div>
          </div>

          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}

          {/* 
        {this.state.showMembership ? (
          <Membership
            email={this.state.email}
            closeMembershipCard={() => {
              this.setState({ showMembership: false });
            }}
          />
        ) : null} */}
        </div>
      </>
    );
  }
}

export default Home;
