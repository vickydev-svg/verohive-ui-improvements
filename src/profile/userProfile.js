import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../verohivelogo.png";
import Axios from "axios";
import { use } from "passport";
import Linkify from "react-linkify";
import Appp from "./myBar";
import * as Api from "../api";
import { Overlay } from "react-portal-overlay";
import copyrightlogo from "../imgs/CopyrightVERO.png";
import Privacypolicy from "../privacypolicy";

class UserProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    organization: "",
    links: "",
    bio: "",
    city: "",
    Facebook: "",
    FacebookLive: "",
    Twitter: "",
    Youtube: "",
    YoutubeLive: "",
    Instagram: "",
    LinkedIn: "",
    Weblink1: "",
    Weblink2: "",
    country: "",
    age: "",
    code: "",
    isRegistering: false,
    checked: false,
    checked1: false,
    verified: true,
    fillallrequiredalert: "",
    profileupdatealert: "",
    enterroomcode: "",
    createRoomalert: "",
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

    console.log("dd", this.props.location.state.username);
    var username = this.props.location.state.username;
    this.setState({
      id: this.props.location.state.username,
    });

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
          firstName: res.firstName,
          lastName: res.lastName,
          username: res.username,
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
        });
      })
      .catch((err) => console.log(err));
  }

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
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

  recording = () => {
    this.props.history.push("/recording", {
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
        this.props.history.push("/login");
        console.log("ff", res);
      })
      .catch((err) => console.log(err));
  };

  renderLoading() {
    return <div>Loading...</div>;
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handleCheck = () => {
  //   console.log("checked")
  //   this.setState({ checked: !this.state.checked });
  //   if (this.state.checked == false) {
  //     alert("You need to verify before using VEROHive")
  //     const enteredemail = prompt("Enter email address of your parent")
  //     var rand, mailOptions, host, link;
  //     var rand1 = Math.floor((Math.random() * 100) + 54);
  //     var rand2 = Math.floor((Math.random() * 100) + 54);
  //     var rand3 = Math.floor((Math.random() * 100) + 54);
  //     rand = rand1.toString() + rand2.toString();

  //     this.setState({
  //       code: rand
  //     })

  //     fetch("/nodemailer", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         To: enteredemail,
  //         subject: "Please verify email",
  //         text: "Your Verification Code is" + rand,
  //         html: `<img src="./verohivelogo.png" style="width: 30%;">
  //         <h1 style="color: #5b5b5b;">Welcome to VEROHive</h1>
  //         <h3 style="color: #757575;">Please verify your email address by using the OTP below</h3>
  //        <p>${rand}</p>
  //         <h4 style="color: #757575;">After verification, you will be able to start using VEROHive</h4><br><br>

  //         <h4 style="color: #757575;">Cheers!</h4>
  //         <h4 style="color: #757575;">VEROHive Team</h4>"
  //         `

  //       })
  //     })

  //       .then(() => {

  //         console.log("ddd")
  //         this.verify()
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }
  // handleCheck1 = () => {
  //   console.log("checked")
  //   this.setState({ checked1: !this.state.checked1 });

  // }

  // verify = () => {
  //   const { firstName, lastName, username, password, email, age } = this.state;
  //   const enteredcode = prompt("Enter Verification code")
  //   if (enteredcode == this.state.code) {
  //     alert("Successfully Verified")
  //     fetch("/signup", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         firstName,
  //         lastName,
  //         username,
  //         password,
  //         email,
  //         age
  //       })
  //     })
  //       .then(() => {
  //         this.props.history.push('/login')
  //       })
  //       .catch(err => console.log(err))
  //   }
  //   else {
  //     alert("Invalid code")
  //     this.setState({
  //       verified: false
  //     })
  //   }
  // }
  async onSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      password,
      confirmpassword,
      bio,
      Facebook,
      FacebookLive,
      Youtube,
      YoutubeLive,
      Instagram,
      LinkedIn,
      Twitter,
      Weblink1,
      Weblink2,
      city,
      country,
      links,
      organization,
      email,
      age,
      checked,
      checked1,
    } = this.state;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    if (
      !this.refs.firstName.value ||
      !this.refs.lastName.value ||
      !this.refs.username.value
      // !this.refs.email.value
    ) {
      return this.setState({
        fillallrequiredalert: "Fill all the required boxes",
      });
      // alert("Fill all the required boxes");
    } else {
      await fetch("/updateprofile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization,
          links,
          bio,
          city,
          country,
          username,
          firstName,
          lastName,
          Facebook,
          FacebookLive,
          Twitter,
          LinkedIn,
          Youtube,
          YoutubeLive,
          Instagram,
          Weblink1,
          Weblink2,

          email,
        }),
      })
        .then(() => {
          this.setState({ profileupdatealert: "Profile successfully updated" });
          // alert("Profile successfully updated")
        })
        .catch((err) => console.log(err));
    }
  }

  joinRoom = () => {
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
      },
    });
    // }).catch((error) => {
    // 	this.props.flashHandler('error', 'Room is full!');
    // });
  };

  contact = () => {
    this.props.history.push("/contact", {
      username: this.state.id,
    });
  };

  createRoom = () => {
    if (!this.state.room_name) {
      return this.setState({ createRoomalert: "Enter the room name" });
      // alert("Create the room name");
    }

    var rand, mailOptions, host, link;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);

    rand = rand1.toString() + rand2.toString() + rand3.toString();
    // rand = Math.random().toString(36).substring(9);

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
            // alert("profile pic changed successfully")
            that.setState({
              image1: value,
            });
          })
          .catch((err) => console.log(err));
      });
    } catch (e) {}
  };
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

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    return (
      <div>
        <div className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
          </div>

          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "47%" }}>
          V4.1.1
          </h4>
        </div>
        {this.state.fillallrequiredalert != "" ? (
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
              {this.state.fillallrequiredalert}
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
                    fillallrequiredalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.profileupdatealert != "" ? (
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
              {this.state.profileupdatealert}
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
                    profileupdatealert: "",
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
        {this.state.createRoomalert != "" ? (
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
              {this.state.createRoomalert}
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
                    createRoomalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        <aside className="sidebar">
          <h4 className="welcome-user">
            <div
              style={{
                width: "50px",
                height: "45px",
                backgroundColor: "#034063",
                marginLeft: "100px",
                borderRadius: "64px",
              }}
            >
              {this.state.image1 ? (
                <img
                  src={this.state.image1}
                  style={{
                    width: "50px",
                    height: "45px",
                    borderRadius: "64px",
                  }}
                />
              ) : (
                <div></div>
              )}
              {/* {this.state.image1 ? (<button

  className="btn btn-sendfile" style={{ backgroundColor: "red" }}
  onClick={() => this.setState(
    {
      image1: null
    }
  )}>Change</button>) : null} */}
            </div>
            Welcome {this.state.id}{" "}
          </h4>
          <button className="" onClick={() => this.sayHello()}>
            Logout
          </button>
          <button onClick={closeMenu} className="sidebar-close-btn">
            X
          </button>

          <hr></hr>
          <ul className="sidebar-ui">
            <li>
              <a className=" btn-profile " onClick={() => this.Home()}>
                Dashboard
              </a>
            </li>

            {/* <li  ><a className=" btn-profile " >Whiteboard</a></li> */}
            {/* <li ><a className=" btn-profile " href="https://screenshare.verohive.org/" target="_blank">Screenshare</a></li> */}

            {/* <li><a href="https://recordmeeting.verohive.org/" target="_blank"
              className=" btn-profile "
            >Recording</a></li> */}
            <li>
              <a className=" btn-profile ">Update Profile</a>
            </li>

            {/* <li><a
              className=" btn-profile "
              onClick={() => this.sayHello1()}>Profile</a></li> */}

            <li>
              <a className=" btn-profile " onClick={() => this.publicProfile()}>
                Public Profile
              </a>
            </li>

            <li>
              <a className=" btn-profile ">Background</a>
            </li>
            <li>
              <a className=" btn-profile " onClick={() => this.contact()}>
                Contacts
              </a>
            </li>
            <li>
              <a className=" btn-profile ">Schedule Meeting</a>
            </li>
            <li>
              <a className=" btn-profile ">Chat</a>
            </li>
          </ul>
          <hr></hr>
        </aside>

        <div className="update-profile">
          <form
            onSubmit={(e) => {
              this.onSubmit(e);
            }}
          >
            {/* <div className="name">
          <h4>
             First Name: <span style={{ color: "red" }}>*</span>
            </h4>
            <input 
              type="text"
              name="firstName"
              placeholder="First Name"
              ref="firstName"
              onChange={this.onChange}
            />
          </div> */}

            <div
              style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}
            >
              <h3 style={{ color: "grey" }}>Update profile</h3>
              <div
                className="profile-image"
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: "grey",
                  marginLeft: "10vh",
                  marginBottom: "7vh",
                }}
              >
                <div>
                  {this.state.image1 ? (
                    <img
                      src={this.state.image1}
                      style={{ width: "100px", height: "90px" }}
                    />
                  ) : (
                    <div>
                      <input
                        name="image"
                        type="file"
                        onChange={(e) => {
                          this.setState({ image: e.currentTarget.files[0] });
                        }}
                      />
                      <button
                        className="btn btn-sendfile"
                        style={{ backgroundColor: "red" }}
                        onClick={() => this.Upload1_To_AWS_S3()}
                      >
                        Upload Pic
                      </button>
                    </div>
                  )}
                  {this.state.image1 ? (
                    <button
                      className="btn btn-sendfile"
                      style={{ backgroundColor: "red" }}
                      onClick={() =>
                        this.setState({
                          image1: null,
                        })
                      }
                    >
                      Change
                    </button>
                  ) : null}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className="name">
                    <input
                      className="input"
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      disabled={true}
                      placeholder="First Name"
                      ref="firstName"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>

                  <div className="username">
                    <input
                      className="input"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      disabled={true}
                      ref="username"
                      onChange={this.onChange}
                    />
                  </div>
                  <div>
                    <br></br>

                    <input
                      className="input"
                      type="text"
                      name="city"
                      value={this.state.city}
                      placeholder="City"
                      ref="city"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>
                  <div>
                    <input
                      className="input"
                      type="text"
                      name="country"
                      value={this.state.country}
                      placeholder="Country"
                      ref="country"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>
                  <div>
                    <input
                      className="input"
                      type="text"
                      name="organization"
                      value={this.state.organization}
                      placeholder="Organization"
                      ref="organization"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>
                  <div>
                    <textarea
                      rows="4"
                      cols="50"
                      name="comment"
                      className="input"
                      style={{ height: "15vh", textAlign: "start" }}
                      type="textarea"
                      name="bio"
                      value={this.state.bio}
                      placeholder="Bio"
                      ref="bio"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div>
                    <input
                      className="input"
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      disabled={true}
                      placeholder="Last Name"
                      ref="lastName"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>
                  <div className="email ">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={this.state.email}
                      disabled={true}
                      placeholder="Email"
                      ref="email"
                      onChange={this.onChange}
                    />
                  </div>
                  {/* <div  >
                    <Linkify componentDecorator={componentDecorator}>
                      <input className="input"
                        type="text"
                        name="links"
                        value={this.state.links}
                        placeholder="Links"
                        ref="links"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div> */}
                  <p style={{ color: "grey", marginLeft: "10vh" }}>
                    Website links
                  </p>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="LinkedIn"
                        value={this.state.LinkedIn}
                        placeholder="LinkedIn"
                        ref="LinkedIn"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input "
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Facebook"
                        value={this.state.Facebook}
                        placeholder="Facebook"
                        ref="Facebook"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="FacebookLive"
                        value={this.state.FacebookLive}
                        placeholder="Facebook Live"
                        ref="FacebookLive"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Twitter"
                        value={this.state.Twitter}
                        placeholder="Twitter"
                        ref="Twitter"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Instagram"
                        value={this.state.Instagram}
                        placeholder="Instagram"
                        ref="Instagram"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Youtube"
                        value={this.state.Youtube}
                        placeholder="Youtube"
                        ref="Youtube"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="YoutubeLive"
                        value={this.state.YoutubeLive}
                        placeholder="Youtube Live"
                        ref="Youtube Live"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>{" "}
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Weblink1"
                        value={this.state.Weblink1}
                        placeholder="Other Website"
                        ref="Weblink1"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>{" "}
                  <div>
                    <Linkify componentDecorator={componentDecorator}>
                      <input
                        className="input"
                        style={{
                          width: "30vh",
                          fontSize: "1.2rem",
                          height: "2vh",
                          textAlign: "start",
                          borderRadius: "5px",
                        }}
                        type="text"
                        name="Weblink2"
                        value={this.state.Weblink2}
                        placeholder="Other Website"
                        ref="Weblink2"
                        onChange={this.onChange}
                      />
                    </Linkify>
                  </div>
                </div>
              </div>
              <div className="submit">
                <input type="submit" value="Update" className="btn-login" />
              </div>
            </div>
          </form>
        </div>
        {/* <div style={{ borderRadius: '10px', textAlign: 'start', width: '300px', padding: '10px', marginTop: '50vh', marginLeft: '95vh', backgroundColor: 'whitesmoke', color: 'grey' }} >


          <h3 >firstName:<span style={{ color: 'blue' }}> {this.state.firstName}</span></h3>
          <h3>lastName:<span style={{ color: 'blue' }}>{this.state.lastName}</span></h3>
          <h3>Username:<span style={{ color: 'blue' }}>{this.state.username}</span></h3>
          <h3>organization:<span style={{ color: 'blue' }}>{this.state.organization}</span></h3>
          <h3>City:<span style={{ color: 'blue' }}>{this.state.city}</span></h3>
          <h3>Country:<span style={{ color: 'blue' }}>{this.state.country}</span></h3>
          <h3>Bio:<span style={{ color: 'blue' }}>{this.state.bio}</span></h3>
          <h3>Links:<span style={{ color: 'blue' }}>{this.state.links}</span></h3>
          <h3>Email:<span style={{ color: 'blue' }}>{this.state.email}</span></h3>
        </div> */}
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
              >
                <Privacypolicy />
              </div>
            </div>

            <div className="footer">
              <img src={copyrightlogo} style={{ width: "20px" }}></img>MegaHoot Technologies, Inc All Rights Reserved
              <button
                onClick={() => this.openModal()}
                style={{
                  cursor: "pointer",
                  marginLeft: "20px",
                  backgroundColor: "#033A5A",
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
                  backgroundColor: "#033A5A",
                  color: "white",
                  outline: "none",
                  border: "none",
                  fontSize: "1.6rem",
                }}
              >
                Terms & Conditions
              </button>{" "}
            </div>

            {/* complete */}
          </Overlay>
        </div>
        <div className="footer">
          <img src={copyrightlogo} style={{ width: "20px" }}></img> MegaHoot Technologies, Inc All Rights Reserved
          <button
            onClick={() => this.openModal()}
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              backgroundColor: "#033A5A",
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
              backgroundColor: "#033A5A",
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
export default UserProfile;
