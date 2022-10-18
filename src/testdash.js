import React, { Component } from 'react';
import audio from "./tone.mp3"

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import io from 'socket.io-client'
import kurentoUtils from 'kurento-utils';

import Video from './components/video'
import Videos from './components/videos'
import * as Api from './api'
import Chat from './components/chat'

import Draggable from './components/draggable'
import './index.css';
import icon from "./callcancel.png";
import logo from './verohivelogo.png';
import { Overlay } from 'react-portal-overlay';
import Linkify from 'react-linkify';
import { Tooltip } from '@material-ui/core';
import a from './verifybadges/a.png';
import b from './verifybadges/b.png';
import g from './verifybadges/g.png';
import p from './verifybadges/p.png';
import r from './verifybadges/r.png';
import y from './verifybadges/y.png';
import Kmssky from './kms';
import messanger from './messanger';
import Messanger from './messanger';



class testdash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null,    // used to hold remote stream object that is displayed in the main screen
      meetingid: "",
      remoteStreams: [],
      open: false,    // holds all Video Streams (all remote streams)
      peerConnections: {},  // holds all Peer Connections
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
      status: 'Please wait...',
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
      waitersbox: 'block',

      pc_config: {
        "iceServers": [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ]
      },

      sdpConstraints: {
        'mandatory': {
          'OfferToReceiveAudio': false,
          'OfferToReceiveVideo': false
        }
      },

      messages: [],
      sendChannels: [],
      disconnected: false,
    }

    this.serviceIP = '/webrtcPeer'
    this.socket = null
  
  }

  getLocalStream = () => {
    const success = (stream) => {
      window.localStream = stream
      this.setState({
        localStream: stream
      })

      this.whoisOnline()
    }


    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    const constraints = {
      audio: false,
      video: false,
      options: {
        mirror: false,
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  whoisOnline = () => {
    this.sendToPeer('onlinePeers', null, { local: this.socket.id })
  }

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload
    })
  }




  createPeerConnection = (socketID, callback) => {

    try {
      let pc = new RTCPeerConnection(this.state.pc_config)

      // add pc to peerConnections object
      const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
      this.setState({
        peerConnections
      })

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          this.sendToPeer('candidate', e.candidate, {
            local: this.socket.id,
            remote: socketID
          })
        }
      }

      pc.oniceconnectionstatechange = (e) => {
        // if (pc.iceConnectionState === 'disconnected') {
        //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)

        //   this.setState({
        //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
        //   })
        // }

      }

      pc.ontrack = (e) => {

        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}


        // 1. check if stream already exists in remoteStreams
        const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

        // 2. if it does exist then add track
        if (rVideos.length) {
          _remoteStream = rVideos[0].stream
          _remoteStream.addTrack(e.track, _remoteStream)

          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream,
          }
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
          })
        } else {
          // 3. if not, then create new stream and add track
          _remoteStream = new MediaStream()
          _remoteStream.addTrack(e.track, _remoteStream)

          remoteVideo = {
            id: socketID,
            name: socketID,
            stream: _remoteStream,
          }
          remoteStreams = [...this.state.remoteStreams, remoteVideo]
        }

        // const remoteVideo = {
        //   id: socketID,
        //   name: socketID,
        //   stream: e.streams[0]
        // }

        this.setState(prevState => {

          // If we already have a stream in display let it stay the same, otherwise use the latest stream
          // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
          const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: _remoteStream }

          // get currently selected video
          let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
          // if the video is still in the list, then do nothing, otherwise set to new video stream
          selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }

          return {
            // selectedVideo: remoteVideo,
            ...selectedVideo,
            // remoteStream: e.streams[0],
            ...remoteStream,
            remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
          }
        })
      }

      pc.close = () => {
        // alert('GONE')
        console.log("pc closed");
      }

      if (this.state.localStream)
        // pc.addStream(this.state.localStream)

        this.state.localStream.getTracks().forEach(track => {
          pc.addTrack(track, this.state.localStream)
        })

      // return pc
      callback(pc)

    } catch (e) {
      console.log('Something went wrong! pc not created!!', e)
      // return;
      callback(null)
    }
  }
  viewfollowing = (privatekey) => {
    this.setState({ following: [] })
    //  const privatekey=this.state.privatekey
    fetch("/follow/following", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        privatekey
      })
    })
      .then(response => response.json())
      .then((res) => {
        console.log("Dd", res)
        this.setState({ following: res })
      })
      .catch(err => console.log(err))
    fetch("/follow/followinga", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        privatekey
      })
    })
      .then(response => response.json())
      .then((res) => {
        console.log("Dd", res)
        if (this.state.following.length == undefined) {
          this.setState({ following: res })
        }
        else {
          console.log("here")
          for (var i = 0; i < res.length; i++) {
            this.state.following.push(res[i])
          }

          this.setState({ following: this.state.following })
        }


      })
      .catch(err => console.log(err))
  }


  youcancome = (waiter) => {
    var socket = io()
    socket.emit('youcancome', waiter.myid);
    this.setState({
      waiters: this.state.waiters.filter(waitingAttendees => waitingAttendees !== waiter)
    })
  }
  componentDidMount = () => {

    var divRoomSelection = document.getElementById('roomSelection');
    var divMeetingRoom = document.getElementById('meetingRoom');
    var divhangupscreen = document.getElementById('hangupscreen');
    var inputRoom = document.getElementById('room');
    var inputName = document.getElementById('name');
    var btnRegister = document.getElementById('register');
    var hangupbtn = document.getElementById('hangupbtn')
    var videomute = document.getElementById('videomute');
    var audiomute = document.getElementById('audiomute');
    var videoinputid = document.getElementById('videoinputfid')
    var attendeebtn = document.getElementById('attendeebtn')
    var socket = io();
    var roomName;
    var userName;
    var participants = {};

    var myuser = this.props.location.state.firstname + " " + this.props.location.state.lastName

    function autojoinmeet() {
      roomName = window.location.search.substr(4);

      // userName = meeterName;
      inputName.value = myuser;
      console.log(roomName)
      if (roomName === '' || userName === '') {
        console.log('Room and Name are required!');
      } else {
        var message = {
          event: 'joinRoom',
          userName: myuser,
          roomName: roomName
        }
        sendMessage(message);
        divRoomSelection.style = "display: none";

        divMeetingRoom.style = "display:flex;flex-wrap: wrap;position:absolute;left:40px;top:60px";
      }
    }
    autojoinmeet()
    // startmeetnow()
    // messages handlers

    socket.on('messageks', message => {
      console.log('Message received: ' + message.event);

      switch (message.event) {
        case 'newParticipantArrived':
          receiveVideo(message.userid, message.username);
          break;
        case 'existingParticipants':
          onExistingParticipants(message.userid, message.existingUsers);
          break;
        case 'receiveVideoAnswer':
          onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
          break;
        case 'candidate':
          addIceCandidate(message.userid, message.candidate);
          break;
      }
    });
    var myarray = []
    var attendeearray = []
    var hanguptool = []
    // handlers functions
    function receiveVideo(userid, username) {
      var video = document.createElement('video');
      var div = document.createElement('div');
      var divnew = document.createElement('div');
      var buttonme = document.createElement('button');
      buttonme.className = "fullbtnmet";
      div.className = "videoContainer";
      divnew.className = "nameandbtn"
      div.id = userid + "div";
      var name = document.createElement('div');
      name.style.backgroundColor = "steelblue";
      video.id = userid;
      video.autoplay = true;
      video.style.width = "150px";
      var myheight = (video.style.width / 16) * 9
      video.style.height = myheight

      attendeearray = [...attendeearray, username]
      myarray = [...myarray, video.id];
      name.appendChild(document.createTextNode(username));
      buttonme.appendChild(document.createTextNode("Full"));
      divMeetingRoom.appendChild(div);
      div.appendChild(video);
      div.appendChild(divnew)
      divnew.appendChild(name);

      divnew.appendChild(buttonme);



      buttonme.onclick = function () {

        videoinputid.value = userid

        callmeauto()
        videoinputid.value = ""

      }
      function myfun() {
        hostview(userid)
      }


      var user = {
        id: userid,
        username: username,
        video: video,
        rtcPeer: null
      }

      participants[user.id] = user;

      var options = {
        remoteVideo: video,
        onicecandidate: onIceCandidate
      }

      user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
        function (err) {
          if (err) {
            return console.error(err);
          }
          this.generateOffer(onOffer);
        }
      );

      var onOffer = function (err, offer, wp) {
        console.log('sending offer');
        var message = {
          event: 'receiveVideoFrom',
          userid: user.id,
          roomName: roomName,
          sdpOffer: offer
        }
        sendMessage(message);
      }

      function onIceCandidate(candidate, wp) {
        console.log('sending ice candidates');
        var message = {
          event: 'candidate',
          userid: user.id,
          roomName: roomName,
          candidate: candidate
        }
        sendMessage(message);
      }
    }




    function onExistingParticipants(userid, existingUsers) {
      var video = document.createElement('video');
      var div = document.createElement('div');
      var divnew = document.createElement('div');
      var buttonme = document.createElement('button');
      div.className = "videoContainer";
      buttonme.className = "fullbtnmet";
      divnew.className = "nameandbtn"
      var name = document.createElement('div');
      div.id = userid + "div";
      video.id = userid;

      video.style.width = "150px"
      var myheight = (video.style.width / 16) * 9
      video.style.height = myheight
      video.autoplay = true;
      myarray = [...myarray, video.id]
      hanguptool = [userid]
      name.appendChild(document.createTextNode(inputName.value));
      attendeearray = [...attendeearray, inputName.value]



      name.style.backgroundColor = "steelblue";
      buttonme.appendChild(document.createTextNode("Full"));
      div.appendChild(video);
      div.appendChild(divnew)
      divnew.appendChild(name);

      divnew.appendChild(buttonme);
      divMeetingRoom.appendChild(div);
      buttonme.onclick = function () {
        videoinputid.value = userid
        callmeauto()
        videoinputid.value = ""


      }
      function myfun() {
        hostview(userid)
      }
      var user = {
        id: userid,
        username: userName,
        video: video,
        rtcPeer: null
      }


      participants[user.id] = user;

      var constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 1280,
            minHeight: 720,
            maxFrameRate: 15,
            minFrameRate: 15
          },

          optional: [{ aspectRatio: 16 / 9 }]
        }
      };

      var options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: onIceCandidate
      }



      user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
        function (err) {
          if (err) {
            return console.error(err);
          }
          this.generateOffer(onOffer)
        }
      );

      existingUsers.forEach(function (element) {
        receiveVideo(element.id, element.name);
      });

      var onOffer = function (err, offer, wp) {
        console.log('sending offer');
        var message = {
          event: 'receiveVideoFrom',
          userid: user.id,
          roomName: roomName,
          sdpOffer: offer
        }
        sendMessage(message);
      }

      function onIceCandidate(candidate, wp) {
        console.log('sending ice candidates');
        var message = {
          event: 'candidate',
          userid: user.id,
          roomName: roomName,
          candidate: candidate
        }
        sendMessage(message);

      }



      hangupbtn.onclick = function () {

        // if (user.rtcPeer) {
        //     var message = {
        //         userid: 'stop'
        //     }
        //     sendMessage(message);
        //     dispose();
        // }
        // sendMessage(message);


        // // divRoomSelection.style = "display: block;position:absolute;left:40%;top:40%";
        // divMeetingRoom.style = "display: none ";

        const video = document.querySelector('video');

        // A video's MediaStream object is available through its srcObject attribute
        const mediaStream = video.srcObject;

        // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        const tracks = mediaStream.getTracks();

        // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
        // tracks[0].stop();

        // Or stop all like so:
        tracks.forEach(track => track.stop())

      }

      hangupbtn.onclick = function () {

        if (user.rtcPeer) {
          var message = {
            userid: 'stop'
          }
          dispose();
        }


        socket.emit('removeme', userid);


        // divRoomSelection.style = "display: block;position:absolute;left:40%;top:40%";
        divMeetingRoom.style = "display: none ";
        divhangupscreen.style = "display: block ;margin-top:210px";


      }



      videomute.onclick = function () {

        const video = document.querySelector('video');

        // A video's MediaStream object is available through its srcObject attribute
        const mediaStream = video.srcObject;

        // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        const videoTracks = mediaStream.getVideoTracks();



        videoTracks.forEach(track => track.enabled = false)


      }
      videomute.ondblclick = function () {

        const video = document.querySelector('video');

        const mediaStream = video.srcObject;

        const videoTracks = mediaStream.getVideoTracks();

        videoTracks.forEach(track => track.enabled = true)


      }

      audiomute.onclick = function () {

        const video = document.querySelector('video');
        const mediaStream = video.srcObject;
        const AudioTracks = mediaStream.getAudioTracks();
        AudioTracks.forEach(track => track.enabled = false)
      }
      audiomute.ondblclick = function () {

        const video = document.querySelector('video');

        // A video's MediaStream object is available through its srcObject attribute
        const mediaStream = video.srcObject;

        // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        const AudioTracks = mediaStream.getAudioTracks();

        // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
        // tracks[0].stop();

        // Or stop all like so:


        AudioTracks.forEach(track => track.enabled = true)


      }

      function dispose() {
        if (user.rtcPeer) {
          user.rtcPeer.dispose();
          user.rtcPeer = null;
        }
        video.remove()
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
      console.log('sending ' + message.event + ' message to server');
      socket.emit('imcominginroom', () => {
        console.log('I m joining the room')
      })
      socket.emit('messageksc', message);

    }

    function callmeauto() {

      myarray.forEach(userid => {
        document.getElementById(userid).style.width = "150px"
        document.getElementById(userid + "div").classList.remove("centerdivvideo")

      })
      var vidid = videoinputid.value
      document.getElementById(vidid).style.width = '100vh';
      document.getElementById(vidid).controls = true
      document.getElementById(vidid + "div").classList.add("centerdivvideo")

    }

    var hostbtn = document.getElementById('hostview')
    var recordBtn = document.getElementById('recordBtn')
    function hostview(userid) {

      var vidid = videoinputid.value
      myarray.forEach(userid => {
        document.getElementById(userid).style.width = "300px";
      })
    }
    hostbtn.onclick = function () {

      hostview()
    }

    socket.on('removeHim', data => {
      data.forEach(element => {
        if (document.getElementById(element + "div")) {
          document.getElementById(element + "div").remove()
          myarray.splice(myarray.indexOf(element))
        }
      });



    })




    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');
    const messageContainer = document.querySelector('.container')
    var myaudio = new Audio(audio);
    const append = (message, position) => {
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageElement.classList.add('message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
      // if (position == 'left') {
      //   myaudio.play();
      // }
    }
    socket.on('connect', function () {
      // Connected, let's sign-up for to receive messages for this room
      socket.emit('room', room);

    });



    // attendeebtn.onclick = function attendeelist() {


    //   document.querySelector(".userbar").classList.add("open");

    //   attendeearray.forEach(user=>{
    //     var newspan =document.createElement('span');
    //     newspan.innerText=user;
    //         document.getElementById('myattendeeinroom').appendChild(newspan)
    //     })

    // }

    if (this.props.location.state != undefined) {
      this.setState({
        type: this.props.location.state.room_code,
        id: this.props.location.state.username,
        meetingperson: this.props.location.state.type,
        email: this.props.location.state.email,
        firstname: this.props.location.state.firstname,
        lastname: this.props.location.state.lastName
      })

      this.viewfollowing(this.props.location.state.privatekey)
    }
    else {
      this.setState({
        type: window.location.href.substr(36),
        id: localStorage.getItem('user'),
        meetingperson: 'client'
      })

    }


    // if (this.props.location.state.type == 'client') {
    //   hostbtn.style.display = "none"
    //   recordBtn.style.display = "none"
    // }
    // else if (this.props.location.state.type == 'undefined') {
    //   hostbtn.style.display = "none"
    //   recordBtn.style.display = "none"
    // }
    // else {
    //   hostbtn.style.display = "block"
    //   recordBtn.style.display = "block"
    // }




    this.setState({
      // id: this.props.location.state.username,
      meetingid: this.props.location.search.substr(4),
      // firstname: this.props.location.state.firstname,
      // lastname: this.props.location.state.lastName
    })
    this.socket = io.connect(
      this.serviceIP,
      {
        path: '/io/webrtc',
        query: {
          // room: window.location.pathname
          room: window.location.search.substr(1),
        }
      }
    )

    this.socket.on('connection-success', data => {
      var that = this
      console.log("ssss", data)
      //  this.state.chats.push({
      //    "username":this.state.id,
      //    "socketId":data.success
      //  })
      var socketid = this.socket.id
      if (this.state.usersavailable.length == 0) {
        var chat = [{
          "username": this.state.id,
          "socketId": data.success
        }]

        let user = {
          uid: that.socket && that.socket.id || ''
        }

        let messages = chat

        // that.state.sendChannels.map(sendChannel => {
        //   sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(messages))
        // })
        that.sendToPeer('new-message-to-user', messages, { local: that.socket.id })
      }
      else {
        var chat = {
          "username": this.state.id,
          "socketId": data.success
        }
        this.state.usersavailable.push(chat)
        // let user = {
        //   uid: that.socket && that.socket.id || ''
        // }

        let messages = this.state.usersavailable

        // that.state.sendChannels.map(sendChannel => {
        //   sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(messages))
        // })
        that.sendToPeer('new-message-to-user', messages, { local: that.socket.id })
      }
      this.state.chats = []
      //  this.socket.emit('new-message-to-user', {
      //   socketid,
      //   chat
      // })
      // this.getLocalStream()
      console.log("rohanjha", this.state.chats)

      // console.log(data.success)
      const status = data.peerCount > 1 ? ` ${data.peerCount} people` : '..'

      this.setState({
        status: status,
        messages: data.messages
      })
    })
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = messageInput.value;
      append(`You:${message}`, 'right')
      this.socket.emit('send', message);
      messageInput.value = "";

    })






    //chat messanger
    var room = window.location.search.substr(4);
    const name = this.props.location.state.firstname + " " + this.props.location.state.lastName
    this.socket.emit('room', room);

    this.socket.emit('new-user-joined', name);

    this.socket.on('user-joined', name => {
      // append(`${name} Joined the chat`, 'right')

    })

    this.socket.on('receive', data => {
      append(`${data.name}:${data.message}`, 'left')
    })

    this.socket.on('left', name => {
      // append(`${name} left the chat`, 'right')
    })


    //chat messanger






    this.socket.on('joined-peers', data => {
      console.log("Ddd", data)
      //  alert(this.state.id+" "+" has joined")
      this.setState({
        status: data.peerCount > 1 ? `${data.peerCount} people` : '..'
      })
    })
    this.socket.on('new-message-to-user', data => {
      console.log("Ddd", data.data)
      // const message = JSON.parse(data.data)

      this.state.chats.push(data.data[0])
      // this.state.usersavailable.push(data.data)
      this.setState({
        usersavailable: data.data
      })
      if (this.state.meetingperson == 'host') {
        this.sendToPeer('all-connected-users', this.state.chats, { local: this.socket.id })
      }
      // console.log("rohan",this.state.usersavailable)
      //  alert(this.state.id+"has joined")
      // this.setState({
      //   status: data.peerCount > 1 ? ` ${data.peerCount}` : '..'
      // })
    })
    this.socket.on('new-message-to-specific-user', data => {
      console.log("dlldldldldldld", data.data)
      this.setState({
        recievedchat: data.data[0].message,
        recievedchatfromuser: data.data[0].username
      })

      this.setState({
        newpersonalmessage: "You recieved message from" + " " + data.data[0].username
      })
      // alert("You recieved message from" + " " + data.data[0].username)
      // const message = JSON.parse(data.data)
      // this.state.usersavailable.push(data.data)
      // this.setState({
      //   usersavailable:data.data
      // })
      // console.log("rohan",this.state.usersavailable)
      //  alert(this.state.id+"has joined")
      // this.setState({
      //   status: data.peerCount > 1 ? ` ${data.peerCount}` : '..'
      // })
    })


    this.socket.on('all-connected-users', data => {
      console.log("dlldldldldldld", data.data)
      if (this.state.meetingperson == 'client') {
        this.setState({
          chats2: data.data
        })
      }
      if (this.state.meetingperson == 'host') {
        this.setState({
          chats: data.data
        })
      }
      // this.setState({
      //   recievedchat: data.data[0].message,
      //   recievedchatfromuser: data.data[0].username
      // })
      // alert("You recieved message from" + " " + data.data[0].username)
      // const message = JSON.parse(data.data)
      // this.state.usersavailable.push(data.data)
      // this.setState({
      //   usersavailable:data.data
      // })
      // console.log("rohan",this.state.usersavailable)
      //  alert(this.state.id+"has joined")
      // this.setState({
      //   status: data.peerCount > 1 ? ` ${data.peerCount}` : '..'
      // })
    })
    this.socket.on('disconnect-to-specific-user', data => {
      console.log("dlldldldldldld", data.data)
      const video = document.querySelector('video');

      // A video's MediaStream object is available through its srcObject attribute
      const mediaStream = video.srcObject;

      // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
      const videoTracks = mediaStream.getVideoTracks();



      videoTracks.forEach(track => track.enabled = false)




      const AudioTracks = mediaStream.getAudioTracks();
      AudioTracks.forEach(track => track.enabled = false)
      this.socket.emit('removeme', hanguptool[0]);

      this.disconnect1()



      // localStorage.setItem('mute',"true")
      // this.setState({
      //   mutemic:true
      // })
      // this.setState({
      //   recievedchat:data.data[0].message,
      //   recievedchatfromuser:data.data[0].username
      // })
      //  alert("You recieved message from"+" "+data.data[0].username)
      // const message = JSON.parse(data.data)
      // this.state.usersavailable.push(data.data)
      // this.setState({
      //   usersavailable:data.data
      // })
      // console.log("rohan",this.state.usersavailable)
      //  alert(this.state.id+"has joined")
      // this.setState({
      //   status: data.peerCount > 1 ? ` ${data.peerCount}` : '..'
      // })
    })
    this.socket.on('removeHim', data => {
      if (document.getElementById(data + "div")) {
        document.getElementById(data + "div").remove()
        myarray.splice(myarray.indexOf(data))
      }


    })
    this.socket.on('mute-mic-to-specific-user', data => {
      console.log("dlldldldldldld", data.data)
      const video = document.querySelector('video');
      const mediaStream = video.srcObject;
      const AudioTracks = mediaStream.getAudioTracks();
      AudioTracks.forEach(track => track.enabled = false)
      this.setState({
        mutemic: true
      })

    })
    // ************************************* //
    // ************************************* //
    this.socket.on('peer-disconnected', data => {

      // close peer-connection with this peer
      // this.state.peerConnections[data.socketID].close()

      // get and stop remote audio and video tracks of the disconnected peer
      // const rVideo = this.state.remoteStreams.filter(stream => stream.id === data.socketID)
      // rVideo && this.stopTracks(rVideo[0].stream)

      // filter out the disconnected peer stream


    })
    // this.socket.on('offerOrAnswer', (sdp) => {

    //   this.textref.value = JSON.stringify(sdp)

    //   // set sdp as remote description
    //   this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
    // })

    // this.socket.on('online-peer', socketID => {
    //   console.log('connected peers ...', socketID)

    //   // create and send offer to the peer (data.socketID)
    //   // 1. Create new pc
    //   this.createPeerConnection(socketID, pc => {
    //     // 2. Create Offer
    //     if (pc) {

    //       // Send Channel
    //       const handleSendChannelStatusChange = (event) => {
    //         console.log('send channel status: ' + this.state.sendChannels[0].readyState)
    //       }

    //       const sendChannel = pc.createDataChannel('sendChannel')
    //       sendChannel.onopen = handleSendChannelStatusChange
    //       sendChannel.onclose = handleSendChannelStatusChange

    //       this.setState(prevState => {
    //         return {
    //           sendChannels: [...prevState.sendChannels, sendChannel]
    //         }
    //       })


    //       // Receive Channels
    //       const handleReceiveMessage = (event) => {
    //         const message = JSON.parse(event.data)
    //         console.log("rohan", message)
    //         if (message.type == "chats") {
    //           this.state.chats.push(message.data)
    //         }
    //         console.log("rjjj", this.state.chats)
    //         if (message.type == 'file') {
    //           this.setState({
    //             download: true,
    //             url: message.message.data.text
    //           })
    //         }
    //         else {
    //           this.setState(prevState => {

    //             return {
    //               messages: [...prevState.messages, message]
    //             }
    //           })
    //         }
    //       }
    //       const handleReceiveChannelStatusChange = (event) => {
    //         if (this.receiveChannel) {
    //           console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
    //         }
    //       }

    //       const receiveChannelCallback = (event) => {
    //         const receiveChannel = event.channel
    //         receiveChannel.onmessage = handleReceiveMessage
    //         receiveChannel.onopen = handleReceiveChannelStatusChange
    //         receiveChannel.onclose = handleReceiveChannelStatusChange
    //       }

    //       pc.ondatachannel = receiveChannelCallback


    //       pc.createOffer(this.state.sdpConstraints)
    //         .then(sdp => {
    //           pc.setLocalDescription(sdp)

    //           this.sendToPeer('offer', sdp, {
    //             local: this.socket.id,
    //             remote: socketID
    //           })
    //         })
    //     }
    //   })
    // })

    // this.socket.on('offer', data => {
    //   this.createPeerConnection(data.socketID, pc => {
    //     pc.addStream(this.state.localStream)

    //     // Send Channel
    //     const handleSendChannelStatusChange = (event) => {
    //       console.log('send channel status: ' + this.state.sendChannels[0].readyState)
    //     }

    //     const sendChannel = pc.createDataChannel('sendChannel')
    //     sendChannel.onopen = handleSendChannelStatusChange
    //     sendChannel.onclose = handleSendChannelStatusChange

    //     this.setState(prevState => {
    //       return {
    //         sendChannels: [...prevState.sendChannels, sendChannel]
    //       }
    //     })

    //     // Receive Channels
    //     const handleReceiveMessage = (event) => {
    //       const message = JSON.parse(event.data)
    //       console.log("rohan", message)
    //       if (message.type == "chats") {
    //         this.state.chats.push(message.data)
    //       }
    //       console.log("rjjj", this.state.chats)
    //       if (message.type == 'file') {
    //         this.setState({
    //           download: true,
    //           url: message.message.data.text
    //         })
    //       }
    //       else {
    //         this.setState(prevState => {
    //           return {
    //             messages: [...prevState.messages, message]
    //           }
    //         })
    //       }
    //       // this.setState(prevState => {
    //       //   return {
    //       //     messages: [...prevState.messages, message]
    //       //   }
    //       // })
    //     }
    //     const handleReceiveChannelStatusChange = (event) => {
    //       if (this.receiveChannel) {
    //         console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
    //       }
    //     }

    //     const receiveChannelCallback = (event) => {
    //       const receiveChannel = event.channel
    //       receiveChannel.onmessage = handleReceiveMessage
    //       receiveChannel.onopen = handleReceiveChannelStatusChange
    //       receiveChannel.onclose = handleReceiveChannelStatusChange
    //     }

    //     pc.ondatachannel = receiveChannelCallback

    //     pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
    //       // 2. Create Answer
    //       pc.createAnswer(this.state.sdpConstraints)
    //         .then(sdp => {
    //           pc.setLocalDescription(sdp)

    //           this.sendToPeer('answer', sdp, {
    //             local: this.socket.id,
    //             remote: data.socketID
    //           })
    //         })
    //     })
    //   })
    // })

    // this.socket.on('answer', data => {
    //   // get remote's peerConnection
    //   const pc = this.state.peerConnections[data.socketID]
    //   // console.log(data.sdp)
    //   pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => { })
    // })

    // this.socket.on('candidate', (data) => {
    //   // get remote's peerConnection
    //   const pc = this.state.peerConnections[data.socketID]

    //   if (pc)
    //     pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    // })

    socket.on('inreqtohost', (data) => {

      if (data.myroom == this.state.meetingid) {
        if (this.state.meetingperson == 'host') {
         
          this.setState({
                
            waiters: [...this.state.waiters, data]
          })

        }
      }
    })

    window.addEventListener('popstate', (event) => {
      if (event.state) {

        for (var i = 0; i < this.state.chats2.length; i++) {
          if (this.state.chats2[i].socketId == this.socket.id) {
            this.state.chats2.splice(i, 1);
          }
        }
        this.sendToPeer('all-connected-users', this.state.chats2, { local: this.socket.id })
        this.setState({ disconnected: true });

      }
    }, false);

    window.history.pushState({ name: "browserBack" }, "on browser back click", window.location.href);




  }

  // ************************************* //
  // NOT REQUIRED
  // ************************************* //
  disconnectSocket = (socketToDisconnect) => {
    this.sendToPeer('socket-to-disconnect', null, {
      local: this.socket.id,
      remote: socketToDisconnect
    })
  }
  sayHello = () => {
    this.setState({
      show: !this.state.show
    })
  }
  inviteHandler = () => {
    // const enteredemail = prompt("Enter email to invite ")
    const enteredemail = this.state.emailinvite
    // navigator.clipboard.writeText(this.props.location.state.room_code);
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "VEROHive Meeting Invitation",
        text: "Your invitation Code is" + this.props.location.state.room_code,
        html: `<img src="./verohivelogo.png" style="width: 30%;">
      <h1 style="color: #5b5b5b;">VEROHive Meeting Invitation</h1>
      <h3 style="color: #757575;">Click the link below to respond to the invitation.</h3>
     
     <p>https://verohive.org/videochat?id=${this.props.location.state.room_code}</p>
     <a href="verohive://676876877876">Open in app</a>
    <br>
     <h3 style="color: #757575;"> or Please enter invite code to join meeting :${this.props.location.state.room_code}</h3>
     
      
      
      <h4 style="color: #757575;">Cheers!</h4>
      <h4 style="color: #757575;">VEROHive Team</h4>
      `

      })
    })

      .then(() => {

        console.log("ddd")
        //  this.verify()
        this.setState({
          invitationsentsuccessfully: "Invitation sent successfully"
        })
        // alert("Invitation sent successfully")
      })
      .catch(err => console.log(err))

  }
  sendemail = (enteredemail) => {
    // const enteredemail = prompt("Enter email to invite ")
    // const enteredemail = this.state.emailinvite
    // navigator.clipboard.writeText(this.props.location.state.room_code);
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "VEROHive Meeting Invitation",
        text: "Your invitation Code is" + this.props.location.state.room_code,
        html: `<img src="./verohivelogo.png" style="width: 30%;">
      <h1 style="color: #5b5b5b;">VEROHive Meeting Invitation</h1>
      <h3 style="color: #757575;">Click the link below to respond to the invitation.</h3>
     
     <p>https://verohive.org/videochat?id=${this.props.location.state.room_code}</p>
     
    <br>
     <h3 style="color: #757575;"> or Please enter invite code to join meeting :${this.props.location.state.room_code}</h3>
     
      
      
      <h4 style="color: #757575;">Cheers!</h4>
      <h4 style="color: #757575;">VEROHive Team</h4>
      `

      })
    })

      .then(() => {

        console.log("ddd")
        //  this.verify()
        this.setState({
          invitationsentsuccessfullytocontact: "Invitation sent successfully"
        })
        // alert("Invitation sent successfully")
      })
      .catch(err => console.log(err))

  }
  downloadFile = () => {
    window.open(this.state.url)
  }

  Upload1_To_AWS_S3a = () => {
    var that = this;

    console.log("Dddd", this.state.image)
    let formData = new FormData();
    formData.append("photo", this.state.image);
    try {
      const res = Api.uploadImageToAwsS3(formData)
      res.then(function (value) {
        console.log(value); // "Success"
        // that.setState({
        //   image: value
        // })
        let user = {

          uid: that.socket && that.socket.id || ''
        }

        let messages = {
          type: 'file', message: { id: user.uid, sender: { uid: user.uid, }, data: { text: value } }
        }
        that.state.sendChannels.map(sendChannel => {
          sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(messages))
        })
        that.sendToPeer('new-file', JSON.stringify(messages), { local: that.socket.id })
      })



    } catch (e) {

    }

  }

  disconnect = () => {
    for (var i = 0; i < this.state.chats2.length; i++) {
      if (this.state.chats2[i].socketId == this.socket.id) {
        this.state.chats2.splice(i, 1);
      }
    }
    this.sendToPeer('all-connected-users', this.state.chats2, { local: this.socket.id })
    this.setState({ disconnected: true })

    return (<div><h3>You have successfully disconnected the meeting</h3><br></br><hr></hr>  <li><a
      className=" btn-profile "
      onClick={() => this.Home()}>Back To Dashboard</a></li><br></br><hr></hr><h5>Powered By VEROHive</h5>
      <img src={logo} className='logo-vero-disconnect'></img>
      <div className='footer' >(c)VEROHive.All Rights Reserved</div>
    </div>)

  }

  disconnect1 = () => {
    this.setState({ disconnected: true })
    console.log('sky')
    return (<div><h3>You have successfully disconnected the meeting</h3><br></br><hr></hr>  <li><a
      className=" btn-profile "
      onClick={() => this.Home()}>Back To Dashboard</a></li><br></br><hr></hr><h5>Powered By VEROHive</h5>
      <img src={logo} className='logo-vero-disconnect'></img>
      <div className='footer' >(c)VEROHive.All Rights Reserved</div>
    </div>)


  }


  backMe = () => {
    // for(var i=0;i<this.state.chats2.length;i++)
    // {
    //   if(this.state.chats2[i].socketId==this.socket.id)
    //   {
    //     this.state.chats2.splice(i, 1);
    //   }
    // }
    // this.sendToPeer('all-connected-users', this.state.chats2, { local: this.socket.id })
    this.props.history.goBack()

  }
  switchVideo = (_video) => {
    // console.log(_video)
    this.setState({
      selectedVideo: _video
    })
  }

  // ************************************* //
  // ************************************* //
  stopTracks = (stream) => {
    const video = document.querySelector('video');

    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const videoTracks = mediaStream.getTracks();



    videoTracks.forEach(track => track.stop())
  }
  sayHello1 = () => {
    this.props.history.push('/profile', {
      username: this.state.id
    })
  }
  disconnectspecificuser = (username, socketId) => {



    let messages = [{
      username: username,
      message: "disconnect"
    }]
    for (var i = 0; i < this.state.chats.length; i++) {
      if (this.state.chats[i].username == username) {
        this.state.chats.splice(i, 1);
      }
    }
    this.sendToPeer('all-connected-users', this.state.chats, { local: this.socket.id })
    this.sendToPeer('disconnect-to-specific-user', messages, { local: socketId })
    // alert(username + " " + "removed successfully")
    this.setState({
      usernameemoved: username + " " + "removed successfully"
    })




  }
  mutemicspecificuser = (username, socketId) => {



    let messages = [{
      username: username,
      message: "mute"
    }]


    this.sendToPeer('mute-mic-to-specific-user', messages, { local: socketId })
    // alert(username + " " + "muted successfully")
    this.setState({
      usernamemuted: username + " " + "muted successfully"
    })




  }
  async onSubmit(e) {
    // e.preventDefault();
    const { messagetouser, idtosend, usertosend } = this.state;
    if (messagetouser == "") {
      // alert("Please enter a message")
      this.setState({
        usernameentermessage: "Please enter a message"
      })
    }
    else {

      let messages = [{
        username: this.state.id,
        message: messagetouser
      }]

      // this.state.sendChannels.map(sendChannel => {
      //   sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(messages))
      // })
      this.sendToPeer('new-message-to-specific-user', messages, { local: idtosend })
      // alert("message sent to" + " " + usertosend + " " + "successfully")
      this.setState({
        sentmessageusersuccess: "message sent to" + " " + usertosend + " " + "successfully"
      })
      this.setState({
        messagetouser: "",
        idtosend: "",
        usertosend: "",
        chatto: false
      })
    }
    // this.props.history.push({
    //   pathname: '/videochat',
    //   search: "?" + new URLSearchParams({ id: username }).toString(),
    // state:{ username:this.state.id}
    // })


  }
  openModal = (username) => {
    // var username = this.props.location.state.username
    // this.setState({
    //   id: this.props.location.state.username
    // })

    fetch("/getuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,

      })


    })
      .then(response => response.json())
      .then((res) => {
        console.log("ff", res)
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
          open: true

        })

      })
      .catch(err => console.log(err))
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  sayHello = () => {
    console.log("Hello")
    localStorage.removeItem('user')
    fetch("/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },

    })
      .then((res) => {
        localStorage.removeItem('user')
        window.location.reload()
        this.props.history.push('/login')

        console.log("ff", res)
      })
      .catch(err => console.log(err))
  }


  Home = () => {
    this.props.history.push('/private', {
      username: this.state.id
    })
    window.location.reload();
  }


  Upload1_To_AWS_S3 = () => {
    var that = this;
    const { email } = this.state;
    console.log("Dddd", this.state.image)
    let formData = new FormData();
    formData.append("photo", this.state.image);
    try {
      const res = Api.uploadImageToAwsS3(formData)
      res.then(function (value) {
        console.log(value); // "Success"
        // that.setState({
        //   image: value
        // })
        fetch("/updateProfilePic", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            value

          })
        })

          .then(() => {
            this.setState({
              yourprofilepicturechanged: "profile pic changed successfully"
            })
            // alert("profile pic changed successfully")
            that.setState({
              image1: value
            })

          })
          .catch(err => console.log(err))
      })



    } catch (e) {

    }

  }
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
    }

    const openInvite = () => {

      document.querySelector(".invitebar").classList.add("open");
    };
    const closeInvite = () => {

      document.querySelector(".invitebar").classList.remove("open");
    }
    const closeMenu = () => {

      document.querySelector(".chatbar").classList.remove("open");
    }
    const closeUserMenu = () => {

      document.querySelector(".userbar").classList.remove("open");
    }


    const {
      status,
      messages,
      disconnected,
      localStream,
      peerConnections,
      mutemic,
      remoteStreams,
    } = this.state

    if (disconnected) {
      // disconnect socket
      this.socket.close()
      // stop local audio & video tracks
      this.stopTracks(localStream)

      // stop all remote audio & video tracks
      remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

      // stop all remote peerconnections
      peerConnections && Object.values(peerConnections).forEach(pc => pc.close())


      return (<div><h3>You have successfully disconnected the meeting</h3><br></br><hr></hr>  <li><a
        className=" btn-profile "
        onClick={() => this.Home()}>Back To Dashboard</a></li><br></br><hr></hr><h5>Powered By VEROHive</h5>
        <img src={logo} className='logo-vero-disconnect'></img>
        <div className='footer' >(c)VEROHive.All Rights Reserved</div>
      </div>)
    }

    const statusText = <div style={{ color: 'yellow', padding: 5 }}>{status}</div>

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1.3em",
          }
        }
      }
    });
    return (
      <div >
        <div className="header">
          <img src={logo} className='logo-vero'></img>

          <div style={{ position: 'absolute', right: '45%' }}>Room id: {this.state.meetingid}</div>
          <h4 style={{ position: 'absolute', right: '5%' }} className="welcome-user">Welcome {this.state.id}</h4>


        </div>
        {/* <Kmssky /> */}



        <div style={{ display: this.state.waitersbox, backgroundColor: 'red', position: 'absolute' }}>

          {this.state.waiters.map(waiter =>
            <div key={waiter.myid}>
              {waiter.myname}
              <button type="button" onClick={() => this.youcancome(waiter)} >ALlow him</button>
            </div>
          )}
        </div>

        <div id="roomSelection" style={{ display: 'block', position: 'absolute', left: '40%', top: '40%' }}>
          <label>Enter Full Name :</label>
          <input id="name" type="text" className="input-meet" />
          <br></br><br></br>

          <input id="room" type="text" className="input-meet" style={{ display: 'none' }} />
          <br></br><br></br>
          <button id="register" className="btn-meet">Enter</button>
        </div>

        <div id="meetingRoom" style={{ display: 'none', marginTop: '60px' }}>
          <input id="videoinputfid" type="text" style={{ display: 'none' }} />
          <ul style={{ position: 'absolute', left: '90vw', top: '-3vh' }}>
            <MuiThemeProvider theme={theme}>
              <Tooltip title="Host View">
                <li> <i id="hostview" style={{ cursor: 'pointer', padding: 2, fontSize: '26px', marginTop: '12px' }} class='material-icons'>visibility</i>
                </li></Tooltip></MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title="Record"><li style={{ fontStyle: 'none' }}>
                <a href="https://recordmeeting.verohive.org/" target="_blank">
                  <i id="recordBtn" style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }} class='material-icons' >radio_button_checked</i></a>
              </li></Tooltip>

            </MuiThemeProvider>
          </ul>
        </div>

        <div id="hangupscreen" style={{ display: 'none', position: 'absolute', top: '40%', left: '30%', marginTop: '210px' }}>
          {/* <div className="header">
                        <img src={logo} className='logo-vero'></img>




                    </div> */}
          <h3>You have successfully disconnected the meeting</h3>
          <br></br><hr></hr>
          <li><a
            className=" btn-profile "
            onClick={() => this.Home()}>Back To Dashboard</a></li><br></br><hr></hr><h5>Powered By VEROHive</h5>
          <img src={logo} className='logo-vero-disconnect'></img>
          <div className='footer' style={{ height: '50px', zIndex: '10' }} >(c)VEROHive.All Rights Reserved</div>
        </div>


        {this.state.download ? (<li >
          <button

            className="btn btn-downloadfile "
            onClick={() => this.downloadFile()}>Download file</button>
        </li>) : null}
        {
          this.state.recievedchat != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "#663399", borderRadius: '20px', padding: '10px', position: 'absolute', top: '77%', left: '10%' }}>
              <span> {this.state.recievedchat}<br></br>from<br></br>{this.state.recievedchatfromuser}</span>
              <span><button
                onClick={() => this.setState({
                  recievedchatfromuser: "",
                  recievedchat: ""
                })}>OK</button></span>
            </div>
          ) : null
        }


        {
          this.state.newpersonalmessage != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.newpersonalmessage}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  newpersonalmessage: "",

                })}>OK</button></span>
            </div>
          ) : null
        }

        {
          this.state.invitationsentsuccessfully != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.invitationsentsuccessfully}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  invitationsentsuccessfully: "",

                })}>OK</button></span>
            </div>
          ) : null
        }

        {
          this.state.invitationsentsuccessfullytocontact != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.invitationsentsuccessfullytocontact}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  invitationsentsuccessfullytocontact: "",

                })}>OK</button></span>
            </div>
          ) : null
        }

        {
          this.state.usernameemoved != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.usernameemoved}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  usernameemoved: "",

                })}>OK</button></span>
            </div>
          ) : null
        }

        {
          this.state.usernameentermessage != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.usernameentermessage}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  usernameentermessage: "",

                })}>OK</button></span>
            </div>
          ) : null
        }


        {
          this.state.usernamemuted != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.usernamemuted}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  usernamemuted: "",

                })}>OK</button></span>
            </div>
          ) : null
        }


        {
          this.state.sentmessageusersuccess != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.sentmessageusersuccess}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  sentmessageusersuccess: "",

                })}>OK</button></span>
            </div>
          ) : null
        }

        {
          this.state.yourprofilepicturechanged != "" ? (
            <div style={{ zIndex: "10000000", backgroundColor: "white", padding: '10px', color: 'grey', fontSize: '1.4rem', position: 'absolute', top: '10%', left: '40%' }}>
              <span> {this.state.yourprofilepicturechanged}<br></br></span>
              <span><button style={{ backgroundColor: "#4FADD3", color: 'white', border: 'none' }}
                onClick={() => this.setState({
                  yourprofilepicturechanged: "",

                })}>OK</button></span>
            </div>
          ) : null
        }


        {/* 
      <div >{this.state.newpersonalmessage} </div> */}
        <div >

          <div className="filebar" style={{ display: 'flex', flexDirection: 'column' }} >
            <button onClick={closeMenufile} className="filebar-close-btn">X</button>

            <input name="image" type="file" style={{ width: '88px', marginTop: '45px' }} onChange={e => {
              this.setState({ image: e.currentTarget.files[0] })
            }} />

            <button

              className="btn btn-sendfile" style={{ marginTop: '0' }}
              onClick={() => this.Upload1_To_AWS_S3a()}>send file</button>
          </div>
          <div className="invitebar">
            <button onClick={closeInvite} className="invitebar-close-btn">X</button>
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
            </div><button onClick={() => this.inviteHandler()} style={{ backgroundColor: 'green', border: 'none', color: 'white', outline: 'none' }}>Invite</button>
            <br></br><hr></hr>
            <h4>Contacts</h4>
            <div >

              {this.state.following && this.state.following.length > 0
                ? this.state.following.map((value, index) => {
                  if (index < 10) {
                    return (
                      <div style={{ backgroundColor: "#663399" }}>
                        <span> {value.fullnamerequested == this.state.firstname + this.state.lastname ? (value.fullnameaccepted) : (value.fullnamerequested)}</span>
                        <span>{value.emailrequested == this.state.email ? (<button onClick={() => this.sendemail(value.emailaccepted)} style={{ backgroundColor: 'green', border: 'none', color: 'white', outline: 'none' }}>Invite</button>) : (<button onClick={() => this.sendemail(value.emailrequested)} style={{ backgroundColor: 'green', border: 'none', color: 'white', outline: 'none' }}>Invite</button>)}</span>

                        {/* <input type="text" placeholder="typesomething"  name="write" onChange={(event) => { this.inputHandler(event) }}/>     */}
                        {/* <span><button onClick={()=>this.sendemail(value.emailrequested)}>Send Email</button></span> */}

                      </div>

                    );
                  }
                })
                : null}
            </div>
          </div>


          <div className="userbar">
            <button onClick={closeUserMenu} className="userbar-close-btn">X</button>

            {this.state.meetingperson == 'host' && this.state.chats && this.state.chats.length > 0
              ? this.state.chats.map((value, index) => {
                if (index < 10) {
                  return (
                    <div style={{ backgroundColor: "#663399" }}>
                      <span> {value.username}</span>
                      {value.username == this.state.id ? (null) : (
                        <span><i style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '4px' }}
                          onClick={() => this.setState({
                            chatto: true,
                            idtosend: value.socketId,
                            usertosend: value.username
                          })} class='material-icons'>chat</i>
                          <i onClick={() => this.openModal(value.username)} style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '2px' }} class='material-icons'>account_circle</i> {this.state.meetingperson == 'host' ? (<span>          <i onClick={(e) => this.disconnectspecificuser(value.username, value.socketId)} style={{ cursor: 'pointer', color: 'red', fontSize: '16px', backgroundColor: 'white', borderRadius: '20px' }} class='material-icons'>call_end</i>
                            <i onClick={() => this.mutemicspecificuser(value.username, value.socketId)} style={{ backgroundColor: "white", borderRadius: '30px', zIndex: '3', cursor: 'pointer', fontSize: '17px', marginLeft: '4px', color: this.mutemicspecificuser && 'blue' || 'red' }} class='material-icons'>{this.mutemicspecificuser && 'mic' || 'mic_off'}</i>
                            {/* <button 
                  onClick={() =>  this.mutemicspecificuser(value.username,value.socketId)}>Mute</button> */}
                          </span>
                          ) : null}
                        </span>
                      )}

                    </div>

                  );
                }
              })
              : null}
            {this.state.meetingperson == 'client' && this.state.chats2 && this.state.chats2.length > 0
              ? this.state.chats2.map((value, index) => {
                if (index < 10) {
                  return (
                    <div style={{ backgroundColor: "#663399" }}>
                      <span> {value.username}</span>
                      {value.username == this.state.id ? (null) : (
                        <span><i style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '4px' }}
                          onClick={() => this.setState({
                            chatto: true,
                            idtosend: value.socketId,
                            usertosend: value.username
                          })} class='material-icons'>chat</i>
                          <i onClick={() => this.openModal(value.username)} style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '2px' }} class='material-icons'>account_circle</i> {this.state.meetingperson == 'host' ? (<span>          <i onClick={(e) => this.disconnectspecificuser(value.username, value.socketId)} style={{ cursor: 'pointer', color: 'red', fontSize: '16px', backgroundColor: 'white', borderRadius: '20px' }} class='material-icons'>call_end</i>
                            <i onClick={() => this.mutemicspecificuser(value.username, value.socketId)} style={{ backgroundColor: "white", borderRadius: '30px', zIndex: '3', cursor: 'pointer', fontSize: '17px', marginLeft: '4px', color: this.mutemicspecificuser && 'blue' || 'red' }} class='material-icons'>{this.mutemicspecificuser && 'mic' || 'mic_off'}</i>
                            {/* <button 
                  onClick={() =>  this.mutemicspecificuser(value.username,value.socketId)}>Mute</button> */}
                          </span>
                          ) : null}
                        </span>
                      )}

                    </div>

                  );
                }
              })
              : null}
            {
              this.state.chatto ? (<div>
                <form onSubmit={e => {
                  this.onSubmit(e);
                }}>
                  <label style={{ display: 'flex' }}>
                    Enter message:
    <input type="text" name="messagetouser" onChange={this.onChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>) : null
            }
            {/* _------------------------------------------------------------------------------------------------------- */}
          </div>

          <aside className="chatbar">

            <button onClick={closeMenu} className="chatbar-close-btn">CLOSE</button>

            <div class="container">

            </div>

            <div className="send">
              <form action="#" id="send-container">
                <input type="text" name="messageInp" id="messageInp" />
                <button className="btn-text-send" style={{ cursor: 'pointer', fontSize: '30px', marginTop: '10px' }} class='material-icons'>send</button>

              </form>
            </div>



          </aside>
        </div>



        {/* <Draggable style={{
          zIndex: 101,
          position: 'absolute',
          right: 0,
          cursor: 'move'
        }}> */}
        {/* {this.state.mutemic == true ? (<Video
          videoType='localVideo'
          videoStyles={{
            position: 'absolute',
            top: "336px",
            left: '10%',
            width: "12%",
            height: "150px",
            backgroundImage: 'linear-gradient(#034063, #034063)',
            // zIndex:2,
            // position: 'absolute',
            // right:0,
            // height: 200,
            // margin: 5,
            // backgroundColor: 'black'
          }}
          frameStyle={{
            width: 200,
            margin: 5,
            borderRadius: 5,
            backgroundColor: 'black',
          }}
          showMuteControls={true}
          micmute={true}
          // ref={this.localVideoref}
          videoStream={localStream}
          autoPlay muted>
        </Video>) : (<Video
          videoType='localVideo'
          videoStyles={{
            position: 'absolute',
            top: "69%",
            minWidth: '100px',
            left: '70%',
            width: "12%",
            // height: "150px",
            // backgroundImage: 'linear-gradient(#034063, #034063)',
            // zIndex:2,
            // position: 'absolute',
            // right:0,
            // height: 200,
            // margin: 5,
            // backgroundColor: 'black'
          }}
          frameStyle={{
            width: 200,
            margin: 5,
            borderRadius: 5,
            backgroundColor: 'black',
          }}
          showMuteControls={true}
          micmute={mutemic}
          // ref={this.localVideoref}
          videoStream={localStream}
          autoPlay muted>
        </Video>)} */}

        {/* </Draggable> */}
        {/* <Video
          frameStyle={{
            zIndex: 1,
            position: 'fixed',
            bottom: 0,
            minWidth: '100%', minHeight: '100%',
            backgroundColor: 'black'
          }}
        videoStyles={{
          // zIndex: 1,
          // position: 'fixed',
          // bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          // backgroundColor: 'black'
        }}
        // ref={ this.remoteVideoref }
        videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
        // autoPlay
      ></Video> */}
        <br />
        <div style={{ marginTop: '20vh', marginLeft: '32vh' }}>
          <Overlay
            open={this.state.open}
            onClose={() => this.setState({
              open: false
            })}
            closeOnClick
            style={{
              "background": "rgba(0, 0, 0, 0.3)",
              "display": "flex",
              "alignitems": "center",
              "justifycontent": "center"
            }}
          >
            {/* modal for public profile */}
            <div>
              <div className="profile-container" style={{ backgroundColor: "white", height: '140vh', width: "60%", right: "25%" }}>
                {/* <h3>your Public profile</h3> */}
                <ul>
                  <button onClick={() => this.setState({
                    open: false
                  })}>Close</button>
                  <div className="modal-public-profile-pic">


                    <div style={{ width: "100px", height: "90px", backgroundColor: "#034063", marginTop: '30%', marginLeft: '15%' }}>

                      {this.state.image1 ? <img src={this.state.image1} style={{ width: "100px", height: "90px" }} /> : (<div>


                      </div>)}

                    </div>



                    <ul>
                      <h2><li>{this.state.firstname} {this.state.lastname}
                        {this.state.verified == "a" ? (<img style={{ width: '25px' }} src={a}></img>) : null}
                        {this.state.verified == "b" ? (<img style={{ width: '25px' }} src={b}></img>) : null}
                        {this.state.verified == "g" ? (<img style={{ width: '25px' }} src={g}></img>) : null}
                        {this.state.verified == "p" ? (<img style={{ width: '25px' }} src={p}></img>) : null}
                        {this.state.verified == "r" ? (<img style={{ width: '25px' }} src={r}></img>) : null}
                        {this.state.verified == "y" ? (<img style={{ width: '25px' }} src={y}></img>) : null}
                      </li></h2>
                      <ul style={{ marginTop: '-15px', marginLeft: '-30px', textAlign: 'start' }}>
                        <li>Username:{this.state.username}</li>

                        <li>Organization: {this.state.organization}</li>

                        <li>Country: {this.state.country}</li>
                        <li>City: {this.state.city}</li>


                      </ul>
                    </ul>
                  </div>
                  <br></br>
                  <div className="biolinksModal" >
                    <h4 style={{ color: "grey" }} >Bio</h4>
                    <ul style={{ height: '10vh', color: "blue" }}>

                      {/* <li>Email :{this.state.email}</li> */}
                      {/* <Linkify componentDecorator={componentDecorator}>  <li>Links: {this.state.links} </li></Linkify> */}
                      <li>{this.state.bio}</li>

                    </ul>


                  </div>
                  <br></br>
                  <div className="biolinksModal" >
                    <h4 style={{ color: "grey" }}  >Social Links</h4>
                    <ul style={{ minHeight: "10vh", color: "blue" }}>

                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Facebook} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.FacebookLive} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.LinkedIn} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Instagram} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Youtube} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.YoutubeLive} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Twitter} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Weblink1} </li></Linkify>
                      <Linkify componentDecorator={componentDecorator}>  <li> {this.state.Weblink2} </li></Linkify>




                    </ul>


                  </div>

                </ul>

                <div className='footer' >(c)VEROHive.All Rights Reserved</div>
              </div >
            </div>
            {/* complete */}


          </Overlay>
        </div>



        {/* <div>
          <Videos
            switchVideo={this.switchVideo}
            remoteStreams={remoteStreams}
          // videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
          ></Videos>
        </div> */}
        <br />

        {/* {this.state.usersavailable.map(users)=>{
}} */}

        <ul style={{
          display: 'flex', backgroundColor: 'black',
          justifyContent: 'space-evenly',
          backgroundColor: 'black',
          /* top: 50%; */
          position: 'absolute',
          top: '91vh',
          /* right: 0; */
          height: '44px',
          width: '80%',
          left: '6%',
          position: 'fixed'
        }}>

          <MuiThemeProvider theme={theme}>
            <Tooltip title="FILE"><li><i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }}
              onDoubleClick={closeMenufile}
              onClick={openMenufile} class='material-icons'>insert_drive_file</i>

            </li></Tooltip>
          </MuiThemeProvider>

          <MuiThemeProvider theme={theme}>
            <Tooltip title="WHITEBOARD"><li style={{ fontStyle: 'none' }}>
              <a href="https://whiteboard.verohive.org/" target="_blank">
                <i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }} class='material-icons'>developer_board</i></a>
            </li></Tooltip>
          </MuiThemeProvider>


          <MuiThemeProvider theme={theme}>
            <Tooltip title="SCREEN SHARE"><li style={{ fontStyle: 'none' }}>
              <a href="https://screenshare.verohive.org/" target="_blank">
                <i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }} class='material-icons'>screen_share</i></a>
            </li></Tooltip>
          </MuiThemeProvider>
          <MuiThemeProvider theme={theme}>
            <Tooltip title="INVITE"><li >
              <i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }}
                onDoubleClick={closeInvite}
                onClick={openInvite} href="#" class='material-icons'>person_add</i>

            </li></Tooltip></MuiThemeProvider>

          <MuiThemeProvider theme={theme}>
            <Tooltip title="GROUP CHAT"><li> <div className="brand">
              <i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }}
                onDoubleClick={closeMenu}
                onClick={openMenu} class='material-icons'>chat</i>


            </div></li></Tooltip></MuiThemeProvider>

          <MuiThemeProvider theme={theme}>
            <Tooltip title="ATTENDEE"><li> <i style={{ cursor: 'pointer', marginTop: '12px', fontSize: '30px' }}
              onDoubleClick={closeUserMenu}
              onClick={openMenuUser} class='material-icons'>supervised_user_circler</i>
            </li></Tooltip></MuiThemeProvider>

          <MuiThemeProvider theme={theme}>
            <Tooltip title="Audio Mute">
              <li> <i id="audiomute" style={{ cursor: 'pointer', padding: 2, color: 'red', fontSize: '22px', backgroundColor: 'white', borderRadius: '20px', marginTop: '12px' }} class='material-icons'>mic_off</i>
              </li></Tooltip></MuiThemeProvider>
          <MuiThemeProvider theme={theme}>
            <Tooltip title="Cam OFF"><li> <i id="videomute" style={{ cursor: 'pointer', padding: 2, color: 'red', fontSize: '22px', backgroundColor: 'white', borderRadius: '20px', marginTop: '12px' }} class='material-icons'>videocam_off</i>
            </li></Tooltip>
          </MuiThemeProvider>
          <MuiThemeProvider theme={theme}> <Tooltip title="Hangup"><li> <i id="hangupbtn" style={{ cursor: 'pointer', padding: 2, color: 'red', fontSize: '22px', backgroundColor: 'white', borderRadius: '20px', marginTop: '12px' }} class='material-icons'>call_end</i>
          </li></Tooltip></MuiThemeProvider>


          {/* <button id="hostview">Host</button> */}
        </ul>

        {/* {this.state.show?(<div>
  <Chat
            user={{
              uid: this.socket && this.socket.id || ''
          }}
          messages={messages}
          sendMessage={(message) => {
            this.setState(prevState => {
              return {messages: [...prevState.messages, message]}
            })
            this.state.sendChannels.map(sendChannel => {
              sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(message))
            })
            this.sendToPeer('new-message', JSON.stringify(message), {local: this.socket.id})
          }}
        />
        </div>):(null)}
       */}

        {/* <div>
          <i  className="msg-btn" onClick={() => this.sayHello()} >Msg</i>
         
         
      </div> */}
        <div>

        </div>


      </div>



    )
  }
}

export default testdash;