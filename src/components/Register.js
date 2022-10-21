import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./verohivelogo.png";
import API from "./axios";
import Axios from "axios";
import Home from "./Home";
import shortid from "shortid";
import { callbackPromise } from "nodemailer/lib/shared";
import Privacypolicy from "../privacypolicy";
import { Overlay } from "react-portal-overlay";
import copyrightlogo from "../imgs/CopyrightVERO.png";
import banner from "./main-banner.jpg";
import "./register.css";
class Register extends Component {
  state = {
    server_url: process.env.REACT_APP_SERVER_URL,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passworddonotmatch: "",
    confirmpassword: "",
    email: "",
    age: "",
    code: "",
    verifyEmail: "",
    enteremailcode: "",
    isRegistering: false,
    checked: true,
    checked1: true,
    verified: true,
    needtoverifybeforeuse: "",
    fillallrequiredbox: "",
    successfullyverifyalert: "",
    codetoyouremail: "",
    invalidcodealert: "",
    verify: false,
  };
  componentDidMount() {
    console.log(this.props.history);
  }
  renderLoading() {
    return <div>Loading...</div>;
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheck = () => {
    console.log("checked");
    this.setState({ checked: !this.state.checked });
    // if (this.state.checked == false) {

    //   this.setState({
    //     "verify": true
    //   })

    //   this.setState({ needtoverifybeforeuse: "You need to verify before using VEROHive" })
    //   // alert("You need to verify before using VEROHive")

    // }
  };

  callme = () => {
    const enteredemail = this.state.verifyEmail;
    var rand, mailOptions, host, link;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);
    rand = rand1.toString() + rand2.toString();

    this.setState({
      code: rand,
    });

    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "Please verify email",
        text: "Your Verification Code is" + rand,
        html: `<img src="https://farma-consumer.s3.ap-south-1.amazonaws.com/c230d91721664885cf6c0cf1b1c6c70f.png" style="width: 150px;">
          <h1 style="color: #5b5b5b;">Welcome to VEROHive</h1>
          <h3 style="color: #757575;">Please verify your email address by using the OTP below</h3>
         <p>${rand}</p>
          <h4 style="color: #757575;">After verification, you will be able to start using VEROHive</h4><br><br>
          
          
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">VEROHive Team</h4>"
          `,
      }),
    })
      .then(() => {
        // console.log("ddd")
        this.setState({
          codetoyouremail:
            "We emailed a confirmation link to " +
            this.state.email +
            ". Click the link in that email to finish registering. Make sure to check your spam box in case it got filtered.",
        });

        // alert("Code sent to your email successfully")
        // this.verify()
      })
      .catch((err) => console.log(err));
  };
  handleCheck1 = () => {
    console.log("checked");
    this.setState({ checked1: !this.state.checked1 });
  };

  async verify() {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      age,
      checked,
      checked1,
    } = this.state;

    const enteredcode = this.state.enteremailcode;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand = rand1.toString() + rand2.toString();

    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var randnow =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString();
    // var privateKey=shortid(14)
    var randpin1 = Math.floor(100000 + Math.random() * 900000);

    var roompin = randpin1.toString();
    var privateKey = randnow;
    console.log("s", privateKey);
    if (enteredcode == this.state.code) {
      this.setState({ successfullyverifyalert: "Successfully Verified" });
      API.post(this.state.server_url + "/users", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
        .then((res) => {
          // this.props.flashHandler("success", "Signed Up Succesfully!");
          this.props.showSignup(0);
          this.props.showLogin(1);
        })
        .catch((error) => {
          this.props.flashHandler("error", "An Error Occured!");
        });

      fetch("/nodemailer", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          To: email,
          subject: `Welcome To VEROHive, ${this.state.firstName}`,
          text: `Welcome To VEROHive, ${this.state.firstName}`,
          html: `
            
            <h1>  Welcome to VEROHive ${this.state.firstName},</h1><br>
              We want to welcome you to the VEROHive Community, you have just become part of a growing community of members that use VEROHive daily for business and personal use. <br><br>
              Create meeting rooms to connect with your workers, co-workers, clients, friends and family. There are many tools on VEROHive that allow members to collaborate beyond video meetings such as file sharing, screen sharing and much more in development.<br><br>
              Use your VERO Number to build your contact list with other members, remember that your VERO Number is like your mobile number but for VEROHive specifically.<br><br>
              Security and ease of use are at the forefront of VEROHive, so keeping our members secure on the network and making it simple to use is part of what sets us apart from the pack.<br><br>
              So take VEROHive for a spin and enjoy all the features available to our members.<br><br>
              Thank you again for being a part of the ever growing VEROHive Community.<br><br>
              
             
              <h4 style="color: #757575;">Cheers!</h4>
              <h4 style="color: #757575;">The VEROHive Team</h4>
              `,
        }),
      })
        .then(() => {
          console.log("ddd");
          // this.verify()
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ invalidcodealert: "Invalid code" });
      // alert("Invalid code")
      this.setState({
        verified: false,
      });
    }
  }

  TermsCondition = () => {
    this.props.history.push("/TermsCondition", {
      username: this.state.id,
    });
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };

  async onSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      password,
      confirmpassword,
      email,
      age,
      checked,
      checked1,
    } = this.state;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);
    var rand3 = Math.floor(Math.random() * 100 + 54);
    var rand4 = Math.floor(Math.random() * 100 + 54);
    var rand =
      rand1.toString() + rand2.toString() + rand3.toString() + rand4.toString();
    var verifyPin = rand1.toString() + rand2.toString();
    // var privateKey=shortid(14)
    var randpin1 = Math.floor(100000 + Math.random() * 900000);

    var roompin = randpin1.toString();
    var privateKey = rand;
    var userVerified = false;
    console.log("s", privateKey);
    if (password != confirmpassword) {
      return this.setState({ passworddonotmatch: "Password do not match" });
      // alert("Password do not match");
    } else if (
      !this.refs.firstName.value ||
      !this.refs.lastName.value ||
      !this.refs.username.value ||
      !this.refs.password.value ||
      !this.refs.email.value ||
      this.state.checked1 == false ||
      this.state.checked == false
    ) {
      return this.setState({
        fillallrequiredbox: "Fill all the required fields ",
      });
      // alert("Fill all the required boxes");
    } else {
      API.post(this.state.server_url + "/users", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }).then((res) => {
        // this.props.flashHandler("success", "Signed Up Succesfully!");
        alert("success ,signed up successfully");
        // this.props.showSignup(0);
        // this.props.showLogin(1);
      });
      // .catch((error) => {
      //   this.props.flashHandler("error", "An Error Occured!");
      // });

      await fetch(this.state.server_url + "/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rand,
          firstName,
          lastName,
          username,
          password,
          privateKey,
          roompin,
          email,
          checked,
          checked1,
          userVerified,
          verifyPin,
        }),
      })
        .then(() => {
          this.props.history.push("/login");
          fetch("/nodemailer", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              To: email,
              subject: `Welcome To VEROHive, ${this.state.firstName}`,
              text: `Welcome To VEROHive, ${this.state.firstName}`,
              html: `
                  
                  <h1>  Welcome to VEROHive ${this.state.firstName},</h1><br>
                    We want to welcome you to the VEROHive Community, you have just become part of a growing community of members that use VEROHive daily for business and personal use. <br><br>
                    Create meeting rooms to connect with your workers, co-workers, clients, friends and family. There are many tools on VEROHive that allow members to collaborate beyond video meetings such as file sharing, screen sharing and much more in development.<br><br>
                    Use your VERO Number to build your contact list with other members, remember that your VERO Number is like your mobile number but for VEROHive specifically.<br><br>
                    Security and ease of use are at the forefront of VEROHive, so keeping our members secure on the network and making it simple to use is part of what sets us apart from the pack.<br><br>
                    So take VEROHive for a spin and enjoy all the features available to our members.<br><br>
                    Thank you again for being a part of the ever growing VEROHive Community.<br><br>
                    
                   
                    <h4 style="color: #757575;">Cheers!</h4>
                    <h4 style="color: #757575;">The VEROHive Team</h4>
                    `,
            }),
          })
            .then(() => {
              console.log("ddd");
              // this.verify()
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      // const enteredemail = this.state.email;
      // var rand, mailOptions, host, link;
      // var rand1 = Math.floor(Math.random() * 100 + 54);
      // var rand2 = Math.floor(Math.random() * 100 + 54);
      // var rand3 = Math.floor(Math.random() * 100 + 54);
      // rand = rand1.toString() + rand2.toString();

      // this.setState({
      //   code: rand,
      // });
    }
  }
  render() {
    return (
      <div>
        {/* <div className="header-2"><div ></div></div> */}

        {/* <div className="header">
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginLeft: "45%" }}>V4.1.1</h4>
        </div> */}
        <div
          className="informationBar"
          style={{
            backgroundColor: "#033a5a",
            marginTop: "-90px",
            padding: "10px",
            flexDirection: "row",
            width: "80vw",
            flexWrap: "wrap",
          }}
        >
          <a href="https://www.verohive.com/" target="_blank">
            Learn about VeroHive
          </a>
          <a
            href="https://www.verohive.com/verohive-town-hall/"
            target="_blank"
          >
            Town Hall
          </a>
          <a href="https://www.verohive.com/video-podcasting/" target="_blank">
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

        {this.state.fillallrequiredbox != "" ? (
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
              {this.state.fillallrequiredbox}
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
                    fillallrequiredbox: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.codetoyouremail != "" ? (
          <div
            style={{
              zIndex: "70000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.5rem",
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
              {this.state.codetoyouremail}
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
                    codetoyouremail: "",
                  })
                }
              >
                OK,Thanks
              </button>
            </span>
          </div>
        ) : null}

        {this.state.successfullyverifyalert != "" ? (
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
              {this.state.successfullyverifyalert}
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
                    successfullyverifyalert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.needtoverifybeforeuse != "" ? (
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
              {this.state.needtoverifybeforeuse}
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
                    needtoverifybeforeuse: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.passworddonotmatch != "" ? (
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
              {this.state.passworddonotmatch}
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
                    passworddonotmatch: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.invalidcodealert != "" ? (
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
              {this.state.invalidcodealert}
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
                    invalidcodealert: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        <div className="main_wrapper">
          <div className="signup_wrapper">
            <div className="pic_box">
              <img
                src={
                  "https://www.verohive.net/static/media/welcome.74ac3555.jpg"
                }
                alt="verohive"
                className="signup_image"
              />
            </div>
            <div className="signup_text">ITS FREE TO JOIN, SIGN UP HERE</div>
            <div className="form_box">
              <form
                action=""
                onSubmit={(e) => {
                  this.onSubmit(e);
                }}
                className="form2"
              >
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control input-field"
                    autoComplete="off"
                    name="firstName"
                    ref="firstName"
                    onChange={this.onChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control input-field"
                    autoComplete="off"
                    name="lastName"
                    ref="lastName"
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control input-field"
                    autoComplete="off"
                    name="username"
                    ref="username"
                    onChange={this.onChange}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control input-field"
                    autoComplete="off"
                    name="password"
                    ref="password"
                    onChange={this.onChange}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control input-field"
                    autoComplete="off"
                    name="confirmpassword"
                    ref="confirmpassword"
                    onChange={this.onChange}
                    required
                  />
                  <p
                    style={{ fontSize: "1rem", color: "red", width: "79%" }}
                  ></p>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control input-field"
                    autoComplete="off"
                    name="email"
                    ref="email"
                    onChange={this.onChange}
                    required
                  />
                  <span>
                    {" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <h5 className="marginal">
                        Already Registered? Sign In here{" "}
                      </h5>
                    </Link>
                  </span>
                  <br></br>
                </div>
                <div className="checkbox_box">
                  <div className="checkbox_1">
                    <br />
                    <input
                      type="checkbox"
                      onChange={() => {
                        this.handleCheck1();
                      }}
                      defaultChecked={this.state.checked1}
                      required
                    />
                    <label for="vehicle1">
                      {" "}
                      I agree to all Terms and conditions of VEROHive
                    </label>
                  </div>
                  <div className="checkbox_2">
                    <input
                      type="checkbox"
                      onChange={() => {
                        this.handleCheck();
                      }}
                      defaultChecked={this.state.checked1}
                      required
                    />
                    <label for="vehicle1">
                      {" "}
                      I Attest That I Am Over 18 Years of Age
                    </label>
                  </div>
                </div>

                <button type="submit" className="signup_submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
        {this.state.verify == true ? (
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
            <div className="name">
              <h4>Enter Verification code: </h4>
              <p>Sent to your email</p>
              <input
                type="text"
                name="enteremailcode"
                placeholder="OTP"
                ref="enteremailcode"
                onChange={this.onChange}
              />
            </div>
            <button
              style={{
                backgroundColor: "#4FADD3",
                color: "white",
                border: "none",
                width: "100px",
              }}
              onClick={() => this.verify()}
            >
              Verify
            </button>
          </div>
        ) : null}
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
              <img src={copyrightlogo} style={{ width: "20px" }}></img>Megahoot,
              LLC All Rights Reserved
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

            {/* complete */}
          </Overlay>
        </div>
      </div>
    );
  }
}

export default Register;
// below submit button
