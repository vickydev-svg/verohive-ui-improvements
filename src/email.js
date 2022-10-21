import React from "react";
import TimeField from "react-simple-timefield";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";
import logo from "./verohivelogo.png";
import io from "socket.io-client";
import { homedir } from "os";

import Contact from "./profile/contact";
import Axios from "axios";

var socket = io();
class Emailme extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      server_url: process.env.REACT_APP_SERVER_URL,
      meeting: true,
      value: "",
      emails: [],
      error: null,
      titleValue: "",
      description: "",
      gapi: "",
      CLIENT_ID: "",
      API_KEY: "",
      DISCOVERY_DOCS: "",
      date: "",
      enddate: "",
      SCOPES: "",
      usersTimeZone: "",
      time: "",
      endTime: "",
      Roomname: "",
      hostroomcode: "",
      invitationsentsuccessfully: "",
      email: "",
      firstname: "",
      lastname: "",
      roompin: "",
      Message: "",
      Contacts: [],
      showContact: false,
    };
    // this.onTimeChange = this.onTimeChange.bind(this);
  }

  // onTimeChange(e) {
  //     this.setState({ time: e.target.value });
  // }
  componentDidMount() {
    // const {username}=this.props;
    console.log("dd", this.props.location.state.username);
    var username = this.props.location.state.username;
    this.setState({
      id: this.props.location.state.username,
    });
    const getMycontacts = () => {
      let name = this.state.firstname + " " + this.state.lastname;
      let privateKey = this.state.privatekey.toString();
      console.log(name, privateKey);
      Axios.post(
        "https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/",
        {
          veroKey: privateKey,
          name: name,
        }
      )
        .then((res) => {
          console.log(JSON.parse(res.data.data.contact), "contacts sky");
          const contactParse = JSON.parse(res.data.data.contact);
          this.setState({ Contacts: contactParse });
        })
        .catch((err) => {
          console.log(err);
          console.log(name, privateKey);
        });
    };

    fetch(this.state.server_url + "/getuser", {
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
          usertype: res.userType,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          image1: res.ProfilePic,
          roompin: res.roompin,
        });
      })
      .then(() => {
        getMycontacts();
      })
      .catch((err) => console.log(err));

    var d = new Date();
    var n = d.getTimezoneOffset();
    var sign = Math.sign(n);
    if (sign == 1) {
      n = n;
    } else n = n * sign;
    var hours = Math.floor(n / 60);
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = n % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var yourtimezone = hours + ":" + minutes;
    if (Math.sign(n) == 1) {
      yourtimezone = "+" + yourtimezone;
    } else yourtimezone = "-" + yourtimezone;
    this.setState({
      usersTimeZone: yourtimezone,
    });
  }
  componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  rgbToHex = (r, g, b) => {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  };

  getRandomColor = (name) => {
    // get first alphabet in upper case
    const firstAlphabet = name.charAt(0).toLowerCase();

    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);

    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum =
      asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    var num = Math.round(0xffffff * parseInt(colorNum));
    var r = (num >> 16) & 255;
    var g = (num >> 8) & 255;
    var b = num & 255;

    return {
      color: this.rgbToHex(r, g, b),
      character: firstAlphabet.toUpperCase(),
    };
  };
  createRoom = () => {
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

    // socket.emit('roompin', { pin: localStorage.verokey, roomcode: rand })
    this.setState({
      hostroomcode: rand,
    });
  };
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

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Home = () => {
    this.props.history.push("/private", {
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

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleKeyDown = (e) => {
    if (["Enter", "Tab", "Spacebar", ","].includes(e.key)) {
      e.preventDefault();

      var email = this.state.value.trim();
      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: "",
          error: "",
        });
      }
    }
  };

  handleDelete = (toBeRemove) => {
    this.setState({
      emails: this.state.emails.filter((email) => email !== toBeRemove),
    });
  };

  isValid(email) {
    var error = null;

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }
  isInList(email) {
    return this.state.emails.includes(email);
  }
  handleClick() {
    var rand, mailOptions, host, link;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var rand5 = Math.floor(Math.random() * 100 + 54);

    rand =
      this.state.roompin +
      rand3.toString() +
      rand4.toString() +
      rand5.toString();
    this.state.emails.forEach((email) => {
      fetch("/nodemailer", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          To: email,
          subject: "VeroTownhall Meeting Invitation",
          text: "Your invitation Code is" + rand,
          html: `<img src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/IvLvPO7ygnYzNg7PDE9AIfrvxEzs7p4zpublic/icons/verohivelogo.png" style="width: 150px;">'
        <h1 style="color: #5b5b5b;">VEROTownhall Meeting Invitation</h1>
        <h3>You are invited by : ${
          this.state.firstname + " " + this.state.lastname
        } </h3>

        <br>
        <h3 style="color: #757575;">Meeting ID :${rand}</h3>
        <h3 style="color: #757575;">Meeting Date :${this.state.date}</h3>
        <h3 style="color: #757575;">Meeting Time :${this.state.time}  GMT${
            this.state.usersTimeZone
          }  ${Intl.DateTimeFormat().resolvedOptions().timeZone}</h3>
        <a style="font-size:1.5rem;font-weight:bold;text-decoration:none" href="https://www.verohive.net/21AEF56E76A866F1161468CEBF5B23A9CE43F5E6319D050E498E77C02FDDD7BDcbvhjdferut4545347nvfrjhrt43734/#${rand}">ATTENDEE CLICK HERE TO ENTER MEETING</a>           
          <br> 
        <p style="color: #757575;">${this.state.Message}</p>
            
      
      <br>
      <h2 style="color: red;">**IMPORTANT: For Use Only on Google Chrome, Firefox or Microsoft Edge Chrome Browsers, Safari Browsers are NOT Supported**</h2>

        <h3>Alternatively: Attendee's who want to use their accounts follow the below instructions:</h3>    
       <p>
       
       Click on the link below to sign into your VEROHive account, if you do not have an account then go to <a href=https://www.verohive.net/>VEROTownhall</a> to create one to join the meeting and be a part of  the growing VEROHive community.
       </p>
      <p>
      The security and privacy of our members is important, this is why VEROHive provides end to end encryption on our system for all members.
      </p>
      <p>
      Learn more about how VEROHive works by going to <a href=https://verohive.com>www.verohive.com</a>
      </p>
      
       <a href=https://www.verohive.net/>Sign in or Sign up </a>
       
        <h5>Note: Place Attendee Room ID in the Attendee Room ID slot on your dashboard.</h5>
        
        <h4 style="color: #757575;">Cheers!</h4>
        <h4 style="color: #757575;">VeroTownhall Team</h4>
        `,
        }),
      })
        .then(() => {
          console.log("ddd");
          //  this.verify()
          this.setState({
            invitationsentsuccessfully: "Invitation sent successfully",
            hostroomcode: rand,
          });
          fetch("/nodemailer", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              To: this.state.email,
              subject: "VeroHivel Meeting Notification",
              text: "Your Room Code is" + rand,
              html: `<img src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/IvLvPO7ygnYzNg7PDE9AIfrvxEzs7p4zpublic/icons/verohivelogo.png" style="width: 150px;">'
                <h1 style="color: #5b5b5b;">VeroHivel Meeting Notification</h1>
                <h3> Hello! ${this.state.firstname + " " + this.state.lastname}
                <h3>You recently scheduled a meeting with ${email} </h3>
                    
              
              <br>
               <h3 style="color: #757575;">Meeting ID :${rand}</h3>
               <h3 style="color: #757575;">Meeting Date :${this.state.date}</h3>
               <h3 style="color: #757575;">Meeting Time :${
                 this.state.time
               }  GMT${this.state.usersTimeZone}  ${
                Intl.DateTimeFormat().resolvedOptions().timeZone
              }</h3>
    
               
    
                <h4 style="color: #757575;">Cheers!</h4>
                <h4 style="color: #757575;">VEROHive Team</h4>
                `,
            }),
          })
            .then(() => {
              console.log("success email sent", email);

              // alert("Invitation sent successfully")
            })
            .catch((err) => console.log(err));

          // alert("Invitation sent successfully")
        })
        .catch((err) => console.log(err));
    });

    //calendar part

    // var gapi = window.gapi
    // /*
    //   Update with your own Client Id and Api key
    // */

    // this.setState({
    //     CLIENT_ID: '228713505587-vj1bfoj29vvs8ed2evmktoaq6moqeh44.apps.googleusercontent.com',
    //     API_KEY: 'AIzaSyA54dSKqej3wSyVcvRt6J0kc16VPi8qrUo',
    //     DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    //     SCOPES: 'https://www.googleapis.com/auth/calendar.events'

    // })
    // gapi.load('client:auth2', () => {
    //     console.log('loaded client')

    //     gapi.client.init({
    //         apiKey: this.state.API_KEY,
    //         clientId: this.state.CLIENT_ID,
    //         discoveryDocs: this.state.DISCOVERY_DOCS,
    //         scope: this.state.SCOPES,
    //     })

    //     gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //     gapi.auth2.getAuthInstance().signIn()
    //         .then(() => {

    //             var event = {
    //                 'summary': this.state.titleValue,
    //                 // 'location': '800 Howard St., San Francisco, CA 94103',
    //                 'description': "The meeting Room Id is: "+ rand,
    //                 'start': {
    //                     'dateTime': this.state.date + 'T' + this.state.time + this.state.usersTimeZone,
    //                     'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    //                 },
    //                 'end': {
    //                     'dateTime': this.state.enddate + 'T' + this.state.endTime + this.state.usersTimeZone,
    //                     'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    //                 },
    //                 // 'recurrence': [
    //                 //     'RRULE:FREQ=DAILY;COUNT=2'
    //                 // ],
    //                 'attendees': [
    //                     { 'email': this.state.emails }
    //                 ],
    //                 'reminders': {
    //                     'useDefault': false,
    //                     'overrides': [
    //                         { 'method': 'email', 'minutes': 24 * 60 },
    //                         { 'method': 'popup', 'minutes': 10 }
    //                     ]
    //                 }
    //             }

    //             var request = gapi.client.calendar.events.insert({
    //                 'calendarId': 'primary',
    //                 'resource': event,
    //                 'sendNotifications': true,
    //             })

    //             request.execute(event => {
    //                 console.log(event)
    //                 window.open(event.htmlLink)
    //             })

    //             /*
    //                 Uncomment the following block to get events
    //             */

    //             // get events
    //             gapi.client.calendar.events.list({
    //                 'calendarId': 'primary',
    //                 'timeMin': (new Date()).toISOString(),
    //                 'showDeleted': false,
    //                 'singleEvents': true,
    //                 'maxResults': 10,
    //                 'orderBy': 'startTime'
    //             }).then(response => {
    //                 const events = response.result.items
    //                 console.log('EVENTS: ', events)
    //             })

    //         })
    // })
  }

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
    const shareUrl = "https://verohive.net/register";
    const title = "VEROHive";

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
    return (
      <div>
        <div className="header">
          {/* <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
          </div> */}
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "45%" }}>V4.1.1</h4>
        </div>

        {this.state.invitationsentsuccessfully != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "2.4rem",
              position: "absolute",
              top: "19%",
              left: "29%",
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
            className="wrapper"
          >
            <span>
              {" "}
              {this.state.invitationsentsuccessfully}
              <br></br>
            </span>
            <span style={{ color: "white" }}>
              Meeting Room ID: {this.state.hostroomcode}
              <br></br>
            </span>
            <br></br>
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
                onClick={() => {
                  this.setState({
                    invitationsentsuccessfully: "",
                    hostroomcode: "",
                  });

                  this.Home();
                }}
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        <div className="wrapper">
          <Dialog
            className="metting_dialog dialog"
            open={this.state.meeting}
            // onClose={() => {
            //   this.handleCloseMeetingTime();
            // }}
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
                {this.state.emails.map((email) => (
                  <div className="tag-item" key={email}>
                    {email}
                    <button
                      type="button"
                      className="button"
                      onClick={() => this.handleDelete(email)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <div className="email_and_button">
                  <TextField
                    fullWidth
                    name="value"
                    label="Type Attendee Email Address"
                    id="fullWidth"
                    className="metting_textField"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
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

                  <div
                    style={
                      this.state.Contacts.length
                        ? { maxHeight: "50vh", overflowY: "auto" }
                        : { display: "flex", justifyContent: "center" }
                    }
                  >
                    {this.state.Contacts.length && this.state.showContact
                      ? this.state.Contacts.map((user) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              maxWidth: "300px",
                              maxHeight: "40px",
                              padding: "10px",
                              margin: "10px",
                              color: "black",
                              backgroundColor: "#D5D0D0",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                            onClick={() => {
                              const privateKey = user.veroKey;
                              Axios.post(
                                "https://messangerapi533cdgf6c556.amaprods.com/api/users/veroKeytestingrandom676767/",
                                {
                                  id: privateKey,
                                }
                              )
                                .then((res) => {
                                  console.log(res.data, "email data");
                                  if (this.isValid(res.data.data.email)) {
                                    this.setState({
                                      emails: [
                                        ...this.state.emails,
                                        res.data.data.email,
                                      ],
                                      value: "",
                                      error: "",
                                    });
                                  }
                                })
                                .catch((err) => console.log(err));
                            }}
                          >
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  marginRight: "15px",
                                  borderRadius: "50px",
                                }}
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "30px",
                                  width: "60px",
                                  textAlign: "center",
                                  height: "60px",
                                  marginRight: "15px",
                                  borderRadius: "50px",
                                  backgroundColor: "white",
                                  color: this.getRandomColor(user.name).color,
                                  fontWeight: "bold",
                                  textAlignVertical: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {user.name.charAt(0).toUpperCase()}
                              </p>
                            )}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <li
                                style={{ fontWeight: "bold", fontSize: "10px" }}
                              >
                                {user.name}
                              </li>
                              <li
                                style={{
                                  fontSize: "16px",
                                  color: "grey",
                                  maxWidth: "200px",
                                }}
                              >
                                {user.veroKey}
                              </li>
                            </div>
                          </div>
                        ))
                      : null}
                    <br></br>
                  </div>
                  <Button
                    className="email_metting_button"
                    variant="contained"
                    startIcon={<ContactsIcon />}
                    onClick={() =>
                      this.setState({ showContact: !this.state.showContact })
                    }
                  >
                    Add From Contacts
                  </Button>
                </div>
                {this.state.error && (
                  <p className="error">{this.state.error}</p>
                )}
                <div className="metting_title">
                  <TextField
                    name="titleValue"
                    fullWidth
                    label="Meeting Title"
                    id="fullWidth"
                    className="metting_textField"
                    value={this.state.titleValue}
                    onChange={this.handleChange}
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
                    name="date"
                    value={this.state.date}
                    onChange={this.handleChange}
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
                    name="message"
                    // type="message"
                    value={this.state.Message}
                    onChange={this.state.handleChange}
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
                    onClick={() => {
                      this.handleClick();
                    }}
                  >
                    Schedule Meeting
                  </Button>
                  <div style={{ display: "none" }}>
                    <input
                      className="input"
                      type="text"
                      name="roompin"
                      value={this.state.roompin}
                      disabled={true}
                      placeholder="roompin"
                      ref="roompin"
                    />
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                startIcon={<CloseIcon />}
                // onClick={() => {
                //   this.handleCloseMeetingTime();
                // }}
              >
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>

          {/*  */}
          {/*  */}
          {/* <h2>Schedule Your Meetings</h2> */}

          {/* {this.state.emails.map((email) => (
            <div className="tag-item" key={email}>
              {email}
              <button
                type="button"
                className="button"
                onClick={() => this.handleDelete(email)}
              >
                &times;
              </button>
            </div>
          ))}

          <input
            name="value"
            className="inputscheduler"
            placeholder="Type attendee email addresses"
            value={this.state.value}
            onChange={this.handleChange}
            // onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div
            style={
              this.state.Contacts.length
                ? { maxHeight: "50vh", overflowY: "auto" }
                : { display: "flex", justifyContent: "center" }
            }
          >
            {this.state.Contacts.length && this.state.showContact
              ? this.state.Contacts.map((user) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      maxWidth: "300px",
                      maxHeight: "50px",
                      padding: "10px",
                      margin: "10px",
                      color: "black",
                      backgroundColor: "#D5D0D0",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      const privateKey = user.veroKey;
                      Axios.post(
                        "https://messangerapi533cdgf6c556.amaprods.com/api/users/veroKeytestingrandom676767/",
                        {
                          id: privateKey,
                        }
                      )
                        .then((res) => {
                          console.log(res.data, "email data");
                          if (this.isValid(res.data.data.email)) {
                            this.setState({
                              emails: [
                                ...this.state.emails,
                                res.data.data.email,
                              ],
                              value: "",
                              error: "",
                            });
                          }
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "15px",
                          borderRadius: "50px",
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          fontSize: "30px",
                          width: "60px",
                          textAlign: "center",
                          height: "60px",
                          marginRight: "15px",
                          borderRadius: "50px",
                          backgroundColor: "white",
                          color: this.getRandomColor(user.name).color,
                          fontWeight: "bold",
                          textAlignVertical: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {user.name}
                      </li>
                      <li
                        style={{
                          fontSize: "16px",
                          color: "grey",
                          maxWidth: "200px",
                        }}
                      >
                        {user.veroKey}
                      </li>
                    </div>
                  </div>
                ))
              : null}
            <br></br>
          </div>
          <button
            onClick={() =>
              this.setState({ showContact: !this.state.showContact })
            }
          >
            Add From Contact
          </button>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <div>
            <input
              name="titleValue"
              className="inputscheduler"
              placeholder="Meeting Title"
              value={this.state.titleValue}
              onChange={this.handleChange}
            />

            <label>Meeting start Date</label>
            <input
              name="date"
              className="inputscheduler"
              placeholder="Start Date"
              type="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
            <label>
              Meeting start Time
              <TimeField
                // value={time}
                name="time"
                value={this.state.time}
                showSeconds
                onChange={this.handleChange}
              />
            </label>
            <br></br>
            <br></br>
            <label>Message </label>
            <br></br>
            <textarea
              style={{ width: "50%", height: "140px", fontSize: "15px" }}
              name="Message"
              className="MessageScheduler"
              placeholder="Message"
              type="Message"
              value={this.state.Message}
              onChange={this.handleChange}
            />

            <br></br>
            <br></br>
          </div>

          <button
            className="button"
            onClick={() => {
              this.handleClick();
            }}
          >
            Schedule Meeting
          </button>

          <div style={{ display: "none" }}>
            <input
              className="input"
              type="text"
              name="roompin"
              value={this.state.roompin}
              disabled={true}
              placeholder="roompin"
              ref="roompin"
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Emailme;
