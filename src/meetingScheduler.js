import React, { Component } from "react";
import logo from "./verohivelogo.png";
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

class meetingScheduler extends Component {
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
    meetingtitle: "",
    meetingdescription: "",
    meetingDate: "",
    meetingMonth: "",
    meetingYear: "",
    meetingHrs: "",
    meetingMin: "",
    meetingSec: "",
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
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          image1: res.ProfilePic,
        });
      })
      .catch((err) => console.log(err));
  }
  sendemail = (enteredemail) => {
    console.log("rjha", enteredemail);
    // const enteredemail = prompt("Enter email to invite ")
    // const enteredemail = this.state.emailinvite
    // navigator.clipboard.writeText(this.props.location.state.room_code);
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        To: enteredemail,
        subject: "VEROHive Meeting Invitation",
        text: "Your invitation " + this.state.write,
        html: `<img src="./verohivelogo.png" style="width: 30%;">
        <h1 style="color: #5b5b5b;">VEROHive Meeting Invitation</h1>
        <h3 style="color: #757575;">${this.state.write}</h3>
       
     
       
  
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
        alert("Mail sent successfully");
      })
      .catch((err) => console.log(err));
  };
  handleChange(event) {
    // do something with event.target.checked
    this.setState({
      baconIsReady: event.target.checked,
    });
  }
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
      return alert("Enter the room code");
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
      return alert("Create the room name");
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
        console.log("Dd", res);
        alert("connected successfully");
        this.viewfollow();
        this.viewfollowing();
      })
      .catch((err) => console.log(err));
  };
  follow = () => {
    const { email, privatekey, key, firstname, lastname } = this.state;
    var fullname = firstname + lastname;
    if (key == privatekey) {
      alert("You can't follow yourself");
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
            alert("already connected");
          } else {
            alert("Follow request sent successfully");
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
            alert("profile pic changed successfully");
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

    const opencontact = () => {
      document.querySelector(".contactbar").classList.add("open");
    };

    const closecontact = () => {
      document.querySelector(".contactbar").classList.remove("open");
    };

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    return (
      <div className="home-main">
        <div className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
          </div>
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "45%" }}>
            Beta Version 1.0
          </h4>
        </div>

        <aside className="sidebar">
          <h4 className="welcome-user">
            <div
              style={{
                width: "50px",
                height: "45px",
                backgroundColor: "#034063",
                marginLeft: "100px",
              }}
            >
              {this.state.image1 ? (
                <img
                  src={this.state.image1}
                  style={{ width: "50px", height: "45px" }}
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
              <a
                className=" btn-profile "
                href="https://whiteboard.verohive.org/"
                target="_blank"
              >
                Whiteboard
              </a>
            </li>
            <li>
              <a
                className=" btn-profile "
                href="https://screenshare.verohive.org/"
                target="_blank"
              >
                Screenshare
              </a>
            </li>

            <li>
              <a className=" btn-profile " onClick={() => this.recording()}>
                Recording
              </a>
            </li>
            <li>
              <a className=" btn-profile " onClick={() => this.sayHello1()}>
                Update Profile
              </a>
            </li>

            <li>
              <a className=" btn-profile " onClick={() => this.publicProfile()}>
                Public Profile
              </a>
            </li>

            <li>
              <a className=" btn-profile ">Background</a>
            </li>
            <li>
              <a className=" btn-profile " onClick={opencontact}>
                Contacts
              </a>
            </li>
            <li>
              <a className=" btn-profile ">Chat</a>
            </li>
          </ul>

          <hr></hr>

          <div>
            <h5>Create a Room</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                className="checkmeet"
                onChange={(event) => {
                  this.inputHandler(event);
                }}
                type="text"
                name="room_name"
                placeholder="Enter Room Name"
              />
              <i
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  this.createRoom();
                }}
                class="material-icons"
              >
                done
              </i>
            </div>

            <h5>Join a Room</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                className="checkmeet"
                onChange={(event) => {
                  this.inputHandler(event);
                }}
                type="text"
                name="room_code"
                placeholder="Enter Room code (e.g RG34WEZ)"
              />
              <i
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  this.joinRoom();
                }}
                class="material-icons"
              >
                done
              </i>
            </div>
          </div>

          <hr></hr>
        </aside>

        <div></div>

        <div className="footer">(c)VEROHive.All Rights Reserved </div>

        <div className="contactbar">
          {/* <div>
                        <h4>Enter VERO Number</h4>
                        <input type="text" placeholder="Vero Number" name="key" onChange={(event) => { this.inputHandler(event) }} />
                        <button onClick={() => this.follow()}>Send request</button>
                    </div> */}
          {/* <div>

                        <button onClick={() => this.viewfollow()}>View Contact requests</button>
                        {this.state.followuser && this.state.followuser.length > 0
                            ? this.state.followuser.map((value, index) => {
                                if (index < 10) {
                                    return (
                                        <div>
                                            <span> {value.fullnamerequested}</span>
                                            <span><button onClick={() => this.acceptrequest(value.emailrequested)}>Accept request</button></span>

                                        </div>

                                    );
                                }
                            })
                            : null}
                    </div> */}

          <hr></hr>
          <div className="scheduler">
            <form
              onSubmit={(e) => {
                this.onSubmit(e);
              }}
            >
              <h3>Schedule Meeting</h3>
              <input
                placeholder="meeting title"
                type="text"
                name="meetingtitle"
                type="text"
                style={{ width: "150px" }}
                ref="meetingtitle"
                value={this.state.meetingtitle}
                onChange={this.onChange}
              />
              <br></br>
              <br></br>
              <textarea
                placeholder="description"
                name="meetingdescription"
                type="text"
                style={{ width: "150px" }}
                ref="meetingdescription"
                value={this.state.meetingdescription}
                onChange={this.onChange}
              />
              <br></br>
              <br></br>
              <select
                placeholder="Date"
                type="text"
                name="meetingDate"
                type="text"
                style={{ width: "30px" }}
                ref="meetingDate"
                value={this.state.meetingDate}
                onChange={this.onChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
              <select
                placeholder="Month"
                type="text"
                name="meetingMonth"
                type="text"
                style={{ width: "100px" }}
                ref="meetingMonth"
                value={this.state.meetingMonth}
                onChange={this.onChange}
              >
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <select
                placeholder="Year"
                type="text"
                name="meetingYear"
                type="text"
                style={{ width: "60px" }}
                ref="meetingYear"
                value={this.state.meetingYear}
                onChange={this.onChange}
              >
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
              <br></br>
              <br></br>
              <input
                className="input"
                placeholder="Hrs"
                name="meetingHrs"
                type="text"
                style={{ width: "30px" }}
                ref="meetingHrs"
                value={this.state.meetingHrs}
                onChange={this.onChange}
              />
              /
              <input
                placeholder="Min"
                type="text"
                style={{ width: "30px" }}
                name="meetingMin"
                type="text"
                style={{ width: "30px" }}
                ref="meetingMin"
                value={this.state.meetingMin}
                onChange={this.onChange}
              />{" "}
              /
              <input
                placeholder="Sec"
                type="text"
                style={{ width: "30px" }}
                name="meetingSec"
                type="text"
                style={{ width: "30px" }}
                ref="meetingSec"
                value={this.state.meetingSec}
                onChange={this.onChange}
              />
              <br></br>
              <br></br>
              <hr></hr>
              <h5>Invite Contacts </h5>{" "}
              <div>
                <button onClick={() => this.viewfollowing()}>
                  View Contacts
                </button>
                {this.state.following && this.state.following.length > 0
                  ? this.state.following.map((value, index) => {
                      if (index < 10) {
                        return (
                          <div style={{ backgroundColor: "#663399" }}>
                            <span>
                              {" "}
                              {value.fullnamerequested ==
                              this.state.firstname + this.state.lastname
                                ? value.fullnameaccepted
                                : value.fullnamerequested}
                            </span>
                            {/* <span>Enter </span> */}
                            <button
                              onClick={() =>
                                this.setState({
                                  show: true,
                                })
                              }
                            >
                              Send
                            </button>
                            {this.state.show ? (
                              <div>
                                <input
                                  type="text"
                                  placeholder="typesomething"
                                  name="write"
                                  onChange={(event) => {
                                    this.inputHandler(event);
                                  }}
                                />
                                <span>
                                  {value.emailrequested == this.state.email ? (
                                    <button
                                      onClick={() =>
                                        this.sendemail(value.emailaccepted)
                                      }
                                    >
                                      Send Email
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        this.sendemail(value.emailrequested)
                                      }
                                    >
                                      Send Email
                                    </button>
                                  )}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
              <input type="text" placeholder="search"></input>{" "}
              <button>Add</button>
              <br></br>
              <br></br>
              <hr></hr>
              <button>Confirm</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default meetingScheduler;
