import React, { Component } from "react";
import AlertDialogSlide from "./LoginPopup/LoginPopup";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Navbar from "./Navbar/Navbar";
import image from "../imgs/girl.png";
import { Link } from "react-router-dom";
import logo from "./verohivelogo.png";
import API from "./axios";
import { login } from "../auth";
import { Overlay } from "react-portal-overlay";
import Privacypolicy from "../privacypolicy";
import copyrightlogo from "../imgs/CopyrightVERO.png";
import banner from "./welcome.jpg";
import "./login.css";
var x = 0;
class Login extends Component {
  state = {
    server_url: process.env.REACT_APP_SERVER_URL,
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: "",
    joinid: null,
    fillallrequiredbox: "",
    invalidcred: "",
    isthissafari: false,
    verifyNow: "",
    codetoyouremail: "",
    verifyBox: false,
    enteremailcode: "",
    verificationPin: "",
    userEmail: "",
    verificationButton: "Send Verification Pin",
    cancelButton: "Cancel",
    LIVESPEAKINGENGAGEMENTS: false,
    CELEBRITYENGAGEMENT: false,
    LIVEANNOUNCEMENTS: false,
    LIVEEVENTS: false,
    veroHiveMain: false,
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    //detecting apple safari browser

    var isSafari =
      navigator.vendor &&
      navigator.vendor.indexOf("Apple") > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf("CriOS") == -1 &&
      navigator.userAgent.indexOf("FxiOS") == -1;

    this.setState({
      isthissafari: isSafari,
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

    // window.location.reload()
    if (this.props.location.state != undefined) {
      // x++;
      // if(x==1)
      // {
      //   window.location.reload()
      // }

      var joinid = this.props.location.state.joinid;
      this.setState({
        joinid: joinid,
      });
    }
  }

  async verifyUSerFunction(username) {
    await fetch("http://localhost:65000/getuser", {
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
        fetch("/nodemailer", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            To: res.email,
            subject: "Please verify email",
            text: "Your Verification Code is" + res.verifyPin,
            html: `<img src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/IvLvPO7ygnYzNg7PDE9AIfrvxEzs7p4zpublic/icons/verohivelogo.png" style="width: 150px;">
                <h1 style="color: #5b5b5b;">Welcome to VEROHive</h1>
                <h3 style="color: #757575;">Please verify your email address by using the One Time Pin (OTP) below</h3>
               <p>${res.verifyPin}</p>
                <h4 style="color: #757575;">After verification, you will be able to start using VEROHive</h4><br><br>
                
                
                <h4 style="color: #757575;">Cheers!</h4>
                <h4 style="color: #757575;">VEROHive Team</h4>"
                `,
          }),
        })
          .then(() => {
            this.setState({
              verifyNow: "",
              codetoyouremail:
                "We emailed a confirmation link to " +
                res.email +
                ". Click the link in that email to finish registering. Make sure to check your spam box in case it got filtered.",
            });
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  async checkVerifyPin() {
    let userVerified = true;
    let email = this.state.userEmail;

    if (this.state.enteremailcode == this.state.verificationPin) {
      await fetch("/updateUserVerificationStatus", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userVerified,
          email,
        }),
      })
        .then(() => {
          this.setState({
            verifyBox: "",
          });
          this.setState({ invalidcred: "Verified Successfully" });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ invalidcred: "invalid Verification Pin" });
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (!this.refs.username.value || !this.refs.password.value) {
      return this.setState({
        fillallrequiredbox: "Fill all the required fields",
      });
      // alert("Fill all the required fields");
    }
    // this.setState({ isSubmitting: true }
    await fetch(this.state.server_url + "/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        // console.log("ff", window.location.href.substr(29))
        console.log(res.data);
        localStorage.setItem("user", username);
        if (res.url == "https://www.verohive.net/login") {
          // alert("invalid credentials")
          this.setState({ invalidcred: "invalid UserName or Password" });
        } else {
          localStorage.setItem("user", username);
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
              this.setState({
                verificationPin: res.verifyPin,
                userEmail: res.email,
              });

              if (res.userVerified == 0) {
                this.setState({
                  verifyNow:
                    "Please Verify your account to continue enjoying verohive",
                });
              } else {
                if (this.state.joinid == null) {
                  this.props.history.push("/private", {
                    username: username,
                  });
                  window.location.reload();
                } else {
                  // console.log("ss",this.props.history, window.location.href.substr(36))
                  // this.props.history.pop()
                  this.props.history.replace({
                    pathname: "/videochat",
                    search:
                      "?" +
                      new URLSearchParams({ id: this.state.joinid }).toString(),
                    state: {
                      type: "client",
                      room_code: this.state.joinid,
                      username: username,
                    },
                  });
                }
              }
            })
            .catch((err) => console.log(err));
        }
        //
      })
      .catch((err) => console.log(err));
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
  render() {
    return (
      <>
        <Navbar />
        <div className="login-wrapper">
          {/* <div className="header">
            <img src={logo} className="logo-vero"></img>
            <h4 style={{ color: "white", marginLeft: "45%" }}>V4.1.1</h4>
          </div> */}
          {/* first */}
          {this.state.fillallrequiredbox != "" ? (
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
                {this.state.fillallrequiredbox}
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
                      fillallrequiredbox: "",
                    })
                  }
                >
                  OK
                </button>
              </span>
            </div>
          ) : null}
          {/* first last */}
          {/*  */}
          {/*  */}
          {/* second started */}
          {this.state.invalidcred != "" ? (
            <div
              style={{
                zIndex: "10000000",
                fontSize: "2.4rem",
                position: "absolute",
                top: "2%",
                left: "38%",
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
              <span style={{ color: "white" }}>
                {" "}
                {this.state.invalidcred}
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
                      invalidcred: "",
                    })
                  }
                >
                  OK
                </button>
              </span>
            </div>
          ) : null}
          {/* second end  */}
          {/*  */}
          {/*  */}
          {/* third started */}
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
                      verifyBox: true,
                    })
                  }
                >
                  OK,Thanks
                </button>
              </span>
            </div>
          ) : null}
          {/* third end */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* fourth start */}
          {this.state.verifyBox == true ? (
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
                onClick={() => {
                  this.checkVerifyPin();
                  this.setState({
                    codetoyouremail: "",
                    verifyNow: "",
                  });
                }}
              >
                Verify
              </button>
            </div>
          ) : null}
          {/* fourth end */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* fifth start */}
          {this.state.verifyNow != "" ? (
            <div
              style={{
                zIndex: "10000000",
                backgroundColor: "white",
                padding: "10px",
                color: "grey",
                fontSize: "1.4rem",
                position: "absolute",
                top: "20%",
                left: "40%",
                maxWidth: "300px",
              }}
            >
              <span>
                {" "}
                {this.state.verifyNow}
                <br></br>
              </span>
              <span>
                <button
                  style={{
                    backgroundColor: "#4FADD3",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "7px",
                  }}
                  onClick={() => {
                    this.verifyUSerFunction(this.state.username);
                    this.setState({
                      verifyNow: "Please Wait",
                      verificationButton: "",
                      cancelButton: "",
                    });
                  }}
                >
                  {this.state.verificationButton}
                </button>
                <button
                  style={{
                    backgroundColor: "#4FADD3",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "7px",
                  }}
                  onClick={() => {
                    // this.verifyUSerFunction(this.state.username);
                    this.setState({
                      verifyBox: true,
                      verificationButton: "",
                      cancelButton: "",
                    });
                  }}
                >
                  Enter Pin
                </button>

                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "7px",
                  }}
                  onClick={() =>
                    this.setState({
                      verifyNow: "",
                    })
                  }
                >
                  {this.state.cancelButton}
                </button>
              </span>
            </div>
          ) : null}
          {/* fifth end */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}

          <div className="image-box">
            <img
              src={"https://www.verohive.net/static/media/welcome.74ac3555.jpg"}
              alt="verohive"
            />
            <div className="content_buttons">
              <ul className="content_buttons_list">
                <li className="button_item btn_new">
                  {/* <a href="#" className="button_item_list">
                VeroHive Main
              </a> */}

                  <AlertDialogSlide
                    title="VEROHIVE MAIN"
                    message="Guest Members have the ability to create live events and record in real time for future distribution, create video meetings, have access to Vero’s social media platform (Summer 2021) for additional engagement and marketing options."
                  />
                </li>
                <li className="button_item btn_new">
                  <AlertDialogSlide
                    title="LIVE EVENTS"
                    message="Premium and Executive Members have the ability to live stream their events or record them for future distribution cost effectively on VeroHive. They will be able to add streaming to select social media platforms soon as well as broadcast live on Vero’s social media platform that will be introduced Summer 2021 and monetize them similar to a pay-per-view event. They will have access to text and graphic overlays and backgrounds. There will be live interactive chats for increased engagement. Recordings and Broadcast support up to 9 attendees simultaneously, while having the ability to have dozens more waiting in the Reception Area."
                  />
                </li>
                <li className="button_item btn_new">
                  <AlertDialogSlide
                    title="Live ANNOUNCEMENTS"
                    message="Premium and Executive Members who are verified organizations, politicians and other officials, will be able to live stream an announcement when they have to and share it on Vero’s social media platform (Summer 2021) and other social media outlets, either scheduled or on the fly via the Web Application, Desktop or MegaHoot Messenger Mobile Application (Summer 2021)."
                  />
                </li>
                <li className="button_item  btn_new">
                  <AlertDialogSlide
                    title="LIVE SPEAKING ENGAGEMENTS"
                    message="Premium and Executive Members that have guest speakers at their events can either live broadcast on a pay-per-view basis or have a free event via Vero’s Social Media Platform (Summer 2021) and stream to select social media outlets. They will have the chat feature for increased engagement and connect with their audience more efficiently via Vero’s Social Media Platform (Summer"
                  />
                </li>
                <li className="button_item btn_new">
                  <AlertDialogSlide
                    title="CELEBRITY ENGAGEMENT"
                    message="
Premium and Executive Members that have guest speakers at their events can either live broadcast on a pay-per-view basis or have a free event via Vero’s Social Media Platform (Summer 2021) and stream to select social media outlets. They will have the chat feature for increased engagement and connect with their audience more efficiently via Vero’s Social Media Platform (Summer"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="form-box">
            <span className="signup-link">
              Not a member ?{" "}
              <a href="#" className="register">
                <Link to="/register" className="register">
                  Register Now
                </Link>
              </a>
            </span>

            <div className="content">
              <h1 className="title text-center">Hello Again</h1>
              <p>Welcome back you have been missed!</p>
              <form
                action=""
                onSubmit={(e) => {
                  this.onSubmit(e);
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="form-control input-field2"
                    autoComplete="off"
                    ref="username"
                    onChange={this.onChange}
                    required
                  />
                  {/* <span className="email_error">{error.email}</span> */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control input-field2"
                    autoComplete="off"
                    ref="password"
                    onChange={this.onChange}
                    required
                  />
                  {/* <span className="email_error">
                {error.password ? (
                  <div>
                    {showToastMessage()} <ToastContainer />
                  </div>
                ) : (
                  ""
                )}
              </span> */}
                  <div className="recover-pass">
                    <Link to="/forget" className="pass-link">
                      Recover Password
                    </Link>
                  </div>
                  {/* <button
                type="submit"
                className="btn btn-danger btn-lg btn-block signin-btn"
              > */}
                  <button
                    type="submit"
                    className="btn btn-lg btn-block signin-btn"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="separator">
                <hr />
                <span>Or continue with</span>
                <hr />
              </div>
              <div className="icon-box">
                <span className="icon">
                  <a href="#">
                    <GoogleIcon
                      style={{
                        fontSize: "3rem",
                        color: "red",
                      }}
                    />
                  </a>
                </span>
                <span className="icon">
                  <a href="#">
                    <AppleIcon
                      style={{
                        fontSize: "3rem",
                        color: "black",
                      }}
                    />
                  </a>
                </span>
                <span className="icon">
                  <a href="#">
                    <FacebookOutlinedIcon
                      style={{ color: "#1C79F3", fontSize: "3rem" }}
                    />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
{
  /* <div className="message" style={{ display: "none" }}>
{this.state.isSubmitting ? "Checking details...." : ""}
</div>
<div className="errorMessage">{this.state.errorMessage}</div>
</form> */
}
