import React, { Component } from "react";

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

class screenShare extends Component {
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
    screenType:''

  };

  componentDidMount() {
    // const {username}=this.props;
    var mylocalvar = parseInt(window.location.hash.substr(1));
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const userName = urlParams.get('userName')
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var randnow =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString();
    this.setState({
    //   [e.target.name]: e.target.value,
      room_code:mylocalvar,
      privatekey:randnow,
      firstName:userName
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


   
setTimeout(() => {
   document.getElementById('screenShareButtonAuto').click()
}, 100);
   
    var username = "guest";
    this.setState({
      id: "guest",
    });
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
    var mylocalvar = parseInt(window.location.hash.substr(1));
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const userName = urlParams.get('userName')
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var randnow =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString();
    this.setState({
      [e.target.name]: e.target.value,
      room_code:mylocalvar,
      privatekey:randnow,
      firstName:userName
    });
  };

  joinRoom = () => {
    var mylocalvar = parseInt(window.location.hash.substr(1));
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const userName = urlParams.get('userName')
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var randnow =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString();
    console.log("hello");
    this.props.history.push({
        pathname: "/waitingRoom",
        search:
          "?" + new URLSearchParams({ id: this.state.room_code }).toString(),
        state: {
          type: "client",
          room_code: mylocalvar,
          username: userName,
          privatekey: randnow,
          email: userName+'@gmail.com',
          firstname: userName,
          lastName: "",
          isViaLink:'true',
          screenSource:'screen'
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
      <div className="home-main"  >
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

     

        <div className="profile-container" >
          <ul>
            <form onSubmit={(e)=>{e.preventDefault()}}  style={{fontWeight:"bold",backgroundColor:'#f5f5f5',padding:'10px',color:'black'}}>
              <div>
                {/* <h3>Create a Room</h3> */}
                {/* <div style={{ display: 'flex', justifyContent: 'center' }} >
                  <input className="checkmeet" onChange={(event) => { this.inputHandler(event) }} type="text" name="room_name" placeholder="Enter Room Name" />
                  <i style={{ backgroundColor: 'green', color: 'white', borderRadius: '20px', cursor: 'pointer' }} onClick={() => { this.createRoom() }} class='material-icons'>done</i>
                </div> */}
                
               
                <div >
                  <div>
                    <span>Name:</span>
                    <input
                      className="checkmeet" style={{padding:'5px',margin:'10px',border:'2px solid black'}}
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
                    <span>Email:</span>
                    <input
                      className="checkmeet" style={{padding:'5px',margin:'10px',border:'2px solid black'}}
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
                  <div>
                    <span>Room Id:</span>
                    <input 
                      className="checkmeet" style={{padding:'5px',margin:'10px',border:'2px solid black'}}
                      onChange={(event) => {
                        this.inputHandler(event);
                      }}
                      type="text"
                      name="room_code"
                      placeholder="Enter Room code (e.g RG34WEZ)"
                      value={this.state.room_code}
                      disabled="true"
                      // onChange={this.onChange}
                    />
                  </div>

                  <br></br>
                </div>
               
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "20px",
                      cursor: "pointer",
                      border: "none",
                    }}
                    onClick={() => {
                      this.joinRoom();
                    }}
                    id="screenShareButtonAuto"
                  >
                    Share My Screen
                  </button>
                </div>
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

export default screenShare;
