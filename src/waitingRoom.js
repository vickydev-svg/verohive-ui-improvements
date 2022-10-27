import React, { Component } from "react";
import io from "socket.io-client";
import logo from "./verohivelogo.png";
import infoicon from "./imgs/infoicon.png";
import receptionVideo from "./video/Veroreception.m4v";
import kurentoUtils from "kurento-utils";
// import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import skynews from "./Images/skynews.png";
import aljazeera from "./Images/aljazeera.png";
import cnanews from "./Images/cnanews.png";
import dwnews from "./Images/dwnews.png";
import music from "./Images/music.png";
import "./waitingRoom.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server_url: process.env.REACT_APP_SERVER_URL,
      open: false,
      cnaNews: false,
      aljazeeraNews: false,
      dwNews: false,
      musicVideo: false,
      myid: "",
      myroomcode: "",
      firstName: "",
      lastName: "",
      username: "",
      privatekey: "",
      email: "",
      hostroomcode: "",
      infoboxcontainer: "",
      infobox: "",
      waitingContainer: "",
      financeVideo: "",

      newsVideo: "",
      hostname: "",
      meetingroomname: "",

      Travel: "",
      isViaLink: "",
    };

    this.socket = io.connect(this.state.server_url);
  }

  showWaitingContent = () => {
    this.setState({
      waitingContainer: "showme",
    });
  };
  // news
  handleClickOpenAljazeera = () => {
    this.setState({
      aljazeeraNews: true,
    });
  };
  handleClickOpenCnanews = () => {
    this.setState({
      cnaNews: true,
    });
  };
  handleClickOpenDwnews = () => {
    this.setState({
      dwNews: true,
    });
  };
  handleClickOpenMusicVideo = () => {
    this.setState({
      musicVideo: true,
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleCloseAljazeera = () => {
    this.setState({
      aljazeeraNews: false,
    });
  };
  handleCloseCnanews = () => {
    this.setState({
      cnaNews: false,
    });
  };
  handleCloseDwnews = () => {
    this.setState({
      dwNews: false,
    });
  };
  handleCloseMusicVideo = () => {
    this.setState({
      musicVideo: false,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  dashboard = () => {
    if (this.state.isViaLink == "true") {
      window.location.href = "https://www.verohive.net/";
    } else {
      this.props.history.push("/private", {
        username: this.state.id,
      });
    }
  };
  closeApp = () => {
    window.location.replace = "https://www.verohive.net/";
  };
  componentDidMount() {
    // document.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();
    // });

    var camMode = this.props.location.state.camMode;

    var divRoomSelection = document.getElementById("roomSelection");
    // var divMeetingRoom = document.getElementById('meetingRoom');

    // var inputRoom = document.getElementById('room');
    var inputName = document.getElementById("name");
    var participants = {};
    var mysocketm = io(this.state.server_url);
    var roomName;
    var userName;

    var myuser = "Test";
    divRoomSelection.style = "display: none";
    // var customFacingMode = this.props.location.state.facingMode;
    // divMeetingRoom.style = "display:flex;flex-wrap: wrap;position:absolute;left:40px;top:60px";
    function autojoinmeet() {
      roomName = Math.random();
      inputName.value = myuser;
      console.log(roomName);
      if (roomName === "" || userName === "") {
        console.log("Room and Name are required!");
      } else {
        var message = {
          event: "joinRoom",
          userName: myuser,
          roomName: roomName,
        };
        sendMessage(message);
      }
    }

    document.getElementById("camCheck").onclick = function () {
      if (document.getElementById("camCheck").style.color == "blue") {
        document.getElementById("camCheck").style.color = "red";
      } else {
        document.getElementById("camCheck").style.color = "blue";
      }

      autojoinmeet();
    };
    document.getElementById("camCheck").click();
    mysocketm.on("messageks", (message) => {
      console.log("Message received: " + message.event);

      switch (message.event) {
        case "newParticipantArrived":
          receiveVideo(message.userid, message.username);
          break;
        case "existingParticipants":
          onExistingParticipants(message.userid, message.existingUsers);
          break;
        case "receiveVideoAnswer":
          onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
          break;
        case "candidate":
          addIceCandidate(message.userid, message.candidate);
          break;
      }
    });

    // handlers functions
    function receiveVideo(userid, username) {}

    function onExistingParticipants(userid, existingUsers) {
      var video = document.getElementById("checkCam");
      video.poster =
        "https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroMain_placeholder.jpg";

      video.id = userid;

      // video.style.width = "150px"
      // var myheight = (video.style.width / 16) * 9
      // video.style.height = myheight
      video.autoplay = true;
      video.controls = true;

      var user = {
        id: userid,
        username: userName,
        video: video,
        rtcPeer: null,
      };

      participants[user.id] = user;

      var constraints = {
        audio: true,
        // video: {
        //   mandatory: {
        //     minWidth: 1280,
        //     minHeight: 720,
        //     maxFrameRate: 15,
        //     minFrameRate: 15
        //   },

        //   optional: [{ aspectRatio: 16 / 9 }]
        // }
        video: {
          // facingMode: {exact:customFacingMode},
          deviceId: camMode,
          frameRate: {
            min: 1,
            ideal: 15,
            max: 30,
          },
          width: {
            min: 640,
            ideal: 1280,
            max: 1280,
          },
          height: {
            min: 360,
            ideal: 720,
            max: 720,
          },
        },
      };

      var options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: onIceCandidate,
      };

      user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (err) {
          if (err) {
            return console.error(err);
          }
          this.generateOffer(onOffer);
        }
      );

      existingUsers.forEach(function (element) {
        receiveVideo(element.id, element.name);
      });

      var onOffer = function (err, offer, wp) {
        console.log("sending offer");
        var message = {
          event: "receiveVideoFrom",
          userid: user.id,
          roomName: roomName,
          sdpOffer: offer,
        };
        sendMessage(message);
      };

      function onIceCandidate(candidate, wp) {
        console.log("sending ice candidates");
        var message = {
          event: "candidate",
          userid: user.id,
          roomName: roomName,
          candidate: candidate,
        };
        sendMessage(message);
      }

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

      function dispose() {
        if (user.rtcPeer) {
          user.rtcPeer.dispose();
          user.rtcPeer = null;
        }
        video.remove();
      }
    }

    function onReceiveVideoAnswer(senderid, sdpAnswer) {
      participants[senderid].rtcPeer.processAnswer(sdpAnswer);
    }

    function addIceCandidate(userid, candidate) {
      participants[userid].rtcPeer.addIceCandidate(candidate);
    }

    // utilities

    function sendMessage(message) {
      console.log("sending " + message.event + " message to server");
      // mysocketm.emit('imcominginroom', () => {
      //     console.log('I m joining the room')
      // })
      mysocketm.emit("messageksc", message);
    }

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

    function mobileview() {
      if (window.innerWidth <= 800) {
        let video = document.getElementById("receptionvideo");
        let videocamcheck = document.getElementById("checkCam");

        // video.style.width = "88vw";
        // video.style.marginTop = "0";
        // video.style.position = "absolute";
        // video.style.top = "15vh";

        // video.style.marginLeft = "0";

        // videocamcheck.style.width = "88vw";
        // videocamcheck.style.marginTop = "210";
        // videocamcheck.style.position = "absolute";
        // videocamcheck.style.top = "44vh";

        // videocamcheck.style.marginLeft = "0";

        document.getElementById("bottomcontrolsid").style.top = "80vh";
      }
    }
    mobileview();

    if (this.props.location.state != undefined) {
      this.setState({
        type: this.props.location.state.room_code,
        id: this.props.location.state.username,
        meetingperson: this.props.location.state.type,
        email: this.props.location.state.email,
        firstname: this.props.location.state.firstname,
        lastname: this.props.location.state.lastName,
        organization: this.props.location.state.organization,
        isViaLink: this.props.location.state.isViaLink,
        camMode: this.props.location.state.camMode,
      });

      // this.viewfollowing(this.props.location.state.privatekey)
    } else {
      this.setState({
        type: window.location.href.substr(36),
        id: localStorage.getItem("user"),
        meetingperson: "client",
      });
    }
    this.setState({
      myroomcode: this.props.location.search.substr(4),
      firstName: this.props.location.state.firstname,
      lastName: this.props.location.state.lastName,
      username: this.props.location.state.id,
      privatekey: this.props.location.state.privatekey,
      email: this.props.location.state.email,
      organization: this.props.location.state.organization,
      isViaLink: this.props.location.state.isViaLink,
      camMode: this.props.location.state.camMode,
    });
    this.socket.emit("waitingRoom", () => {
      console.log("sent req skynow");
    });

    this.socket.once("yourhostwaslate", (data) => {
      if (data == this.state.myroomcode) {
        this.socket.emit("allowme", {
          id: this.state.myid,
          room: this.state.myroomcode,
          name: this.state.firstname + " " + this.state.lastName,
          veroKey: this.props.location.state.privatekey,
        });
        if (document.getElementById("hosthasarrived").style.display == "none") {
          document.getElementById("hosthasarrived").style.display = "block";
        }

        if (
          document.getElementById("waitingforhost").style.display == "block"
        ) {
          document.getElementById("waitingforhost").style.display = "none";
        }
      }
    });
    this.socket.once("yourid", (id) => {
      this.setState({
        myid: id,
      });
      this.socket.emit("allowme", {
        id: this.state.myid,
        room: this.state.myroomcode,
        name: this.state.firstname + " " + this.state.lastName,
        veroKey: this.props.location.state.privatekey,
      });
    });
    this.socket.on("yourhostinfo", (data) => {
      if (data.room_code == this.state.myroomcode) {
        this.setState({
          hostname: data.hostname,
          meetingroomname: data.roomname,
        });
        if (document.getElementById("hosthasarrived").style.display == "none") {
          document.getElementById("hosthasarrived").style.display = "block";
        }

        if (
          document.getElementById("waitingforhost").style.display == "block"
        ) {
          document.getElementById("waitingforhost").style.display = "none";
        }
      }
    });

    this.socket.on("comeinroom", (id, existingUsers) => {
      if (this.state.myid == id) {
        // this.socket.disconnect()
        this.props.history.push({
          pathname: "/videochat",
          search:
            "?" + new URLSearchParams({ id: this.state.myroomcode }).toString(),
          state: {
            type: "client",
            room_code: this.state.myroomcode,
            username: this.state.id,
            privatekey: this.state.privatekey,
            email: this.state.email,
            firstname: this.state.firstname,
            lastName: this.state.lastName,
            organization: this.state.organization,
            isViaLink: this.state.isViaLink,
            screenSource: this.props.location.state.screenSource,
            existingUsers: existingUsers,
            camMode: this.props.location.state.camMode,
          },
        });
      }
    });

    this.socket.on("requestRejectedForYou", (data) => {
      if (this.state.myid == data.myid) {
        if (this.state.isViaLink == "true") {
          window.location.href = "https://www.verohive.com/";
        } else {
          this.dashboard();
        }
      }
    });

    // window.addEventListener("beforeunload",  (e)=> {
    //     e.preventDefault();
    //     // e.returnValue = '';
    //    this.closeApp()

    //   });

    window.onbeforeunload = () => {
      window.setTimeout(() => {
        this.dashboard();
      }, 0);
      window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
    };
  }

  // detectwebcam = () => {
  //     if (document.getElementById('camCheck').style.color == "blue") {
  //         document.getElementById('camCheck').style.color = "red";

  //     } else {
  //         document.getElementById('camCheck').style.color = "blue"
  //     }
  //     // function detectWebcam(callback) {
  //     //     let md = navigator.mediaDevices;
  //     //     if (!md || !md.enumerateDevices) return callback(false);
  //     //     md.enumerateDevices().then(devices => {
  //     //       callback(devices.some(device => 'videoinput' === device.kind));
  //     //     })
  //     //   }

  //     //   detectWebcam(function(hasWebcam) {
  //     //       if(!hasWebcam){
  //     //         alert('Webcam is not connected');
  //     //       }

  //     //   })
  //     this.cameraCheck()

  // }
  // cameraCheck = () => {

  //     if (navigator.mediaDevices.getUserMedia) {
  //         navigator.mediaDevices.getUserMedia({ video: true })
  //             .then(function (stream) {
  //                 let video = document.getElementById('checkCam')

  //                 video.srcObject = stream;
  //                 video.controls = "true";

  //             })
  //             .catch(function (err0r) {
  //                 alert('webcam is not detected')
  //             });
  //     }

  // }

  knowmyidfun = () => {
    alert(this.state.myid);
  };
  render() {
    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1.3em",
          },
        },
      },
    });
    return (
      <div className="reception_main">
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.handleClose();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5srem",
              fontWeight: "900",
            }}
          >
            Welcome to the VEROHive Waiting Room, Please Be Patient While Your
            Host Prepares To Bring You into The Room.
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <p className="dialog_title_paragraph">In the Meanwhile:</p>
              <p className="dialog_title_paragraph">
                1) Make sure that your camera is positioned the way you want it
                to be positioned.
              </p>
              <p className="dialog_title_paragraph">
                2) Make sure that your lighting is set for the best presentation
                of You.
              </p>
              <p className="dialog_title_paragraph">
                3) Learn more about VEROHive at{" "}
                <a
                  href="https://www.verohive.com/"
                  target="_blank"
                  style={{ fontSize: "2rem" }}
                >
                  www.verohive.com
                </a>
              </p>
              <p className="dialog_title_paragraph">
                If you are a member of the VEROHive family please feel free to
                enjoy all the products that we offer to our members.
              </p>
              <p className="dialog_title_paragraph">
                If you are a guest attendee then we welcome you to VEROHive and
                feel free to become a member at any time.
              </p>
              <p className="dialog_title_paragraph">
                Premium features such as logo and graphic overlays, video frame
                overlays for hosts, video intros for hosts, YouTube Live sharing
                and much more will be available soon.
              </p>
              <p className="dialog_title_paragraph">
                If you are a guest attendee then we welcome you to VEROHive and
                feel free to become a member at any time.
              </p>
              <p className="dialog_title_paragraph">
                Have a great meeting and thank you again for using VEROHive!
              </p>
              <p className="dialog_title_paragraph">
                Notice: The host has the option of recording this meeting, once
                in the room please confirm if the meeting is being recorded or
                not. If you opt not to be recorded then simply leave the room to
                avoid being recorded, otherwise it is established that you have
                given your consent..
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleClose();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/* news */}
        {/* news */}
        {/* news */}
        {/* news */}
        {/* news aljazzera */}
        <Dialog
          open={this.state.aljazeeraNews}
          onClose={() => {
            this.handleCloseAljazeera();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5srem",
              fontWeight: "900",
            }}
          >
            <h2>Breaking News</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/9Auq9mYxFEE"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseAljazeera();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>

        {/* news aljazeera end */}

        {/* CNANEWS */}
        <Dialog
          open={this.state.cnaNews}
          onClose={() => {
            this.handleCloseCnanews();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5srem",
              fontWeight: "900",
            }}
          >
            <h2>CNA News </h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/XWq5kBlakcQ"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseCnanews();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>

        {/* CNANEWSEND */}

        {/* DW NEWS */}
        <Dialog
          open={this.state.dwNews}
          onClose={() => {
            this.handleCloseDwnews();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5srem",
              fontWeight: "900",
            }}
          >
            Welcome to the VEROHive Waiting Room, Please Be Patient While Your
            Host Prepares To Bring You into The Room.
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <p className="dialog_title_paragraph">In the Meanwhile:</p>
              <p className="dialog_title_paragraph">
                1) Make sure that your camera is positioned the way you want it
                to be positioned.
              </p>
              <p className="dialog_title_paragraph">
                2) Make sure that your lighting is set for the best presentation
                of You.
              </p>
              <p className="dialog_title_paragraph">
                3) Learn more about VEROHive at{" "}
                <a
                  href="https://www.verohive.com/"
                  target="_blank"
                  style={{ fontSize: "2rem" }}
                >
                  www.verohive.com
                </a>
              </p>
              <p className="dialog_title_paragraph">
                If you are a member of the VEROHive family please feel free to
                enjoy all the products that we offer to our members.
              </p>
              <p className="dialog_title_paragraph">
                If you are a guest attendee then we welcome you to VEROHive and
                feel free to become a member at any time.
              </p>
              <p className="dialog_title_paragraph">
                Premium features such as logo and graphic overlays, video frame
                overlays for hosts, video intros for hosts, YouTube Live sharing
                and much more will be available soon.
              </p>
              <p className="dialog_title_paragraph">
                If you are a guest attendee then we welcome you to VEROHive and
                feel free to become a member at any time.
              </p>
              <p className="dialog_title_paragraph">
                Have a great meeting and thank you again for using VEROHive!
              </p>
              <p className="dialog_title_paragraph">
                Notice: The host has the option of recording this meeting, once
                in the room please confirm if the meeting is being recorded or
                not. If you opt not to be recorded then simply leave the room to
                avoid being recorded, otherwise it is established that you have
                given your consent..
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseDwnews();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>

        {/*  DW NEWS END*/}

        {/* MUSIC VIDEO */}
        <Dialog
          open={this.state.musicVideo}
          onClose={() => {
            this.handleClose();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5srem",
              fontWeight: "900",
            }}
          >
            <h2>Music</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/adLGHcj_fmA"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseMusicVideo();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>

        {/* MUSIC VIDEO END */}
        {/* news end */}
        {/* news end */}
        {/* news end */}
        {/* news end */}
        <nav className="reception_nav">
          <div className="logo">
            <img src={logo} alt="" className="logo_img" />
            <div className="encryption">
              <EnhancedEncryptionIcon />
              Enhanced End to End Encryption
            </div>
          </div>
        </nav>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="reception_content">
          <div className="host_details">
            <div className="host_details_part1">
              <span className="room">
                RoomName:{this.state.meetingroomname}{" "}
              </span>
              <span className="room">HostName:{this.state.hostname}</span>
              <Button
                variant="outlined"
                className="waiting_for_host"
                color="error"
              >
                Waiting For Host
              </Button>
            </div>
            <div className="host_details_part2">
              Please wait for &nbsp; &nbsp; &nbsp;
              <CircularProgress />
            </div>
          </div>

          <div className="streaming_part">
            <div className="news_streaming">
              <div
                className="news_image_part"
                style={{ margin: "0px !important", padding: "0px !important" }}
              >
                <video
                  id="receptionvideo"
                  src={receptionVideo}
                  autoPlay
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "30px !important",
                  }}
                ></video>
              </div>{" "}
              <div className="different_news_buttons">
                {" "}
                {/*  */}
                <button
                  className="news"
                  onClick={() => {
                    this.handleClickOpenCnanews();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={cnanews} className="news_buttons" />
                </button>
                {/*  */}
                <button
                  className="news"
                  onClick={() => {
                    this.handleClickOpenAljazeera();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={aljazeera} className="news_buttons" />
                </button>
                <button
                  className="news"
                  onClick={() => {
                    this.handleClickOpenDwnews();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={dwnews} className="news_buttons" />
                </button>
                <button
                  className="news"
                  onClick={() => {
                    this.handleClickOpenMusicVideo();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={music} className="news_buttons" />
                </button>
              </div>
            </div>
            <div className="video_streaming">
              <div className="video_part" style={{ margin: "0", padding: "0" }}>
                {/* <img src={girl} className="video_streaming_image" alt="" /> */}
                {/* <img src="" className="video_streaming_image" alt="" /> */}

                <video
                  id="checkCam"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    borderRadius: "30px",
                  }}
                  autoPlay
                ></video>
                {/* <video id="checkCam" autoPlay></video> */}
              </div>
            </div>
          </div>

          <div className="quotes">
            <div className="crypto_quotes">
              <p className="crypto_para">Crypto Quotes: Pecu</p>
            </div>
            <div className="stock_quotes">
              <p className="stock_para">Stock_Quotes:</p>
            </div>
          </div>

          <div className="meeting_main_buttons">
            <div className="footer_buttons">
              <Button
                className="streaming_button"
                variant="contained"
                style={{
                  fontSize: "2rem",
                  outline: "none",
                  border: "none",
                }}
                // onClick={() => {
                //   this.showWaitingContent();
                // }}
                // onClick={() => {
                //   setShowStreamingPopup(!showStreamingPopup);
                // }}
                onClick={() => {
                  this.handleClickOpen();
                }}
              >
                ATTENDEE GUIDE
              </Button>

              <Button
                className="streaming_button"
                variant="outlined"
                color="error"
                style={{
                  fontSize: "2rem",
                  border: "2px solid",
                  fontWeight: "1000",
                  outline: "none",
                }}
              >
                {/* <NavLink
                  to="/dashboard"
                  className="dashboard_link"
                  style={{ textDecoration: "none", color: "red" }}
                > */}
                BACK TO DASHBOARD
                {/* </NavLink> */}
              </Button>
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        <div
          style={{
            marginTop: "250px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h4 style={{ color: "red" }}>
            Please do not press back button or close/reload browser, to
            disconnect{" "}
          </h4>
          <a
            style={{ marginTop: "14px" }}
            onClick={() => {
              this.dashboard();
            }}
          >
            Click Here
          </a>
        </div>

        <div style={{ position: "absolute", top: "73vh", left: "40vw" }}>
          <h2 id="waitingforhost" style={{ color: "red", display: "block" }}>
            Waiting for host
          </h2>
          <h2 id="hosthasarrived" style={{ color: "green", display: "none" }}>
            Host has arrived
          </h2>
          <h5 style={{ color: "green" }}>Establishing Secure Connection</h5>
        </div>

        <br></br>
        <i
          id="camCheck"
          style={{
            display: "none",
            cursor: "pointer",
            padding: 2,
            color: "blue",
            fontSize: "22px",
            backgroundColor: "white",
            borderRadius: "20px",
            marginTop: "11px",
          }}
          class="material-icons"
        >
          videocam
        </i>

        {this.state.waitingContainer != "" ? (
          <div>
            <div
              className="divforemoji"
              style={{
                position: "absolute",
                zIndex: 100,
                // left: "-40px",
                borderRadius: "10px",
                backgroundColor: "#033a5a",
                top: "0",
                border: " 1px solid #2e2e4c",
                boxShadow:
                  "3px 9px 16px rgba(152, .149, .149, 0.4) ,-3px -3px 10px rgba(255, .255, .255, 0.06),inset 14px 14px 26px rgb(0, .0, .0, 0.3),inset -3px -3px 15px rgba(206, .196, .196, 0.05);",
              }}
            >
              <br></br>
              <div className="wrapper">
                <span>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        waitingContainer: "",
                      })
                    }
                  >
                    X
                  </button>
                </span>
                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {" "}
                  Welcome to the VEROHive Waiting Room, Please Be Patient While
                  Your Host Prepares To Bring You into The Room.
                </p>

                <p> In the Meanwhile:</p>

                <p>
                  {" "}
                  1) Make sure that your camera is positioned the way you want
                  it to be positioned.
                </p>

                <p>
                  2) Make sure that your lighting is set for the best
                  presentation of You.
                </p>

                <p> 3) Learn more about VEROHive at www.verohive.com</p>

                <p>
                  {" "}
                  If you are a member of the VEROHive family please feel free to
                  enjoy all the products that we offer to our members.
                  <br></br>
                  If you are a guest attendee then we welcome you to VEROHive
                  and feel free to become a member at any time.
                </p>

                <p>
                  {" "}
                  Premium features such as logo and graphic overlays, video
                  frame overlays for hosts, video intros for hosts, YouTube Live
                  sharing and much more will be available soon.
                </p>

                <p>
                  {" "}
                  Have a great meeting and thank you again for using VEROHive!
                </p>
                <p>
                  Notice: The host has the option of recording this meeting,
                  once in the room please confirm if the meeting is being
                  recorded or not.<br></br> If you opt not to be recorded then
                  simply leave the room to avoid being recorded, otherwise it is
                  established that you have given your consent..
                </p>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.financeVideo != "" ? (
          <div>
            <div
              className="divforemoji"
              style={{
                position: "absolute",
                zIndex: 100,
                left: "-40px",
                top: "0",
                backgroundColor: "black",
              }}
            >
              <br></br>
              <div className="wrapper" style={{ width: "625px", left: "26vw" }}>
                <span>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        financeVideo: "",
                      })
                    }
                  >
                    X
                  </button>
                </span>
                <h3>Breaking News</h3>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/9Auq9mYxFEE"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.newsVideo != "" ? (
          <div>
            <div
              className="divforemoji"
              style={{
                position: "absolute",
                zIndex: 100,
                left: "-40px",
                top: "0",
                backgroundColor: "black",
              }}
            >
              <br></br>
              <div className="wrapper" style={{ width: "625px", left: "26vw" }}>
                <span>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        newsVideo: "",
                      })
                    }
                  >
                    X
                  </button>
                </span>
                <h3>Upcoming Movies</h3>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/EHXqb-vACOQ"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.Travel != "" ? (
          <div>
            <div
              className="divforemoji"
              style={{
                position: "absolute",
                zIndex: 100,
                left: "-40px",
                top: "0",
                backgroundColor: "black",
              }}
            >
              <br></br>
              <div className="wrapper" style={{ width: "625px", left: "26vw" }}>
                <span>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        Travel: "",
                      })
                    }
                  >
                    X
                  </button>
                </span>
                <h3>Travel </h3>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/fUhZxP9s8x0"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : null}
        <div
          id="roomSelection"
          style={{
            display: "block",
            position: "absolute",
            left: "40%",
            top: "40%",
          }}
        >
          <label>Enter Full Name :</label>
          <input id="name" type="text" className="input-meet" />
          <br></br>
          <br></br>

          <input
            id="room"
            type="text"
            className="input-meet"
            style={{ display: "none" }}
          />
          <br></br>
          <br></br>
          <button id="register" className="btn-meet">
            Enter
          </button>
        </div>

        {/* <div id="meetingRoom" style={{ display: 'none', marginTop: '60px' }}>
                   
                    <input id="videoinputfid" type="text" style={{ display: 'none' }} />
                                  
                </div> */}
      </div>
    );
  }
}

export default WaitingRoom;
