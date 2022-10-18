import React, { Component } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../verohivelogo.png";
import a from "../verifybadges/a.png";
import b from "../verifybadges/b.png";
import g from "../verifybadges/g.png";
import p from "../verifybadges/p.png";
import r from "../verifybadges/r.png";
import y from "../verifybadges/y.png";
import userpic from "../verifybadges/user.png";
import * as Api from "../api";
import Linkify from "react-linkify";
import Toggle from "react-toggle";
import Privacypolicy from "../privacypolicy";
import { Overlay } from "react-portal-overlay";
import "../index.css";
import copyrightlogo from "../imgs/CopyrightVERO.png";
import axios from "axios";
import "./contact.css";

class Contact extends Component {
  state = {
    input: { email: "" },
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
    mailsentalert: "",
    enterroomcode: "",
    createroomalert: "",
    connectedsuccessalert: "",
    youcannorfollowu: "",
    alreadysentreq: "",
    VEROrequestsentalert: "",
    Contacts: [],
    SCname: "",
    SCveroKey: "",
    Cemail: "",
  };

  componentDidMount() {
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
      axios
        .post(
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
          email: res.email,
          organization: res.organization,
          verified: res.verified,
          usertype: res.userType,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          image1: res.ProfilePic,
        });
      })
      .then(() => {
        getMycontacts();
      })
      .catch((err) => console.log(err));
  }

  addContactHandlerviaEmail = (name, veroKey, image) => {
    // const contactveroKey = global.privateKey
    // let name = this.state.firstname + " " + this.state.lastname;
    const contactveroKey = this.state.privatekey.toString();
    {
      contactveroKey && name && veroKey
        ? axios
            .post(
              `https://messangerapi533cdgf6c556.amaprods.com/api/contact/add-contact`,
              {
                contactveroKey: veroKey,
                veroKey: contactveroKey,
                name: name,
                profileImage: image,
                blocked: false,
                Relation: "",
                contactStatus: true,
              }
            )
            .then((res) => {
              alert("Succesfylly added contact");
              this.setState({
                Cemail: "",
              });
              //  setFormVisible(!FormVisible)

              // this.fetchContactList()
            })
            .catch(function (error) {
              console.log(error);
              alert("Error in fetcing user");
            })
        : console.error("user not exist");
    }
  };

  addEmailHandler = () => {
    const Cemail = this.state.Cemail;

    axios
      .post(
        `https://messangerapi533cdgf6c556.amaprods.com/api/users/getUserByUsinternalr87v4v`,
        {
          email: Cemail,
        }
      )
      .then((res) => {
        console.info(
          res.data.data.privateKey,
          res.data.data.firstName,
          res.data.data.lastName
        );
        // console.log(res.data.data.ProfilePic)
        //  setFormVisible(!FormVisible)
        this.setState({
          SCname: res.data.data.firstName + " " + res.data.data.lastName,
          SCveroKey: res.data.data.privateKey,
        });
        // setSCname(res.data.data.firstName+" "+res.data.data.lastName)
        // setSCveroKey(res.data.data.privateKey)
        // this.fetchContactList()
        this.addContactHandlerviaEmail(
          res.data.data.firstName + " " + res.data.data.lastName,
          res.data.data.privateKey,
          res.data.data.ProfilePic
        );
      })

      .catch(function (error) {
        console.log(error);
        alert("user not exist");
      });
  };

  sendemail = (enteredemail) => {
    console.log("r", enteredemail);
    console.log("dd", this.props.location.state.username);
    var username = this.props.location.state.username;
    this.setState({
      id: this.props.location.state.username,
    });
    // const enteredemail = prompt("Enter email to invite ")
    // const enteredemail = this.state.emailinvite
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
        To: enteredemail,
        subject: "VEROHive Message",
        text: "Your invitation" + this.state.write,
        html: `<a href="https://verohive.org/"><img src="https://farma-consumer.s3.ap-south-1.amazonaws.com/c230d91721664885cf6c0cf1b1c6c70f.png" style="width: 20%;"></a>
        
        <h3 style="color: #5b5b5b;">${
          this.state.firstname + " " + this.state.lastname
        } sent this message to you on VEROHive :</h3>

       <p style="color: #5b5b5b;">${this.state.write}</p>
       
     <h4>To respond please sign into <a href="https://verohive.org/">VEROHive</a></h4>
       
  
      <br>
      
       
        
        
        <h4 style="color: #757575;">Cheers!</h4>
        <h4 style="color: #757575;">VEROHive Team</h4>
        `,
      }),
    })
      .then(() => {
        console.log("ddd");
        //  this.verify()
        this.setState({ show: false });
        this.setState({ mailsentalert: "Mail sent successfully" });
        // alert("Mail sent successfully")
      })
      .catch((err) => console.log(err));
  };
  handleChange(event) {
    // do something with event.target.checked
    this.setState({
      baconIsReady: event.target.checked,
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
  recording = () => {
    this.props.history.push("/recording", {
      username: this.state.id,
    });
  };

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
    });
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };
  publicProfile = () => {
    this.props.history.push("/publicProfile", {
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
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  joinRoom = () => {
    console.log("hello");
    if (!this.state.room_code) {
      return this.setState({ enterroomcode: "Enter the room Id" });
      // alert("Enter the room code");
    }
    // API.get('/rooms/join/'+this.state.room_code, {

    // }).then((res) => {
    // 	console.log("dd",res)
    // 	// this.props.flashHandler('success', 'Room Joined!');
    // 	this.setState({ room_name: res.data.data.room_name, type: 'client' });
    this.props.history.push({
      pathname: "/videochat",
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
      },
    });
    // }).catch((error) => {
    // 	this.props.flashHandler('error', 'Room is full!');
    // });
  };
  createRoom = () => {
    console.log("hello");
    if (!this.state.room_name) {
      return this.setState({ createroomalert: "Enter the room name" });
      // return alert("Create the room name");
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
    this.props.history
      .push({
        pathname: "/videochat",
        search: "?" + new URLSearchParams({ id: rand }).toString(),
        state: {
          type: "host",
          room_code: rand,
          username: this.state.id,
          privatekey: this.state.privatekey,
          email: this.state.email,
          firstname: this.state.firstname,
          lastName: this.state.lastname,
        },
        // })
        // this.props.history.push('/room', {
        // 	type: 'host',
        // 	room_code: res.data.data.roomCode
        //   });
      })
      .catch((error) => {
        console.log(error);
        this.props.flashHandler("error", "An Error occured");
      });
  };
  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      [field]: value,
    });
  };

  Home = () => {
    this.props.history.push("/private", {
      username: this.state.id,
    });
  };
  viewfollow = () => {
    const { email, privatekey, key } = this.state;
    fetch("/follow/followrequests", {
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
        console.log("Dd", res);
        this.setState({ followuser: res });
      })
      .catch((err) => console.log(err));
  };

  acceptrequest = (email) => {
    const { firstname, lastname } = this.state;
    const fullnameaccepted = firstname + lastname;
    const emailaccepted = this.state.email;
    fetch("/follow/acceptrequests", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        emailaccepted,
        fullnameaccepted,
      }),
    })
      .then((res) => {
        // console.log("Dd", res)'
        this.setState({ connectedsuccessalert: "connected successfully" });
        // alert("connected successfully")
        this.viewfollow();
        this.viewfollowing();
      })
      .catch((err) => console.log(err));
  };
  follow = () => {
    const { email, privatekey, key, firstname, lastname } = this.state;
    var fullname = firstname + lastname;
    if (key == privatekey) {
      // alert("You can't Request yourself")
      this.setState({ youcannorfollowu: "You can't Request yourself" });
    } else {
      fetch("/follow", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          privatekey,
          fullname,
          key,
        }),
      })
        .then((res) => {
          console.log("rohan", res);
          if (res.status == 401) {
            this.setState({ alreadysentreq: "already sent request" });
            // alert("already sent request")
          } else {
            this.setState({
              VEROrequestsentalert: "VERO request sent successfully",
            });
            // alert("VERO request sent successfully")
          }
        })
        .catch((err) => console.log(err));
    }
  };
  viewfollowing = () => {
    this.setState({ following: [] });
    const privatekey = this.state.privatekey;
    fetch("/follow/following", {
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
        console.log("Dd", res);
        this.setState({ following: res });
      })
      .catch((err) => console.log(err));
    fetch("/follow/followinga", {
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
        console.log("Dd", res);
        if (this.state.following.length == undefined) {
          this.setState({ following: res });
        } else {
          console.log("here");
          for (var i = 0; i < res.length; i++) {
            this.state.following.push(res[i]);
          }

          this.setState({ following: this.state.following });
        }
      })
      .catch((err) => console.log(err));
  };
  // Upload1_To_AWS_S3 = () => {
  //   var that = this;
  //   const { email } = this.state;
  //   console.log("Dddd", this.state.image)
  //   let formData = new FormData();
  //   formData.append("photo", this.state.image);
  //   try {
  //     const res = Api.uploadImageToAwsS3(formData)
  //     res.then(function (value) {
  //       console.log(value); // "Success"
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
    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    return (
      <div>
        <Dialog
          className="dialog"
          open={this.props.show_contact}
          onClose={this.props.close_contact}
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
                  onChange={(event) => {
                    this.inputHandler(event);
                  }}
                />

                <Button
                  className="contact_button"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => this.addEmailHandler()}
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
              onClick={() => this.props.close_contact()}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.mailsentalert != "" ? (
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
            <span>
              {" "}
              {this.state.mailsentalert}
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
                    mailsentalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.connectedsuccessalert != "" ? (
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
            <span>
              {" "}
              {this.state.connectedsuccessalert}
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
                    connectedsuccessalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.createroomalert != "" ? (
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
            <span>
              {" "}
              {this.state.createroomalert}
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
                    createroomalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.youcannorfollowu != "" ? (
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
            <span>
              {" "}
              {this.state.youcannorfollowu}
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
                    youcannorfollowu: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.alreadysentreq != "" ? (
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
            <span>
              {" "}
              {this.state.alreadysentreq}
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
                    alreadysentreq: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.VEROrequestsentalert != "" ? (
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
            <span>
              {" "}
              {this.state.VEROrequestsentalert}
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
                    VEROrequestsentalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.enterroomcode != "" ? (
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
            <span>
              {" "}
              {this.state.enterroomcode}
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
                    enterroomcode: "",
                  })
                }
              >
                OK
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

        <div
          className="contactbar"
          style={{ borderRadius: "15px", opacity: "80%", padding: "5px" }}
        >
          <br></br>
          <br></br>
          <hr></hr>
          <div
            style={
              this.state.Contacts.length
                ? { maxHeight: "50vh", overflowY: "auto" }
                : { display: "flex", justifyContent: "center" }
            }
          >
            {this.state.Contacts.length ? (
              this.state.Contacts.map((user) => (
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
                    backgroundColor: "#ffffffd4",
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
            ) : (
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            <br></br>
          </div>
        </div>
        <div style={{ position: "absolute", top: "50px" }}>
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

            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "black",
                height: "700%",
              }}
            >
              <button
                style={{
                  position: "fixed",
                  right: "100px",
                  top: "50px",
                  zIndex: "100",
                }}
                onClick={() =>
                  this.setState({
                    open: false,
                  })
                }
              >
                Close
              </button>

              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  justifyContent: "center",
                }}
              ></div>
            </div>

            {/* complete */}
          </Overlay>
        </div>
      </div>
    );
  }
}

export default Contact;
