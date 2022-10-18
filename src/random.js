import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./verohivelogo.png";
import API from "./axios";
import { login } from "../auth";
import { Overlay } from "react-portal-overlay";
import Privacypolicy from "../privacypolicy";
import copyrightlogo from "../imgs/CopyrightVERO.png";

var x = 0;
class random extends Component {
  state = {
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
    isElectronNotifier:false
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
    const isElectron = () => {
      // Renderer process
      if (
        typeof window !== "undefined" &&
        typeof window.process === "object" &&
        window.process.type === "renderer"
      ) {
        // document.getElementById('host-room-id').style.display = 'flex';
        // document.getElementById('create-a-new-room').style.display = 'flex';
        this.setState({
          isElectronNotifier: true,
        });
      }

      // Main process
      if (
        typeof process !== "undefined" &&
        typeof process.versions === "object" &&
        !!process.versions.electron
      ) {
        // document.getElementById('host-room-id').style.display = 'flex';
        // document.getElementById('create-a-new-room').style.display = 'flex';
        this.setState({
          isElectronNotifier: true,
        });
      }

      // Detect the user agent when the `nodeIntegration` option is set to true
      if (
        typeof navigator === "object" &&
        typeof navigator.userAgent === "string" &&
        navigator.userAgent.indexOf("Electron") >= 0
      ) {
        // document.getElementById('host-room-id').style.display = 'flex';
        // document.getElementById('create-a-new-room').style.display = 'flex';
        this.setState({
          isElectronNotifier: true,
        });
      }

      // document.getElementById('host-room-id').style.display = 'flex';
      // document.getElementById('create-a-new-room').style.display = 'flex';
    };
    isElectron();
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
    await fetch("/getuser", {
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
    await fetch("/login", {
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
        localStorage.setItem("user", username);
        if (res.url == "https://www.verohive.net/login") {
          // alert("invalid credentials")
          this.setState({ invalidcred: "invalid UserName or Password" });
        } else {
          localStorage.setItem("user", username);
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
      <div>
        {/* <div className="login-mobile">
        <div className="header">
        <img src={logo} className='logo-vero'></img>
        </div>
          <h4>VEROHive Beta 1.0 Web Based Application only<br></br><br></br>Desktop and Mobile Application coming soon</h4>
         
          </div> */}
        <div className="login-web">
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

          {this.state.invalidcred != "" ? (
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
                {this.state.invalidcred}
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
                      invalidcred: "",
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
                      verifyBox: true,
                    })
                  }
                >
                  OK,Thanks
                </button>
              </span>
            </div>
          ) : null}
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
          {/* <div className="header-2"><div ></div></div> */}
          <div className="header">
            <img src={logo} className="logo-vero"></img>
            <h4 style={{ color: "white", marginLeft: "45%" }}>
            V4.1.1
            </h4>
          </div>
          

          <div
            className="informationBar"
            style={{
              backgroundColor: "#033a5a",
              padding: "10px",
              marginTop: "100px",
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
            <a
              href="https://www.verohive.com/video-podcasting/"
              target="_blank"
            >
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
          </div>
       <div style={{display:'flex',flexDirection:'row'}}> <div className="left-login"> <img
            src="https://mhiservers.com/uO0muCuiv37bWZ0iiaPfsWUheuH6tGSgAssets/aB17BMXtfrcywe6Jh0RUMcN4dARoM6kyimages/WKjKIwwT%7Dj;tTcp4&tG9*eNC]gIElbsystem/TownhallSignIn.jpg"
            style={{ width: "500px", maxHeight: "270px", marginTop: "20px" }}
          ></img>
         
          <form
            className="form-login"
            onSubmit={(e) => {
              this.onSubmit(e);
            }}
          >

            <div className="username">
              {/* <i className="fa fa-user-circle icon  iconinput"></i> */}

              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                ref="username"
                onChange={this.onChange}
              />
            </div>
            <div className="password">
              <h4>{/* Password: <span style={{ color: "red" }}>*</span> */}</h4>
              {/* <i className="fa fa-key icon iconinput"></i> */}
              <div>
                <div>
                  <Link to="/forget">
                    <>Forgot password? </>
                  </Link>
                </div>{" "}
              </div>

              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                ref="password"
                onChange={this.onChange}
              />
            </div>

      
            <div className="submit">
              <input type="submit" value="Sign In" className="btn-login" />

              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "lighter",
                  color: "white",
                }}
              >
                Don't have account?
                <Link to="/register">
                  <> Sign Up here </>
                </Link>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  width: "70%",
                  marginLeft: "28%",
                }}
              >
                <span style={{ color: "yellow" }}>NOTIFICATION :</span> Mac
                users please shut down your Safari browser and use Chrome to use
                VeroHive , otherwise Safari will block camera access by default.
               
              </p>
             
  </div>


            <div className="message" style={{ display: "none" }}>
              {this.state.isSubmitting ? "Checking details...." : ""}
            </div>
            <div className="errorMessage">{this.state.errorMessage}</div>
          </form>
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
          </div></div>
        
        
        
         <div className="right-login">
         {!this.state.isElectronNotifier?<div style={{backgroundColor:'white',width:'100%'}}>
              <h1 
              style={{
                boxSizing:'border-box',
                lineHeight:1.4,
                margin:'0px 0px 1.5rem',
                paddingTop:'1rem',
                fontWeight:300,
                fontSize:'46px',
                letterSpacing:'-1px',
                color:'rgb(85,85,85)',
                textAlign:'center'}}>
                <span 
                style={{
                  boxSizing:'border-box',
                  marginBottom:'0px',
                  color:'rgb(3,64,99)'}}>
                  <span 
                  style={{boxSizing:'border-box',fontWeight:700,marginBottom:"0px"}}>
                    VeroHive <br></br>LIVE STREAMING</span></span></h1>
                    <h1 
              style={{
                boxSizing:'border-box',
                lineHeight:1.4,
                margin:'0px 0px 1.5rem',
                paddingTop:'1rem',
                fontWeight:300,
                fontSize:'46px',
                letterSpacing:'-1px',
                color:'rgb(85,85,85)',
                textAlign:'center'}}>
                <span 
                style={{
                  boxSizing:'border-box',
                  marginBottom:'0px',
                  color:'rgb(3,64,99)'}}>
                  <span 
                  style={{boxSizing:'border-box',marginBottom:"0px",fontWeight:'lighter',fontSize:'30px'}}>
                     Events, Podcasts, Speaking Engagements<br></br>VeroHive Makes It Simple to Go Live!</span></span></h1>
                    
                 <br></br> 
                 <div sty={{width:'100%'}}> <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                 <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>VeroHive Main</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>Guest Members have the ability to create live events and record in real time for future distribution, create video meetings, have access to Vero’s social media platform (Summer 2021) for additional engagement and marketing options.</p>
                    <br></br>
                    <br></br>
                    <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>LIVE EVENTS</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>Premium and Executive Members have the ability to live stream their events or record them for future distribution cost effectively on Town Hall. They will be able to add streaming to select social media platforms soon as well as broadcast live on Vero’s social media platform that will be introduced Summer 2021 and monetize them similar to a pay-per-view event. They will have access to text and graphic overlays and backgrounds. There will be live interactive chats for increased engagement. Recordings and Broadcast support up to 9 attendees simultaneously, while having the ability to have dozens more waiting in the Reception Area.

</p>
                    <br></br>
                    <br></br>
                    <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>LIVE ANNOUNCEMENTS</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>Premium and Executive Members who are verified organizations, politicians and other officials, will be able to live stream an announcement when they have to and share it on Vero’s social media platform (Summer 2021) and other social media outlets, either scheduled or on the fly via the Web Application, Desktop or MegaHoot Messenger Mobile Application (Summer 2021).

</p>
                    <br></br>
                    <br></br>
                    <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>LIVE SPEAKING ENGAGEMENTS</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>Premium and Executive Members that have guest speakers at their events can either live broadcast on a pay-per-view basis or have a free event via Vero’s Social Media Platform (Summer 2021) and stream to select social media outlets. They will have the chat feature for increased engagement and connect with their audience more efficiently via Vero’s Social Media Platform (Summer 2021) .

</p>
                    <br></br>
                    <br></br>

                    <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>CELEBRITY ENGAGEMENT</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>For verified celebrities and notables, they will have the ability to connect with their fans securely, efficiently and live on Town Hall via Vero’s social media platform. They can have an open live stream or make it an invitation only event, they will be able to make it a video stream or soon select to make it an audio only social media event and increase the interactivity with their audience via Vero’s Social Media Platform (Summer 2021) .



</p>
                    <br></br>
                    <br></br>

                    <p style={{boxSizing:"borderBox",marginBottom:"0px",color:"rgb(3,64,99)",textAlign:'left',fontSize:'20px'}}>DOCUMEGA INTEGRATION</p>
                 <p style={{boxSizing:"border-box",margin:"0px 0px 1.5rem",color:"rgb(102,102,102)",fontWeight:400,textAlign:"justify",fontSize:'15px'}}>For verified organizations and coordinators, they will soon be able to use DocuMega to collaborate in real time with attendees to share secure documents, request e-signatures for agreements or other documents and more. www.documega.com



</p>
                    <br></br>
                    <br></br>
                    </div>
                  </div>
                  </div>
          :null}
         </div>
        
         </div>
       
         
          <div className="footer">
            <img src={copyrightlogo} style={{ width: "20px" }}></img> MegaHoot Technologies, Inc All Rights Reserved
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
      </div>
    );
  }
}

export default random;
