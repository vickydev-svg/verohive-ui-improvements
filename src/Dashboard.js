import React, { Component, useCallback } from "react";
import audio from "./tone.mp3";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallEndIcon from "@mui/icons-material/CallEnd";
//
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import CancelIcon from "@mui/icons-material/Cancel";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
//
//

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import io, { Socket } from "socket.io-client";
import kurentoUtils from "kurento-utils";
import * as Api from "./api";
import blackbg from "./imgs/black.png";
import "./index.css";
import icon from "./callcancel.png";
import logo from "./verohivelogo.png";
import recordLogo from "./imgs/recordLogo.png";
import liveLogo from "./imgs/live.png";
import liveLogo2 from "./imgs/live2.png";
import liveLogo3 from "./imgs/live3.png";
import { Overlay } from "react-portal-overlay";
import Linkify from "react-linkify";
import { Tooltip } from "@material-ui/core";
import a from "./verifybadges/a.png";
import b from "./verifybadges/b.png";
import g from "./verifybadges/g.png";
import p from "./verifybadges/p.png";
import r from "./verifybadges/r.png";
import y from "./verifybadges/y.png";
import bgRecord from "./imgs/01.jpg";
import HO1 from "./imgs/HO/HO1.png";
import HO2 from "./imgs/HO/HO2.png";
import HO3 from "./imgs/HO/HO3.png";
import HO4 from "./imgs/HO/HO4.png";
import HO5 from "./imgs/HO/HO5.png";
import HO6 from "./imgs/HO/HO6.png";
import HO7 from "./imgs/HO/HO7.png";
import HO8 from "./imgs/HO/HO8.png";
import HO9 from "./imgs/HO/HO9.png";
import HO10 from "./imgs/HO/HO10.png";
import HO11 from "./imgs/HO/HO11.png";
import HO12 from "./imgs/HO/HO12.png";
import HO13 from "./imgs/HO/HO13.png";
import HO14 from "./imgs/HO/HO14.png";
import HO15 from "./imgs/HO/HO15.png";
import HO16 from "./imgs/HO/HO16.png";
import HO17 from "./imgs/HO/HO17.png";
import HO18 from "./imgs/HO/HO18.png";
import HO19 from "./imgs/HO/HO19.png";
import HO20 from "./imgs/HO/HO20.png";
import HO21 from "./imgs/HO/HO21.png";
import HO22 from "./imgs/HO/HO22.png";
import HO23 from "./imgs/HO/HO23.png";
import HO24 from "./imgs/HO/HO24.png";
import HO25 from "./imgs/HO/HO25.png";
import HO26 from "./imgs/HO/HO26.png";
import HO27 from "./imgs/HO/HO27.png";

import SO1 from "./imgs/SO/SO1.png";
import SO2 from "./imgs/SO/SO2.png";
import SO3 from "./imgs/SO/SO3.png";
import SO4 from "./imgs/SO/SO4.png";
import SO5 from "./imgs/SO/SO5.png";
import SO6 from "./imgs/SO/SO6.png";
import SO7 from "./imgs/SO/SO7.png";
import SO8 from "./imgs/SO/SO8.png";
import SO9 from "./imgs/SO/SO9.png";
import SO10 from "./imgs/SO/SO10.png";
import SO11 from "./imgs/SO/SO11.png";
import SO12 from "./imgs/SO/SO12.png";
import SO13 from "./imgs/SO/SO13.png";
import SO14 from "./imgs/SO/SO14.png";

import SLO1 from "./imgs/SO/SLO1.png";
import SLO2 from "./imgs/SO/SLO2.png";
import SLO3 from "./imgs/SO/SLO3.png";
import SLO4 from "./imgs/SO/SLO4.png";
import SLO5 from "./imgs/SO/SLO5.png";
import SLO6 from "./imgs/SO/SLO6.png";
import SLO7 from "./imgs/SO/SLO7.png";
import SLO8 from "./imgs/SO/SLO8.png";

import socialOverlay1 from "./imgs/socialOverlay/socialOverlay1.png";
import socialOverlay2 from "./imgs/socialOverlay/socialOverlay2.png";
import socialOverlay3 from "./imgs/socialOverlay/socialOverlay3.png";
import socialOverlay4 from "./imgs/socialOverlay/socialOverlay4.png";
import socialOverlay5 from "./imgs/socialOverlay/socialOverlay5.png";
import socialOverlay6 from "./imgs/socialOverlay/socialOverlay6.png";
import socialOverlay7 from "./imgs/socialOverlay/socialOverlay7.png";
import socialOverlay8 from "./imgs/socialOverlay/socialOverlay8.png";
import socialOverlay9 from "./imgs/socialOverlay/socialOverlay9.png";
import socialOverlay10 from "./imgs/socialOverlay/socialOverlay10.png";
import chaticon from "./imgs/icons/chat.svg";
import fileshare from "./imgs/icons/fileshare.svg";
import screenshare from "./imgs/icons/screenshare.svg";
import whiteboard from "./imgs/icons/whiteboard.svg";
import attendeeSolo from "./imgs/icons/attendee_solo.svg";
import attendeeHost from "./imgs/icons/attendee_host.svg";
import hostsolo from "./imgs/icons/host_solo.png";
import overlaysimg from "./imgs/overlayicon.png";
import overlaystext from "./imgs/verotexticon.png";
import verolove1 from "./imgs/Emojis/alien1.gif";
import verolove2 from "./imgs/Emojis/angel1.gif";
import veroquestion from "./imgs/Emojis/angry1.gif";
import verosmile from "./imgs/Emojis/angry2.gif";
import verothinking from "./imgs/Emojis/angry5.gif";
import verothumbsup from "./imgs/Emojis/cat1.gif";
import veroemojis from "./imgs/Emojis/Veroemoji.png";
import lv1 from "./imgs/lv/LVFrame1.png";
import lv2 from "./imgs/lv/LVFrame2.png";
import lv3 from "./imgs/lv/LVFrame3.png";
import lv5 from "./imgs/lv/LVFrame4.png";
import lv6 from "./imgs/lv/LVFrame5.png";
import lv7 from "./imgs/lv/LVFrame6.png";
import lv8 from "./imgs/lv/LVFrame7.png";
import lv9 from "./imgs/lv/LVFrame8.png";
import lv10 from "./imgs/lv/LVFrame9.png";
import lv11 from "./imgs/lv/LVFrame10.png";
import lv12 from "./imgs/lv/LVFrame11.png";
import lv13 from "./imgs/lv/LVFrame12.png";
import BJPBG1 from "./imgs/BJP/bjp1.jpg";
import BJPBG2 from "./imgs/BJP/bjp2.jpg";
import BJPBG3 from "./imgs/BJP/bjp3.jpg";
import BJPF1 from "./imgs/BJP/bjpFrame1.png";
import BJPF2 from "./imgs/BJP/bjpFrame2.png";
import cv4 from "./imgs/lv/cv4.jpg";
import cv5 from "./imgs/lv/cv5.jpg";
import cv6 from "./imgs/lv/cv6.jpg";
import cv7 from "./imgs/lv/cv7.jpg";
import powerhour from "./imgs/lv/PowerHour.jpg";
import cvfga from "./imgs/lv/bg/cvfga.jpg";
import cvmns2 from "./imgs/lv/bg/cvmns2.jpg";
import cvucwb from "./imgs/lv/bg/cvucwb.jpg";
import cvphgp from "./imgs/lv/bg/cvphgp.jpg";
import lvph from "./imgs/lv/bg/ph.jpg";
import cvmns from "./imgs/lv/cvmns.jpg";
import cvph from "./imgs/lv/cvph.jpg";
import cvucw from "./imgs/lv/cvucw.jpg";
import cvmh from "./imgs/lv/mh.jpg";
import nitro1 from "./imgs/lv/nitro1.gif";
import nitro2 from "./imgs/lv/nitro2.gif";
import nitro3 from "./imgs/lv/nitro3.gif";
// import lv7 from "./imgs/lv/LVFrame6.png";
// import kjkulaga1 from "./imgs/kjkulaga/kjkulaga1.jpg";
import jcm1 from "./imgs/jcmakayla/jcm1.png";
import kjk1 from "./imgs/KJKordick/wakoframe1.png";
import cpalmer1 from "./imgs/cpalmer/cpalmer1.png";
import pf1 from "./imgs/publicFrames/frame1.png";
import pf2 from "./imgs/publicFrames/frame2.png";
import pf3 from "./imgs/publicFrames/frame3.png";
import pf4 from "./imgs/publicFrames/frame4.png";
import pf5 from "./imgs/publicFrames/frame5.png";
import pf6 from "./imgs/publicFrames/frame6.png";
import pf7 from "./imgs/publicFrames/frame7.png";
import pf8 from "./imgs/publicFrames/frame8.png";
import pf9 from "./imgs/publicFrames/frame9.png";
import pf10 from "./imgs/publicFrames/frame10.png";
import pf11 from "./imgs/publicFrames/frame11.png";
import pbg from "./imgs/publicBg/bg.jpg";
import pbg1 from "./imgs/publicBg/bg1.jpg";
import pbg2 from "./imgs/publicBg/bg2.jpg";
import pbg3 from "./imgs/publicBg/bg3.jpg";
import pbg4 from "./imgs/publicBg/bg4.jpg";
import gsbg1 from "./imgs/greenscreen/green1.jpg";
import gsbg2 from "./imgs/greenscreen/green2.jpg";
import gsbg3 from "./imgs/greenscreen/green3.jpg";
import gsbg4 from "./imgs/greenscreen/green4.jpg";
import gsbg5 from "./imgs/greenscreen/green5.jpg";
import gsbg6 from "./imgs/greenscreen/green6.jpg";
import gsbg7 from "./imgs/greenscreen/green7.jpg";
import gsbg8 from "./imgs/greenscreen/green8.jpg";
import gsbg9 from "./imgs/greenscreen/green9.jpg";
import gsbg10 from "./imgs/greenscreen/green10.jpg";
import gsbg11 from "./imgs/greenscreen/green11.jpg";
import gsbg12 from "./imgs/greenscreen/green12.jpg";
import gsbg13 from "./imgs/greenscreen/green13.jpg";
import veroPersonal from "./imgs/icons/briefcase.svg";
import infoicon from "./imgs/infoicon.png";
import ogs1 from "./imgs/greenscreen/Free/greenFree1.jpg";
import ogs2 from "./imgs/greenscreen/Free/greenFree2.jpg";
import ogs3 from "./imgs/greenscreen/Free/greenFree3.jpg";
import ogs4 from "./imgs/greenscreen/Free/greenFree4.jpg";
import ogs5 from "./imgs/greenscreen/Free/greenFree5.jpg";
import "./Dashboard2.css";
// import "./dashboard.css";
var VideoStreamMerger = require("video-stream-merger");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      server_url: process.env.REACT_APP_SERVER_URL,
      localStream: null, // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null, // used to hold remote stream object that is displayed in the main screen
      meetingid: "",
      remoteStreams: [],
      open: false, // holds all Video Streams (all remote streams)
      chatbar: false,
      invite: false,
      open1: false,
      open2: false,
      peerConnections: {}, // holds all Peer Connections
      selectedVideo: null,
      usersavailable: [],
      recievedchat: "",
      recievedchatfromuser: "",
      show: false,
      meetingperson: "",
      mutemic: false,
      idtosend: "",
      usertosend: "",
      messagetouser: "",
      chatto: false,
      following: [],
      chats: [],
      chats2: [],
      Facebook: "",
      FacebookLive: "",
      Twitter: "",
      Youtube: "",
      YoutubeLive: "",
      Instagram: "",
      LinkedIn: "",
      Weblink1: "",
      Weblink2: "",
      emailinvite: "",
      status: "Please wait...",
      newpersonalmessage: "",
      invitationsentsuccessfully: "",
      invitationsentsuccessfullytocontact: "",
      usernameemoved: "",
      usernamemuted: "",
      usernameentermessage: "",
      sentmessageusersuccess: "",
      yourprofilepicturechanged: "",
      firstname: "",
      lastname: "",
      waiters: [],
      waitersbox: "block",
      gsworkfunforuser: "",
      liveLogo: "",
      liveLogo2: "",
      liveLogo3: "",

      lvshow: "",
      bgshow: "",
      gsshow: "",
      attendees: [],
      lastName: "",
      firstName: "",
      handraisebox: "",
      infoboxcontainer: "",
      infobox: "",
      publicframesforrecording: "",
      nameofguest: "",
      organizationofguest: "",
      twitterofguest: "",
      organization: "",
      emojis: "",
      emojicontainer: "",
      personalframes: "",
      meetingroomname: "",
      arrayforgsbg: [],

      messages: [],
      sendChannels: [],
      disconnected: false,
      recordingText: "",
      recordingText2: "",
      recordingText3: "",
      divColorPicker: "white",
      textColorPicker: "Black",
      textColorPicker2: "Black",
      textColorPicker3: "Black",
      recordingOverlayTextWrapper: "",
      imgHorizontalOverlay: "",
      imgSideOverlay: "",
      imgSideOverlay1: "",
      imgLowerSideOverlay: "",
      imgLowerSideOverlay1: "",
      imgHorizontalOverlay1: "",
      facingMode: "",
      socialOverlay: "",
      socialOverlay1: "",
      socialText: "",
      socialText1: "",
      socialTextColor: "Black",
      screensharecreds: "",
      arrayforsmoothentryinroom: [],
      existingUsers: [],
      openGreenScreenContainer: "",
      allowScreenShare: "",
      closeThisPage: false,
      networkSlow: false,
      networkFine: false,
      networkGood: false,
      offline: true,
    };

    this.serviceIP = "/webrtcPeer";
    this.socket = null;
  }

  viewfollowing = (privatekey) => {
    this.setState({ following: [] });
    fetch(this.state.server_url + "/follow/following", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privatekey,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({ following: res });
      })
      .catch((err) => console.log(err));
    fetch(this.state.server_url + "/follow/followinga", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privatekey,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (this.state.following.length == undefined) {
          this.setState({ following: res });
        } else {
          for (var i = 0; i < res.length; i++) {
            this.state.following.push(res[i]);
          }

          this.setState({ following: this.state.following });
        }
      })
      .catch((err) => console.log(err));
  };
  state = {
    recordnotify: "",
    recordon: "",
    recordof: "",
    hostview: "",
  };

  recordon = {
    display: "block",
  };
  recordof = {
    display: "none",
  };

  sendMessage = (message) => {
    this.socket.emit("messageksc", message);
  };

  participants = {};
  onReceiveVideoAnswer = (senderid, sdpAnswer) => {
    this.participants[senderid].rtcPeer.processAnswer(sdpAnswer);
  };

  addIceCandidate = (userid, candidate) => {
    this.participants[userid].rtcPeer.addIceCandidate(candidate);
  };

  componentDidMount = () => {
    if (this.props.location.state != undefined) {
      this.setState({
        recordnotify: this.recordof,
        hostview: this.recordof,
      });

      const isElectron = () => {
        // Renderer process
        if (
          typeof window !== "undefined" &&
          typeof window.process === "object" &&
          window.process.type === "renderer"
        ) {
          document.getElementById("enableGreenScreen").style.display = "block";
        }

        // Main process
        if (
          typeof process !== "undefined" &&
          typeof process.versions === "object" &&
          !!process.versions.electron
        ) {
          document.getElementById("enableGreenScreen").style.display = "block";
        }

        // Detect the user agent when the `nodeIntegration` option is set to true
        if (
          typeof navigator === "object" &&
          typeof navigator.userAgent === "string" &&
          navigator.userAgent.indexOf("Electron") >= 0
        ) {
          document.getElementById("enableGreenScreen").style.display = "block";
        }
        // document.getElementById('enableGreenScreen').style.display = 'block';
        document.getElementById("enableGreenScreen").style.display = "block";
      };
      isElectron();
      this.socket = io(this.state.server_url);
      // document.getElementById('hostView').style.display = "none";
      var divRoomSelection = document.getElementById("roomSelection");
      var divMeetingRoom = document.getElementById("meetingRoomdiv");
      var divhangupscreen = document.getElementById("hangupscreen");
      var inputRoom = document.getElementById("room");
      var inputName = document.getElementById("name");
      var btnRegister = document.getElementById("register");
      var hangupbtn = document.getElementById("hangupbtn");
      var videomute = document.getElementById("videomute");
      var audiomute = document.getElementById("audiomute");
      var videoinputid = document.getElementById("videoinputfid");
      var attendeebtn = document.getElementById("attendeebtn");
      var roomName;
      var userName;

      var arrayforvideo = [];
      var gscanvasarray = [];
      var myuser =
        this.props.location.state.firstname +
        " " +
        this.props.location.state.lastName;
      var nickname = this.props.location.state.username;
      var guestOrganization = this.props.location.state.organization;
      var recordStream;
      var audio_context = new AudioContext();
      var merger = new VideoStreamMerger({ audioContext: audio_context });

      var imlouis = this.props.location.state.privatekey;

      var guestname;
      var guestCompany;
      var guestTwitter;
      var isimclicked = 0;

      const autojoinmeet = () => {
        roomName = window.location.search.substr(4); //roomName means roomId
        inputName.value =
          this.props.location.state.firstname +
          " " +
          this.props.location.state.lastName;
        if (roomName === "" || userName === "") {
          console.log("Room and Name are required!");
        } else {
          var message = {
            event: "joinRoom",
            userName: myuser,
            roomName: roomName,
            veroKey: this.props.location.state.privatekey,
            meetingperson: this.props.location.state.type,
          };

          this.sendMessage(message);
          divRoomSelection.style = "display: none";

          // document.getElementById("meetingRoom").style =
          //   "display:flex;flex-wrap: wrap;position:absolute;left:30px;top:60px";
        }
      };
      autojoinmeet();

      this.socket.on("messageks", (message) => {
        console.log("Message received: " + message.event);

        switch (message.event) {
          case "newParticipantArrived":
            receiveVideo(message.userid, message.username, message.veroKey);

            if (this.state.meetingperson == "host") {
              this.socket.emit("existing-users-list", this.state.attendees);
            }
            break;
          case "existingParticipants":
            onExistingParticipants(
              message.userid,
              message.existingUsers,
              message.veroKey
            );
            break;
          case "receiveVideoAnswer":
            this.onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
            break;
          case "candidate":
            this.addIceCandidate(message.userid, message.candidate);
            break;
          case "participantLeft":
            // alert('participantLeft',message.userID);
            RemovingHangPerson(message.userID);
        }
      });
      var myarray = [];
      var attendeearray = [];
      var hanguptool = [];
      this.setState({
        screensharecreds: `/screenShare/?userName=${myuser}'s screen #${window.location.search.substr(
          4
        )}`,
      });

      if (this.props.location.state.screenSource == "screen") {
        var mySendSource = "screen";
        var isAudible = false;
      } else {
        var mySendSource = "webcam";
        var isAudible = true;
      }

      // var customFacingMode = this.props.location.state.facingMode;

      // handlers functions
      var mygshelper = this.state.gsworkfunforuser;

      // clients videos and its control starts
      const receiveVideo = (userid, username, veroKey) => {
        let attendee = {
          veroKey: veroKey,
          name: username,
          room: room,
          id: userid,
          meetingperson: this.props.location.state.type,
        };
        this.setState({
          attendees: [...this.state.attendees, attendee],
        });

        var video = document.createElement("video");
        video.poster =
          "https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroMain_placeholder.jpg";

        var div = document.createElement("div");
        var divnew = document.createElement("div");
        var attendeesolo = document.createElement("button");

        var buttonmerec = document.createElement("button");
        var throwOut = document.createElement("button");

        attendeesolo.className = "fullbtnmet";
        buttonmerec.className = "fullbtnmet";
        throwOut.className = "fullbtnmet";
        buttonmerec.id = "buttonmerec" + userid;
        attendeesolo.id = "attendeesolo" + userid;
        throwOut.id = "throwOut" + userid;
        buttonmerec.style.backgroundColor = "grey";
        buttonmerec.style.margin = "5px";
        attendeesolo.style.margin = "5px";
        throwOut.style.margin = "5px";
        attendeesolo.style.backgroundColor = "grey";
        throwOut.style.backgroundColor = "red";
        throwOut.style.color = "white";
        throwOut.style.cursor = "pointer";
        div.className = "videoContainer";

        div.id = userid + "div";
        var name = document.createElement("div");
        name.style.backgroundColor = "#033a5a";
        video.id = userid;
        video.autoplay = true;
        video.controls = false;
        attendeearray = [...attendeearray, username];
        myarray = [...myarray, video.id];
        name.appendChild(document.createTextNode(username));

        name.className = "nameForStream";
        name.id = userid + "name";

        attendeesolo.appendChild(document.createTextNode("Solo"));
        buttonmerec.appendChild(document.createTextNode("Record"));
        throwOut.appendChild(document.createTextNode("X"));
        divMeetingRoom.appendChild(div);
        div.appendChild(video);
        div.appendChild(divnew);
        divnew.appendChild(name);
        div.onclick = () => {
          document.getElementById("bigtvvideo").srcObject = video.srcObject;
          document.getElementById("bigtvvideo").autoplay = true;
        };
        var myownname = `${myuser}'s screen`;
        if (this.props.location.state.screenSource == "screen") {
          video.muted = true;
        } else if (name.innerText == myownname) {
          video.muted = true;
        } else {
          console.log(username, myownname, "testing screen share");
        }

        // divnew.appendChild(buttonme);

        divnew.appendChild(buttonmerec);
        divnew.appendChild(attendeesolo);
        divnew.appendChild(throwOut);
        if (
          document.getElementById("hostcontrolsdiv").style.display == "none"
        ) {
          buttonmerec.style.display = "none";
          attendeesolo.style.display = "none";
          throwOut.style.display = "none";
        } else {
          divnew.className = "nameandbtn";
          divnew.style.backgroundColor = "#033a5a";
        }

        dynamicVideoLayout(userid);

        buttonmerec.onclick = () => {
          recordingUser(userid);
        };

        attendeesolo.onclick = () => {
          attendeesoloRec(userid);
        };

        throwOut.onclick = () => {
          if (this.state.meetingperson == "host") {
            this.socket.emit("hanguphimfrommeeting", attendee);
          }
        };

        var user = {
          id: userid,
          username: username,
          veroKey: veroKey,
          video: video,
          rtcPeer: null,
        };

        this.participants[user.id] = user;

        var options = {
          remoteVideo: video,
          onicecandidate: onIceCandidate,
        };

        user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
          options,
          function (err) {
            if (err) {
              return console.error(err);
            }
            this.generateOffer(onOffer);
          }
        );

        const onOffer = (err, offer, wp) => {
          console.log("sending offer");
          var message = {
            event: "receiveVideoFrom",
            userid: user.id,
            roomName: roomName,
            sdpOffer: offer,
          };
          this.sendMessage(message);
        };

        const onIceCandidate = (candidate, wp) => {
          console.log("sending ice candidates");
          var message = {
            event: "candidate",
            userid: user.id,
            roomName: roomName,
            candidate: candidate,
          };
          this.sendMessage(message);
        };
      };
      // clients videos ends

      //self video and its control starts
      const onExistingParticipants = (userid, existingUsers, veroKey) => {
        console.log(existingUsers, "existingUsers");
        let attendee = {
          veroKey: veroKey,
          name: inputName.value,
          room: room,
          id: userid,
          meetingperson: this.props.location.state.type,
        };

        this.setState({
          attendees: [...this.state.attendees, attendee],
        });

        var video = document.createElement("video");
        video.poster =
          "https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroMain_placeholder.jpg";

        var div = document.createElement("div");
        var divnew = document.createElement("div");
        var hostsolo = document.createElement("button");
        var buttonmerec = document.createElement("button");

        buttonmerec.className = "fullbtnmet";
        hostsolo.className = "fullbtnmet";
        buttonmerec.id = "buttonmerec" + userid;
        hostsolo.id = "hostsolo" + userid;
        div.className = "videoContainer";
        var name = document.createElement("div");
        div.id = userid + "div";
        video.className = "hello_video";
        video.id = userid;
        video.autoplay = true;
        video.controls = false;
        myarray = [...myarray, video.id];
        hanguptool = [userid];
        name.appendChild(document.createTextNode(inputName.value));
        attendeearray = [...attendeearray, inputName.value];

        name.id = userid + "name";
        name.className = "nameForStream";
        name.style.backgroundColor = "#033a5a";
        // buttonme.appendChild(document.createTextNode("Big Screen"));
        buttonmerec.appendChild(document.createTextNode("Record"));
        hostsolo.appendChild(document.createTextNode("Solo"));
        hostsolo.style.backgroundColor = "grey";

        buttonmerec.style.backgroundColor = "grey";
        buttonmerec.style.margin = "5px";
        hostsolo.style.margin = "5px";

        div.appendChild(video);
        div.appendChild(divnew);
        divnew.appendChild(name);

        // divnew.appendChild(buttonme);
        divnew.appendChild(buttonmerec);
        divnew.appendChild(hostsolo);

        divMeetingRoom.appendChild(div);
        div.onclick = () => {
          document.getElementById("bigtvvideo").srcObject = video.srcObject;
          document.getElementById("bigtvvideo").autoplay = true;
        };
        if (
          document.getElementById("hostcontrolsdiv").style.display == "none"
        ) {
          buttonmerec.style.display = "none";
          hostsolo.style.display = "none";
        } else {
          divnew.className = "nameandbtn";
          divnew.style.backgroundColor = "#033a5a";
        }
        this.socket.emit("saymygsbginfo", {
          roomid: window.location.search.substr(4),
        });
        dynamicVideoLayout(userid);

        document.getElementById("enableGreenScreen").onclick = () => {
          if (
            document.getElementById("enableGreenScreen").style.color == "red"
          ) {
            this.setState({ openGreenScreenContainer: "show" });
            document.getElementById("enableGreenScreen").style.color = "green";

            // let videozindex = document.getElementById(myarray[0]).style.zIndex+ 5;
            // document.getElementById('gsshow').style.zIndex= videozindex;

            let c1, ctx1, c_tmp, ctx_tmp, video2, videoMine;

            const init = () => {
              this.socket.emit("greenscreenforme", {
                id: myarray[0],
                roomid: room,
              });
              videoMine = document.getElementById(myarray[0]);
              video2 = document.getElementById("gsshow");
              c1 = document.createElement("canvas");
              c1.id = myarray[0] + "canvas";

              document.getElementById(userid + "div").appendChild(c1);
              ctx1 = c1.getContext("2d");
              // c1.style.backgroundColor = "black";

              // c1.style.background= `url(${gsbg2})`

              c_tmp = document.createElement("canvas");
              c_tmp.id = myarray[0] + "ctmp";
              c1.setAttribute(
                "width",
                document.getElementById(myarray[0]).offsetWidth
              );
              c1.setAttribute(
                "height",
                document.getElementById(myarray[0]).offsetHeight
              );
              c_tmp.setAttribute(
                "width",
                document.getElementById(myarray[0]).offsetWidth
              );
              c_tmp.setAttribute(
                "height",
                document.getElementById(myarray[0]).offsetHeight
              );
              ctx_tmp = c_tmp.getContext("2d");

              computeFrame();
              c1.style.position = "absolute";
              ctx_tmp.style.position = "absolute";

              c1.style.top =
                document.getElementById(myarray[0]).offsetTop + "px";
              c1.style.left =
                document.getElementById(myarray[0]).offsetLeft + "px";
            };
            function computeFrame() {
              document
                .getElementById(myarray[0] + "canvas")
                .setAttribute(
                  "width",
                  document.getElementById(myarray[0]).offsetWidth
                );
              document
                .getElementById(myarray[0] + "canvas")
                .setAttribute(
                  "height",
                  document.getElementById(myarray[0]).offsetHeight
                );

              document.getElementById(myarray[0] + "canvas").style.top =
                document.getElementById(myarray[0]).offsetTop + "px";
              document.getElementById(myarray[0] + "canvas").style.left =
                document.getElementById(myarray[0]).offsetLeft + "px";
              document.getElementById(myarray[0] + "canvas").style.width =
                document.getElementById(myarray[0]).offsetWidth + "px";
              document.getElementById(myarray[0] + "canvas").style.height =
                document.getElementById(myarray[0]).offsetHeight + "px";

              ctx_tmp.drawImage(
                videoMine,
                0,
                0,
                document.getElementById(myarray[0] + "div").offsetWidth,
                document.getElementById(myarray[0] + "div").offsetHeight
              );
              let frame = ctx_tmp.getImageData(
                0,
                0,
                document.getElementById(myarray[0]).offsetWidth,
                document.getElementById(myarray[0]).offsetHeight
              );

              // ctx_tmp.drawImage(document.getElementById('gsbg1'), 100, 100,100,100 );
              // let frame2 = ctx_tmp.getImageData(0, 0, );
              ctx_tmp.drawImage(
                video2,
                0,
                0,
                document.getElementById(myarray[0]).offsetWidth,
                document.getElementById(myarray[0]).offsetHeight
              );
              let frame2 = ctx_tmp.getImageData(
                0,
                0,
                document.getElementById(myarray[0]).offsetWidth,
                document.getElementById(myarray[0]).offsetHeight
              );
              for (let i = 0; i < frame.data.length / 4; i++) {
                let r = frame.data[i * 4 + 0];
                let g = frame.data[i * 4 + 1];
                let b = frame.data[i * 4 + 2];
                if (r == 0 && g == 177 && b == 64) {
                  // frame.data[i * 4 + 3] = 0;
                  frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                  frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                  frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                } else if (r == 0 && g == 71 && b == 187) {
                  frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                  frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                  frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                  // frame.data[i * 4 + 3] = 0;
                } else if (g > 100 && r < 40) {
                  frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                  frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                  frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                  //frame.data[i * 4 + 3] = 0;
                }

                //else if (r == 0 && g == 66 && b == 37) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 18 && g == 53 && b == 36) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 1 && g == 68 && b == 33) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 0 && g == 86 && b == 63) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 25 && g == 89 && b == 5) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 24 && g == 69 && b == 59) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 33 && g == 66 && b == 30) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 27 && g == 77 && b == 62) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 0 && g == 102 && b == 0) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 30 && g == 77 && b == 43) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 0 && g == 107 && b == 60) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 0 && g == 106 && b == 78) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 0 && g == 112 && b == 60) {
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r == 8 && g == 120 && b == 48) {
                //     frame.data[i * 4 + 3] = 0;
                // }
                // else
                // if (r > 70 && r < 97 && g > 227 && g < 250 && b > 168 && b < 183) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // // else if (r < 2 && g > 253 && g < 258 && b < 2) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }

                // else if (r > 30 && r < 40 && g > 137 && g < 142 && b > 30 && b < 37) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // // else if (r > 0 && r < 15 && g > 126 && g < 146 && b > 80 && b < 110) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // else if (r > 82 && r < 103 && g > 222 && g < 230 && b > 163 && b < 173) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }

                // // else if (r < 5 && g > 99 && g < 140 && b < 5) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // // else if (r < 5 && g > 249 && g < 256 && b > 125 && b < 158) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // else if (r > 140 && r < 155 && g > 250 && g < 255 && b > 149 && b < 158) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // else if (r > 20 && r < 61 && g > 78 && g < 220 && b > 60 && b < 198) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // } else if (r > 20 && r < 105 && g > 50 && g < 220 && b > 135 && b < 200) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // else if (r > 120 && r < 129 && g > 250 && g < 255 && b < 1) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // else if (r > 40 && r < 60 && g > 200 && g < 209 && b < 55) {
                //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                //     frame.data[i * 4 + 3] = 0;
                // }
                // // else if (r > 0 && r < 2 && g > 49 && g < 53 && b < 34 && b > 30) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // // else if (r > 0 && r < 2 && g > 100 && g < 109 && b > 57 && b < 62) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // } else if (r > 0 && r < 2 && g > 100 && g < 109 && b > 76 && b < 79) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // // else if (r > 0 && r < 2 && g > 110 && g < 115 && b > 57 && b < 63) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // } else if (r > 0 && r < 2 && g > 118 && g < 122 && b > 45 && b < 49) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // } else if (r > 0 && r < 2 && g > 143 && g < 146 && b > 78 && b < 81) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // } else if (r > 0 && r < 2 && g > 163 && g < 166 && b > 78 && b < 81) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // } else if (r > 0 && r < 2 && g > 163 && g < 169 && b > 117 && b < 120) {
                // //     // frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                // //     // frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                // //     // frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
                // //     frame.data[i * 4 + 3] = 0;
                // // }
                // else if (r > 70 && r < 160 && g > 95 && g < 220 && b > 25 && b < 150) {

                //     frame.data[i * 4 + 3] = 0;
                // }
                // if (r > 70 && r < 160 && g > 95 && g < 220 && b > 25 && b < 150) {

                // frame.data[i * 4 + 3] = 0;
              }

              ctx1.putImageData(frame, 0, 0);

              setTimeout(computeFrame, 0);
            }
            init();
          } else {
            this.socket.emit("closemygreenscreen", userid);
            document.getElementById("enableGreenScreen").style.color = "red";
            document.getElementById(myarray[0] + "canvas").remove();
            this.setState({ openGreenScreenContainer: "" });
          }
        };

        buttonmerec.onclick = () => {
          if (
            document.getElementById("recordBtn").style.color !== "green" &&
            arrayforvideo.length == 0
          ) {
            buttonmerec.style.backgroundColor = "red";
            // buttonmerec.disabled=true

            // document.getElementById('fullbtnoff').style.display = "block"
            // document.getElementById('Hostfullbtn').style.display = "block"
            arrayforvideo = [...arrayforvideo, userid];
            document.getElementById(userid).style.border = "3px solid red";
            document.getElementById(userid).style.border = "3px solid yellow";
            this.socket.emit("youarenowinrec", {
              room: room,
              userid: userid,
              myarray: myarray,
            });
          }
        };

        hostsolo.onclick = function () {
          hostSoloRec(userid);
        };

        if (isimclicked == 0) {
          setTimeout(() => {
            if (window.innerWidth >= 800) {
              recordStream = video.srcObject;
              videoinputid.value = userid;
              // callmeauto()
              videoinputid.value = "";
            } else if (window.innerWidth <= 800) {
              // video.style.width = "80vw";

              // buttonme.style.display = "none";
              buttonmerec.style.display = "none";
            }
            isimclicked = 1;
          }, 4000);

          // document.getElementById(userid).style.border = "2px solid yellow"
        }

        var user = {
          id: userid,
          username: userName,
          video: video,
          rtcPeer: null,
        };

        this.participants[user.id] = user;

        var constraints = {
          audio: isAudible,
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
            // facingMode: 'user'
            // facingMode:customFacingMode,
            // facingMode: customFacingMode,
            // deviceId: customFacingMode,
            deviceId: this.props.location.state.camMode,
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
        const onOffer = (err, offer, wp) => {
          console.log("sending offer");
          var message = {
            event: "receiveVideoFrom",
            userid: user.id,
            roomName: roomName,
            sdpOffer: offer,
          };
          this.sendMessage(message);
        };

        const onIceCandidate = (candidate, wp) => {
          var message = {
            event: "candidate",
            userid: user.id,
            roomName: roomName,
            candidate: candidate,
          };
          this.sendMessage(message);
        };

        var options = {
          localVideo: video,
          sendSource: mySendSource,
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

        hangupbtn.onclick = function () {
          const video = document.querySelector("video");

          // A video's MediaStream object is available through its srcObject attribute
          const mediaStream = video.srcObject;

          // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
          const tracks = mediaStream.getTracks();

          // Tracks are returned as an array, so if you know you only have one, you can stop it with:
          // tracks[0].stop();

          // Or stop all like so:
          tracks.forEach((track) => track.stop());
        };

        hangupbtn.onclick = () => {
          if (user.rtcPeer) {
            var message = {
              userid: "stop",
            };
            dispose();
          }

          if (this.state.meetingperson == "host") {
            this.socket.emit("close-the-room", this.state.meetingid);
          } else {
            this.socket.emit("removeme", this.state.attendees[0]);
          }
          if (isViaLink == "true") {
            divMeetingRoom.style = "display: none ";
            divhangupscreen.style = "display: block ;margin-top:210px";
            window.location.href = "https://www.verohive.com/";
          } else {
            divMeetingRoom.style = "display: none ";
            divhangupscreen.style = "display: block ;margin-top:210px";
            document.getElementById("gotodashboardafterhangup").click();
          }
        };

        videomute.onclick = () => {
          const mediaStream = video.srcObject;
          const videoTracks = mediaStream.getVideoTracks();
          if (videomute.style.color == "blue") {
            videomute.style.color = "red";

            videoTracks.forEach((track) => (track.enabled = false));
          } else if (videomute.style.color == "red") {
            videomute.style.color = "blue";

            videoTracks.forEach((track) => (track.enabled = true));
          }
        };

        audiomute.onclick = () => {
          const mediaStream = video.srcObject;
          const AudioTracks = mediaStream.getAudioTracks();
          if (audiomute.style.color == "blue") {
            audiomute.style.color = "red";
            AudioTracks.forEach((track) => (track.enabled = false));
          } else if (audiomute.style.color == "red") {
            audiomute.style.color = "blue";
            AudioTracks.forEach((track) => (track.enabled = true));
          }
        };

        const dispose = () => {
          if (user.rtcPeer) {
            user.rtcPeer.dispose();
            user.rtcPeer = null;
          }
          video.remove();
        };
      };
      //self video ends

      //makes video box dynamic sizes ,function begins
      const dynamicVideoLayout = (userid) => {
        let buttonmerec = document.getElementById("buttonmerec" + userid);
        let video = document.getElementById(userid);
        if (window.innerWidth <= 800) {
          // video.style.width = "80vw";
          document.getElementById("bigtvvideo").style.display = "none";

          // buttonme.style.display = "none";
          buttonmerec.style.display = "none";

          // divMeetingRoom.style.overflowY = "scroll";
          divMeetingRoom.style.maxHeight = "85vh";
          divMeetingRoom.style.left = "5px";
        } else {
          myarray.forEach((userid) => {
            if (myarray.length == 1) {
              document.getElementById(userid).style.width = "200px";
              // document.getElementById(userid).style.maxHeight = "113px";
              document.getElementById(userid).style.maxWidth = "80vw";
            } else if (myarray.length == 2) {
              document.getElementById(userid).style.width = "200px";
              document.getElementById(userid).style.maxHeight = "113px";
              document.getElementById(userid).style.maxWidth = "80vw";
            } else if (myarray.length > 2 && myarray.length <= 4) {
              document.getElementById(userid).style.width = "200px";
              document.getElementById(userid).style.maxHeight = "113px";
              document.getElementById(userid).style.maxWidth = "80vw";
            } else if (myarray.length > 4) {
              document.getElementById(userid).style.width = "200px";
              document.getElementById(userid).style.maxHeight = "113px";
              document.getElementById(userid).style.maxWidth = "80vw";
            }
          });
        }
      };
      //makes video box dynamic sizes ,function ends
      // var recordingData=[];
      //recording each user ,function begins
      const recordingUser = (userid) => {
        let buttonmerec = document.getElementById("buttonmerec" + userid);
        if (document.getElementById("recordBtn").style.color == "green") {
          if (
            document.getElementById("buttonmerec" + userid).style
              .backgroundColor == "grey"
          ) {
            document.getElementById(
              "buttonmerec" + userid
            ).style.backgroundColor = "red";
            document.getElementById(userid).style.border = "3px solid red";

            this.socket.emit("youarenowinrec", {
              room: room,
              userid: userid,
              myarray: myarray,
            });

            arrayforvideo = [...arrayforvideo, userid];

            if (arrayforvideo.length == 2) {
              merger.removeStream(arrayforvideo[0]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 3) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 4) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");
                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 5) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 6) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 7) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 8) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
              merger.removeStream(arrayforvideo[6]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 9) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
              merger.removeStream(arrayforvideo[6]);
              merger.removeStream(arrayforvideo[7]);

              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[8],
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[8],
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            }
          } else if (buttonmerec.style.backgroundColor == "red") {
            buttonmerec.style.backgroundColor = "grey";

            if (
              document.getElementById(userid).style.border == "3px solid red"
            ) {
              document.getElementById(userid).style.border = "0px solid red";
            }

            arrayforvideo.forEach((e) => {
              arrayforvideo = arrayforvideo.filter(
                (stream) => stream !== userid
              );
              if (arrayforvideo.length == 1) {
                if (document.getElementById(myarray[0] + "canvas")) {
                  merger.addStream(arrayforvideo[0], {
                    x: 60, // position of the topleft corner
                    y: 40,
                    width: 580,
                    height: 320,
                    mute: false,
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let gsbgme = document.getElementById(
                        myarray[0] + "canvas"
                      );
                      let imgrclogo = document.getElementById("logorecord");
                      let liveLogo = document.getElementById("liveLogo");

                      let imgframe = document.getElementById("lv4");
                      let imgbggreenscreen = document.getElementById("gsshow");

                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");
                      ctx.drawImage(imgrc, 0, 0, 1280, 720);
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 160, 90, 960, 540);
                      ctx.drawImage(imgbggreenscreen, 0, 0, 1280, 715);
                      ctx.drawImage(gsbgme, 0, 0, 1280, 720);
                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      ctx.globalAlpha = 0.9;
                      ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                      ctx.globalAlpha = 1;

                      done();
                    },
                    // we don't want sound from the screen (if there is any)
                  });
                } else {
                  if (document.getElementById("recordingTextInput")) {
                    merger.addMediaElement(
                      arrayforvideo[0],
                      document.getElementById(arrayforvideo[0]),
                      {
                        x: 60, // position of the topleft corner
                        y: 40,
                        width: 580,
                        height: 320,
                        mute: true,
                        audioEffect: (sourceNode, destinationNode) => {
                          let rs0 = audio_context.createMediaStreamSource(
                            document.getElementById(arrayforvideo[0]).srcObject
                          );
                          rs0.connect(destinationNode);
                        },

                        draw: (ctx, frame, done) => {
                          // You can do whatever you want with this canvas context
                          let imgrclogo = document.getElementById("logorecord");
                          let liveLogo = document.getElementById("liveLogo");
                          let imgframe = document.getElementById("lv4");
                          let imgbg = document.getElementById("bgshow");
                          let imgrc = document.getElementById("recordimg");

                          ctx.drawImage(imgrc, 0, 0, 1280, 720);
                          ctx.globalAlpha = 1;

                          ctx.drawImage(imgbg, 0, 0, 1280, 720);
                          ctx.drawImage(frame, 160, 90, 960, 540);
                          ctx.drawImage(imgframe, 0, 0, 1280, 720);
                          ctx.globalAlpha = 0.9;
                          ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                          ctx.globalAlpha = 1;
                          recordingOverlayFunction(ctx);

                          done();
                        },
                        // we don't want sound from the screen (if there is any)
                      }
                    );
                  } else {
                    merger.addMediaElement(
                      arrayforvideo[0],
                      document.getElementById(arrayforvideo[0]),
                      {
                        x: 60, // position of the topleft corner
                        y: 40,
                        width: 580,
                        height: 320,
                        mute: true,
                        audioEffect: (sourceNode, destinationNode) => {
                          let rs0 = audio_context.createMediaStreamSource(
                            document.getElementById(arrayforvideo[0]).srcObject
                          );
                          rs0.connect(destinationNode);
                        },

                        draw: (ctx, frame, done) => {
                          // You can do whatever you want with this canvas context

                          let imgrclogo = document.getElementById("logorecord");
                          let liveLogo = document.getElementById("liveLogo");
                          let imgframe = document.getElementById("lv4");
                          let imgbg = document.getElementById("bgshow");
                          let imgrc = document.getElementById("recordimg");

                          ctx.drawImage(imgrc, 0, 0, 1280, 720);
                          ctx.globalAlpha = 1;

                          ctx.drawImage(imgbg, 0, 0, 1280, 720);
                          ctx.drawImage(frame, 160, 90, 960, 540);
                          ctx.drawImage(imgframe, 0, 0, 1280, 720);
                          ctx.globalAlpha = 0.9;
                          ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                          ctx.globalAlpha = 1;
                          done();
                        },
                        // we don't want sound from the screen (if there is any)
                      }
                    );
                  }
                }
              } else if (arrayforvideo.length == 2) {
                merger.removeStream(arrayforvideo[0]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 203,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l2rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l2rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        let imgbg = document.getElementById("bgshow");
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;

                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 189, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we d
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 640,
                      y: 203,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l2rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l2rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 648, 189, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 203,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l2rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l2rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        let imgbg = document.getElementById("bgshow");
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;

                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 189, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we d
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 640,
                      y: 203,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l2rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l2rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 648, 189, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              } else if (arrayforvideo.length == 3) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l3rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");
                        let imgbg = document.getElementById("bgshow");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l3rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l3rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 336, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        recordingOverlayFunction(ctx);

                        done();
                      }, // we
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l3rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");
                        let imgbg = document.getElementById("bgshow");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l3rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l3rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l3rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 336, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                }
              } else if (arrayforvideo.length == 4) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l4rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");
                        let imgbg = document.getElementById("bgshow");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l4rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l4rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 24, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l4rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        recordingOverlayFunction(ctx);

                        done();
                      }, // we
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l4rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");
                        let imgbg = document.getElementById("bgshow");
                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 24, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l4rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 12, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l4rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 24, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 0,
                      y: 10,
                      width: 640,
                      height: 360,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l4rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l4rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                        ctx.globalAlpha = 1;

                        ctx.drawImage(frame, 648, 366, 608, 342);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                }
              } else if (arrayforvideo.length == 5) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l5rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l5rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l5rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 230,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l5rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 218, 338, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l5rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 639, 338, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l5rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l5rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l5rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 88, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 230,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l5rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 218, 338, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l5rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l5rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 639, 338, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              } else if (arrayforvideo.length == 6) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l6rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l6rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l6rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 230,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l6rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l6rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l6rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l6rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );

                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l6rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l6rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 122, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 230,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l6rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l6rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 615,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l6rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l6rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 370, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              } else if (arrayforvideo.length == 7) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l7rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");
                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l7rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l7rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l7rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l7rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l7rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l7rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgrc = document.getElementById("recordimg");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l7rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l7rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l7rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l7rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l7rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l7rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l7rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l7rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              } else if (arrayforvideo.length == 8) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l8rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l8rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l8rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l8rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l8rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l8rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l8rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 218, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[7],
                    document.getElementById(arrayforvideo[7]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs7 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[7]).srcObject
                        );
                        l8rs7.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 639, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l8rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);

                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l8rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l8rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l8rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l8rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l8rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l8rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 218, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[7],
                    document.getElementById(arrayforvideo[7]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l8rs7 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[7]).srcObject
                        );
                        l8rs7.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 639, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              } else if (arrayforvideo.length == 9) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
                merger.removeStream(arrayforvideo[7]);

                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l9rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l9rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l9rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l9rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l9rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l9rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l9rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[7],
                    document.getElementById(arrayforvideo[7]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs7 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[7]).srcObject
                        );
                        l9rs7.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[8],
                    document.getElementById(arrayforvideo[8]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs8 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[8]).srcObject
                        );
                        l9rs8.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        recordingOverlayFunction(ctx);
                        done();
                      },
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        l9rs0.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");

                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);

                        ctx.globalAlpha = 1;
                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 15, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[1],
                    document.getElementById(arrayforvideo[1]),
                    {
                      x: 440,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs1 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[1]).srcObject
                        );
                        l9rs1.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      }, // we
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[2],
                    document.getElementById(arrayforvideo[2]),
                    {
                      x: 820,
                      y: 120,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs2 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[2]).srcObject
                        );
                        l9rs2.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 9, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[3],
                    document.getElementById(arrayforvideo[3]),
                    {
                      x: 60,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs3 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[3]).srcObject
                        );
                        l9rs3.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[4],
                    document.getElementById(arrayforvideo[4]),
                    {
                      x: 440,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs4 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[4]).srcObject
                        );
                        l9rs4.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[5],
                    document.getElementById(arrayforvideo[5]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs5 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[5]).srcObject
                        );
                        l9rs5.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 246, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[6],
                    document.getElementById(arrayforvideo[6]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs6 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[6]).srcObject
                        );
                        l9rs6.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 15, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[7],
                    document.getElementById(arrayforvideo[7]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs7 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[7]).srcObject
                        );
                        l9rs7.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 436, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                  merger.addMediaElement(
                    arrayforvideo[8],
                    document.getElementById(arrayforvideo[8]),
                    {
                      x: 820,
                      y: 350,
                      width: 380,
                      height: 210,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let l9rs8 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[8]).srcObject
                        );
                        l9rs8.connect(destinationNode);
                      },
                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgframe = document.getElementById("lv4");

                        ctx.globalAlpha = 1;
                        ctx.drawImage(frame, 857, 483, 406, 228);

                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        done();
                      },
                    }
                  );
                }
              }

              // if(e==userid){
              //    arrayforvideo.splice(arrayforvideo[arrayforvideo.indexOf(userid)], 1);
              //    console.log(arrayforvideo)

              //   //  if(arrayforvideo.length==1){
              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60, // position of the topleft corner
              //   //         y: 40,
              //   //         width: 580,
              //   //         height: 320,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           rs0.connect(destinationNode);
              //   //         },

              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgrclogo = document.getElementById("logorecord");
              // let liveLogo = document.getElementById("liveLogo");
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //                ctx.drawImage(imgrc, 0, 0, 1280, 720);
              //   //                ctx.globalAlpha = 1;

              //   //                ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //                ctx.drawImage(frame, 160, 90, 960, 540);
              //   //                ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //                ctx.globalAlpha = 0.9;
              //   //                ctx.drawImage(imgrclogo, 1040,580,185,80);
              //
              //   //                ctx.globalAlpha = 1;
              //   //                recordingOverlayFunction(ctx)

              //   //           done();
              //   //         },
              //   //         // we don't want sound from the screen (if there is any)
              //   //       }
              //   //     );
              //   //   }else{
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60, // position of the topleft corner
              //   //         y: 40,
              //   //         width: 580,
              //   //         height: 320,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           rs0.connect(destinationNode);
              //   //         },

              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgrclogo = document.getElementById("logorecord");
              //  let liveLogo = document.getElementById("liveLogo");
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //                ctx.drawImage(imgrc, 0, 0, 1280, 720);
              //   //                ctx.globalAlpha = 1;

              //   //                ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //                ctx.drawImage(frame, 160, 90, 960, 540);
              //   //                ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //                ctx.globalAlpha = 0.9;
              //   //                ctx.drawImage(imgrclogo, 1040,580,185,80);
              //
              //   //                ctx.globalAlpha = 1;

              //   //           done();
              //   //         },
              //   //         // we don't want sound from the screen (if there is any)
              //   //       }
              //   //     );
              //   //   }

              //   //  }
              //   //  else if (arrayforvideo.length == 2) {
              //   //   // merger.removeStream(arrayforvideo[0]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 203,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l2rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l2rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {

              //   //           let imgbg = document.getElementById("bgshow");
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 189, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we d
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 640,
              //   //         y: 203,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l2rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l2rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 648, 189, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 203,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l2rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l2rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           let imgbg = document.getElementById("bgshow");
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 189, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we d
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //      arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 640,
              //   //         y: 203,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l2rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l2rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 648, 189, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 3) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l3rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l3rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l3rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 336, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           recordingOverlayFunction(ctx)

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l3rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l3rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l3rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l3rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 336, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 4) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l4rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l4rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l4rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 24, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l4rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           recordingOverlayFunction(ctx)

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l4rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");
              //   //           let imgbg = document.getElementById("bgshow");
              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 24, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l4rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 12, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l4rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 24, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 0,
              //   //         y: 10,
              //   //         width: 640,
              //   //         height: 360,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l4rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l4rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           // ctx.drawImage(imgrc, 0, 0, 1280, 720)

              //   //           ctx.globalAlpha = 1;

              //   //           ctx.drawImage(frame, 648, 366, 608, 342);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 5) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   merger.removeStream(arrayforvideo[3]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l5rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //      arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l5rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l5rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 230,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l5rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 218,338, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l5rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 639, 338, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l5rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //      arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l5rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l5rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 88, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 230,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l5rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 218,338, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l5rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l5rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 639,338, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 6) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   merger.removeStream(arrayforvideo[3]);
              //   //   merger.removeStream(arrayforvideo[4]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l6rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15,122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l6rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436,122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l6rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857,122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 230,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l6rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15,370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l6rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l6rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l6rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );

              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l6rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436,122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l6rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857,122, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 230,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l6rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15,370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l6rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436,370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 615,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l6rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l6rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857,370, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 7) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   merger.removeStream(arrayforvideo[3]);
              //   //   merger.removeStream(arrayforvideo[4]);
              //   //   merger.removeStream(arrayforvideo[5]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l7rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l7rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l7rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l7rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l7rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l7rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l7rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l7rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l7rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l7rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l7rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l7rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l7rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l7rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l7rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 8) {

              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   merger.removeStream(arrayforvideo[3]);
              //   //   merger.removeStream(arrayforvideo[4]);
              //   //   merger.removeStream(arrayforvideo[5]);
              //   //   merger.removeStream(arrayforvideo[6]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l8rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l8rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l8rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l8rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l8rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l8rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l8rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 218, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[7],
              //   //       document.getElementById(arrayforvideo[7]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs7 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[7]).srcObject
              //   //           );
              //   //           l8rs7.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 639, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l8rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);

              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l8rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l8rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l8rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l8rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l8rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l8rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 218, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[7],
              //   //       document.getElementById(arrayforvideo[7]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l8rs7 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[7]).srcObject
              //   //           );
              //   //           l8rs7.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 639, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // } else if (arrayforvideo.length == 9) {
              //   //   merger.removeStream(arrayforvideo[0]);
              //   //   merger.removeStream(arrayforvideo[1]);
              //   //   merger.removeStream(arrayforvideo[2]);
              //   //   merger.removeStream(arrayforvideo[3]);
              //   //   merger.removeStream(arrayforvideo[4]);
              //   //   merger.removeStream(arrayforvideo[5]);
              //   //   merger.removeStream(arrayforvideo[6]);
              //   //   merger.removeStream(arrayforvideo[7]);

              //   //   if (document.getElementById("recordingTextInput")) {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l9rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l9rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l9rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l9rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l9rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l9rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //      arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l9rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[7],
              //   //       document.getElementById(arrayforvideo[7]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs7 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[7]).srcObject
              //   //           );
              //   //           l9rs7.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[8],
              //   //       document.getElementById(arrayforvideo[8]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs8 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[8]).srcObject
              //   //           );
              //   //           l9rs8.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           recordingOverlayFunction(ctx)
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   } else {
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[0],
              //   //       document.getElementById(arrayforvideo[0]),
              //   //       {
              //   //         x: 60,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs0 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[0]).srcObject
              //   //           );
              //   //           l9rs0.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");
              //   //           let imgbg = document.getElementById("bgshow");

              //   //           let imgrc = document.getElementById("recordimg");

              //   //           ctx.drawImage(imgrc, 0, 0, 1280, 720);

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(imgbg, 0, 0, 1280, 720);
              //   //           ctx.drawImage(frame, 15, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[1],
              //   //       document.getElementById(arrayforvideo[1]),
              //   //       {
              //   //         x: 440,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs1 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[1]).srcObject
              //   //           );
              //   //           l9rs1.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         }, // we
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[2],
              //   //       document.getElementById(arrayforvideo[2]),
              //   //       {
              //   //         x: 820,
              //   //         y: 120,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs2 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[2]).srcObject
              //   //           );
              //   //           l9rs2.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 9, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[3],
              //   //       document.getElementById(arrayforvideo[3]),
              //   //       {
              //   //         x: 60,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs3 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[3]).srcObject
              //   //           );
              //   //           l9rs3.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[4],
              //   //       document.getElementById(arrayforvideo[4]),
              //   //       {
              //   //         x: 440,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs4 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[4]).srcObject
              //   //           );
              //   //           l9rs4.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[5],
              //   //       document.getElementById(arrayforvideo[5]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs5 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[5]).srcObject
              //   //           );
              //   //           l9rs5.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 246, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[6],
              //   //       document.getElementById(arrayforvideo[6]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs6 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[6]).srcObject
              //   //           );
              //   //           l9rs6.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 15, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[7],
              //   //       document.getElementById(arrayforvideo[7]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs7 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[7]).srcObject
              //   //           );
              //   //           l9rs7.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 436, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //     merger.addMediaElement(
              //   //       arrayforvideo[8],
              //   //       document.getElementById(arrayforvideo[8]),
              //   //       {
              //   //         x: 820,
              //   //         y: 350,
              //   //         width: 380,
              //   //         height: 210,
              //   //         mute: true,
              //   //         audioEffect: (sourceNode, destinationNode) => {
              //   //           let l9rs8 = audio_context.createMediaStreamSource(
              //   //             document.getElementById(arrayforvideo[8]).srcObject
              //   //           );
              //   //           l9rs8.connect(destinationNode);
              //   //         },
              //   //         draw: (ctx, frame, done) => {
              //   //           // You can do whatever you want with this canvas context
              //   //           let imgframe = document.getElementById("lv4");

              //   //           ctx.globalAlpha = 1;
              //   //           ctx.drawImage(frame, 857, 483, 406, 228);

              //   //           ctx.drawImage(imgframe, 0, 0, 1280, 720);
              //   //           done();
              //   //         },
              //   //       }
              //   //     );
              //   //   }
              //   // }
              // }
            });
          }
        }
      };

      //recording each user ,function ends

      //make an attendee in recording solo, function begins
      const attendeesoloRec = (userid) => {
        let video = document.getElementById(userid);
        let attendeesolo = document.getElementById("attendeesolo" + userid);

        if (document.getElementById("recordBtn").style.color == "green") {
          if (
            document.getElementById("attendeesolo" + userid).style
              .backgroundColor == "grey"
          ) {
            if (document.getElementById("recordingTextInput")) {
              attendeesolo.style.backgroundColor = "red";
              document.getElementById(userid).style.border = "6px solid red";

              this.socket.emit("youarenowinrecfull", {
                room: room,
                userid: userid,
                myarray: myarray,
              });

              if (arrayforvideo.length == 2) {
                merger.removeStream(arrayforvideo[0]);

                merger.removeStream(arrayforvideo[1]);
              }
              if (arrayforvideo.length == 3) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
              } else if (arrayforvideo.length == 4) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
              } else if (arrayforvideo.length == 5) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
              } else if (arrayforvideo.length == 6) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
              } else if (arrayforvideo.length == 7) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
              } else if (arrayforvideo.length == 8) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
                merger.removeStream(arrayforvideo[7]);
              } else if (arrayforvideo.length == 9) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
                merger.removeStream(arrayforvideo[7]);
                merger.removeStream(arrayforvideo[8]);
              }

              merger.addStream(video.srcObject, {
                x: 150,
                y: 110,
                width: 960,
                height: 540,
                mute: false,
                draw: (ctx, frame, done) => {
                  // You can do whatever you want with this canvas context
                  let imgframe = document.getElementById("lv4");
                  let imgbg = document.getElementById("bgshow");

                  let imgrc = document.getElementById("recordimg");

                  ctx.drawImage(imgrc, 0, 0, 1280, 720);
                  // ctx.globalAlpha = 1;
                  ctx.drawImage(imgbg, 0, 0, 1280, 720);
                  // ctx.drawImage(frame, 150, 110, 960, 540)

                  ctx.drawImage(frame, 160, 90, 960, 540);
                  ctx.drawImage(imgframe, 0, 0, 1280, 720);

                  recordingOverlayFunction(ctx);

                  done();
                }, // we
              });
            } else {
              attendeesolo.style.backgroundColor = "red";
              document.getElementById(userid).style.border = "6px solid red";

              this.socket.emit("youarenowinrecfull", {
                room: room,
                userid: userid,
                myarray: myarray,
              });

              if (arrayforvideo.length == 2) {
                merger.removeStream(arrayforvideo[0]);

                merger.removeStream(arrayforvideo[1]);
              }
              if (arrayforvideo.length == 3) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
              } else if (arrayforvideo.length == 4) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
              } else if (arrayforvideo.length == 5) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
              } else if (arrayforvideo.length == 6) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
              } else if (arrayforvideo.length == 7) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
              } else if (arrayforvideo.length == 8) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
                merger.removeStream(arrayforvideo[7]);
              } else if (arrayforvideo.length == 9) {
                merger.removeStream(arrayforvideo[0]);
                merger.removeStream(arrayforvideo[1]);
                merger.removeStream(arrayforvideo[2]);
                merger.removeStream(arrayforvideo[3]);
                merger.removeStream(arrayforvideo[4]);
                merger.removeStream(arrayforvideo[5]);
                merger.removeStream(arrayforvideo[6]);
                merger.removeStream(arrayforvideo[7]);
                merger.removeStream(arrayforvideo[8]);
              }

              merger.addStream(video.srcObject, {
                x: 150,
                y: 110,
                width: 960,
                height: 540,
                mute: false,
                draw: (ctx, frame, done) => {
                  // You can do whatever you want with this canvas context
                  let imgframe = document.getElementById("lv4");
                  let imgbg = document.getElementById("bgshow");

                  let imgrc = document.getElementById("recordimg");

                  ctx.drawImage(imgrc, 0, 0, 1280, 720);
                  // ctx.globalAlpha = 1;
                  ctx.drawImage(imgbg, 0, 0, 1280, 720);
                  // ctx.drawImage(frame, 150, 110, 960, 540)

                  ctx.drawImage(frame, 160, 90, 960, 540);
                  ctx.drawImage(imgframe, 0, 0, 1280, 720);

                  done();
                }, // we
              });
            }
          } else if (attendeesolo.style.backgroundColor == "red") {
            attendeesolo.style.backgroundColor = "grey";
            this.socket.emit("youarenowinrecnofull", {
              room: room,
              userid: userid,
              myarray: myarray,
            });

            if (
              document.getElementById(userid).style.border == "6px solid red"
            ) {
              document.getElementById(userid).style.border = "3px solid red";
            }

            merger.removeStream(video.srcObject);
            if (arrayforvideo.length == 2) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 3) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 4) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");
                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 5) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 6) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 7) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 8) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 9) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  "l9rs0",
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs1",
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs2",
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs3",
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs4",
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs5",
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs6",
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs7",
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs8",
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  "l9rs0",
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs1",
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs2",
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs3",
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs4",
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs5",
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs6",
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs7",
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs8",
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            }
          }
        }
      };
      //make an attendee in recording solo, function ends

      //make an host in recording solo, function begins

      const hostSoloRec = (userid) => {
        let video = document.getElementById(userid);
        let hostsolo = document.getElementById("hostsolo" + userid);
        if (document.getElementById("recordBtn").style.color == "green") {
          if (
            document.getElementById("hostsolo" + userid).style
              .backgroundColor == "grey"
          ) {
            hostsolo.style.backgroundColor = "red";
            document.getElementById(userid).style.border = "6px solid red";

            this.socket.emit("youarenowinrecfull", {
              room: room,
              userid: userid,
              myarray: myarray,
            });

            if (arrayforvideo.length == 2) {
              merger.removeStream(arrayforvideo[0]);

              merger.removeStream(arrayforvideo[1]);
            }
            if (arrayforvideo.length == 3) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
            }
            if (arrayforvideo.length == 4) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
            }
            if (arrayforvideo.length == 5) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
            }
            if (arrayforvideo.length == 6) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
            } else if (arrayforvideo.length == 7) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
              merger.removeStream(arrayforvideo[6]);
            } else if (arrayforvideo.length == 8) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
              merger.removeStream(arrayforvideo[6]);
              merger.removeStream(arrayforvideo[7]);
            } else if (arrayforvideo.length == 9) {
              merger.removeStream(arrayforvideo[0]);
              merger.removeStream(arrayforvideo[1]);
              merger.removeStream(arrayforvideo[2]);
              merger.removeStream(arrayforvideo[3]);
              merger.removeStream(arrayforvideo[4]);
              merger.removeStream(arrayforvideo[5]);
              merger.removeStream(arrayforvideo[6]);
              merger.removeStream(arrayforvideo[7]);
              merger.removeStream(arrayforvideo[8]);
            }
            if (document.getElementById("recordingTextInput")) {
              merger.addStream(video.srcObject, {
                x: 150,
                y: 110,
                width: 960,
                height: 540,
                mute: false,
                draw: (ctx, frame, done) => {
                  // You can do whatever you want with this canvas context
                  let imgframe = document.getElementById("lv4");
                  let imgbg = document.getElementById("bgshow");

                  let imgrc = document.getElementById("recordimg");
                  ctx.drawImage(imgrc, 0, 0, 1280, 720);
                  ctx.globalAlpha = 1;
                  ctx.drawImage(imgbg, 0, 0, 1280, 720);
                  // ctx.drawImage(frame, 150, 110, 960, 540)
                  ctx.drawImage(frame, 32, 18, 1216, 684);

                  ctx.drawImage(imgframe, 0, 0, 1280, 720);
                  recordingOverlayFunction(ctx);
                  done();
                }, // we
              });
            } else {
              merger.addStream(video.srcObject, {
                x: 150,
                y: 110,
                width: 960,
                height: 540,
                mute: false,
                draw: (ctx, frame, done) => {
                  // You can do whatever you want with this canvas context
                  let imgframe = document.getElementById("lv4");
                  let imgbg = document.getElementById("bgshow");

                  let imgrc = document.getElementById("recordimg");
                  ctx.drawImage(imgrc, 0, 0, 1280, 720);
                  ctx.globalAlpha = 1;
                  ctx.drawImage(imgbg, 0, 0, 1280, 720);
                  // ctx.drawImage(frame, 150, 110, 960, 540)
                  ctx.drawImage(frame, 32, 18, 1216, 684);

                  ctx.drawImage(imgframe, 0, 0, 1280, 720);
                  done();
                }, // we
              });
            }
          } else if (hostsolo.style.backgroundColor == "red") {
            hostsolo.style.backgroundColor = "grey";
            this.socket.emit("youarenowinrecnofull", {
              room: room,
              userid: userid,
              myarray: myarray,
            });

            if (
              document.getElementById(userid).style.border == "6px solid red"
            ) {
              document.getElementById(userid).style.border = "3px solid red";
            }

            merger.removeStream(video.srcObject);
            if (arrayforvideo.length == 2) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l2rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      let imgbg = document.getElementById("bgshow");
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;

                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we d
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 640,
                    y: 203,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l2rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l2rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 648, 189, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 3) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l3rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l3rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l3rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l3rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 336, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 4) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);

                      done();
                    }, // we
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l4rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");
                      let imgbg = document.getElementById("bgshow");
                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 24, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l4rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 12, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l4rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 24, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 0,
                    y: 10,
                    width: 640,
                    height: 360,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l4rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l4rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      // ctx.drawImage(imgrc, 0, 0, 1280, 720)

                      ctx.globalAlpha = 1;

                      ctx.drawImage(frame, 648, 366, 608, 342);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
              }
            } else if (arrayforvideo.length == 5) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l5rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l5rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l5rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 88, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l5rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l5rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l5rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 338, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 6) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l6rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );

                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l6rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l6rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 122, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 230,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l6rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l6rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 615,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l6rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l6rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 370, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 7) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");
                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgrc = document.getElementById("recordimg");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l7rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l7rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l7rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l7rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l7rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l7rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l7rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l7rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 8) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  arrayforvideo[0],
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l8rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);

                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[1],
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l8rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[2],
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l8rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[3],
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l8rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[4],
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l8rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[5],
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l8rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[6],
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l8rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 218, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  arrayforvideo[7],
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l8rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l8rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 639, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            } else if (arrayforvideo.length == 9) {
              if (document.getElementById("recordingTextInput")) {
                merger.addMediaElement(
                  "l9rs0",
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs1",
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs2",
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs3",
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs4",
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs5",
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs6",
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs7",
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs8",
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      recordingOverlayFunction(ctx);
                      done();
                    },
                  }
                );
              } else {
                merger.addMediaElement(
                  "l9rs0",
                  document.getElementById(arrayforvideo[0]),
                  {
                    x: 60,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs0 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[0]).srcObject
                      );
                      l9rs0.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");
                      let imgbg = document.getElementById("bgshow");

                      let imgrc = document.getElementById("recordimg");

                      ctx.drawImage(imgrc, 0, 0, 1280, 720);

                      ctx.globalAlpha = 1;
                      ctx.drawImage(imgbg, 0, 0, 1280, 720);
                      ctx.drawImage(frame, 15, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs1",
                  document.getElementById(arrayforvideo[1]),
                  {
                    x: 440,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs1 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[1]).srcObject
                      );
                      l9rs1.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    }, // we
                  }
                );
                merger.addMediaElement(
                  "l9rs2",
                  document.getElementById(arrayforvideo[2]),
                  {
                    x: 820,
                    y: 120,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs2 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[2]).srcObject
                      );
                      l9rs2.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 9, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs3",
                  document.getElementById(arrayforvideo[3]),
                  {
                    x: 60,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs3 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[3]).srcObject
                      );
                      l9rs3.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs4",
                  document.getElementById(arrayforvideo[4]),
                  {
                    x: 440,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs4 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[4]).srcObject
                      );
                      l9rs4.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs5",
                  document.getElementById(arrayforvideo[5]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs5 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[5]).srcObject
                      );
                      l9rs5.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 246, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs6",
                  document.getElementById(arrayforvideo[6]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs6 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[6]).srcObject
                      );
                      l9rs6.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 15, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs7",
                  document.getElementById(arrayforvideo[7]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs7 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[7]).srcObject
                      );
                      l9rs7.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 436, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
                merger.addMediaElement(
                  "l9rs8",
                  document.getElementById(arrayforvideo[8]),
                  {
                    x: 820,
                    y: 350,
                    width: 380,
                    height: 210,
                    mute: true,
                    audioEffect: (sourceNode, destinationNode) => {
                      let l9rs8 = audio_context.createMediaStreamSource(
                        document.getElementById(arrayforvideo[8]).srcObject
                      );
                      l9rs8.connect(destinationNode);
                    },
                    draw: (ctx, frame, done) => {
                      // You can do whatever you want with this canvas context
                      let imgframe = document.getElementById("lv4");

                      ctx.globalAlpha = 1;
                      ctx.drawImage(frame, 857, 483, 406, 228);

                      ctx.drawImage(imgframe, 0, 0, 1280, 720);
                      done();
                    },
                  }
                );
              }
            }
          }
        }
      };
      //make an host in recording solo, function ends

      //recording overlay function starts
      const recordingOverlayFunction = (ctx) => {
        let imgSideOverlay = document.getElementById("imgSideOverlay");
        let imgLowerSideOverlay = document.getElementById(
          "imgLowerSideOverlay"
        );
        let imgSocialOverlay = document.getElementById("socialOverlay");
        let imgHorizontalOverlay = document.getElementById(
          "imgHorizontalOverlay"
        );
        let liveLogo = document.getElementById("liveLogo");
        // let liveLogo2 = document.getElementById(
        //   "liveLogo2"
        // );
        // let liveLogo3 = document.getElementById(
        //   "liveLogo3"
        // );

        let imgrclogo = document.getElementById("logorecord");
        let recordingTextCanvas =
          document.getElementById("recordingTextInput").value;
        let recordingTextColorCanvas = document.getElementById(
          "recordingTextInputColor"
        ).value;
        let recordingTextColorCanvas2 = document.getElementById(
          "recordingTextInputColor2"
        ).value;
        let recordingTextColorCanvas3 = document.getElementById(
          "recordingTextInputColor3"
        ).value;
        let socialTextCanvas = document.getElementById("socialText1").value;
        let socialTextColor = document.getElementById("socialTextColor").value;

        let textWidth = 1200 - ctx.measureText(recordingTextCanvas).width;

        ctx.textBaseline = "top";

        ctx.globalAlpha = 0.8;
        ctx.drawImage(imgSocialOverlay, 40, 540, 400, 70);
        ctx.globalAlpha = 1;
        ctx.fillStyle = socialTextColor;
        ctx.font = "bold 20px Arial";
        ctx.fillText(socialTextCanvas, 110, 572);

        ctx.globalAlpha = 0.7;
        ctx.drawImage(imgHorizontalOverlay, 40, 650, 1200, 70);
        ctx.globalAlpha = 1;
        ctx.fillStyle = recordingTextColorCanvas;
        ctx.font = "bold 30px Arial";
        ctx.fillText(recordingTextCanvas, 65, 670);

        ctx.fillStyle = recordingTextColorCanvas2;
        ctx.globalAlpha = 0.7;
        ctx.drawImage(imgSideOverlay, 1040, 20, 200, 200);
        ctx.globalAlpha = 1;
        ctx.fillStyle = recordingTextColorCanvas3;
        ctx.globalAlpha = 0.7;
        ctx.drawImage(imgLowerSideOverlay, 1040, 472, 200, 100);
        ctx.globalAlpha = 1;
        ctx.globalAlpha = 0.7;
        ctx.drawImage(liveLogo, 10, 10, 150, 50);
        ctx.drawImage(imgrclogo, 1040, 580, 185, 80);
        ctx.globalAlpha = 1;

        const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
          var words = text.split(" "),
            line = "",
            lineCount = 0,
            i,
            test,
            metrics;

          for (i = 0; i < words.length; i++) {
            test = words[i];
            metrics = context.measureText(test);
            while (metrics.width > maxWidth) {
              // Determine how much of the word will fit
              test = test.substring(0, test.length - 1);
              metrics = context.measureText(test);
            }
            if (words[i] != test) {
              words.splice(i + 1, 0, words[i].substr(test.length));
              words[i] = test;
            }

            test = line + words[i] + " ";
            metrics = context.measureText(test);

            if (metrics.width > maxWidth && i > 0) {
              context.fillText(line, x, y);
              line = words[i] + " ";
              y += lineHeight;
              lineCount++;
            } else {
              line = test;
            }
          }

          context.fillText(line, x, y);
        };

        ctx.font = "bold 20px Arial";
        ctx.fillStyle = recordingTextColorCanvas2;

        wrapText(
          ctx,
          document.getElementById("recordingTextInput2").value,
          1075,
          40,
          155,
          27
        );

        ctx.font = "bold 20px Arial";
        ctx.fillStyle = recordingTextColorCanvas3;

        wrapText(
          ctx,
          document.getElementById("recordingTextInput3").value,
          1075,
          490,
          155,
          27
        );
      };
      //recording overlay function ends

      const greenscreenfun = (userid) => {
        if (document.getElementById(userid + "canvas")) {
          let c1, ctx1, c_tmp, ctx_tmp, video2, videoMine;

          function init() {
            videoMine = document.getElementById(userid);
            video2 = document.getElementById("gsshow");
            c1 = document.createElement("canvas");
            c1.id = userid + "canvas";
            document.getElementById(userid + "div").appendChild(c1);
            ctx1 = c1.getContext("2d");
            // c1.style.backgroundColor = "black";
            c_tmp = document.createElement("canvas");
            c_tmp.id = userid + "ctmp";
            c1.setAttribute(
              "width",
              document.getElementById(userid).offsetWidth
            );
            c1.setAttribute(
              "height",
              document.getElementById(userid).offsetHeight
            );
            c_tmp.setAttribute(
              "width",
              document.getElementById(userid).offsetWidth
            );
            c_tmp.setAttribute(
              "height",
              document.getElementById(userid).offsetHeight
            );
            ctx_tmp = c_tmp.getContext("2d");

            computeFrame();
            c1.style.position = "absolute";
            ctx_tmp.style.position = "absolute";

            c1.style.top = document.getElementById(userid).offsetTop + "px";
            c1.style.left = document.getElementById(userid).offsetLeft + "px";
          }
          function computeFrame() {
            document
              .getElementById(userid + "canvas")
              .setAttribute(
                "width",
                document.getElementById(userid).offsetWidth
              );
            document
              .getElementById(userid + "canvas")
              .setAttribute(
                "height",
                document.getElementById(userid).offsetHeight
              );

            document.getElementById(userid + "canvas").style.top =
              document.getElementById(userid).offsetTop + "px";
            document.getElementById(userid + "canvas").style.left =
              document.getElementById(userid).offsetLeft + "px";
            document.getElementById(userid + "canvas").style.width =
              document.getElementById(userid).offsetWidth + "px";
            document.getElementById(userid + "canvas").style.height =
              document.getElementById(userid).offsetHeight + "px";

            ctx_tmp.drawImage(
              videoMine,
              0,
              0,
              document.getElementById(userid + "div").offsetWidth,
              document.getElementById(userid + "div").offsetHeight
            );
            let frame = ctx_tmp.getImageData(
              0,
              0,
              document.getElementById(userid + "div").offsetWidth,
              document.getElementById(userid + "div").offsetHeight
            );

            ctx_tmp.drawImage(
              video2,
              0,
              0,
              document.getElementById(userid).offsetWidth,
              document.getElementById(userid).offsetHeight
            );
            let frame2 = ctx_tmp.getImageData(
              0,
              0,
              document.getElementById(userid).offsetWidth,
              document.getElementById(userid).offsetHeight
            );

            for (let i = 0; i < frame.data.length / 4; i++) {
              let r = frame.data[i * 4 + 0];
              let g = frame.data[i * 4 + 1];
              let b = frame.data[i * 4 + 2];
              if (r == 0 && g == 177 && b == 64) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              } else if (r == 0 && g == 71 && b == 187) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              } else if (g > 100 && r < 40) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              }

              ctx1.putImageData(frame, 0, 0);

              setTimeout(computeFrame, 0);
            }
            init();
          }
        }
      };

      //network-status

      setInterval(() => {
        var startTime, endTime;

        // The size in bytes
        var downloadSize = 182000;
        var img = new Image();

        if (navigator.onLine === false) {
          // snackBar.style.backgroundColor = "#EF4444";
          // snackBar.style.color = "#fff";
          // snackBar.innerHTML = "You Are Offline!";

          // title.innerHTML = "Please Check your Connection"
          // speedMbps.innerHTML = 0;
          // speedUnit.innerHTML = "Mbps";
          this.setState({
            networkSlow: false,
            networkFine: false,
            networkGood: false,
            offline: true,
          });
        }

        img.onload = () => {
          endTime = new Date().getTime();
          var loadTime = (endTime - startTime) / 1000;
          checkConnection(loadTime);
        };

        startTime = new Date().getTime();
        img.src = "https://bit.ly/3oZfxBr?" + startTime;

        const checkConnection = (seconds) => {
          var loadedBits = downloadSize * 8;

          var bps = (loadedBits / seconds).toFixed(2);
          var kbps = (bps / 1024).toFixed(2);
          var mbps = (kbps / 1024).toFixed(2);

          if (navigator.onLine) {
            // speedMbps.innerHTML = mbps;
            // speedUnit.innerHTML = "Mbps";

            // networkType.innerHTML = "Network Type: " + navigator.connection.effectiveType;

            if (seconds > 5) {
              // snackBar.style.backgroundColor = "#EF4444";
              // snackBar.innerHTML = "Your Internet Connection is too slow";
              this.setState({
                networkSlow: true,
                networkFine: false,
                networkGood: false,
                offline: false,
              });
            } else if (seconds > 3) {
              // snackBar.style.backgroundColor = "#FBBF24";
              // snackBar.innerHTML = "Your Internet Connection is bit slow";
              this.setState({
                networkSlow: false,
                networkFine: true,
                networkGood: false,
                offline: false,
              });
            } else {
              // snackBar.style.backgroundColor = "#10B981";
              // snackBar.innerHTML = "Your Internet Connection is stable";
              this.setState({
                networkSlow: false,
                networkFine: false,
                networkGood: true,
                offline: false,
              });
            }
          }
        };
      }, 1000);

      this.socket.on("closehisgreenscreen", (id) => {
        if (document.getElementById(id + "canvas")) {
          document.getElementById(id + "canvas").remove();
        }
      });

      this.socket.on("reqGreenScreen", (data) => {
        if (window.location.search.substr(4) == data.roomid) {
          if (window.innerWidth <= 800) {
            myarray.forEach((userid) => {
              document
                .getElementById(userid + "div")
                .classList.remove("centerdivvideo");
              document.getElementById(userid).style.width = "150px";
              document.getElementById(userid + "div").style.margin = "0";
            });

            var vidid = videoinputid.value;
            document.getElementById(vidid).style.width = "300px";
            document.getElementById(vidid).controls = true;
            document.getElementById(vidid + "div").style.marginLeft = "-29px";
          } else {
            myarray.forEach((userid) => {
              if (myarray.length == 1) {
                document.getElementById(userid).style.width = "800px";
                document.getElementById(userid + "div").style.marginLeft =
                  "200px";
                document.getElementById(userid + "div").style.marginTop =
                  "30px";
              } else if (myarray.length == 2) {
                document.getElementById(userid).style.width = "600px";
                document.getElementById(userid + "div").style.marginLeft =
                  "0px";
                document.getElementById(userid + "div").style.marginTop = "0px";
              } else if (myarray.length > 2 && myarray.length <= 6) {
                document.getElementById(userid).style.width = "400px";
                document.getElementById(userid + "div").style.marginLeft =
                  "0px";
                document.getElementById(userid + "div").style.marginTop = "0px";
              } else if (myarray.length > 6 && myarray.length <= 8) {
                document.getElementById(userid).style.width = "300px";
                document.getElementById(userid + "div").style.marginLeft =
                  "0px";
                document.getElementById(userid + "div").style.marginTop = "0px";
              } else if (myarray.length > 8 && myarray.length <= 10) {
                document.getElementById(userid).style.width = "240px";
                document.getElementById(userid + "div").style.marginLeft =
                  "0px";
                document.getElementById(userid + "div").style.marginTop = "0px";
              }
            });
            // var vidid = userid
          }
          let c1, ctx1, c_tmp, ctx_tmp, videoMine, video2;

          function init() {
            videoMine = document.getElementById(data.id);
            video2 = document.getElementById("gsshow");
            c1 = document.createElement("canvas");
            c1.id = data.id + "canvas";
            document.getElementById(data.id + "div").appendChild(c1);
            ctx1 = c1.getContext("2d");
            // c1.style.backgroundColor = "black";
            c_tmp = document.createElement("canvas");
            c_tmp.id = data.id + "ctmp";
            c1.style.position = "absolute";
            c1.setAttribute(
              "width",
              document.getElementById(data.id).style.width + "px"
            );
            c1.style.maxHeight =
              document.getElementById(data.id).style.width + "px";

            c1.setAttribute("top", document.getElementById(data.id).offsetTop);

            c1.setAttribute(
              "left",
              document.getElementById(data.id).offsetLeft - 180
            );
            c_tmp.setAttribute(
              "width",
              document.getElementById(data.id).offsetWidth
            );
            c_tmp.setAttribute(
              "height",
              document.getElementById(data.id).offsetHeight
            );
            ctx_tmp = c_tmp.getContext("2d");

            computeFrame();

            // c1.style.top = document.getElementById(data.id).offsetTop + "px";
            // c1.style.left = document.getElementById(data.id).offsetLeft + "px";
          }
          function computeFrame() {
            document
              .getElementById(data.id + "canvas")
              .setAttribute(
                "width",
                document.getElementById(data.id).offsetWidth
              );
            document
              .getElementById(data.id + "canvas")
              .setAttribute(
                "height",
                document.getElementById(data.id).offsetHeight
              );

            document.getElementById(data.id + "canvas").style.width =
              document.getElementById(data.id).offsetWidth + "px";
            document.getElementById(data.id + "canvas").style.height =
              document.getElementById(data.id).offsetHeight + "px";

            ctx_tmp.drawImage(
              videoMine,
              0,
              0,
              document.getElementById(data.id + "div").offsetWidth,
              document.getElementById(data.id + "div").offsetHeight
            );
            let frame = ctx_tmp.getImageData(
              0,
              0,
              document.getElementById(data.id + "div").offsetWidth,
              document.getElementById(data.id + "div").offsetHeight
            );
            ctx_tmp.drawImage(
              video2,
              0,
              0,
              document.getElementById(data.id).offsetWidth,
              document.getElementById(data.id).offsetHeight
            );
            let frame2 = ctx_tmp.getImageData(
              0,
              0,
              document.getElementById(data.id).offsetWidth,
              document.getElementById(data.id).offsetHeight
            );

            //   ctx_tmp.drawImage(video2, 0, 0, 400, 250);
            //   let frame2 = ctx_tmp.getImageData(0, 0, 400, 250);

            for (let i = 0; i < frame.data.length / 4; i++) {
              let r = frame.data[i * 4 + 0];
              let g = frame.data[i * 4 + 1];
              let b = frame.data[i * 4 + 2];

              if (r == 0 && g == 177 && b == 64) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              } else if (r == 0 && g == 71 && b == 187) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              } else if ((g > 100) & (r < 40)) {
                frame.data[i * 4 + 0] = frame2.data[i * 4 + 0];
                frame.data[i * 4 + 1] = frame2.data[i * 4 + 1];
                frame.data[i * 4 + 2] = frame2.data[i * 4 + 2];
              }
            }

            ctx1.putImageData(frame, 0, 0);

            setTimeout(computeFrame, 0);
          }
          init();
        }
      });

      // utilities

      const form = document.getElementById("send-container");
      const messageInput = document.getElementById("messageInp");
      const messageContainer = document.querySelector(".container");
      var textaudio = new Audio(audio);
      const append = (message, position) => {
        const messageElement = document.createElement("div");
        messageElement.innerText = message;
        messageElement.classList.add("message");
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      };
      // this.socket.on('connect', function () {
      //     // Connected, let's sign-up for to receive messages for this room
      //     this.socket.emit('room', room);

      // });

      if (this.props.location.state != undefined) {
        this.setState({
          type: this.props.location.state.room_code,
          meetingroomname: this.props.location.state.room_name,
          id: this.props.location.state.username,
          meetingperson: this.props.location.state.type,
          email: this.props.location.state.email,
          firstname: this.props.location.state.firstname,
          lastname: this.props.location.state.lastName,
        });

        this.viewfollowing(this.props.location.state.privatekey);
      } else {
        this.setState({
          type: window.location.href.substr(36),
          id: localStorage.getItem("user"),
          meetingperson: "client",
        });
      }

      this.setState({
        meetingid: this.props.location.search.substr(4),
      });

      this.socket.on("connection-success", (data) => {});

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`You:${message}`, "right");
        this.socket.emit("send", message);
        messageInput.value = "";
      });
      //chat messanger
      var room = window.location.search.substr(4);
      const nameofchatperson = this.props.location.state.firstname;
      var myverokey = this.props.location.state.privatekey;
      var isViaLink = this.props.location.state.isViaLink;

      this.socket.emit("roommine", room);

      this.socket.emit("new-user-joined", this.props.location.state.firstname);

      this.socket.on("user-joined", (name) => {
        // append(`${name} Joined the chat`, 'right')
      });

      this.socket.on("receive", (data) => {
        append(`${data.name}:${data.message}`, "left");

        if (
          document.getElementById("chaticon").style.backgroundColor != "yellow"
        ) {
          document.getElementById("chaticon").style.backgroundColor = "yellow";
          textaudio.play();
        }
      });

      this.socket.on("left", (name) => {
        // append(`${name} left the chat`, 'right')
      });

      //chat messanger

      this.socket.on("disconnect-to-specific-user", (data) => {
        const video = document.querySelector("video");

        const mediaStream = video.srcObject;

        const videoTracks = mediaStream.getVideoTracks();

        videoTracks.forEach((track) => (track.enabled = false));

        const AudioTracks = mediaStream.getAudioTracks();
        AudioTracks.forEach((track) => (track.enabled = false));
        this.socket.emit("removeme", this.state.attendees[0]);

        this.disconnect1();
      });

      //hand raise begins
      document.getElementById("raisehand").onclick = () => {
        if (document.getElementById("raisehand").style.color == "yellow") {
          document.getElementById("raisehand").style.color = "red";
          this.socket.emit("imraisinghand", {
            name: inputName.value,
            room: room,
          });
        } else {
          document.getElementById("raisehand").style.color = "yellow";
          this.socket.emit("imdowninghand", {
            name: inputName.value,
            room: room,
          });
        }
      };

      this.socket.on("heisraisinghand", (data) => {
        if (data.room == this.state.meetingid) {
          this.setState({
            handraisebox: data.name,
          });
        }
      });

      this.socket.on("heisdowninghand", (data) => {
        if (data.room == this.state.meetingid) {
          this.setState({
            handraisebox: "",
          });
        }
      });

      //hand raise ends

      this.socket.on("mute-mic-to-specific-user", (data) => {
        console.log("dlldldldldldld", data.data);
        const video = document.querySelector("video");
        const mediaStream = video.srcObject;
        const AudioTracks = mediaStream.getAudioTracks();
        AudioTracks.forEach((track) => (track.enabled = false));
        this.setState({
          mutemic: true,
        });
      });
      // ************************************* //
      // ************************************* //
      this.socket.on("peer-disconnected", (data) => {});

      this.socket.on("heisrecording", (room) => {
        if (room == this.state.meetingid) {
          this.setState({
            recordnotify: this.recordon,
          });
        }
      });
      this.socket.on("hestopedrecording", (data) => {
        if (data.room == this.state.meetingid) {
          this.setState({
            recordnotify: this.recordof,
          });
          data.myarray.forEach((e) => {
            if (document.getElementById(e).style.border == "3px solid red") {
              document.getElementById(e).style.border = "0px solid red";
            }
          });
        }
      });

      this.socket.on("youarehost", (data) => {
        if (this.state.meetingperson == "host") {
          this.setState({
            hostview: this.recordon,
          });

          this.socket.emit("hostwaslatethanyou", room);
        }

        // data.forEach(e => {
        //     if (e.room == this.state.meetingid) {
        //         if (this.state.meetingperson == 'host') {

        //             this.setState({
        //                 waiters: [...this.state.waiters, e.name],
        //             });
        //             this.socket.emit('hostinfo',{hostname:myuser,roomname:this.state.meetingroomname,room_code:room})

        //         }
        //     }
        //     });
      });

      this.socket.on("base64file", (data) => {
        var contentType = data.type;
        let chatarea = document.getElementById("chatcontainer");
        var getchatimagefull = document.getElementById("chatmediaimage");

        if (contentType == "image/png" || contentType == "image/jpeg") {
          async function imagedatatoblob() {
            let myimgefromdata = document.createElement("img");
            chatarea.appendChild(myimgefromdata);
            myimgefromdata.style.width = "200px";
            myimgefromdata.style.cursor = "pointer";
            let base64datafile = await fetch(data.file);
            let fileBlob = await base64datafile.blob();
            myimgefromdata.src = URL.createObjectURL(fileBlob);
            myimgefromdata.onclick = function () {
              if (getchatimagefull.src != data.file) {
                getchatimagefull.src = data.file;
              } else {
                getchatimagefull.src = "";
              }
            };
          }
          imagedatatoblob();
        } else {
          async function dataconvertoerotblob() {
            let base64datafile = await fetch(data.file);
            let fileBlob = await base64datafile.blob();
            let docsfile = document.createElement("a");
            chatarea.appendChild(docsfile);
            docsfile.innerHTML = data.fileName;
            docsfile.href = URL.createObjectURL(fileBlob);
            docsfile.download = data.fileName;
            docsfile.style.color = "black";
            docsfile.style.backgroundColor = "white";
            docsfile.style.borderRadius = "10px";
            docsfile.style.display = "block";
            docsfile.style.marginTop = "10px";
          }
          dataconvertoerotblob();
        }
      });

      this.socket.on("inreqtohost", (data) => {
        if (data.room == this.state.meetingid) {
          if (this.state.meetingperson == "host") {
            var found = false;

            for (var j = 0; j < this.state.attendees.length; j++) {
              if (this.state.attendees[j].veroKey == data.veroKey) {
                found = true;
                break;
              } else {
                console.log(this.state.attendees[j].veroKey);
              }
            }
            if (found == false) {
              if (!this.state.waiters.includes(data)) {
                this.setState({
                  waiters: [...this.state.waiters, data],
                });

                this.socket.emit("hostinfo", {
                  hostname: myuser,
                  roomname: this.state.meetingroomname,
                  room_code: room,
                });
              }
            } else {
              console.log("already exists, garbage value");
            }
          }
        }
      });

      // this.socket.on('register-this-user-data',data=>{
      //   if(this.state.meetingperson=="host"){
      //     console.log(data,'register-this-user-data')

      //     this.state.existingUsers.push(data)
      //   }
      // })

      this.socket.on("youareinrecbyhost", (data) => {
        if (data.room == this.state.meetingid) {
          // data.myarray.forEach(e => {
          //     if (document.getElementById(e).style.border == "3px solid red") {
          //         document.getElementById(e).style.border = "0px solid red"
          //     }
          // })
          if (data.userid) {
            document.getElementById(data.userid).style.border = "3px solid red";
          }
        }
      });
      this.socket.on("youareinrecbyhostfull", (data) => {
        if (data.room == this.state.meetingid) {
          data.myarray.forEach((e) => {
            if (document.getElementById(e).style.border == "6px solid red") {
              document.getElementById(e).style.border = "3px solid red";
            }
          });
          if (data.userid) {
            if (
              document.getElementById(data.userid).style.border ==
              "3px solid red"
            ) {
              document.getElementById(data.userid).style.border =
                "6px solid red";
            }
          }
        }
      });
      this.socket.on("youareinrecbyhostnofull", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.userid) {
            if (
              document.getElementById(data.userid).style.border ==
              "6px solid red"
            ) {
              document.getElementById(data.userid).style.border =
                "3px solid red";
            }
          }
        }
      });

      this.socket.on("openyourframe", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.workfun == 0) {
            this.pf0();
          } else if (data.workfun == 5001) {
            this.verolove1();
          } else if (data.workfun == 5002) {
            this.verolove2();
          } else if (data.workfun == 5003) {
            this.veroquestion();
          } else if (data.workfun == 5004) {
            this.verosmile();
          } else if (data.workfun == 5005) {
            this.verothinking();
          } else if (data.workfun == 5006) {
            this.verothumbsup();
          } else if (data.workfun == 1) {
            this.pf1();
          } else if (data.workfun == 2) {
            this.pf2();
          } else if (data.workfun == 3) {
            this.pf3();
          } else if (data.workfun == 4) {
            this.pf4();
          } else if (data.workfun == 5) {
            this.pf5();
          } else if (data.workfun == 6) {
            this.pf6();
          } else if (data.workfun == 7) {
            this.pf7();
          } else if (data.workfun == 8) {
            this.pf8();
          } else if (data.workfun == 9) {
            this.pf9();
          } else if (data.workfun == 10) {
            this.pf10();
          } else if (data.workfun == 11) {
            this.pf11();
          } else if (data.workfun == 12) {
            this.pbg();
          } else if (data.workfun == 13) {
            this.pbg1();
          } else if (data.workfun == 14) {
            this.pbg2();
          } else if (data.workfun == 15) {
            this.pbg3();
          } else if (data.workfun == 16) {
            this.pbg4();
          } else if (data.workfun == 1001) {
            this.jcm1();
          } else if (data.workfun == 1002) {
            this.kjk1();
          } else if (data.workfun == 1003) {
            this.cpalmer1();
          }
          // else if (data.workfun == 1004) {
          //   this.kjkulaga1();
          // }
          else if (data.workfun == 2001) {
            this.flv1();
          } else if (data.workfun == 2002) {
            this.flv2();
          } else if (data.workfun == 2003) {
            this.flv3();
          } else if (data.workfun == 2004) {
            this.flv5();
          } else if (data.workfun == 2005) {
            this.flv6();
          } else if (data.workfun == 2006) {
            this.cvmns();
          } else if (data.workfun == 2007) {
            this.cvph();
          } else if (data.workfun == 2008) {
            this.cvucw();
          } else if (data.workfun == 2009) {
            this.nitro1();
          } else if (data.workfun == 2010) {
            this.nitro2();
          } else if (data.workfun == 2011) {
            this.nitro3();
          } else if (data.workfun == 2012) {
            this.cv4();
          } else if (data.workfun == 2013) {
            this.cv5();
          } else if (data.workfun == 2014) {
            this.cv6();
          } else if (data.workfun == 2015) {
            this.cv7();
          } else if (data.workfun == 2016) {
            this.cvmh();
          } else if (data.workfun == 2017) {
            this.cvfga();
          } else if (data.workfun == 2018) {
            this.cvucwb();
          } else if (data.workfun == 2019) {
            this.cvmns2();
          } else if (data.workfun == 2020) {
            this.cvphgp();
          } else if (data.workfun == 2021) {
            this.powerhour();
          } else if (data.workfun == 2022) {
            this.flv7();
          } else if (data.workfun == 2023) {
            this.flv8();
          } else if (data.workfun == 2024) {
            this.flv9();
          } else if (data.workfun == 2025) {
            this.flv10();
          } else if (data.workfun == 2026) {
            this.flv11();
          } else if (data.workfun == 2027) {
            this.flv12();
          } else if (data.workfun == 2029) {
            this.flv13();
          } else if (data.workfun == 2028) {
            this.lvph();
          } else if (data.workfun == 2030) {
            this.BJPBG1();
          } else if (data.workfun == 2031) {
            this.BJPBG2();
          } else if (data.workfun == 2032) {
            this.BJPBG3();
          } else if (data.workfun == 2033) {
            this.BJPF1();
          } else if (data.workfun == 2034) {
            this.BJPF2();
          } else if (data.workfun == 7001) {
            this.gsbg1();
          } else if (data.workfun == 7002) {
            this.gsbg2();
          } else if (data.workfun == 7003) {
            this.gsbg3();
          } else if (data.workfun == 7004) {
            this.gsbg4();
          } else if (data.workfun == 7005) {
            this.gsbg5();
          } else if (data.workfun == 7006) {
            this.gsbg6();
          } else if (data.workfun == 7007) {
            this.gsbg7();
          } else if (data.workfun == 7008) {
            this.gsbg8();
          } else if (data.workfun == 7009) {
            this.gsbg9();
          } else if (data.workfun == 7010) {
            this.gsbg10();
          } else if (data.workfun == 7011) {
            this.gsbg11();
          } else if (data.workfun == 7012) {
            this.gsbg12();
          } else if (data.workfun == 7013) {
            this.gsbg13();
          } else if (data.workfun == 7014) {
            this.ogs1();
          } else if (data.workfun == 7015) {
            this.ogs2();
          } else if (data.workfun == 7016) {
            this.ogs3();
          } else if (data.workfun == 7017) {
            this.ogs4();
          } else if (data.workfun == 7018) {
            this.ogs5();
          }
        }
      });

      this.socket.on("hostremovedyou", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.veroKey == myverokey) {
            hangupbtn.click();
          }
        }
      });
      this.socket.on("hostremovedhim", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.veroKey == myverokey) {
            hangupbtn.click();
          }

          myarray.forEach((e) => {
            if (document.getElementById(e + "name")) {
              if (document.getElementById(e + "name").innerText == data.name) {
                if (document.getElementById(e + "div")) {
                  document.getElementById(e + "div").remove();
                  myarray.splice(myarray.indexOf(e), 1);

                  if (window.innerWidth <= 800) {
                    myarray.forEach((userid) => {
                      document.getElementById(userid).style.width = "80vw";
                      document.getElementById("bigtvvideo").style.display =
                        "none";
                      // divMeetingRoom.style.overflowY = "scroll";
                      divMeetingRoom.style.maxHeight = "85vh";
                      divMeetingRoom.style.left = "5px";
                    });
                  } else {
                    myarray.forEach((userid) => {
                      if (myarray.length == 1) {
                        document.getElementById(userid).style.width = "200px";
                        document.getElementById(userid).style.maxHeight =
                          "113px";
                        document.getElementById(userid).style.maxWidth = "80vw";
                      } else if (myarray.length == 2) {
                        document.getElementById(userid).style.width = "200px";
                        document.getElementById(userid).style.maxHeight =
                          "113px";
                        document.getElementById(userid).style.maxWidth = "80vw";
                      } else if (myarray.length > 2 && myarray.length <= 4) {
                        document.getElementById(userid).style.width = "200px";
                        document.getElementById(userid).style.maxHeight =
                          "113px";
                        document.getElementById(userid).style.maxWidth = "80vw";
                      } else if (myarray.length > 4) {
                        document.getElementById(userid).style.width = "200px";
                        document.getElementById(userid).style.maxHeight =
                          "113px";
                        document.getElementById(userid).style.maxWidth = "80vw";
                      }
                    });
                  }
                }
              }
            }
          });
        }
      });

      this.socket.on("hostcamoffyou", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.veroKey == myverokey) {
            videomute.click();
          }
        }
      });

      this.socket.on("hostmuteyou", (data) => {
        if (data.room == this.state.meetingid) {
          if (data.veroKey == myverokey) {
            audiomute.click();
          }
        }
      });

      // this.socket.on("addmeasattendeee", (data) => {
      //   if (data.room == this.state.meetingid) {
      //     if (this.state.meetingperson == "host") {
      //       this.setState({
      //         attendees: [...this.state.attendees, data],
      //       });

      //       guestname = data.name;
      //       guestCompany = data.company;
      //       guestTwitter = "no.com";
      //     }
      //   }
      // });

      this.socket.on("close-the-room-for-all", (roomid) => {
        if (this.state.meetingid == roomid) {
          document.getElementById("hangupbtn").click();
        }
      });

      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );

      let recording = document.getElementById("recording");
      let startButton = document.getElementById("recordBtn");
      let stopButton = document.getElementById("stopButton");
      let downloadButton = document.getElementById("downloadButton");
      let logElement = document.getElementById("log");

      let recordingTimeMS = 3 * 600000;
      var stopcount = 0;

      function log(msg) {
        //logElement.innerHTML += msg + "\n";
      }

      function wait(delayInMS) {
        return new Promise((resolve) => setTimeout(resolve, delayInMS));
      }

      const startRecording = (stream, lengthInMS) => {
        let recorder = new MediaRecorder(stream);
        let data = [];

        recorder.ondataavailable = (event) => data.push(event.data);
        recorder.start();
        log(recorder.state + " for " + lengthInMS / 1000 + " seconds...");

        stopButton.addEventListener(
          "click",
          () => {
            document.getElementById("hostrecordred").style.display = "none";
            document.getElementById("downloadButton").style.display = "block";
            document.getElementById("recordBtn").style.color = "white";
            document.getElementById("countdown").innerHTML = "";

            myarray.forEach((userid) => {
              if (
                document.getElementById("buttonmerec" + userid).style
                  .backgroundColor == "red"
              ) {
                document.getElementById(
                  "buttonmerec" + userid
                ).style.backgroundColor = "grey";
              }

              if (
                document.getElementById(userid).style.border == "3px solid red"
              ) {
                document.getElementById(userid).style.border = "0px solid red";
              } else if (
                document.getElementById(userid).style.border ==
                "3px solid yellow"
              ) {
                document.getElementById(userid).style.border =
                  "0px solid yellow";
              }
            });

            // if (document.getElementById('fullbtn').style.display == "block") {
            //     document.getElementById('fullbtn').style.display = "none"
            // } else if (document.getElementById('fullbtnoff').style.display == "block") {
            //     document.getElementById('fullbtnoff').style.display = "none"
            // }

            // if (document.getElementById('HostSidebysidebtn').style.display == "block") {
            //     document.getElementById('HostSidebysidebtn').style.display = "none"
            // } else if (document.getElementById('Hostfullbtn').style.display == "block") {
            //     document.getElementById('Hostfullbtn').style.display = "none"
            // }

            this.socket.emit("stopedrecording", {
              room: room,
              myarray: myarray,
            });
            recorder.stop();

            arrayforvideo.forEach((e) => {
              merger.removeStream(arrayforvideo[arrayforvideo.indexOf(e)]);
            });
            var j;
            for (j = 0; j < arrayforvideo.length; j++) {
              arrayforvideo.splice(arrayforvideo[j], 1);
            }

            if (document.getElementById("show-rec-stream")) {
              document.getElementById("showRecBtn").style.color = "yellow";
              document.getElementById("show-rec-stream").remove();
            }
          },
          false
        );

        let stopped = new Promise((resolve, reject) => {
          recorder.onstop = resolve;
          recorder.onerror = (event) => reject(event.name);
        });
        let killrecord = new Promise((resolve, reject) => {
          stopButton.onclick = resolve;
          recorder.onerror = (event) => reject(event.name);
        });

        return Promise.all([stopped, killrecord]).then(() => data);
      };

      function stop(stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      startButton.addEventListener(
        "click",
        () => {
          document.getElementById("hostrecordred").style.display = "block";
          document.getElementById("recordBtn").style.color = "green";
          document.getElementById("stopbtnrecord").style.display = "block";
          // document.getElementById('TextOverlay').style.display = "block";

          var m;

          if (arrayforvideo.length >= 2) {
            for (m = 1; m < arrayforvideo.length; m++) {
              arrayforvideo.splice(arrayforvideo[m], 1);
            }
          }

          this.socket.emit("imrecording", room);

          merger.addStream("startingrecframe", {
            x: 60, // position of the topleft corner
            y: 40,
            width: 580,
            height: 320,
            mute: false,
            draw: (ctx, frame, done) => {
              // You can do whatever you want with this canvas context

              let imgrc = document.getElementById("logorecord");
              let blackbgs = document.getElementById("blackbg");
              ctx.globalAlpha = 1;
              ctx.drawImage(blackbgs, 0, 0, 1280, 720);
              ctx.drawImage(imgrc, 320, 150, 640, 480);

              done();
            },
            // we don't want sound from the screen (if there is any)
          });

          function autoTimer() {
            setTimeout(() => {
              merger.removeStream("startingrecframe");
              if (document.getElementById(myarray[0] + "canvas")) {
                merger.addStream(arrayforvideo[0], {
                  x: 60, // position of the topleft corner
                  y: 40,
                  width: 580,
                  height: 320,
                  mute: false,
                  draw: (ctx, frame, done) => {
                    // You can do whatever you want with this canvas context
                    let gsbgme = document.getElementById(myarray[0] + "canvas");
                    let imgrclogo = document.getElementById("logorecord");
                    let liveLogo = document.getElementById("liveLogo");
                    let imgframe = document.getElementById("lv4");
                    let imgbggreenscreen = document.getElementById("gsshow");

                    let imgrc = document.getElementById("recordimg");
                    let imgbg = document.getElementById("bgshow");
                    ctx.drawImage(imgrc, 0, 0, 1280, 720);
                    ctx.drawImage(imgbg, 0, 0, 1280, 720);
                    ctx.drawImage(frame, 160, 90, 960, 540);
                    ctx.drawImage(imgbggreenscreen, 0, 0, 1280, 715);
                    ctx.drawImage(gsbgme, 0, 0, 1280, 720);
                    ctx.drawImage(imgframe, 0, 0, 1280, 720);
                    ctx.globalAlpha = 0.9;
                    ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                    ctx.globalAlpha = 1;

                    done();
                  },
                  // we don't want sound from the screen (if there is any)
                });
              } else {
                if (document.getElementById("recordingTextInput")) {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60, // position of the topleft corner
                      y: 40,
                      width: 580,
                      height: 320,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        rs0.connect(destinationNode);
                      },

                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context
                        let imgrclogo = document.getElementById("logorecord");
                        let liveLogo = document.getElementById("liveLogo");
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");
                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);
                        ctx.globalAlpha = 1;

                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 160, 90, 960, 540);
                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        ctx.globalAlpha = 0.9;
                        ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                        ctx.globalAlpha = 1;
                        recordingOverlayFunction(ctx);

                        done();
                      },
                      // we don't want sound from the screen (if there is any)
                    }
                  );
                } else {
                  merger.addMediaElement(
                    arrayforvideo[0],
                    document.getElementById(arrayforvideo[0]),
                    {
                      x: 60, // position of the topleft corner
                      y: 40,
                      width: 580,
                      height: 320,
                      mute: true,
                      audioEffect: (sourceNode, destinationNode) => {
                        let rs0 = audio_context.createMediaStreamSource(
                          document.getElementById(arrayforvideo[0]).srcObject
                        );
                        rs0.connect(destinationNode);
                      },

                      draw: (ctx, frame, done) => {
                        // You can do whatever you want with this canvas context

                        let imgrclogo = document.getElementById("logorecord");
                        let liveLogo = document.getElementById("liveLogo");
                        let imgframe = document.getElementById("lv4");
                        let imgbg = document.getElementById("bgshow");
                        let imgrc = document.getElementById("recordimg");

                        ctx.drawImage(imgrc, 0, 0, 1280, 720);
                        ctx.globalAlpha = 1;

                        ctx.drawImage(imgbg, 0, 0, 1280, 720);
                        ctx.drawImage(frame, 160, 90, 960, 540);
                        ctx.drawImage(imgframe, 0, 0, 1280, 720);
                        ctx.globalAlpha = 0.9;
                        ctx.drawImage(imgrclogo, 1040, 580, 185, 80);

                        ctx.globalAlpha = 1;
                        done();
                      },
                      // we don't want sound from the screen (if there is any)
                    }
                  );
                }
              }
            }, 3000);
          }
          autoTimer();

          var timeleft = 3;
          function displaycountdown() {
            var downloadTimer = setInterval(function () {
              if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("countdown").style.color = "red";
                document.getElementById("countdown").style.fontWeight = "bold";
                document.getElementById("countdown").style.fontSize = "40px";
                document.getElementById("countdown").style.position =
                  "absolute";
                document.getElementById("countdown").style.left = "40vw";
                document.getElementById("countdown").innerHTML = "LIVE";
              } else {
                document.getElementById("countdown").style.color = "red";
                document.getElementById("countdown").style.fontWeight = "bold";
                document.getElementById("countdown").style.fontSize = "140px";
                document.getElementById("countdown").style.position =
                  "absolute";
                document.getElementById("countdown").style.left = "40vw";
                document.getElementById("countdown").innerHTML = timeleft;
              }
              timeleft -= 1;
            }, 1000);
          }
          displaycountdown();

          merger.setOutputSize(1280, 720);
          merger.start();

          // We now have a merged MediaStream!
          if (merger.result) {
            startRecording(merger.result, recordingTimeMS)
              .then((recordedChunks) => {
                let recordedBlob = new Blob(recordedChunks, {
                  mimeType: "video/webm",
                });
                recording.src = URL.createObjectURL(recordedBlob);
                downloadButton.href = recording.src;
                downloadButton.title = room + ".webm";
                downloadButton.download = room + ".webm";

                log(
                  "Successfully recorded " +
                    recordedBlob.size +
                    " bytes of " +
                    recordedBlob.type +
                    " media."
                );
              })
              .catch(log);
          }
        },
        false
      );

      document.getElementById("showRecBtn").onclick = () => {
        if (merger.result) {
          if (document.getElementById("showRecBtn").style.color == "yellow") {
            document.getElementById("showRecBtn").style.color = "green";
            let showrecvideo = document.createElement("video");
            showrecvideo.id = "show-rec-stream";
            divMeetingRoom.appendChild(showrecvideo);
            showrecvideo.style.display = "block";
            showrecvideo.style.position = "absolute";
            showrecvideo.style.top = "60vh";
            showrecvideo.style.left = "0";
            showrecvideo.style.width = "35vw";
            showrecvideo.style.backgroundColor = "black";
            showrecvideo.srcObject = merger.result;
            showrecvideo.autoplay = true;
            showrecvideo.controls = false;
            showrecvideo.style.zIndex = "99999999";
            showrecvideo.style.cursor = "pointer";
            dragElement(showrecvideo);
          } else if (
            document.getElementById("showRecBtn").style.color == "green"
          ) {
            document.getElementById("showRecBtn").style.color = "yellow";
            document.getElementById("show-rec-stream").remove();
          }
        }
      };

      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id + "header").onmousedown =
            dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }

      // document.getElementById('textoverlaybtn').onclick = function () {
      //     if (document.getElementById("TextOverlay").style.opacity == 1) {
      //         document.getElementById("TextOverlay").style.opacity = 0.5

      //         if (guestCompany == null) {
      //             guestCompany = ""
      //             merger.addStream(arrayforvideo[0], {
      //                 x: 60,
      //                 y: 135,
      //                 width: 580,
      //                 height: 360,
      //                 mute: false,
      //                 draw: (ctx, frame, done) => {
      //                     // You can do whatever you want with this canvas context
      //                     ctx.drawImage(frame, 60, 135, 580, 360)
      //                     var text = guestname + "    " + guestCompany;
      //                     var textwidth = ctx.measureText(text).width + 10;
      //                     var rectwidth = 1220 - textwidth;
      //                     ctx.globalAlpha = 0.6
      //                     ctx.fillStyle = "green"
      //                     ctx.fillRect(rectwidth, 460, textwidth, 30);
      //                     ctx.globalAlpha = 1
      //                     ctx.fillStyle = "white"
      //                     ctx.font = "20pt calibri";
      //                     ctx.fillText(text, rectwidth, 480)

      //                     done()
      //                 } // we d
      //             })
      //         }
      //         else {
      //             merger.addStream(arrayforvideo[0], {
      //                 x: 60,
      //                 y: 135,
      //                 width: 580,
      //                 height: 360,
      //                 mute: false,
      //                 draw: (ctx, frame, done) => {
      //                     // You can do whatever you want with this canvas context
      //                     ctx.drawImage(frame, 60, 135, 580, 360)
      //                     var text = guestname + "    " + guestCompany;
      //                     var textwidth = ctx.measureText(text).width + 20;
      //                     var rectwidth = 1220 - textwidth;
      //                     ctx.globalAlpha = 0.6
      //                     ctx.fillStyle = "green"
      //                     ctx.fillRect(rectwidth, 460, textwidth, 30);
      //                     ctx.globalAlpha = 1
      //                     ctx.fillStyle = "white"
      //                     ctx.font = "20pt calibri";
      //                     ctx.fillText(text, rectwidth, 480)

      //                     done()
      //                 } // we d
      //             })

      //         }
      //     } else {
      //         console.log('already pressed')
      //     }

      // }
      this.socket.on("informuseraboutgs", (data) => {
        if (data.roomid == room) {
          if (document.getElementById(myarray[0] + "canvas")) {
            this.socket.emit("greenscreenforme", {
              id: myarray[0],
              roomid: room,
            });
            this.socket.emit("showframestouser", {
              workfun: this.state.gsworkfunforuser,
              room: this.state.meetingid,
            });
          }
        }
      });

      const RemovingHangPerson = (id) => {
        if (!document.getElementById(id + "div")) {
          if (this.state.meetingperson == "host") {
            var arrayforsmoothentryinroomCleaner = this.state.waiters.find(
              (user) => user.id == id
            );

            if (arrayforsmoothentryinroomCleaner) {
              this.setState({
                waiters: this.state.waiters.filter(
                  (waiter) => waiter !== arrayforsmoothentryinroomCleaner
                ),
              });
            }
          }
        }
      };

      this.socket.on("removeHim", (element) => {
        if (document.getElementById(element.id + "div")) {
          var attendeelistRemovableUser = this.state.attendees.find(
            (user) => user.veroKey == element.veroKey
          );

          this.setState({
            attendees: this.state.attendees.filter(
              (Attendeeslist) => Attendeeslist !== attendeelistRemovableUser
            ),
          });

          if (
            this.state.meetingperson == "host" &&
            document.getElementById("buttonmerec" + element.id).style
              .backgroundColor == "red"
          ) {
            document.getElementById("buttonmerec" + element.id).click();
          }

          document.getElementById(element.id + "div").remove();

          myarray.splice(myarray.indexOf(element.id), 1);

          if (window.innerWidth <= 800) {
            myarray.forEach((userid) => {
              document.getElementById(userid).style.width = "80vw";
              // document.getElementById("bigtvvideo").style.display = "none";
              // divMeetingRoom.style.overflowY = "scroll";
              divMeetingRoom.style.maxHeight = "85vh";
              divMeetingRoom.style.left = "5px";
            });
          } else {
            myarray.forEach((userid) => {
              if (myarray.length == 1) {
                document.getElementById(userid).style.width = "200px";
                document.getElementById(userid).style.maxHeight = "113px";
                document.getElementById(userid).style.maxWidth = "80vw";
              } else if (myarray.length == 2) {
                document.getElementById(userid).style.width = "200px";
                document.getElementById(userid).style.maxHeight = "113px";
                document.getElementById(userid).style.maxWidth = "80vw";
              } else if (myarray.length > 2 && myarray.length <= 4) {
                document.getElementById(userid).style.width = "200px";
                document.getElementById(userid).style.maxHeight = "113px";
                document.getElementById(userid).style.maxWidth = "80vw";
              } else if (myarray.length > 4) {
                document.getElementById(userid).style.width = "200px";
                document.getElementById(userid).style.maxHeight = "113px";
                document.getElementById(userid).style.maxWidth = "80vw";
              }
            });
          }
        }
      });

      window.onbeforeunload = () => {
        this.socket.emit("removeme", this.state.attendees[0]);
        this.setState({ closeThisPage: true });
        window.setTimeout(() => {
          this.props.history.push("/error");
        }, 0);
        //  window.setTimeout(()=> {
        //   this.props.history.push("/error");
        // },1000);
        window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
      };
    }
  };

  // lv shows
  infohostjoin = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox: (
        <div>
          1) The functions on the footer below are as follows: <br></br>{" "}
          <br></br>
          a) File Share Icon: This allows files to be shared with other
          attendees in the room, soon DocuMega documents will be able to be
          shared within a Vero Meeting
          <br></br> <br></br> b) Whiteboard Icon: This allows the host to create
          a virtual whiteboard that allows photos or files to be inserted and
          tools to be used to edit them in real time with other attendees. Its a
          feature that is in Beta mode in order to enhance the feature shortly.
          <br></br> <br></br> c) Screen Share Icon: This allows for screen
          sharing while in a Vero Meeting
          <br></br> <br></br> d) Invitation Icon: This allows for others to be
          invited to the meeting by the Host using their existing Vero contacts
          or using an email address to invite the other attendees.
          <br></br> <br></br> e) Group Chat Icon: This allows for real time
          chatting within the Vero Meeting.
          <br></br> <br></br> e) Group Chat Icon: This allows for real time
          chatting within the Vero Meeting.
          <br></br> <br></br> f) Waiting List/Attendee List Icon: This is where
          you will find the waiting list of attendees that a Host can choose to
          allow into the Vero Meeting and the list of all attendees in the Vero
          Meeting.
          <br></br> <br></br> g) Audio Mute Icon: This allows the Host to Mute
          and Umute their audio.
          <br></br> <br></br>h) Video Mute Icon: This allows the Host to Mute
          and Unmute their video
          <br></br> <br></br>I) Disconnect Icon: This red phone allows the Host
          to end the Vero Meeting at any time but be aware once a Vero Meeting
          is ended by a host then that room is permanently closed and cannot be
          reopened. To continue the existing meeting a new room must be created
          and the attendees must again be invited to attend.
        </div>
      ),
    });
  };

  infoattendeejoin = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox: (
        <div>
          1) The functions on the footer below are as follows: <br></br>
          <br></br>
          <br></br>
          <br></br>a) File Share Icon: This allows files to be shared with other
          attendees in the room, soon DocuMega documents will be able to be
          shared within a Vero Meeting
          <br></br>
          <br></br>b) Whiteboard Icon: This allows the attendee to create a
          virtual whiteboard when the Hosts allows it, that allows photos or
          files to be inserted and tools to be used to edit them in real time
          with other attendees. Its a feature that is in Beta mode in order to
          enhance the feature shortly.
          <br></br>
          <br></br>c) Screen Share Icon: This allows for screen sharing while in
          a Vero Meeting when the Hosts allows it.
          <br></br>
          <br></br>d) Invitation Icon: Attendees cannot send invitations, but
          this icon allows for others to be invited to the meeting by the Host
          using their existing Vero contacts or using an email address to invite
          the other attendees.
          <br></br>
          <br></br>e) Group Chat Icon: This allows for real time chatting within
          the Vero Meeting.
          <br></br>
          <br></br>f) Waiting List/Attendee List Icon: This is where you will
          find the waiting list of attendees that a Host can choose to allow
          into the Vero Meeting and the list of all attendees in the Vero
          Meeting.
          <br></br>
          <br></br>g) Audio Mute Icon: This allows the Attendee to Mute and
          Umute their audio.
          <br></br>
          <br></br>h) Video Mute Icon: This allows the Attendee to Mute and
          Unmute their video
          <br></br>
          <br></br>I) Disconnect Icon: This red phone allows the Attendee to
          leave the Vero Meeting at any time but be aware once you exit then the
          Host will have to allow you back in should you attempt to come back in
          the room.
          <br></br>
          <br></br>Attendees do not have the ability to record Vero Meetings,
          only Host have access to that function
        </div>
      ),
    });
  };

  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      [field]: value.trim(),
    });
  };

  recordinfo = () => {
    this.setState({
      infoboxcontainer: "showme",
      infobox: (
        <div>
          The functions of the recording panel are below:<br></br>
          <br></br>
          a) White Circle Icon: This is where you start your recording ,
          clicking it will open up the recording options to Start Recording
          (green button) and Stop Recording (red button), when the recording
          begins there will be a visual countdown from 3, 2, 1 then the
          recording begins. When the recording is stopped there will be a blue
          cloud download button, click this to download your recording so that
          you can save it or distribute it as you wish, its yours, you own it
          outright.{" "}
        </div>
      ),
    });
  };

  verolove1 = () => {
    this.setState({
      emojis: verolove1,
    });

    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };
  verolove2 = () => {
    this.setState({
      emojis: verolove2,
    });
    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };
  veroquestion = () => {
    this.setState({
      emojis: veroquestion,
    });

    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };
  verosmile = () => {
    this.setState({
      emojis: verosmile,
    });

    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };
  verothinking = () => {
    this.setState({
      emojis: verothinking,
    });

    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };
  verothumbsup = () => {
    this.setState({
      emojis: verothumbsup,
    });

    setTimeout(() => {
      this.setState({
        emojis: "",
      });
    }, 2000);
  };

  makeframesvisible = () => {
    this.setState({
      publicframesforrecording: "showme",
    });
  };

  makepersonalframesvisible = () => {
    if (
      this.props.location.state.privatekey == 59124145102 ||
      this.props.location.state.privatekey == 9897120391
    ) {
      // 59124145102
      //1498814189
      document.getElementById("btnFOrLouis").style.display = "block";
    } else if (this.props.location.state.privatekey == 146138127147) {
      // 146138127147
      document.getElementById("frameforjcm").style.display = "block";
    } else if (this.props.location.state.privatekey == 1011238294) {
      // 1011238294
      document.getElementById("frameforkj").style.display = "block";
    } else if (this.props.location.state.privatekey == 6210211666) {
      document.getElementById("frameforcpalmer").style.display = "block";
    }
    //  else if (this.props.location.state.privatekey == 14110414678) {
    //   // 1011238294
    //   document.getElementById("frameforkjkulaga").style.display = "block";
    // }
  };

  //horizontal-overlay-recording
  imgHorizontalOverlay1 = () => {
    this.setState({
      imgHorizontalOverlay1: HO1,
    });
  };

  imgHorizontalOverlay2 = () => {
    this.setState({
      imgHorizontalOverlay1: HO2,
    });
  };

  imgHorizontalOverlay3 = () => {
    this.setState({
      imgHorizontalOverlay1: HO3,
    });
  };

  imgHorizontalOverlay4 = () => {
    this.setState({
      imgHorizontalOverlay1: HO4,
    });
  };

  imgHorizontalOverlay5 = () => {
    this.setState({
      imgHorizontalOverlay1: HO5,
    });
  };

  imgHorizontalOverlay6 = () => {
    this.setState({
      imgHorizontalOverlay1: HO6,
    });
  };

  imgHorizontalOverlay7 = () => {
    this.setState({
      imgHorizontalOverlay1: HO7,
    });
  };

  imgHorizontalOverlay8 = () => {
    this.setState({
      imgHorizontalOverlay1: HO8,
    });
  };

  imgHorizontalOverlay9 = () => {
    this.setState({
      imgHorizontalOverlay1: HO9,
    });
  };

  imgHorizontalOverlay10 = () => {
    this.setState({
      imgHorizontalOverlay1: HO10,
    });
  };
  imgHorizontalOverlay11 = () => {
    this.setState({
      imgHorizontalOverlay1: HO11,
    });
  };
  imgHorizontalOverlay12 = () => {
    this.setState({
      imgHorizontalOverlay1: HO12,
    });
  };
  imgHorizontalOverlay13 = () => {
    this.setState({
      imgHorizontalOverlay1: HO13,
    });
  };
  imgHorizontalOverlay14 = () => {
    this.setState({
      imgHorizontalOverlay1: HO14,
    });
  };
  imgHorizontalOverlay15 = () => {
    this.setState({
      imgHorizontalOverlay1: HO15,
    });
  };
  imgHorizontalOverlay16 = () => {
    this.setState({
      imgHorizontalOverlay1: HO16,
    });
  };

  imgHorizontalOverlay17 = () => {
    this.setState({
      imgHorizontalOverlay1: HO17,
    });
  };

  imgHorizontalOverlay18 = () => {
    this.setState({
      imgHorizontalOverlay1: HO18,
    });
  };

  imgHorizontalOverlay19 = () => {
    this.setState({
      imgHorizontalOverlay1: HO19,
    });
  };

  imgHorizontalOverlay20 = () => {
    this.setState({
      imgHorizontalOverlay1: HO20,
    });
  };

  imgHorizontalOverlay21 = () => {
    this.setState({
      imgHorizontalOverlay1: HO21,
    });
  };

  imgHorizontalOverlay22 = () => {
    this.setState({
      imgHorizontalOverlay1: HO22,
    });
  };

  imgHorizontalOverlay23 = () => {
    this.setState({
      imgHorizontalOverlay1: HO23,
    });
  };

  imgHorizontalOverlay24 = () => {
    this.setState({
      imgHorizontalOverlay1: HO24,
    });
  };

  imgHorizontalOverlay25 = () => {
    this.setState({
      imgHorizontalOverlay1: HO25,
    });
  };

  imgHorizontalOverlay26 = () => {
    this.setState({
      imgHorizontalOverlay1: HO26,
    });
  };

  imgHorizontalOverlay27 = () => {
    this.setState({
      imgHorizontalOverlay1: HO27,
    });
  };
  //Side-overlay-recording

  liveLogo = () => {
    this.setState({
      liveLogo: liveLogo,
    });
  };

  liveLogo2 = () => {
    this.setState({
      liveLogo: liveLogo2,
    });
  };

  liveLogo3 = () => {
    this.setState({
      liveLogo: liveLogo3,
    });
  };

  imgSideOverlay1 = () => {
    this.setState({
      imgSideOverlay1: SO1,
    });
  };

  imgSideOverlay2 = () => {
    this.setState({
      imgSideOverlay1: SO2,
    });
  };

  imgSideOverlay3 = () => {
    this.setState({
      imgSideOverlay1: SO3,
    });
  };

  imgSideOverlay4 = () => {
    this.setState({
      imgSideOverlay1: SO4,
    });
  };
  imgSideOverlay5 = () => {
    this.setState({
      imgSideOverlay1: SO5,
    });
  };
  imgSideOverlay6 = () => {
    this.setState({
      imgSideOverlay1: SO6,
    });
  };

  imgSideOverlay7 = () => {
    this.setState({
      imgSideOverlay1: SO7,
    });
  };

  imgSideOverlay8 = () => {
    this.setState({
      imgSideOverlay1: SO8,
    });
  };
  imgSideOverlay9 = () => {
    this.setState({
      imgSideOverlay1: SO9,
    });
  };
  imgSideOverlay10 = () => {
    this.setState({
      imgSideOverlay1: SO10,
    });
  };
  imgSideOverlay11 = () => {
    this.setState({
      imgSideOverlay1: SO11,
    });
  };
  imgSideOverlay12 = () => {
    this.setState({
      imgSideOverlay1: SO12,
    });
  };
  imgSideOverlay13 = () => {
    this.setState({
      imgSideOverlay1: SO13,
    });
  };
  imgSideOverlay14 = () => {
    this.setState({
      imgSideOverlay1: SO14,
    });
  };

  imgLowerSideOverlay1 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO1,
    });
  };
  imgLowerSideOverlay2 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO2,
    });
  };
  imgLowerSideOverlay3 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO3,
    });
  };
  imgLowerSideOverlay4 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO4,
    });
  };
  imgLowerSideOverlay5 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO5,
    });
  };
  imgLowerSideOverlay6 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO6,
    });
  };
  imgLowerSideOverlay7 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO7,
    });
  };
  imgLowerSideOverlay8 = () => {
    this.setState({
      imgLowerSideOverlay1: SLO8,
    });
  };
  socialOverlay1 = () => {
    this.setState({
      socialOverlay1: socialOverlay1,
    });
  };

  socialOverlay2 = () => {
    this.setState({
      socialOverlay1: socialOverlay2,
    });
  };
  socialOverlay3 = () => {
    this.setState({
      socialOverlay1: socialOverlay3,
    });
  };
  socialOverlay4 = () => {
    this.setState({
      socialOverlay1: socialOverlay4,
    });
  };
  socialOverlay5 = () => {
    this.setState({
      socialOverlay1: socialOverlay5,
    });
  };
  socialOverlay6 = () => {
    this.setState({
      socialOverlay1: socialOverlay6,
    });
  };
  socialOverlay7 = () => {
    this.setState({
      socialOverlay1: socialOverlay7,
    });
  };
  socialOverlay8 = () => {
    this.setState({
      socialOverlay1: socialOverlay8,
    });
  };
  socialOverlay9 = () => {
    this.setState({
      socialOverlay1: socialOverlay9,
    });
  };
  socialOverlay10 = () => {
    this.setState({
      socialOverlay1: socialOverlay10,
    });
  };

  //ends-overlay-recording
  ogs1 = () => {
    this.setState({
      gsshow: ogs1,
    });
  };
  ogs2 = () => {
    this.setState({
      gsshow: ogs2,
    });
  };
  ogs3 = () => {
    this.setState({
      gsshow: ogs3,
    });
  };
  ogs4 = () => {
    this.setState({
      gsshow: ogs4,
    });
  };
  ogs5 = () => {
    this.setState({
      gsshow: ogs5,
    });
  };
  jcm1 = () => {
    this.setState({
      lvshow: jcm1,
    });
  };

  kjk1 = () => {
    this.setState({
      lvshow: kjk1,
    });
  };
  cpalmer1 = () => {
    this.setState({
      lvshow: cpalmer1,
    });
  };

  // kjkulaga1 = () => {
  //   this.setState({
  //     lvshow: kjkulaga1,
  //   });
  // };

  flv1 = () => {
    this.setState({
      lvshow: lv1,
    });
  };
  flv2 = () => {
    this.setState({
      lvshow: lv2,
    });
  };
  flv3 = () => {
    this.setState({
      lvshow: lv3,
    });
  };

  flv5 = () => {
    this.setState({
      lvshow: lv5,
    });
  };
  flv6 = () => {
    this.setState({
      lvshow: lv6,
    });
  };

  flv7 = () => {
    this.setState({
      lvshow: lv7,
    });
  };
  flv8 = () => {
    this.setState({
      lvshow: lv8,
    });
  };
  flv9 = () => {
    this.setState({
      lvshow: lv9,
    });
  };
  flv10 = () => {
    this.setState({
      lvshow: lv10,
    });
  };
  flv11 = () => {
    this.setState({
      lvshow: lv11,
    });
  };
  flv12 = () => {
    this.setState({
      lvshow: lv12,
    });
  };
  flv13 = () => {
    this.setState({
      lvshow: lv13,
    });
  };
  BJPBG1 = () => {
    this.setState({
      bgshow: BJPBG1,
    });
  };
  BJPBG2 = () => {
    this.setState({
      bgshow: BJPBG2,
    });
  };
  BJPBG3 = () => {
    this.setState({
      bgshow: BJPBG3,
    });
  };
  BJPF1 = () => {
    this.setState({
      lvshow: BJPF1,
    });
  };
  BJPF2 = () => {
    this.setState({
      lvshow: BJPF2,
    });
  };
  nitro1 = () => {
    this.setState({
      lvshow: nitro1,
    });
  };
  nitro2 = () => {
    this.setState({
      lvshow: nitro2,
    });
  };
  nitro3 = () => {
    this.setState({
      lvshow: nitro3,
    });
  };

  cvmns = () => {
    this.setState({
      lvshow: cvmns,
    });
  };
  powerhour = () => {
    this.setState({
      lvshow: powerhour,
    });
  };
  cvph = () => {
    this.setState({
      bgshow: cvph,
    });
  };
  cvucw = () => {
    this.setState({
      lvshow: cvucw,
    });
  };
  cvfga = () => {
    this.setState({
      bgshow: cvfga,
    });
  };
  cvmns2 = () => {
    this.setState({
      bgshow: cvmns2,
    });
  };
  cvphgp = () => {
    this.setState({
      bgshow: cvphgp,
    });
  };
  lvph = () => {
    this.setState({
      bgshow: lvph,
    });
  };

  cvucwb = () => {
    this.setState({
      bgshow: cvucwb,
    });
  };
  cv4 = () => {
    this.setState({
      bgshow: cv4,
    });
  };
  cv5 = () => {
    this.setState({
      bgshow: cv5,
    });
  };
  cv6 = () => {
    this.setState({
      bgshow: cv6,
    });
  };
  cv7 = () => {
    this.setState({
      bgshow: cv7,
    });
  };
  cvmh = () => {
    this.setState({
      bgshow: cvmh,
    });
  };

  pf0 = () => {
    this.setState({
      lvshow: "",
    });
  };
  pf1 = () => {
    this.setState({
      lvshow: pf1,
    });
  };

  pf2 = () => {
    this.setState({
      lvshow: pf2,
    });
  };

  pf3 = () => {
    this.setState({
      lvshow: pf3,
    });
  };

  pf4 = () => {
    this.setState({
      lvshow: pf4,
    });
  };

  pf5 = () => {
    this.setState({
      lvshow: pf5,
    });
  };

  pf6 = () => {
    this.setState({
      lvshow: pf6,
    });
  };

  pf7 = () => {
    this.setState({
      lvshow: pf7,
    });
  };

  pf8 = () => {
    this.setState({
      lvshow: pf8,
    });
  };

  pf9 = () => {
    this.setState({
      lvshow: pf9,
    });
  };

  pf10 = () => {
    this.setState({
      lvshow: pf10,
    });
  };

  pf11 = () => {
    this.setState({
      lvshow: pf11,
    });
  };
  pbg = () => {
    this.setState({
      bgshow: pbg,
    });
  };
  pbg1 = () => {
    this.setState({
      bgshow: pbg1,
    });
  };
  pbg2 = () => {
    this.setState({
      bgshow: pbg2,
    });
  };
  pbg3 = () => {
    this.setState({
      bgshow: pbg3,
    });
  };
  pbg4 = () => {
    this.setState({
      bgshow: pbg4,
    });
  };
  gsbg1 = () => {
    this.setState({
      gsshow: gsbg1,
      arrayforgsbg: gsbg1,
    });
  };
  gsbg2 = () => {
    this.setState({
      gsshow: gsbg2,
      arrayforgsbg: gsbg2,
    });
  };
  gsbg3 = () => {
    this.setState({
      gsshow: gsbg3,
    });
  };
  gsbg4 = () => {
    this.setState({
      gsshow: gsbg4,
    });
  };
  gsbg5 = () => {
    this.setState({
      gsshow: gsbg5,
    });
  };
  gsbg6 = () => {
    this.setState({
      gsshow: gsbg6,
    });
  };
  gsbg7 = () => {
    this.setState({
      gsshow: gsbg7,
    });
  };
  gsbg8 = () => {
    this.setState({
      gsshow: gsbg8,
    });
  };
  gsbg9 = () => {
    this.setState({
      gsshow: gsbg9,
    });
  };
  gsbg10 = () => {
    this.setState({
      gsshow: gsbg10,
    });
  };
  gsbg11 = () => {
    this.setState({
      gsshow: gsbg11,
    });
  };
  gsbg12 = () => {
    this.setState({
      gsshow: gsbg12,
    });
  };
  gsbg13 = () => {
    this.setState({
      gsshow: gsbg13,
    });
  };

  //lv shows
  youcancome = (waiter) => {
    this.socket.emit("youcancome", waiter.id, this.state.attendees);
    this.setState({
      waiters: this.state.waiters.filter(
        (waitingAttendees) => waitingAttendees !== waiter
      ),
    });
  };

  disconnectSocket = (socketToDisconnect) => {
    this.sendToPeer("socket-to-disconnect", null, {
      local: this.socket.id,
      remote: socketToDisconnect,
    });
  };

  sayHello = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  inviteHandler = () => {
    // const enteredemail = prompt("Enter email to invite ")
    const enteredemail = this.state.emailinvite;
    // navigator.clipboard.writeText(this.props.location.state.room_code);
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "VeroHive Meeting Invitation",
        text: "Your invitation Code is" + this.props.location.state.room_code,
        html: `<img src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/IvLvPO7ygnYzNg7PDE9AIfrvxEzs7p4zpublic/icons/verohivelogo.png" style="width: 150px;">'
      <h1 style="color: #5b5b5b;">VeroHive Meeting Invitation</h1>
      <h3>You are invited by ${
        this.props.location.state.firstname +
        " " +
        this.props.location.state.lastName
      }
 
    
    <br>
    <a style="font-size:1.5rem;font-weight:bold;text-decoration:none" href="https://www.verohive.net/21AEF56E76A866F1161468CEBF5B23A9CE43F5E6319D050E498E77C02FDDD7BDcbvhjdferut4545347nvfrjhrt43734/#${
      this.props.location.state.room_code
    }">Attendee Click Here To Join Meeting</a>           
           
   <h2> Your Meeting Room Id is: ${this.props.location.state.room_code}</h2>
     <br>
     <h2 style="color: red;">**IMPORTANT: For Use Only on Google Chrome, Firefox or Microsoft Edge Chrome Browsers, Safari Browsers are NOT Supported**</h2>

     <h3>Alternatively: Attendee's who want to use their accounts follow the below instructions:</h3>    
    <p>
    
    Click on the link below to sign into your VeroHive  account, if you do not have an account then go to <a href=https://www.verohive.net/>VeroHive </a> to create one to join the meeting and be a part of  the growing VEROHive community.
    </p>
   <p>
   The security and privacy of our members is important, this is why VeroHive  provides end to end encryption on our system for all members.
   </p>
   <p>
   Learn more about how VeroHive  works by going to <a href=https://verohive.com>VeroHive </a>
   </p>
   
    <a href=https://www.verohive.net/>Sign in or Sign up </a>
    
     <h5>Note: Place Attendee Room ID in the Attendee Room ID slot on your dashboard.</h5>
      
      
      <h4 style="color: #757575;">Cheers!</h4>
      <h4 style="color: #757575;">VeroHive  Team</h4>
      `,
      }),
    })
      .then(() => {
        console.log("ddd");
        //  this.verify()
        this.setState({
          invitationsentsuccessfully: "Invitation sent successfully",
        });
        // alert("Invitation sent successfully")
      })
      .catch((err) => console.log(err));
  };

  sendemail = (enteredemail) => {
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "VeroHive Meeting Invitation",
        text: "Your invitation Code is" + this.props.location.state.room_code,
        html: `<img src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/IvLvPO7ygnYzNg7PDE9AIfrvxEzs7p4zpublic/icons/verohivelogo.png" style="width: 150px;">'
      <h1 style="color: #5b5b5b;">VeroHive Meeting Invitation</h1>
      <h3>You are invited by ${
        this.props.location.state.firstname +
        " " +
        this.props.location.state.lastName
      }
 
    
    <br>
    <a style="font-size:1.5rem;font-weight:bold;text-decoration:none" href="https://www.verohive.net/21AEF56E76A866F1161468CEBF5B23A9CE43F5E6319D050E498E77C02FDDD7BDcbvhjdferut4545347nvfrjhrt43734/#${
      this.props.location.state.room_code
    }">Attendee Click Here To Join Meeting</a>           
           
   <h2> Your Meeting Room Id is: ${this.props.location.state.room_code}</h2>
   
     <h2 style="color: red;">**IMPORTANT: For Use Only on Google Chrome, Firefox or Microsoft Edge Chrome Browsers, Safari Browsers are NOT Supported**</h2>

     <h3>Alternatively: Attendee's who want to use their accounts follow the below instructions:</h3>    
    <p>
    
    Click on the link below to sign into your VeroHive  account, if you do not have an account then go to <a href=https://www.verohive.net/>VeroHive l</a> to create one to join the meeting and be a part of  the growing VeroHive community.
    </p>
   <p>
   The security and privacy of our members is important, this is why VeroHive provides end to end encryption on our system for all members.
   </p>
   <p>
   Learn more about how VeroHive works by going to <a href=https://verohive.com>www.verohive.com</a>
   </p>
   
    <a href=https://www.verohive.net/>Sign in or Sign up </a>
    
     <h5>Note: Place Attendee Room ID in the Attendee Room ID slot on your dashboard.</h5>
      
      
      <h4 style="color: #757575;">Cheers!</h4>
      <h4 style="color: #757575;">VeroHive  Team</h4>
      `,
      }),
    })
      .then(() => {
        console.log("ddd");
        //  this.verify()
        this.setState({
          invitationsentsuccessfullytocontact: "Invitation sent successfully",
        });
        // alert("Invitation sent successfully")
      })
      .catch((err) => console.log(err));
  };

  downloadFile = () => {
    window.open(this.state.url);
  };

  Upload1_To_AWS_S3a = () => {
    var that = this;
    let formData = new FormData();
    formData.append("photo", this.state.image);
    try {
      const res = Api.uploadImageToAwsS3(formData);
      res.then(function (value) {
        console.log(value); // "Success"
        // that.setState({
        //   image: value
        // })
        let user = {
          uid: (that.socket && that.socket.id) || "",
        };

        let messages = {
          type: "file",
          message: {
            id: user.uid,
            sender: { uid: user.uid },
            data: { text: value },
          },
        };
        that.state.sendChannels.map((sendChannel) => {
          sendChannel.readyState === "open" &&
            sendChannel.send(JSON.stringify(messages));
        });
        that.sendToPeer("new-file", JSON.stringify(messages), {
          local: that.socket.id,
        });
      });
    } catch (e) {}
  };

  readThenSendFile = (data) => {
    let username = this.props.location.state.username;
    var reader = new FileReader();
    var fileroom = this.state.meetingid;
    reader.onload = function (evt) {
      var msg = {};
      let socket = io();

      msg.username = username;
      msg.file = evt.target.result;
      msg.fileName = data.name;
      msg.room = fileroom;
      msg.type = data.type;
      if (data.size / 1000000 <= 6) {
        socket.emit("base64 file", msg);
      } else {
        document.getElementById("chatcontainer").innerHTML =
          "Please select file upto 5mbs";
      }
    };
    reader.readAsDataURL(data);
  };

  backMe = () => {
    this.props.history.goBack();
  };

  // ************************************* //
  // ************************************* //
  stopTracks = (stream) => {
    const video = document.querySelector("video");

    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const videoTracks = mediaStream.getTracks();

    videoTracks.forEach((track) => track.stop());
  };

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
    });
  };

  openModal = (username) => {
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
          waitingArea: false,
          privatekey: res.password.substr(0, 10),
          firstname: res.firstName,
          lastname: res.lastName,
          email: res.email,
          organization: res.organization,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          Facebook: res.Facebook,
          FacebookLive: res.FacebookLive,
          Twitter: res.Twitter,
          LinkedIn: res.LinkedIn,
          Youtube: res.Youtube,
          YoutubeLive: res.YoutubeLive,
          Instagram: res.Instagram,
          Weblink1: res.Weblink1,
          Weblink2: res.Weblink2,
          image1: res.ProfilePic,
          username: res.username,
          verified: res.verified,
          usertype: res.userType,
          open: true,
        });
      })
      .catch((err) => console.log(err));
  };

  userinfoRecording = (username) => {
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
          privatekey: res.password.substr(0, 10),
          firstname: res.firstName,
          lastname: res.lastName,
          email: res.email,
          organization: res.organization,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          Facebook: res.Facebook,
          FacebookLive: res.FacebookLive,
          Twitter: res.Twitter,
          LinkedIn: res.LinkedIn,
          Youtube: res.Youtube,
          YoutubeLive: res.YoutubeLive,
          Instagram: res.Instagram,
          Weblink1: res.Weblink1,
          Weblink2: res.Weblink2,
          image1: res.ProfilePic,
          username: res.username,
          verified: res.verified,
          usertype: res.userType,
        });
      })

      .catch((err) => console.log(err));
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sayHello = () => {
    console.log("Hello");
    localStorage.removeItem("user");
    fetch("/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        localStorage.removeItem("user");
        window.location.reload();
        this.props.history.push("/login");

        console.log("ff", res);
      })
      .catch((err) => console.log(err));
  };

  Home = () => {
    this.props.history.push("/private", {
      username: this.state.id,
    });
    // window.location.reload();
  };

  handleClose = () => {
    this.setState({
      open1: false,
    });
  };
  handleCloseChatbar = () => {
    this.setState({
      chatbar: false,
    });
  };
  handleCloseWaitingArea = () => {
    this.setState({
      waitingArea: false,
    });
  };
  handleCloseInvite = () => {
    this.setState({
      invite: false,
    });
  };
  handleClose1 = () => {
    this.setState({
      open2: false,
    });
  };
  handleClickOpenChatbar = () => {
    this.setState({
      chatbar: true,
    });
  };
  handleClickOpenWaitingArea = () => {
    this.setState({
      waitingArea: true,
    });
  };
  handleClickOpenInvite = () => {
    this.setState({
      invite: true,
    });
  };
  handleClickOpen = () => {
    this.setState({
      open1: true,
    });
  };
  handleClickOpen1 = () => {
    this.setState({
      open2: true,
    });
  };

  Upload1_To_AWS_S3 = () => {
    var that = this;
    const { email } = this.state;
    console.log("Dddd", this.state.image);
    let formData = new FormData();
    formData.append("photo", this.state.image);
    try {
      const res = Api.uploadImageToAwsS3(formData);
      res.then(function (value) {
        console.log(value); // "Success"
        // that.setState({
        //   image: value
        // })
        fetch("/updateProfilePic", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            value,
          }),
        })
          .then(() => {
            this.setState({
              yourprofilepicturechanged: "profile pic changed successfully",
            });
            // alert("profile pic changed successfully")
            that.setState({
              image1: value,
            });
          })
          .catch((err) => console.log(err));
      });
    } catch (e) {}
  };
  render() {
    const openMenu = () => {
      document.querySelector(".chatbar").classList.add("open");
    };

    const openMenuUser = () => {
      document.querySelector(".userbar").classList.add("open");
    };
    const openMenufile = () => {
      document.querySelector(".filebar").classList.add("open");
    };

    const closeMenufile = () => {
      document.querySelector(".filebar").classList.remove("open");
    };

    const openInvite = () => {
      document.querySelector(".invitebar").classList.add("open");
    };
    const closeInvite = () => {
      document.querySelector(".invitebar").classList.remove("open");
    };
    const closeMenu = () => {
      document.querySelector(".chatbar").classList.remove("open");
      if (
        document.getElementById("chaticon").style.backgroundColor == "yellow"
      ) {
        document.getElementById("chaticon").style.backgroundColor = "";
      }
    };
    const closeUserMenu = () => {
      document.querySelector(".userbar").classList.remove("open");
    };

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
      <div>
        {/* CHAT DIALOG */}
        <Dialog
          open={this.state.chatbar}
          onClose={() => {
            this.handleCloseChatbar();
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
          ></DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <div class="container" id="chatcontainer"></div>
              <input
                name="image"
                type="file"
                style={{ width: "88px" }}
                onChange={(e) => {
                  this.setState({ image: e.currentTarget.files[0] });
                }}
              />

              <button
                className="btn btn-sendfile"
                style={{ marginTop: "0" }}
                onClick={() => this.readThenSendFile(this.state.image)}
              >
                send file
              </button>

              <div className="send">
                <form action="#" id="send-container">
                  <input type="text" name="messageInp" id="messageInp" />
                  <button
                    className="btn-text-send"
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      marginTop: "10px",
                    }}
                    class="material-icons"
                  >
                    send
                  </button>
                </form>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseChatbar();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/* CHAT DIALOG ENDS */}
        {/* INVITE DIALOG */}
        <Dialog
          className="dialog"
          open={this.state.invite}
          onClose={() => {
            this.handleCloseInvite();
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
            INVITE
          </DialogTitle>
          <DialogContent className="dialog_content">
            <DialogContentText
              id="alert-dialog-description"
              className="dialog_content_text"
            >
              <div className="email_contact">
                <TextField
                  id="standard-basic"
                  label="Enter Email"
                  variant="standard"
                  name="emailinvite"
                  ref="emailinvite"
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
                  onChange={this.onChange}
                />

                <Button
                  className="contact_button"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => this.inviteHandler()}
                >
                  Invite
                </Button>
              </div>

              <h1
                style={{
                  fontSize: "2rem",
                  marginTop: "50px",
                  marginLeft: "9px",
                }}
              >
                Contacts
              </h1>
              <div>
                {this.state.following && this.state.following.length > 0
                  ? this.state.following.map((value, index) => {
                      if (index < 100) {
                        return (
                          <div style={{ backgroundColor: "#663399" }}>
                            <span>
                              {" "}
                              {value.fullnamerequested ==
                              this.state.firstname + this.state.lastname
                                ? value.fullnameaccepted
                                : value.fullnamerequested}
                            </span>
                            <span>
                              {value.emailrequested == this.state.email ? (
                                <button
                                  onClick={() =>
                                    this.sendemail(value.emailaccepted)
                                  }
                                  style={{
                                    backgroundColor: "green",
                                    border: "none",
                                    color: "white",
                                    outline: "none",
                                  }}
                                >
                                  Invite
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    this.sendemail(value.emailrequested)
                                  }
                                  style={{
                                    backgroundColor: "green",
                                    border: "none",
                                    color: "white",
                                    outline: "none",
                                  }}
                                >
                                  Invite
                                </button>
                              )}
                            </span>
                          </div>
                        );
                      }
                    })
                  : null}
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
                this.handleCloseInvite();
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>

        {/*  */}

        {/*  */}
        {/* INVITE DIALOG END */}
        {/*  */}
        {/*  */}
        {/* WAITING AREA DIALOG */}
        <Dialog
          open={this.state.waitingArea}
          onClose={() => {
            this.handleCloseWaitingArea();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ height: "70% !important" }}
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "900",
            }}
          >
            <h1 style={{ fontSize: "2.5rem" }}>RECEPTION AREA</h1>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              {this.state.waiters.map((waiter) => (
                <div key={waiter.id}>
                  {waiter.name}
                  <button type="button" onClick={() => this.youcancome(waiter)}>
                    ALLOW IN
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.socket.emit("requestRejected", waiter);
                      this.setState({
                        waiters: this.state.waiters.filter(
                          (user) => user !== waiter
                        ),
                      });
                    }}
                  >
                    Reject
                  </button>
                </div>
              ))}
              <hr></hr>

              <h3 style={{ textAlign: "center" }}>Attendee List</h3>
              {this.state.attendees.map((attendee, index) => (
                <div
                  key={index}
                  style={{ textAlign: "center", marginTop: "50px" }}
                >
                  {this.state.meetingperson == "host" ? (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "2rem", marginRight: "19px" }}>
                        {attendee.name}
                      </span>
                      <VideocamOffIcon
                        onClick={() => {
                          this.socket.emit("camoffhimfrommeeting", attendee);
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          marginLeft: "10px",
                        }}
                      />
                      {/* <i
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "blue",
                          fontSize: "15px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                          margin: "2px",
                        }}
                        class="material-icons"
                        // onClick={() => {
                        //   this.socket.emit("camoffhimfrommeeting", attendee);
                        // }}
                      >
                        videocam_off
                      </i> */}
                      <MicOffIcon
                        onClick={() => {
                          this.socket.emit("mutehimfrommeeting", attendee);
                        }}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      />
                      {/* <i
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "blue",
                          fontSize: "15px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                          margin: "2px",
                        }}
                        class="material-icons"
                        onClick={() => {
                          this.socket.emit("mutehimfrommeeting", attendee);
                        }}
                      >
                        mic_off
                      </i> */}
                      <AccountCircleIcon
                        onClick={() => {
                          this.openModal(attendee.username);
                        }}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                      {/* <i
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          fontSize: "25px",
                          margin: "2px",
                        }}
                        class="material-icons"
                        onClick={() => {
                          this.openModal(attendee.username);
                        }}
                      >
                        account_circle
                      </i> */}
                      <CallEndIcon
                        style={{
                          cursor: "pointer",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        onClick={() => {
                          this.socket.emit("hanguphimfrommeeting", attendee);

                          this.setState({
                            attendees: this.state.attendees.filter(
                              (Attendeeslist) => Attendeeslist !== attendee
                            ),
                          });
                        }}
                      />
                      {/* <i
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "red",
                          fontSize: "15px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                        }}
                        class="material-icons"
                        onClick={() => {
                          this.socket.emit("hanguphimfrommeeting", attendee);

                          this.setState({
                            attendees: this.state.attendees.filter(
                              (Attendeeslist) => Attendeeslist !== attendee
                            ),
                          });
                        }}
                      >
                        call_end
                      </i> */}
                    </span>
                  ) : null}
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleCloseWaitingArea();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/* WAITING AREA DIALOG END */}
        {/*  */}
        {/*  */}
        {/* RECORDING GUIDE DIALOGBOX */}
        <Dialog
          open={this.state.open1}
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
            The functions of the recording panel are below:
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <p className="dialog_title_paragraph">In the Meanwhile:</p>
              <p className="dialog_title_paragraph">
                a) White Circle Icon: This is where you start your recording ,
                clicking it will open up the recording options to Start
                Recording (green button) and Stop Recording (red button), when
                the recording begins there will be a visual countdown from 3, 2,
                1 then the recording begins. When the recording is stopped there
                will be a blue cloud download button, click this to download
                your recording so that you can save it or distribute it as you
                wish, its yours, you own it outright.{" "}
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
        {/* RECORDING DIALOG BOX END  */}
        {/* HOST GUIDE START */}
        <Dialog
          open={this.state.open2}
          onClose={() => {
            this.handleClose1();
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
            1) The functions on the footer below are as follows: <br></br>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black", fontSize: "2.2rem", fontweight: "500" }}
            >
              <p className="dialog_title_paragraph">
                a) File Share Icon: This allows files to be shared with other
                attendees in the room, soon DocuMega documents will be able to
                be shared within a Vero Meeting
              </p>
              <br />

              <p className="dialog_title_paragraph">
                b) Whiteboard Icon: This allows the host to create a virtual
                whiteboard that allows photos or files to be inserted and tools
                to be used to edit them in real time with other attendees. Its a
                feature that is in Beta mode in order to enhance the feature
                shortly.
              </p>
              <br />

              <p className="dialog_title_paragraph">
                c) Screen Share Icon: This allows for screen sharing while in a
                Vero Meeting
              </p>
              <br />

              <p className="dialog_title_paragraph">
                d) Invitation Icon: This allows for others to be invited to the
                meeting by the Host using their existing Vero contacts or using
                an email address to invite the other attendees.
              </p>
              <br />

              <p className="dialog_title_paragraph">
                e) Group Chat Icon: This allows for real time chatting within
                the Vero Meeting.
              </p>
              <br />

              <p className="dialog_title_paragraph">
                f) Waiting List/Attendee List Icon: This is where you will find
                the waiting list of attendees that a Host can choose to allow
                into the Vero Meeting and the list of all attendees in the Vero
                Meeting.
              </p>
              <br />

              <p className="dialog_title_paragraph">
                g) Audio Mute Icon: This allows the Host to Mute and Umute their
                audio.
              </p>
              <br />

              <p className="dialog_title_paragraph">
                h) Video Mute Icon: This allows the Host to Mute and Unmute
                their video
              </p>
              <br />

              <p className="dialog_title_paragraph">
                h) Video Mute Icon: This allows the Host to Mute and Unmute
                their video
              </p>
              <br />

              <p className="dialog_title_paragraph">
                I) Disconnect Icon: This red phone allows the Host to end the
                Vero Meeting at any time but be aware once a Vero Meeting is
                ended by a host then that room is permanently closed and cannot
                be reopened. To continue the existing meeting a new room must be
                created and the attendees must again be invited to attend.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                this.handleClose1();
              }}
              style={{ fontSize: "1.5rem", outline: "none" }}
              startIcon={<CloseIcon />}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/* HOST GUIDE END */}
        {this.props.location.state != undefined ? (
          <div className="das_whole">
            <div className="dashboard_navbar">
              <div className="logo_secure">
                <img src={logo} className="dash-logo"></img>
                <div className="dash_encryption">
                  <i
                    style={{ fontSize: "23px", color: "green" }}
                    class="material-icons"
                  >
                    security
                  </i>
                  <p style={{ fontSize: "7px", width: "100%" }}>
                    Enhanced End to End Encryption
                  </p>
                </div>
              </div>
              <div className="dashboard_room">
                Room id: {this.state.meetingid}
              </div>
              <div className="dashboard_network">
                <span
                  className="welcome_vicky"
                  style={{ marginTop: "13px", fontSize: "1rem" }}
                >
                  Welcome {this.state.id} &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <div>
                  {this.state.networkGood ? (
                    <div class="signal-bars mt1 sizing-box good four-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}

                  {this.state.networkFine ? (
                    <div className="signal-bars mt1 sizing-box ok three-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}

                  {this.state.networkSlow ? (
                    <div className="signal-bars mt1 sizing-box bad two-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}
                  {this.state.offline ? (
                    <div className="signal-bars mt1 sizing-box bad one-bar">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <ul style={{ display: "none" }} id="hostrecordred">
              <MuiThemeProvider theme={theme}>
                <Tooltip title="Recording">
                  <li style={{ fontStyle: "none" }}>
                    <i
                      style={{
                        cursor: "pointer",
                        marginTop: "12px",
                        fontSize: "30px",
                        color: "red",
                      }}
                      class="material-icons"
                    >
                      radio_button_checked
                    </i>
                  </li>
                </Tooltip>
              </MuiThemeProvider>
            </ul>

            {/* <div className="header">
              <img src={logo} className="logo-vero"></img>
              <div
                style={{ display: "flex", position: "absolute", left: "17%" }}
              >
                <i
                  style={{ fontSize: "23px", color: "green" }}
                  class="material-icons"
                >
                  security
                </i>
                <p style={{ fontSize: "7px", width: "100%" }}>
                  Enhanced End to End Encryption
                </p>
              </div>
              <ul style={this.state.recordnotify}>
                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Recording">
                    <li style={{ fontStyle: "none" }}>
                      <i
                        style={{
                          cursor: "pointer",
                          marginTop: "12px",
                          fontSize: "30px",
                          color: "red",
                        }}
                        class="material-icons"
                      >
                        radio_button_checked
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
              </ul>
              <ul style={{ display: "none" }} id="hostrecordred">
                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Recording">
                    <li style={{ fontStyle: "none" }}>
                      <i
                        style={{
                          cursor: "pointer",
                          marginTop: "12px",
                          fontSize: "30px",
                          color: "red",
                        }}
                        class="material-icons"
                      >
                        radio_button_checked
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
              </ul>

              <div
                style={{ position: "absolute", right: "45%", display: "flex" }}
              >
                Room id: {this.state.meetingid}
              </div>
              <div
                style={{ position: "absolute", right: "5%", display: "flex" }}
                className="welcome-user"
              >
                Welcome {this.state.id}
                <div>
                  {this.state.networkGood ? (
                    <div class="signal-bars mt1 sizing-box good four-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}

                  {this.state.networkFine ? (
                    <div className="signal-bars mt1 sizing-box ok three-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}

                  {this.state.networkSlow ? (
                    <div className="signal-bars mt1 sizing-box bad two-bars">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}
                  {this.state.offline ? (
                    <div className="signal-bars mt1 sizing-box bad one-bar">
                      <div className="first-bar bar"></div>
                      <div className="second-bar bar"></div>
                      <div className="third-bar bar"></div>
                      <div className="fourth-bar bar"></div>
                      <div className="fifth-bar bar"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div> */}

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

            <div
              className="dash_meetingroom"
              id="meetingRoom"
              // style={{ marginTop: "60px" }}
            >
              <div
                id="meetingRoomdiv"
                // style={{
                //   display: "flex",
                //   flexWrap: "wrap",
                //   maxWidth: "450px",
                //   maxHeight: "562px",
                //   overflowY: "auto",
                //   overflowX: "auto",
                //   marginLeft: "-20px",
                //   width: "450px",
                //   borderRadius: "20px",
                //   marginTop: "10px",
                // }}
              ></div>
              <video
                className="dash_video"
                id="bigtvvideo"
                controls
                muted
                poster="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/VeroMain_placeholder.jpg"
              ></video>

              <div id="countdown"></div>
              <input
                id="videoinputfid"
                type="text"
                style={{ display: "none" }}
              />
              <img
                src={bgRecord}
                style={{ display: "none" }}
                id="recordimg"
              ></img>
              <img
                src={recordLogo}
                style={{ display: "none" }}
                id="logorecord"
              ></img>

              <img src={blackbg} style={{ display: "none" }} id="blackbg"></img>

              <div>
                <video
                  style={{ display: "none" }}
                  id="recording"
                  width="16"
                  height="12"
                  controls
                ></video>
              </div>

              <div>
                <div
                  id="btnFOrLouis"
                  style={{
                    display: "none",
                    position: "absolute",
                    left: "80vw",
                    top: "15vh",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <span>
                    <button
                      style={{
                        cursor: "pointer",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => {
                        if (
                          this.props.location.state.privatekey == 59124145102
                        ) {
                          // 59124145102
                          //1498814189
                          document.getElementById("btnFOrLouis").style.display =
                            "none";
                        } else if (
                          this.props.location.state.privatekey == 146138127147
                        ) {
                          // 146138127147
                          document.getElementById("frameforjcm").style.display =
                            "none";
                        } else if (
                          this.props.location.state.privatekey == 9897120391
                        ) {
                          // 146138127147
                          document.getElementById("btnFOrLouis").style.display =
                            "none";
                        } else if (
                          this.props.location.state.privatekey == 1011238294
                        ) {
                          // 1011238294
                          document.getElementById("frameforkj").style.display =
                            "none";
                        } else if (
                          this.props.location.state.privatekey == 6210211666
                        ) {
                          // 1011238294
                          document.getElementById(
                            "frameforcpalmer"
                          ).style.display = "none";
                        }

                        // else if (
                        //   this.props.location.state.privatekey == 14110414678
                        // ) {
                        //   // 1011238294
                        //   document.getElementById(
                        //     "frameforkjkulaga"
                        //   ).style.display = "none";
                        // }
                      }}
                    >
                      Close
                    </button>
                  </span>
                  <br></br>
                  {/* <img src={lv1} style={{ display: 'block', width: '70px', cursor: 'pointer' }} id="lv1" onClick={() => { this.flv1(); this.socket.emit('showframestouser', { workfun: 2001, room: this.state.meetingid }) }}></img> */}
                  <img
                    src={lv2}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv2"
                    onClick={() => {
                      this.flv2();
                      this.socket.emit("showframestouser", {
                        workfun: 2002,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv3}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv3"
                    onClick={() => {
                      this.flv3();
                      this.socket.emit("showframestouser", {
                        workfun: 2003,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv5}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv5"
                    onClick={() => {
                      this.flv5();
                      this.socket.emit("showframestouser", {
                        workfun: 2004,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv6}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv6"
                    onClick={() => {
                      this.flv6();
                      this.socket.emit("showframestouser", {
                        workfun: 2005,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv7}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv7"
                    onClick={() => {
                      this.flv7();
                      this.socket.emit("showframestouser", {
                        workfun: 2022,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv8}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv8"
                    onClick={() => {
                      this.flv8();
                      this.socket.emit("showframestouser", {
                        workfun: 2023,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv9}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv9"
                    onClick={() => {
                      this.flv9();
                      this.socket.emit("showframestouser", {
                        workfun: 2024,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv10}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv10"
                    onClick={() => {
                      this.flv10();
                      this.socket.emit("showframestouser", {
                        workfun: 2025,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv11}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv11"
                    onClick={() => {
                      this.flv11();
                      this.socket.emit("showframestouser", {
                        workfun: 2026,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv12}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv12"
                    onClick={() => {
                      this.flv12();
                      this.socket.emit("showframestouser", {
                        workfun: 2027,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lv13}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv13"
                    onClick={() => {
                      this.flv13();
                      this.socket.emit("showframestouser", {
                        workfun: 2029,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={BJPF1}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv14"
                    onClick={() => {
                      this.BJPF1();
                      this.socket.emit("showframestouser", {
                        workfun: 2033,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={BJPF2}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lv15"
                    onClick={() => {
                      this.BJPF2();
                      this.socket.emit("showframestouser", {
                        workfun: 2034,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvmns}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvucw"
                    onClick={() => {
                      this.cvmns();
                      this.socket.emit("showframestouser", {
                        workfun: 2006,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={powerhour}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="powerhour"
                    onClick={() => {
                      this.powerhour();
                      this.socket.emit("showframestouser", {
                        workfun: 2021,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <img
                    src={cvucw}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvucw"
                    onClick={() => {
                      this.cvucw();
                      this.socket.emit("showframestouser", {
                        workfun: 2008,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  {/* <img src={nitro1} style={{ display: 'block', width: '70px', cursor: 'pointer' }} id="nitro1" onClick={() => { this.nitro1(); this.socket.emit('showframestouser', { workfun: 2009, room: this.state.meetingid }) }}></img>

                            <img src={nitro2} style={{ display: 'block', width: '70px', cursor: 'pointer' }} id="nitro2" onClick={() => { this.nitro2(); this.socket.emit('showframestouser', { workfun: 2010, room: this.state.meetingid }) }}></img>
                            <img src={nitro3} style={{ display: 'block', width: '70px', cursor: 'pointer' }} id="nitro3" onClick={() => { this.nitro3(); this.socket.emit('showframestouser', { workfun: 2011, room: this.state.meetingid }) }}></img> */}
                  <hr></hr>
                  <h5>background</h5>
                  <img
                    src={cv4}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cv4"
                    onClick={() => {
                      this.cv4();
                      this.socket.emit("showframestouser", {
                        workfun: 2012,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cv5}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cv5"
                    onClick={() => {
                      this.cv5();
                      this.socket.emit("showframestouser", {
                        workfun: 2013,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cv6}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cv6"
                    onClick={() => {
                      this.cv6();
                      this.socket.emit("showframestouser", {
                        workfun: 2014,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cv7}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cv7"
                    onClick={() => {
                      this.cv7();
                      this.socket.emit("showframestouser", {
                        workfun: 2015,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvph}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvucw"
                    onClick={() => {
                      this.cvph();
                      this.socket.emit("showframestouser", {
                        workfun: 2007,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvmh}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvucw"
                    onClick={() => {
                      this.cvmh();
                      this.socket.emit("showframestouser", {
                        workfun: 2016,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <img
                    src={cvfga}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvfga"
                    onClick={() => {
                      this.cvfga();
                      this.socket.emit("showframestouser", {
                        workfun: 2017,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvucwb}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvucwb"
                    onClick={() => {
                      this.cvucwb();
                      this.socket.emit("showframestouser", {
                        workfun: 2018,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvmns2}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvmns2"
                    onClick={() => {
                      this.cvmns2();
                      this.socket.emit("showframestouser", {
                        workfun: 2019,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={cvphgp}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="cvphgp"
                    onClick={() => {
                      this.cvphgp();
                      this.socket.emit("showframestouser", {
                        workfun: 2020,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={lvph}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="lvph"
                    onClick={() => {
                      this.lvph();
                      this.socket.emit("showframestouser", {
                        workfun: 2028,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={BJPBG1}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="BJPBG1"
                    onClick={() => {
                      this.BJPBG1();
                      this.socket.emit("showframestouser", {
                        workfun: 2030,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={BJPBG1}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="BJPBG2"
                    onClick={() => {
                      this.BJPBG2();
                      this.socket.emit("showframestouser", {
                        workfun: 2031,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={BJPBG1}
                    style={{
                      display: "block",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    id="BJPBG3"
                    onClick={() => {
                      this.BJPBG3();
                      this.socket.emit("showframestouser", {
                        workfun: 2032,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <h5>GreenScreen</h5>
                  <img
                    src={gsbg1}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg1"
                    onClick={() => {
                      this.gsbg1();
                      this.setState({ gsworkfunforuser: 7001 });
                      this.socket.emit("showframestouser", {
                        workfun: 7001,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg2}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg2"
                    onClick={() => {
                      this.gsbg2();
                      this.setState({ gsworkfunforuser: 7002 });
                      this.socket.emit("showframestouser", {
                        workfun: 7002,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg3}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg3"
                    onClick={() => {
                      this.gsbg3();
                      this.setState({ gsworkfunforuser: 7003 });
                      this.socket.emit("showframestouser", {
                        workfun: 7003,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg4}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg4"
                    onClick={() => {
                      this.gsbg4();
                      this.setState({ gsworkfunforuser: 7004 });
                      this.socket.emit("showframestouser", {
                        workfun: 7004,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg5}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg5"
                    onClick={() => {
                      this.gsbg5();
                      this.setState({ gsworkfunforuser: 7005 });
                      this.socket.emit("showframestouser", {
                        workfun: 7005,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg6}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg6"
                    onClick={() => {
                      this.gsbg6();
                      this.setState({ gsworkfunforuser: 7006 });
                      this.socket.emit("showframestouser", {
                        workfun: 7006,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg7}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg7"
                    onClick={() => {
                      this.gsbg7();
                      this.setState({ gsworkfunforuser: 7007 });
                      this.socket.emit("showframestouser", {
                        workfun: 7007,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg8}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg8"
                    onClick={() => {
                      this.gsbg8();
                      this.setState({ gsworkfunforuser: 7008 });
                      this.socket.emit("showframestouser", {
                        workfun: 7008,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg9}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg9"
                    onClick={() => {
                      this.gsbg9();
                      this.setState({ gsworkfunforuser: 7009 });
                      this.socket.emit("showframestouser", {
                        workfun: 7009,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg10}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg10"
                    onClick={() => {
                      this.gsbg10();
                      this.setState({ gsworkfunforuser: 7010 });
                      this.socket.emit("showframestouser", {
                        workfun: 7010,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg11}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg11"
                    onClick={() => {
                      this.gsbg11();
                      this.setState({ gsworkfunforuser: 70011 });
                      this.socket.emit("showframestouser", {
                        workfun: 7011,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg12}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg12"
                    onClick={() => {
                      this.gsbg12();
                      this.setState({ gsworkfunforuser: 7012 });
                      this.socket.emit("showframestouser", {
                        workfun: 7012,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={gsbg13}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="gsbg13"
                    onClick={() => {
                      this.gsbg13();
                      this.setState({ gsworkfunforuser: 7013 });
                      this.socket.emit("showframestouser", {
                        workfun: 7013,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  {/* <img src={lv7} style={{ display: 'block', width: '70px',cursor:'pointer' }} id="lv7" onClick={() => { this.flv7(); this.socket.emit('showframestouser', { workfun: 2006, room: this.state.meetingid }) }}></img> */}
                </div>
              </div>
              {this.state.openGreenScreenContainer !== "" ? (
                <div
                  style={{
                    position: "absolute",
                    left: "83vw",
                    top: "15vh",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 5,
                  }}
                >
                  <button
                    onClick={() => {
                      this.setState({ openGreenScreenContainer: "" });
                    }}
                  >
                    Close
                  </button>
                  <img
                    src={ogs1}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="ogs1"
                    onClick={() => {
                      this.ogs1();
                      this.setState({ gsworkfunforuser: 7014 });
                      this.socket.emit("showframestouser", {
                        workfun: 7014,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                  <img
                    src={ogs2}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="ogs2"
                    onClick={() => {
                      this.ogs2();
                      this.setState({ gsworkfunforuser: 7015 });
                      this.socket.emit("showframestouser", {
                        workfun: 7015,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <img
                    src={ogs3}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="ogs3"
                    onClick={() => {
                      this.ogs3();
                      this.setState({ gsworkfunforuser: 7016 });
                      this.socket.emit("showframestouser", {
                        workfun: 7016,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <img
                    src={ogs4}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="ogs4"
                    onClick={() => {
                      this.ogs4();
                      this.setState({ gsworkfunforuser: 7017 });
                      this.socket.emit("showframestouser", {
                        workfun: 7017,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>

                  <img
                    src={ogs5}
                    style={{
                      display: "block",
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    id="ogs5"
                    onClick={() => {
                      this.ogs5();
                      this.setState({ gsworkfunforuser: 7018 });
                      this.socket.emit("showframestouser", {
                        workfun: 7018,
                        room: this.state.meetingid,
                      });
                    }}
                  ></img>
                </div>
              ) : null}

              <div
                id="frameforjcm"
                style={{
                  display: "none",
                  position: "absolute",
                  left: "90vw",
                  top: "40vh",
                }}
              >
                <img
                  src={jcm1}
                  style={{ display: "block", width: "70px", cursor: "pointer" }}
                  id="jcm1"
                  onClick={() => {
                    this.jcm1();
                    this.socket.emit("showframestouser", {
                      workfun: 1001,
                      room: this.state.meetingid,
                    });
                  }}
                ></img>
              </div>
              <div
                id="frameforkj"
                style={{
                  display: "none",
                  position: "absolute",
                  left: "90vw",
                  top: "40vh",
                }}
              >
                <img
                  src={kjk1}
                  style={{ display: "block", width: "70px", cursor: "pointer" }}
                  id="kjk1"
                  onClick={() => {
                    this.kjk1();
                    this.socket.emit("showframestouser", {
                      workfun: 1002,
                      room: this.state.meetingid,
                    });
                  }}
                ></img>
              </div>

              <div
                id="frameforcpalmer"
                style={{
                  display: "none",
                  position: "absolute",
                  left: "90vw",
                  top: "40vh",
                }}
              >
                <img
                  src={cpalmer1}
                  style={{ display: "block", width: "70px", cursor: "pointer" }}
                  id="cpalmer1"
                  onClick={() => {
                    this.cpalmer1();
                    this.socket.emit("showframestouser", {
                      workfun: 1003,
                      room: this.state.meetingid,
                    });
                  }}
                ></img>
              </div>

              {/* <div
            id="frameforkjkulaga"
            style={{
              display: "none",
              position: "absolute",
              left: "90vw",
              top: "40vh",
            }}
          >
            <img
              src={kjkulaga1}
              style={{ display: "block", width: "70px", cursor: "pointer" }}
              id="kjkulaga1"
              onClick={() => {
                this.kjkulaga1();
                this.socket.emit("showframestouser", {
                  workfun: 1004,
                  room: this.state.meetingid,
                });
              }}
            ></img>
          </div> */}

              {this.state.emojicontainer != "" ? (
                <div>
                  <div
                    className="divforemoji"
                    style={{
                      position: "absolute",
                      zIndex: 100,
                      borderRadius: "10px",
                      backgroundColor: "#033a5a",
                      top: "40vh",
                      left: "0px",
                      border: " 1px solid #2e2e4c",
                      boxShadow:
                        "3px 9px 16px rgba(152, .149, .149, 0.4) ,-3px -3px 10px rgba(255, .255, .255, 0.06),inset 14px 14px 26px rgb(0, .0, .0, 0.3),inset -3px -3px 15px rgba(206, .196, .196, 0.05)",
                    }}
                  >
                    <span>
                      <CancelIcon
                        style={{
                          cursor: "pointer",
                          fontSize: "3rem",
                          color: "white",
                        }}
                        onClick={() =>
                          this.setState({
                            emojicontainer: "",
                          })
                        }
                      />
                    </span>
                    <br></br>
                    <img
                      src={verolove1}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="verolove1"
                      onClick={() => {
                        this.verolove1();
                        this.socket.emit("showframestouser", {
                          workfun: 5001,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={verolove2}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="verolove2"
                      onClick={() => {
                        this.verolove2();
                        this.socket.emit("showframestouser", {
                          workfun: 5002,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={veroquestion}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="veroquestion"
                      onClick={() => {
                        this.veroquestion();
                        this.socket.emit("showframestouser", {
                          workfun: 5003,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={verosmile}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="verosmile"
                      onClick={() => {
                        this.verosmile();
                        this.socket.emit("showframestouser", {
                          workfun: 5004,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={verothinking}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="verothinking"
                      onClick={() => {
                        this.verothinking();
                        this.socket.emit("showframestouser", {
                          workfun: 5005,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={verothumbsup}
                      style={{
                        display: "block",
                        width: "30px",
                        cursor: "pointer",
                      }}
                      id="verothumbsup"
                      onClick={() => {
                        this.verothumbsup();
                        this.socket.emit("showframestouser", {
                          workfun: 5006,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                  </div>
                </div>
              ) : null}

              {/* public fraMES for recording */}

              {this.state.publicframesforrecording != "" ? (
                <div
                  className="wrapper"
                  style={{
                    zIndex: "9999999",
                    top: "25vh",
                    left: "72vw",
                    backgroundColor: "#033a5a",
                    maxWidth: "126px",
                    maxHeight: "316px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                      width: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        lvshow: "",
                      });
                      this.socket.emit("showframestouser", {
                        workfun: 0,
                        room: this.state.meetingid,
                      });
                    }}
                  >
                    Reset
                  </button>
                  <div
                    id="publicframes"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      backgroundColor: "white",
                      overflowY: "auto",
                      maxWidth: "125px",
                      maxHeight: "300px",
                    }}
                  >
                    <img
                      src={pf1}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv1"
                      onClick={() => {
                        this.pf1();
                        this.socket.emit("showframestouser", {
                          workfun: 1,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf2}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv2"
                      onClick={() => {
                        this.pf2();
                        this.socket.emit("showframestouser", {
                          workfun: 2,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf3}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv3"
                      onClick={() => {
                        this.pf3();
                        this.socket.emit("showframestouser", {
                          workfun: 3,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf4}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv40"
                      onClick={() => {
                        this.pf4();
                        this.socket.emit("showframestouser", {
                          workfun: 4,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf5}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv5"
                      onClick={() => {
                        this.pf5();
                        this.socket.emit("showframestouser", {
                          workfun: 5,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf6}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv6"
                      onClick={() => {
                        this.pf6();
                        this.socket.emit("showframestouser", {
                          workfun: 6,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf7}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv7"
                      onClick={() => {
                        this.pf7();
                        this.socket.emit("showframestouser", {
                          workfun: 7,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf8}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv8"
                      onClick={() => {
                        this.pf8();
                        this.socket.emit("showframestouser", {
                          workfun: 8,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf9}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv9"
                      onClick={() => {
                        this.pf9();
                        this.socket.emit("showframestouser", {
                          workfun: 9,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf10}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv10"
                      onClick={() => {
                        this.pf10();
                        this.socket.emit("showframestouser", {
                          workfun: 10,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pf11}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="lv11"
                      onClick={() => {
                        this.pf11();
                        this.socket.emit("showframestouser", {
                          workfun: 11,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>

                    <h5>background</h5>
                    <img
                      src={pbg}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="pbg"
                      onClick={() => {
                        this.pbg();
                        this.socket.emit("showframestouser", {
                          workfun: 12,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pbg1}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="pbg1"
                      onClick={() => {
                        this.pbg1();
                        this.socket.emit("showframestouser", {
                          workfun: 13,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pbg2}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="pbg2"
                      onClick={() => {
                        this.pbg2();
                        this.socket.emit("showframestouser", {
                          workfun: 14,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pbg3}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="pbg3"
                      onClick={() => {
                        this.pbg3();
                        this.socket.emit("showframestouser", {
                          workfun: 15,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <img
                      src={pbg4}
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                      id="pbg4"
                      onClick={() => {
                        this.pbg4();
                        this.socket.emit("showframestouser", {
                          workfun: 16,
                          room: this.state.meetingid,
                        });
                      }}
                    ></img>
                    <h5>greenScreen</h5>
                    {/* <img src={gsbg11} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="gsbg11" onClick={() => { this.gsbg11(); this.setState({ gsworkfunforuser: 70011 }); this.socket.emit('showframestouser', { workfun: 7011, room: this.state.meetingid }) }}></img> */}

                    {/* <img src={pf12} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv12" onClick={() => { this.pf12(); this.socket.emit('showframestouser', { workfun: 12, room: this.state.meetingid }) }}></img>
                                    <img src={pf13} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv13" onClick={() => { this.pf13(); this.socket.emit('showframestouser', { workfun: 13, room: this.state.meetingid }) }}></img>
                                    <img src={pf14} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv14" onClick={() => { this.pf14(); this.socket.emit('showframestouser', { workfun: 14, room: this.state.meetingid }) }}></img>
                                    <img src={pf15} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv15" onClick={() => { this.pf15(); this.socket.emit('showframestouser', { workfun: 15, room: this.state.meetingid }) }}></img>
                                    <img src={pf16} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv16" onClick={() => { this.pf16(); this.socket.emit('showframestouser', { workfun: 16, room: this.state.meetingid }) }}></img>
                                    <img src={pf17} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv17" onClick={() => { this.pf17(); this.socket.emit('showframestouser', { workfun: 17, room: this.state.meetingid }) }}></img>
                                    <img src={pf18} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv18" onClick={() => { this.pf18(); this.socket.emit('showframestouser', { workfun: 18, room: this.state.meetingid }) }}></img>
                                    <img src={pf19} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv19" onClick={() => { this.pf19(); this.socket.emit('showframestouser', { workfun: 19, room: this.state.meetingid }) }}></img>
                                    <img src={pf20} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv20" onClick={() => { this.pf20(); this.socket.emit('showframestouser', { workfun: 20, room: this.state.meetingid }) }}></img>
                                    <img src={pf21} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv21" onClick={() => { this.pf21(); this.socket.emit('showframestouser', { workfun: 21, room: this.state.meetingid }) }}></img>
                                    <img src={pf22} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv22" onClick={() => { this.pf22(); this.socket.emit('showframestouser', { workfun: 22, room: this.state.meetingid }) }}></img>
                                    <img src={pf23} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv23" onClick={() => { this.pf23(); this.socket.emit('showframestouser', { workfun: 23, room: this.state.meetingid }) }}></img>
                                    <img src={pf24} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv24" onClick={() => { this.pf24(); this.socket.emit('showframestouser', { workfun: 24, room: this.state.meetingid }) }}></img>
                                    <img src={pf25} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv25" onClick={() => { this.pf25(); this.socket.emit('showframestouser', { workfun: 25, room: this.state.meetingid }) }}></img>
                                    <img src={pf26} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv26" onClick={() => { this.pf26(); this.socket.emit('showframestouser', { workfun: 26, room: this.state.meetingid }) }}></img>
                                    <img src={pf27} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv27" onClick={() => { this.pf27(); this.socket.emit('showframestouser', { workfun: 27, room: this.state.meetingid }) }}></img>
                                    <img src={pf28} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv28" onClick={() => { this.pf28(); this.socket.emit('showframestouser', { workfun: 28, room: this.state.meetingid }) }}></img>
                                    <img src={pf29} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv29" onClick={() => { this.pf29(); this.socket.emit('showframestouser', { workfun: 29, room: this.state.meetingid }) }}></img>
                                    <img src={pf30} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv30" onClick={() => { this.pf30(); this.socket.emit('showframestouser', { workfun: 30, room: this.state.meetingid }) }}></img>
                                    <img src={pf31} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv31" onClick={() => { this.pf31(); this.socket.emit('showframestouser', { workfun: 31, room: this.state.meetingid }) }}></img>
                                    <img src={pf32} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv32" onClick={() => { this.pf32(); this.socket.emit('showframestouser', { workfun: 32, room: this.state.meetingid }) }}></img>
                                    <img src={pf33} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv33" onClick={() => { this.pf33(); this.socket.emit('showframestouser', { workfun: 33, room: this.state.meetingid }) }}></img>
                                    <img src={pf34} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv34" onClick={() => { this.pf34(); this.socket.emit('showframestouser', { workfun: 34, room: this.state.meetingid }) }}></img>
                                    <img src={pf35} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv35" onClick={() => { this.pf35(); this.socket.emit('showframestouser', { workfun: 35, room: this.state.meetingid }) }}></img>
                                    <img src={pf36} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv36" onClick={() => { this.pf36(); this.socket.emit('showframestouser', { workfun: 36, room: this.state.meetingid }) }}></img>
                                    <img src={pf37} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv37" onClick={() => { this.pf37(); this.socket.emit('showframestouser', { workfun: 37, room: this.state.meetingid }) }}></img>
                                    <img src={pf38} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv38" onClick={() => { this.pf38(); this.socket.emit('showframestouser', { workfun: 38, room: this.state.meetingid }) }}></img>
                                    <img src={pf39} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv39" onClick={() => { this.pf39(); this.socket.emit('showframestouser', { workfun: 39, room: this.state.meetingid }) }}></img>
                                    <img src={pf40} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv40" onClick={() => { this.pf40(); this.socket.emit('showframestouser', { workfun: 40, room: this.state.meetingid }) }}></img>
                                    <img src={pf41} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv41" onClick={() => { this.pf41(); this.socket.emit('showframestouser', { workfun: 41, room: this.state.meetingid }) }}></img>
                                    <img src={pf42} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv42" onClick={() => { this.pf42(); this.socket.emit('showframestouser', { workfun: 42, room: this.state.meetingid }) }}></img>
                                    <img src={pf43} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv43" onClick={() => { this.pf43(); this.socket.emit('showframestouser', { workfun: 43, room: this.state.meetingid }) }}></img>
                                    <img src={pf44} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv44" onClick={() => { this.pf44(); this.socket.emit('showframestouser', { workfun: 44, room: this.state.meetingid }) }}></img>
                                    <img src={pf45} style={{ display: 'block', width: '100px', height: '100px', margin: '5px' }} id="lv45" onClick={() => { this.pf45(); this.socket.emit('showframestouser', { workfun: 45, room: this.state.meetingid }) }}></img>
 */}
                  </div>

                  <span>
                    <button
                      style={{
                        cursor: "pointer",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        width: "45px",
                      }}
                      onClick={() =>
                        this.setState({
                          publicframesforrecording: "",
                        })
                      }
                    >
                      Close
                    </button>
                  </span>
                </div>
              ) : null}

              <img
                src={this.state.bgshow}
                style={{
                  display: "block",
                  width: "100%",
                  position: "absolute",
                  left: "0%",

                  maxHeight: "578px",
                  zIndex: "-5",
                }}
                id="bgshow"
              ></img>
              <img
                src={this.state.lvshow}
                style={{
                  display: "block",
                  // width: "100vw",
                  width: "100%",
                  position: "absolute",
                  // left: "-40px",
                  left: "0%",
                  // top: "-27px",
                  maxHeight: "578px",
                  zIndex: "-5",
                }}
                id="lv4"
              ></img>
              <img
                src={this.state.socialOverlay}
                style={{
                  display: "block",
                  width: "425px",
                  maxHeight: "50px",
                  position: "absolute",
                  left: "90px",
                  top: "420px",
                  zIndex: "999999999",
                  opacity: "80%",
                }}
                id="socialOverlay"
              ></img>
              <img
                src={this.state.imgSideOverlay}
                style={{
                  display: "block",
                  width: "200px",
                  position: "absolute",
                  left: "1050px",
                  top: "10px",
                  maxHeight: "200px",
                  zIndex: "99999999",
                  opacity: "70%",
                }}
                id="imgSideOverlay"
              ></img>
              <img
                src={this.state.imgLowerSideOverlay}
                style={{
                  display: "block",
                  width: "200px",
                  position: "absolute",
                  left: "1050px",
                  top: "360px",
                  maxHeight: "100px",
                  zIndex: "99999999",
                  opacity: "70%",
                }}
                id="imgLowerSideOverlay"
              ></img>
              <img
                src={this.state.imgHorizontalOverlay}
                style={{
                  display: "block",
                  width: "700px",
                  maxHeight: "50px",
                  position: "absolute",
                  left: "250px",
                  top: "502px",
                  zIndex: "-5",
                  opacity: "70%",
                }}
                id="imgHorizontalOverlay"
              ></img>
              <img
                src={this.state.liveLogo}
                style={{
                  display: "block",
                  width: "150px",
                  maxHeight: "90px",
                  position: "absolute",
                  left: "350px",
                  top: "10px",
                  zIndex: "5",
                  opacity: "70%",
                }}
                id="liveLogo"
              ></img>
              {/* <img
            src={this.state.liveLogo2}
            style={{
              display: "block",
              width: "150px",
              maxHeight: "90px",
              position: "absolute",
              left: "350px",
              top: "10px",
              zIndex: "5",
              opacity: "70%",
            }}
            id="liveLogo2"
          ></img>
           <img
            src={this.state.liveLogo3}
            style={{
              display: "block",
              width: "150px",
              maxHeight: "90px",
              position: "absolute",
              left: "350px",
              top: "10px",
              zIndex: "5",
              opacity: "70%",
            }}
            id="liveLogo3"
          ></img> */}

              {this.state.recordingOverlayTextWrapper != "" ? (
                <>
                  <p
                    style={{
                      position: "absolute",
                      left: "260px",
                      top: "490px",
                      color: this.state.textColorPicker,
                      fontWeight: "bold",
                      fontSize: "25px",
                      minWidth: "700px",
                    }}
                  >
                    {this.state.recordingText}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      left: "-60px",
                      top: "424px",
                      color: this.state.socialTextColor,
                      fontWeight: "bold",
                      fontSize: "16px",
                      minWidth: "400px",
                      zIndex: "9999999999",
                    }}
                  >
                    {this.state.socialText}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      left: "1080px",
                      top: "10px",
                      color: this.state.textColorPicker2,
                      fontWeight: "bold",
                      fontSize: "20px",
                      width: "145px",
                      wordBreak: "break-word",
                      zIndex: "99999999",
                      textAlign: "left",
                    }}
                  >
                    {this.state.recordingText2}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      left: "1080px",
                      top: "370px",
                      color: this.state.textColorPicker3,
                      fontWeight: "bold",
                      fontSize: "20px",
                      width: "145px",
                      wordBreak: "break-word",
                      zIndex: "99999999",
                      textAlign: "left",
                    }}
                  >
                    {this.state.recordingText3}
                  </p>
                </>
              ) : null}

              <img
                src={this.state.gsshow}
                style={{
                  display: "block",
                  width: "1px",
                  position: "absolute",
                  left: "-40px",
                  top: "-27px",
                  maxHeight: "1px",
                  zIndex: "-50",
                }}
                id="gsshow"
              ></img>

              <img
                src={this.state.emojis}
                style={{
                  display: "block",
                  width: "70px",
                  position: "absolute",
                  left: "22vw",
                  top: "27vh",
                  zIndex: "10",
                }}
                id="lv4"
              ></img>
              <img
                style={{
                  display: "block",
                  width: "100vw",
                  position: "absolute",
                  left: "-40px",
                  top: "-27px",
                  maxHeight: "578px",
                  zIndex: "5",
                }}
                id="chatmediaimage"
              ></img>

              <div
                id="hostcontrolsdiv"
                className="hostcontrol_style"
                style={this.state.hostview}
              >
                <ul
                  className="hostControl_ul"
                  style={{
                    position: "absolute",
                    left: "90vw",
                    top: "40vh",
                    right: "0px",
                    width: "40px",
                  }}
                >
                  {/* <MuiThemeProvider theme={theme}>
                                <Tooltip title="roomView"><li style={{ fontStyle: 'none', backgroundColor: 'black' }}>
                                    <i id="roomView" style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }} class='material-icons' >toggle_off</i>

                                </li></Tooltip>

                            </MuiThemeProvider>
                            <MuiThemeProvider theme={theme}>
                                <Tooltip title="hostView"><li style={{ fontStyle: 'none', backgroundColor: 'black' }}>
                                    <i id="hostView" style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }} class='material-icons' >toggle_on</i>

                                </li></Tooltip>

                            </MuiThemeProvider> */}
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="RECORDING GUIDE">
                      <li style={{ fontStyle: "none" }}>
                        <img
                          src={infoicon}
                          style={{
                            width: "30px",
                            marginTop: "7px",
                            cursor: "pointer",
                          }}
                          // onClick={() => {
                          //   this.recordinfo();
                          // }}
                          onClick={() => {
                            this.handleClickOpen();
                          }}
                        ></img>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  <li
                    style={{
                      display: "none",
                      fontStyle: "none",
                      // backgroundColor: "#033a5a",
                    }}
                  >
                    {" "}
                    <i
                      id="hostview"
                      style={{
                        cursor: "pointer",
                        padding: 2,
                        fontSize: "26px",
                        marginTop: "12px",
                      }}
                      class="material-icons"
                    >
                      visibility
                    </i>
                  </li>

                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Recording">
                      <li style={{ fontStyle: "none" }}>
                        <i
                          id="recordBtn"
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            fontSize: "30px",
                          }}
                          class="material-icons"
                          disabled
                        >
                          radio_button_checked
                        </i>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Stop Recording">
                      <li
                        id="stopbtnrecord"
                        style={{
                          fontStyle: "none",
                          display: "none",
                          // backgroundColor: "#033a5a",
                        }}
                      >
                        <i
                          id="stopButton"
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            fontSize: "30px",
                            color: "red",
                          }}
                          class="material-icons"
                        >
                          radio_button_checked
                        </i>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Download">
                      <li style={{ fontStyle: "none" }}>
                        <a
                          id="downloadButton"
                          style={{ display: "none", color: "white" }}
                        >
                          <i
                            style={{
                              cursor: "pointer",
                              marginTop: "12px",
                              fontSize: "30px",
                              color: "blue",
                            }}
                            class="material-icons"
                          >
                            cloud_download
                          </i>
                        </a>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Overlays">
                      <li style={{ fontStyle: "none" }}>
                        <img
                          src={overlaysimg}
                          id="framesettings"
                          style={{ cursor: "pointer", width: "30px" }}
                          onClick={() => {
                            this.makeframesvisible();
                          }}
                        ></img>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Personal">
                      <li style={{ fontStyle: "none" }}>
                        <img
                          src={veroPersonal}
                          id="Personalframesettings"
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            width: "30px",
                          }}
                          onClick={() => {
                            this.makepersonalframesvisible();
                          }}
                        ></img>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  {/* <MuiThemeProvider theme={theme}>
                <Tooltip title="GreenScreen">
                  <li style={{ fontStyle: "none", backgroundColor: "black" }}>
                    <i
                      id="enableGreenScreen"
                      style={{
                        cursor: "pointer",
                        marginTop: "12px",
                        fontSize: "30px",
                        color: "red",
                        display: "none",
                      }}
                      class="material-icons"
                    >
                      wallpaper
                    </i>
                  </li>
                </Tooltip>
              </MuiThemeProvider> */}
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Show Recording">
                      <li style={{ fontStyle: "none" }}>
                        <i
                          id="showRecBtn"
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            fontSize: "30px",
                            color: "yellow",
                          }}
                          class="material-icons"
                        >
                          ondemand_video
                        </i>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Recording text overlay">
                      <li style={{ fontStyle: "none" }}>
                        <button
                          id="Recording text overlay"
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            fontSize: "30px",
                            color: "yellow",
                            backgroundColor: "#033a5a",
                            border: "none",
                            width: "auto",
                            outline: "none",
                          }}
                          onClick={() => {
                            if (this.state.recordingOverlayTextWrapper !== "") {
                              if (
                                document.getElementById(
                                  "divforrecordingoverlayinput"
                                ).style.display == "none"
                              ) {
                                document.getElementById(
                                  "divforrecordingoverlayinput"
                                ).style.display = "block";
                              }
                            }

                            this.setState({
                              recordingOverlayTextWrapper: "show",
                            });
                          }}
                        >
                          T
                        </button>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>

                  {/* <button id="enableGreenScreen">GS</button> */}

                  {/* <button id="textoverlaybtn" style={{ display: 'none' }}></button> */}
                  {/* <MuiThemeProvider theme={theme}>
                                <Tooltip title="PersonalFrames"><li style={{ fontStyle: 'none', backgroundColor: 'black' }}>
                                    <i style={{ cursor: 'pointer', marginTop: '12px', width: '30px' }}
                                        onClick={() => {
                                            //  this.userinfoRecording('sky1999')
                                            this.setState({
                                                personalframes: 'showme'
                                            })
                                        }} class='material-icons' >folder_shared</i>

                                </li></Tooltip>

                            </MuiThemeProvider> */}
                </ul>
              </div>
              {this.state.waiters.map((waiter) => (
                <div
                  key={waiter.id}
                  className="wrapper"
                  style={{ maxWidth: "130px", top: "18vh", left: "72vw" }}
                >
                  {waiter.name} is in reception area
                </div>
              ))}
            </div>

            <div
              id="hangupscreen"
              style={{
                display: "none",
                position: "absolute",
                top: "40%",
                left: "30%",
                marginTop: "210px",
              }}
            >
              {/* <div className="header">
                        <img src={logo} className='logo-vero'></img>




                    </div> */}
              <h3>You have successfully disconnected the meeting</h3>
              <br></br>
              <hr></hr>
              <li>
                <a
                  className=" btn-profile "
                  onClick={() => this.Home()}
                  id="gotodashboardafterhangup"
                >
                  Back To Dashboard
                </a>
              </li>
              <br></br>
              <hr></hr>
              <h5>Powered By VeroHive</h5>
              <img src={logo} className="logo-vero-disconnect"></img>
              <div className="footer" style={{ height: "50px", zIndex: "10" }}>
                MegaHoot Technologies, Inc All Rights Reserved
              </div>
            </div>

            {this.state.download ? (
              <li>
                <button
                  className="btn btn-downloadfile "
                  onClick={() => this.downloadFile()}
                >
                  Download file
                </button>
              </li>
            ) : null}

            {this.state.recievedchat != "" ? (
              <div
                style={{
                  zIndex: "10000000",

                  borderRadius: "20px",
                  padding: "10px",
                  position: "absolute",
                  top: "11% ",
                  left: "64%",
                  backgroundColor: "#033a5a",
                  border: "1px solid #2e2e4c",
                  textAlign: "center",
                  boxShadow:
                    "3px 9px 16px rgba(152, .149, .149, 0.4) ,-3px -3px 10px rgba(255, .255, .255, 0.06),inset 14px 14px 26px rgb(0, .0, .0, 0.3),inset -3px -3px 15px rgba(206, .196, .196, 0.05)",
                }}
              >
                <span>
                  {" "}
                  {this.state.recievedchat}
                  <br></br>from<br></br>
                  {this.state.recievedchatfromuser}
                </span>
                <span>
                  <button
                    onClick={() =>
                      this.setState({
                        recievedchatfromuser: "",
                        recievedchat: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.handraisebox != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "#663399",
                  borderRadius: "20px",
                  padding: "10px",
                  position: "absolute",
                  top: "77%",
                  left: "10%",
                }}
              >
                <span>
                  {" "}
                  {this.state.handraisebox}
                  <br></br>Raising Hand<br></br>
                </span>
                <span>
                  {" "}
                  <i
                    style={{
                      padding: 2,
                      color: "yellow",
                      fontSize: "50px",
                      marginTop: "12px",
                    }}
                    class="material-icons"
                  >
                    emoji_people
                  </i>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        handraisebox: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}
            {this.state.newpersonalmessage != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.newpersonalmessage}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        newpersonalmessage: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.invitationsentsuccessfully != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "11% ",
                  left: "64%",
                  backgroundColor: "#033a5a",
                  border: "1px solid #2e2e4c",
                  textAlign: "center",
                  boxShadow:
                    "3px 9px 16px rgba(152, .149, .149, 0.4) ,-3px -3px 10px rgba(255, .255, .255, 0.06),inset 14px 14px 26px rgb(0, .0, .0, 0.3),inset -3px -3px 15px rgba(206, .196, .196, 0.05)",
                  borderRadius: "10px",
                }}
              >
                <span style={{ color: "white" }}>
                  {" "}
                  {this.state.invitationsentsuccessfully}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                      fontSize: "1rem",
                      padding: "0.4rem",
                      marginTop: "10px",
                      borderRadius: "3px",
                    }}
                    onClick={() =>
                      this.setState({
                        invitationsentsuccessfully: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.invitationsentsuccessfullytocontact != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.invitationsentsuccessfullytocontact}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        invitationsentsuccessfullytocontact: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.usernameemoved != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.usernameemoved}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        usernameemoved: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.usernameentermessage != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.usernameentermessage}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        usernameentermessage: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.usernamemuted != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.usernamemuted}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        usernamemuted: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.infoboxcontainer != "" ? (
              <div className="wrapper" style={{ zIndex: "100000" }}>
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

            {this.state.sentmessageusersuccess != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.sentmessageusersuccess}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        sentmessageusersuccess: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            {this.state.yourprofilepicturechanged != "" ? (
              <div
                style={{
                  zIndex: "10000000",
                  backgroundColor: "white",
                  padding: "10px",
                  color: "grey",
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "10%",
                  left: "40%",
                }}
              >
                <span>
                  {" "}
                  {this.state.yourprofilepicturechanged}
                  <br></br>
                </span>
                <span>
                  <button
                    style={{
                      backgroundColor: "#4FADD3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      this.setState({
                        yourprofilepicturechanged: "",
                      })
                    }
                  >
                    OK
                  </button>
                </span>
              </div>
            ) : null}

            <div>
              <div
                className="filebar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <button onClick={closeMenufile} className="filebar-close-btn">
                  X
                </button>

                <input
                  name="image"
                  type="file"
                  style={{ width: "88px", marginTop: "45px" }}
                  onChange={(e) => {
                    this.setState({ image: e.currentTarget.files[0] });
                  }}
                />

                <button
                  className="btn btn-sendfile"
                  style={{ marginTop: "0" }}
                  onClick={() => this.readThenSendFile(this.state.image)}
                >
                  send file
                </button>
              </div>
              <div className="invitebar">
                <button onClick={closeInvite} className="invitebar-close-btn">
                  X
                </button>
                <div className="name">
                  <h4>
                    Enter email: <span style={{ color: "red" }}>*</span>
                  </h4>
                  <input
                    type="text"
                    name="emailinvite"
                    placeholder="Email"
                    ref="emailinvite"
                    onChange={this.onChange}
                  />
                </div>
                <button
                  onClick={() => this.inviteHandler()}
                  style={{
                    backgroundColor: "green",
                    border: "none",
                    color: "white",
                    outline: "none",
                  }}
                >
                  Invite
                </button>
                <br></br>
                <hr></hr>
                <h4>Contacts</h4>
                <div>
                  {this.state.following && this.state.following.length > 0
                    ? this.state.following.map((value, index) => {
                        if (index < 100) {
                          return (
                            <div style={{ backgroundColor: "#663399" }}>
                              <span>
                                {" "}
                                {value.fullnamerequested ==
                                this.state.firstname + this.state.lastname
                                  ? value.fullnameaccepted
                                  : value.fullnamerequested}
                              </span>
                              <span>
                                {value.emailrequested == this.state.email ? (
                                  <button
                                    onClick={() =>
                                      this.sendemail(value.emailaccepted)
                                    }
                                    style={{
                                      backgroundColor: "green",
                                      border: "none",
                                      color: "white",
                                      outline: "none",
                                    }}
                                  >
                                    Invite
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      this.sendemail(value.emailrequested)
                                    }
                                    style={{
                                      backgroundColor: "green",
                                      border: "none",
                                      color: "white",
                                      outline: "none",
                                    }}
                                  >
                                    Invite
                                  </button>
                                )}
                              </span>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              </div>

              <div className="userbar">
                <button onClick={closeUserMenu} className="userbar-close-btn">
                  X
                </button>
                <h3>Reception Area</h3>

                {this.state.waiters.map((waiter) => (
                  <div key={waiter.id}>
                    {waiter.name}
                    <button
                      type="button"
                      onClick={() => this.youcancome(waiter)}
                    >
                      ALLOW IN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.socket.emit("requestRejected", waiter);
                        this.setState({
                          waiters: this.state.waiters.filter(
                            (user) => user !== waiter
                          ),
                        });
                      }}
                    >
                      Reject
                    </button>
                  </div>
                ))}
                <hr></hr>

                <h3>Attendee List</h3>
                {this.state.attendees.map((attendee, index) => (
                  <div key={index}>
                    {this.state.meetingperson == "host" ? (
                      <span>
                        <span>{attendee.name}</span>
                        <i
                          style={{
                            cursor: "pointer",
                            padding: 2,
                            color: "blue",
                            fontSize: "15px",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            margin: "2px",
                          }}
                          class="material-icons"
                          onClick={() => {
                            this.socket.emit("camoffhimfrommeeting", attendee);
                          }}
                        >
                          videocam_off
                        </i>
                        <i
                          style={{
                            cursor: "pointer",
                            padding: 2,
                            color: "blue",
                            fontSize: "15px",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            margin: "2px",
                          }}
                          class="material-icons"
                          onClick={() => {
                            this.socket.emit("mutehimfrommeeting", attendee);
                          }}
                        >
                          mic_off
                        </i>
                        <i
                          style={{
                            cursor: "pointer",
                            padding: 2,
                            fontSize: "25px",
                            margin: "2px",
                          }}
                          class="material-icons"
                          onClick={() => {
                            this.openModal(attendee.username);
                          }}
                        >
                          account_circle
                        </i>

                        <i
                          style={{
                            cursor: "pointer",
                            padding: 2,
                            color: "red",
                            fontSize: "15px",
                            backgroundColor: "white",
                            borderRadius: "20px",
                          }}
                          class="material-icons"
                          onClick={() => {
                            this.socket.emit("hanguphimfrommeeting", attendee);

                            this.setState({
                              attendees: this.state.attendees.filter(
                                (Attendeeslist) => Attendeeslist !== attendee
                              ),
                            });
                          }}
                        >
                          call_end
                        </i>
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <aside className="chatbar">
                <button onClick={closeMenu} className="chatbar-close-btn">
                  CLOSE
                </button>

                <div class="container" id="chatcontainer"></div>
                <div className="file_input">
                  <input
                    name="image"
                    type="file"
                    style={{ width: "88px" }}
                    onChange={(e) => {
                      this.setState({ image: e.currentTarget.files[0] });
                    }}
                    style={{ fontSize: "1rem" }}
                  />

                  <button
                    className="btn btn-sendfile"
                    style={{ marginTop: "0" }}
                    onClick={() => this.readThenSendFile(this.state.image)}
                  >
                    send file
                  </button>
                </div>

                <div className="send">
                  <form action="#" id="send-container">
                    <input
                      type="text"
                      name="messageInp"
                      id="messageInp"
                      style={{ fontSize: "2rem" }}
                    />
                    <button
                      className="btn-text-send"
                      style={{
                        cursor: "pointer",
                        fontSize: "30px",
                        marginTop: "10px",
                      }}
                      class="material-icons"
                    >
                      send
                    </button>
                  </form>
                </div>
              </aside>
            </div>

            <br />
            <div style={{ marginTop: "20vh", marginLeft: "32vh" }}>
              <Overlay
                open={this.state.open}
                onClose={() =>
                  this.setState({
                    open: false,
                  })
                }
                closeOnClick
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  alignitems: "center",
                  justifycontent: "center",
                }}
              >
                {/* modal for public profile */}
                <div>
                  <div
                    className="profile-container"
                    style={{
                      backgroundColor: "white",
                      height: "140vh",
                      width: "60%",
                      right: "25%",
                    }}
                  >
                    {/* <h3>your Public profile</h3> */}
                    <ul>
                      <button
                        onClick={() =>
                          this.setState({
                            open: false,
                          })
                        }
                      >
                        Close
                      </button>
                      <div className="modal-public-profile-pic">
                        <div
                          style={{
                            width: "100px",
                            height: "90px",
                            backgroundColor: "#034063",
                            marginTop: "30%",
                            marginLeft: "15%",
                          }}
                        >
                          {this.state.image1 ? (
                            <img
                              src={this.state.image1}
                              style={{ width: "100px", height: "90px" }}
                            />
                          ) : (
                            <div></div>
                          )}
                        </div>

                        <ul>
                          <h2>
                            <li>
                              {this.state.firstname} {this.state.lastname}
                              {this.state.verified == "a" ? (
                                <img style={{ width: "25px" }} src={a}></img>
                              ) : null}
                              {this.state.verified == "b" ? (
                                <img style={{ width: "25px" }} src={b}></img>
                              ) : null}
                              {this.state.verified == "g" ? (
                                <img style={{ width: "25px" }} src={g}></img>
                              ) : null}
                              {this.state.verified == "p" ? (
                                <img style={{ width: "25px" }} src={p}></img>
                              ) : null}
                              {this.state.verified == "r" ? (
                                <img style={{ width: "25px" }} src={r}></img>
                              ) : null}
                              {this.state.verified == "y" ? (
                                <img style={{ width: "25px" }} src={y}></img>
                              ) : null}
                            </li>
                          </h2>
                          <ul
                            style={{
                              marginTop: "-15px",
                              marginLeft: "-30px",
                              textAlign: "start",
                            }}
                          >
                            <li>Username:{this.state.username}</li>

                            <li>Organization: {this.state.organization}</li>

                            <li>Country: {this.state.country}</li>
                            <li>City: {this.state.city}</li>
                          </ul>
                        </ul>
                      </div>
                      <br></br>
                      <div className="biolinksModal">
                        <h4 style={{ color: "grey" }}>Bio</h4>
                        <ul style={{ height: "10vh", color: "blue" }}>
                          {/* <li>Email :{this.state.email}</li> */}
                          {/* <Linkify componentDecorator={componentDecorator}>  <li>Links: {this.state.links} </li></Linkify> */}
                          <li>{this.state.bio}</li>
                        </ul>
                      </div>
                      <br></br>
                      <div className="biolinksModal">
                        <h4 style={{ color: "grey" }}>Social Links</h4>
                        <ul style={{ minHeight: "10vh", color: "blue" }}>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Facebook} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.FacebookLive} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.LinkedIn} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Instagram} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Youtube} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.YoutubeLive} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Twitter} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Weblink1} </li>
                          </Linkify>
                          <Linkify componentDecorator={componentDecorator}>
                            {" "}
                            <li> {this.state.Weblink2} </li>
                          </Linkify>
                        </ul>
                      </div>
                    </ul>

                    <div className="footer">
                      {" "}
                      MegaHoot Technologies, Inc All Rights Reserved
                    </div>
                  </div>
                </div>
                {/* complete */}
              </Overlay>
            </div>
            {this.state.recordingOverlayTextWrapper != "" ? (
              <div
                style={{
                  zIndex: "100000000000",
                  backgroundColor: this.state.divColorPicker,
                  padding: "10px",
                  color: "grey",
                  fontSize: "2.4rem",
                  position: "absolute",
                  top: "60px",
                  left: "0",
                  width: "300px",
                  maxHeight: "550px",
                  overflow: "auto",
                }}
                id="divforrecordingoverlayinput"
              >
                <button
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    marginLeft: "217px",
                    width: "auto",
                    cursor: "pointer",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={() => {
                    document.getElementById(
                      "divforrecordingoverlayinput"
                    ).style.display = "none";

                    // this.setState({
                    //   imgHorizontalOverlay:'',
                    //   imgSideOverlay:'',
                    //   recordingText:'',
                    //   recordingText2:''

                    // })
                    // document.getElementById("recordingTextInput").value = null;
                    // document.getElementById("recordingTextInput2").value = null;

                    // document.getElementById("recordingTextInputColor").value = "";
                  }}
                >
                  X
                </button>
                <div style={{ border: "1px solid grey", padding: "5px" }}>
                  <img
                    src={liveLogo}
                    style={{
                      display: "block",
                      width: "40px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.liveLogo();
                    }}
                  ></img>
                  {/* <img
                src={liveLogo2}
                style={{
                  display: "block",
                  width: "40px",
                  maxHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  this.liveLogo2();
                }}
              ></img> */}
                  {/* <img
              src={liveLogo3}
              style={{
                display: "block",
                width: "40px",
                maxHeight: "50px",
                cursor: "pointer",
              }}
              onClick={() => {
                this.liveLogo3();
              }}
            ></img> */}
                </div>
                <h5>Bottom Overlay</h5>

                <textarea
                  style={{ width: "65%" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  maxlength="57"
                  name="recordingText"
                  placeholder="Enter Horozontal Overlay Text"
                />

                <textarea
                  style={{ width: "65%", display: "none" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  maxlength="57"
                  id="recordingTextInput"
                />
                <input
                  type="color"
                  id="recordingTextInputColor"
                  name="textColorPicker"
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "30px",
                    maxWidth: "20px",
                    outline: "none",
                  }}
                ></input>
                <br></br>

                <hr></hr>

                <div style={{ maxHeight: "150px", overflow: "auto" }}>
                  <img
                    src={HO1}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay1();
                    }}
                  ></img>
                  <img
                    src={HO2}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay2();
                    }}
                  ></img>
                  <img
                    src={HO3}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay3();
                    }}
                  ></img>
                  <img
                    src={HO4}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay4();
                    }}
                  ></img>
                  <img
                    src={HO5}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay5();
                    }}
                  ></img>
                  <img
                    src={HO6}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay6();
                    }}
                  ></img>
                  <img
                    src={HO7}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay7();
                    }}
                  ></img>
                  <img
                    src={HO8}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay8();
                    }}
                  ></img>
                  <img
                    src={HO9}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay9();
                    }}
                  ></img>
                  <img
                    src={HO10}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay10();
                    }}
                  ></img>
                  <img
                    src={HO11}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay11();
                    }}
                  ></img>
                  <img
                    src={HO12}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay12();
                    }}
                  ></img>
                  <img
                    src={HO13}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay13();
                    }}
                  ></img>
                  <img
                    src={HO14}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay14();
                    }}
                  ></img>
                  <img
                    src={HO15}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay15();
                    }}
                  ></img>
                  <img
                    src={HO16}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay16();
                    }}
                  ></img>
                  <img
                    src={HO17}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay17();
                    }}
                  ></img>
                  <img
                    src={HO18}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay18();
                    }}
                  ></img>
                  <img
                    src={HO19}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay19();
                    }}
                  ></img>
                  <img
                    src={HO20}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay20();
                    }}
                  ></img>
                  <img
                    src={HO21}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay21();
                    }}
                  ></img>
                  <img
                    src={HO22}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay22();
                    }}
                  ></img>
                  <img
                    src={HO23}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay23();
                    }}
                  ></img>
                  <img
                    src={HO24}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay24();
                    }}
                  ></img>
                  <img
                    src={HO25}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay25();
                    }}
                  ></img>
                  <img
                    src={HO26}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay26();
                    }}
                  ></img>
                  <img
                    src={HO27}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgHorizontalOverlay27();
                    }}
                  ></img>
                </div>
                <button
                  className="liveButton"
                  onClick={() => {
                    document.getElementById("recordingTextInput").value =
                      this.state.recordingText;
                    this.setState({
                      imgHorizontalOverlay: this.state.imgHorizontalOverlay1,
                    });
                  }}
                >
                  Live
                </button>
                <button
                  className="liveButton"
                  onClick={() => {
                    this.setState({
                      imgHorizontalOverlay: "",
                      imgHorizontalOverlay1: "",
                      recordingText: "",
                    });
                    document.getElementById("recordingTextInput").value = null;

                    document.getElementById("recordingTextInputColor").value =
                      "";
                  }}
                >
                  Stop
                </button>
                <hr></hr>
                <h5>Side Overlay</h5>
                <textarea
                  style={{ width: "65%" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  name="recordingText2"
                  placeholder="Enter side Overlay Text"
                  maxlength="80"
                />
                <textarea
                  style={{ width: "65%", display: "none" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  id="recordingTextInput2"
                  maxlength="80"
                />
                <input
                  type="color"
                  id="recordingTextInputColor2"
                  name="textColorPicker2"
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "30px",
                    maxWidth: "20px",
                    outline: "none",
                  }}
                ></input>
                <br></br>

                <hr></hr>

                <img
                  src={SO1}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay1();
                  }}
                ></img>
                <img
                  src={SO2}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay2();
                  }}
                ></img>
                <img
                  src={SO3}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay3();
                  }}
                ></img>
                <img
                  src={SO4}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay4();
                  }}
                ></img>
                <img
                  src={SO5}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay5();
                  }}
                ></img>
                <img
                  src={SO6}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay6();
                  }}
                ></img>
                <img
                  src={SO7}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay7();
                  }}
                ></img>
                <img
                  src={SO8}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay8();
                  }}
                ></img>
                <img
                  src={SO9}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay9();
                  }}
                ></img>
                <img
                  src={SO10}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay10();
                  }}
                ></img>
                <img
                  src={SO11}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay11();
                  }}
                ></img>
                <img
                  src={SO12}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay12();
                  }}
                ></img>
                <img
                  src={SO13}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay13();
                  }}
                ></img>
                <img
                  src={SO14}
                  style={{
                    display: "block",
                    width: "100px",
                    maxHeight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.imgSideOverlay14();
                  }}
                ></img>
                <button
                  className="liveButton"
                  onClick={() => {
                    document.getElementById("recordingTextInput2").value =
                      this.state.recordingText2;
                    this.setState({
                      imgSideOverlay: this.state.imgSideOverlay1,
                    });
                  }}
                >
                  Live
                </button>

                <button
                  className="liveButton"
                  onClick={() => {
                    this.setState({
                      imgSideOverlay: "",
                      imgSideOverlay1: "",
                      recordingText2: "",
                    });
                    document.getElementById("recordingTextInput2").value = null;

                    document.getElementById("recordingTextInputColor2").value =
                      "";
                  }}
                >
                  Stop
                </button>
                <hr></hr>

                <h5>Lower Side Overlay</h5>
                <textarea
                  style={{ width: "65%" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  name="recordingText3"
                  placeholder="Enter side Overlay Text"
                  maxlength="20"
                />
                <textarea
                  style={{ width: "65%", display: "none" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  id="recordingTextInput3"
                  maxlength="20"
                />
                <input
                  type="color"
                  id="recordingTextInputColor3"
                  name="textColorPicker3"
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "30px",
                    maxWidth: "20px",
                    outline: "none",
                  }}
                ></input>
                <br></br>
                <div style={{ maxHeight: "150px", overflow: "auto" }}>
                  <img
                    src={SLO1}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay1();
                    }}
                  ></img>
                  <img
                    src={SLO2}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay2();
                    }}
                  ></img>
                  <img
                    src={SLO3}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay3();
                    }}
                  ></img>
                  <img
                    src={SLO4}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay4();
                    }}
                  ></img>
                  <img
                    src={SLO5}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay5();
                    }}
                  ></img>
                  <img
                    src={SLO6}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay6();
                    }}
                  ></img>
                  <img
                    src={SLO7}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay7();
                    }}
                  ></img>
                  <img
                    src={SLO8}
                    style={{
                      display: "block",
                      width: "100px",
                      maxHeight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.imgLowerSideOverlay8();
                    }}
                  ></img>
                </div>
                <hr></hr>
                <button
                  className="liveButton"
                  onClick={() => {
                    document.getElementById("recordingTextInput3").value =
                      this.state.recordingText3;
                    this.setState({
                      imgLowerSideOverlay: this.state.imgLowerSideOverlay1,
                    });
                  }}
                >
                  Live
                </button>

                <button
                  className="liveButton"
                  onClick={() => {
                    this.setState({
                      imgLowerSideOverlay: "",
                      imgLowerSideOverlay1: "",
                      recordingText3: "",
                    });
                    document.getElementById("recordingTextInput3").value = null;

                    document.getElementById("recordingTextInputColor3").value =
                      "";
                  }}
                >
                  Stop
                </button>

                <hr></hr>
                <h5>Social Overlay</h5>
                <textarea
                  style={{ width: "65%" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  name="socialText"
                  placeholder="Enter social Handle Text"
                  maxlength="80"
                />
                <textarea
                  style={{ width: "65%", display: "none" }}
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  type="text"
                  id="socialText1"
                  maxlength="80"
                />
                <input
                  type="color"
                  id="socialTextColor"
                  name="socialTextColor"
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "30px",
                    maxWidth: "20px",
                    outline: "none",
                  }}
                ></input>

                <div style={{ maxHeight: "130px", overflow: "auto" }}>
                  <img
                    src={socialOverlay1}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay1();
                    }}
                  ></img>
                  <img
                    src={socialOverlay2}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay2();
                    }}
                  ></img>
                  <img
                    src={socialOverlay3}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay3();
                    }}
                  ></img>
                  <img
                    src={socialOverlay4}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay4();
                    }}
                  ></img>
                  <img
                    src={socialOverlay5}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay5();
                    }}
                  ></img>
                  <img
                    src={socialOverlay6}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay6();
                    }}
                  ></img>
                  <img
                    src={socialOverlay7}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay7();
                    }}
                  ></img>
                  <img
                    src={socialOverlay8}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay8();
                    }}
                  ></img>
                  <img
                    src={socialOverlay9}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay9();
                    }}
                  ></img>
                  <img
                    src={socialOverlay10}
                    style={{
                      display: "block",
                      width: "150px",
                      maxHeight: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.socialOverlay10();
                    }}
                  ></img>
                </div>

                <button
                  className="liveButton"
                  onClick={() => {
                    document.getElementById("socialText1").value =
                      this.state.socialText;
                    this.setState({
                      socialOverlay: this.state.socialOverlay1,
                    });
                  }}
                >
                  Live
                </button>

                <button
                  className="liveButton"
                  onClick={() => {
                    this.setState({
                      socialOverlay: "",
                      socialOverlay1: "",
                      socialText: "",
                    });
                    document.getElementById("socialText1").value = null;

                    // document.getElementById("recordingTextInputColor2").value = "";
                  }}
                >
                  Stop
                </button>
                {/* <p
              style={{
                color: this.state.textColorPicker,
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {this.state.recordingText2}
            </p> */}
                <hr></hr>
              </div>
            ) : null}
            {/* <div style={{ zIndex: "10000000", backgroundColor:this.state.divColorPicker, padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '20%', left: '30%' }}>
        
        </div>        */}
            <div id="controlBar">
              <ul className="bottomcontrols">
                {this.state.meetingperson == "host" ? (
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="HOST GUIDE">
                      <li style={{ fontStyle: "none" }}>
                        <img
                          src={infoicon}
                          style={{
                            width: "30px",
                            marginTop: "7px",
                            cursor: "pointer",
                          }}
                          // onClick={() => {
                          //   this.infohostjoin();
                          // }}
                          onClick={() => {
                            this.handleClickOpen1();
                          }}
                        ></img>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>
                ) : (
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="ATTENDEE GUIDE">
                      <li style={{ fontStyle: "none" }}>
                        <img
                          src={infoicon}
                          style={{
                            width: "30px",
                            marginTop: "7px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            this.infoattendeejoin();
                          }}
                        ></img>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>
                )}

                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Raise Hand">
                    <li>
                      {" "}
                      <i
                        id="raisehand"
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "yellow",
                          fontSize: "34px",
                          marginTop: "7px",
                        }}
                        class="material-icons"
                      >
                        emoji_people
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>

                <MuiThemeProvider theme={theme}>
                  <Tooltip title="FILE">
                    <li id="fileshare-btn">
                      <img
                        src={fileshare}
                        style={{
                          cursor: "pointer",
                          marginTop: "12px",
                          width: "30px",
                        }}
                        onDoubleClick={closeMenufile}
                        onClick={openMenufile}
                      ></img>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>

                <MuiThemeProvider theme={theme}>
                  <Tooltip title="GreenScreen">
                    <li
                      style={{ fontStyle: "none", backgroundColor: "#033a5a" }}
                      id="greenscreenbtn-new"
                    >
                      <i
                        id="enableGreenScreen"
                        style={{
                          cursor: "pointer",
                          marginTop: "12px",
                          fontSize: "30px",
                          color: "red",
                        }}
                        class="material-icons"
                      >
                        wallpaper
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
                {this.state.allowScreenShare == "true" ||
                this.props.location.state.type == "host" ? (
                  <a
                    href={this.state.screensharecreds}
                    target="_blank"
                    id="screensharebtn"
                  >
                    <MuiThemeProvider theme={theme}>
                      <Tooltip title="SCREEN SHARE">
                        <li style={{ fontStyle: "none" }}>
                          {/* <a href="#" target="_blank" style={{ color: 'white' }}> */}
                          <img
                            src={screenshare}
                            style={{
                              cursor: "pointer",
                              marginTop: "8px",
                              width: "30px",
                            }}
                          ></img>
                        </li>
                      </Tooltip>
                    </MuiThemeProvider>
                  </a>
                ) : null}

                {this.state.meetingperson == "host" ? (
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="INVITE">
                      <li>
                        <i
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            fontSize: "30px",
                          }}
                          // onDoubleClick={closeInvite}
                          onClick={() => {
                            this.handleClickOpenInvite();
                          }}
                          href="#"
                          class="material-icons"
                        >
                          person_add
                        </i>
                      </li>
                    </Tooltip>
                  </MuiThemeProvider>
                ) : null}

                <MuiThemeProvider theme={theme}>
                  <Tooltip title="GROUP CHAT">
                    <li>
                      {" "}
                      <div className="brand">
                        <img
                          src={chaticon}
                          style={{
                            cursor: "pointer",
                            marginTop: "12px",
                            width: "30px",
                          }}
                          onDoubleClick={closeMenu}
                          onClick={openMenu}
                          // onClick={() => {
                          //   this.handleClickOpenChatbar();
                          // }}
                          id="chaticon"
                        ></img>
                      </div>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Emoji">
                    <li>
                      {" "}
                      <img
                        src={veroemojis}
                        style={{
                          cursor: "pointer",
                          marginTop: "10px",
                          width: "32px",
                        }}
                        onClick={() => {
                          this.setState({
                            emojicontainer: "showme",
                          });
                        }}
                      ></img>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                  <Tooltip title="WAITING LIST">
                    <li id="waiting-list-controls">
                      {" "}
                      <i
                        style={{
                          cursor: "pointer",
                          marginTop: "12px",
                          fontSize: "30px",
                        }}
                        // onDoubleClick={closeUserMenu}
                        // onClick={openMenuUser}
                        onClick={() => {
                          this.handleClickOpenWaitingArea();
                        }}
                        class="material-icons"
                      >
                        supervised_user_circler
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>

                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Audio Mute">
                    <li>
                      {" "}
                      <i
                        id="audiomute"
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "blue",
                          fontSize: "22px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                          marginTop: "12px",
                        }}
                        class="material-icons"
                      >
                        mic_off
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                  <Tooltip title="Cam OFF">
                    <li>
                      {" "}
                      <i
                        id="videomute"
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "blue",
                          fontSize: "22px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                          marginTop: "12px",
                        }}
                        class="material-icons"
                      >
                        videocam_off
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                  {" "}
                  <Tooltip title="Hangup">
                    <li>
                      {" "}
                      <i
                        id="hangupbtn"
                        style={{
                          cursor: "pointer",
                          padding: 2,
                          color: "red",
                          fontSize: "22px",
                          backgroundColor: "white",
                          borderRadius: "20px",
                          marginTop: "12px",
                        }}
                        class="material-icons"
                      >
                        call_end
                      </i>
                    </li>
                  </Tooltip>
                </MuiThemeProvider>
              </ul>
            </div>
          </div>
        ) : (
          this.props.history.push("/error")
        )}
      </div>
    );
  }
}

export default Dashboard;
