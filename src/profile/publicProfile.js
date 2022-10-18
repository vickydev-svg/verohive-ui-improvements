import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../verohivelogo.png";
import Axios from "axios";
import { use } from "passport";
import Linkify from "react-linkify";
import Appp from "./myBar";
import * as Api from "../api";
import a from "../verifybadges/a.png";
import b from "../verifybadges/b.png";
import g from "../verifybadges/g.png";
import p from "../verifybadges/p.png";
import r from "../verifybadges/r.png";
import y from "../verifybadges/y.png";
import Privacypolicy from "../privacypolicy";
import { Overlay } from "react-portal-overlay";
import copyrightlogo from "../imgs/CopyrightVERO.png";

class publicProfile extends Component {
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
    country: "",
    Facebook: "",
    FacebookLive: "",
    Twitter: "",
    Youtube: "",
    YoutubeLive: "",
    Instagram: "",
    LinkedIn: "",
    Weblink1: "",
    Weblink2: "",
    age: "",
    code: "",
    isRegistering: false,
    checked: false,
    checked1: false,
    verified: true,
    enterroomcode: "",
    createroomalert: "",
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
          verified: res.verified,
          usertype: res.userType,
        });
      })
      .catch((err) => console.log(err));
  }

  sayHello1 = () => {
    this.props.history.push("/profile", {
      username: this.state.id,
    });
  };

  socialProfile = () => {
    this.props.history.push("/socialProfile", {
      username: this.state.id,
    });
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };
  recording = () => {
    this.props.history.push("/recording", {
      username: this.state.id,
    });
  };

  Home = () => {
    this.props.history.push("/private", {
      username: this.state.id,
    });
  };
  contact = () => {
    this.props.history.push("/contact", {
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

  joinRoom = () => {
    if (!this.state.room_code) {
      return this.setState({ enterroomcode: "Enter the room Id" });
    }
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
  };
  createRoom = () => {
    if (!this.state.room_name) {
      return this.setState({ createroomalert: "Enter the room name" });
      // return alert("Create the room name");
    }

    var rand, mailOptions, host, link;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);

    rand = rand1.toString() + rand2.toString() + rand3.toString();

    this.props.history
      .push({
        pathname: "/videochat",
        search: "?" + new URLSearchParams({ id: rand }).toString(),
        state: {
          type: "host",
          room_code: rand,
          username: this.state.id,
        },
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

  async onSubmit(e) {
    e.preventDefault();
    const { username } = this.state;

    this.props.history.push({
      pathname: "/videochat",
      search: "?" + new URLSearchParams({ id: username }).toString(),
      state: { username: this.state.id },
    });
  }
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
          <h4 style={{ color: "white", marginRight: "47%" }}>V4.1.1</h4>
        </div>
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

            <li>
              <a className=" btn-profile " onClick={() => this.sayHello1()}>
                Update Profile
              </a>
            </li>

            {/* <li><a
              className=" btn-profile "
              onClick={() => this.socialProfile()}>PublicProfile</a></li> */}
            <li>
              <a className=" btn-profile ">Public Profile</a>
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
        <div
          className="profile-container"
          style={{ backgroundColor: "white", height: "100vh", width: "100%" }}
        >
          <ul>
            <div className="public-profile-pic">
              <div style={{ marginTop: "29px" }}>
                {this.state.image1 ? (
                  <img
                    src={this.state.image1}
                    style={{ width: "119px", height: "110px" }}
                  />
                ) : (
                  <div></div>
                )}
              </div>

              <ul style={{ marginTop: "-22px" }}>
                <h2>
                  <li>
                    {this.state.firstName} {this.state.lastName}
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
                  <li>Username:{this.state.id}</li>

                  <li>Organization: {this.state.organization}</li>

                  <li>Country: {this.state.country}</li>
                  <li>City: {this.state.city}</li>
                  <li>User Type :{this.state.usertype}</li>
                </ul>
              </ul>
            </div>
            <br></br>
            <div className="biolinks" style={{ marginLeft: "28%" }}>
              <h4 style={{ color: "grey" }}>Bio</h4>
              <ul style={{ height: "10vh", color: "blue" }}>
                {/* <li>Email :{this.state.email}</li> */}
                {/* <Linkify componentDecorator={componentDecorator}>  <li>Links: {this.state.links} </li></Linkify> */}
                <li>{this.state.bio}</li>
              </ul>
            </div>
            <br></br>
            <div className="biolinks" style={{ marginLeft: "28%" }}>
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
                <img src={copyrightlogo} style={{ width: "20px" }}></img>
                MegaHoot Technologies, Inc All Rights Reserved
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
            <img src={copyrightlogo} style={{ width: "20px" }}></img> MegaHoot
            Technologies, Inc All Rights Reserved
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
      </div>
    );
  }
}
export default publicProfile;
