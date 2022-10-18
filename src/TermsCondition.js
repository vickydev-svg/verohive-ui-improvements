import React, { Component } from "react";
import { Overlay } from "react-portal-overlay";
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
import Privacypolicy from "./privacypolicy";
import copyrightlogo from "./imgs/CopyrightVERO.png";

class TermsCondition extends Component {
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
  };

  componentDidMount() {
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
          usertype: res.userType,
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
  backMe = () => {
    // for(var i=0;i<this.state.chats2.length;i++)
    // {
    //   if(this.state.chats2[i].socketId==this.socket.id)
    //   {
    //     this.state.chats2.splice(i, 1);
    //   }
    // }
    // this.sendToPeer('all-connected-users', this.state.chats2, { local: this.socket.id })
    this.props.history.goBack();
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
  publicProfile = () => {
    this.props.history.push("/publicProfile", {
      username: this.state.id,
    });
  };

  Home = () => {
    this.props.history.push("/private", {
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
            {/* <button onClick={openMenu}>&#9776;</button> */}
          </div>
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "45%" }}>
          V4.1.1
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
                onClick={() => {
                  this.Home();
                }}
              >
                Dashboard
              </a>
            </li>
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
              <a className=" btn-profile ">meetingScheduler</a>
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

        <div
          style={{
            color: "black",
            position: "absolute",
            top: "35px",
            left: "0",
            backgroundColor: "white",
          }}
        >
          <button
            style={{ position: "absolute", right: "20px", top: "20px" }}
            onClick={() => {
              this.backMe();
            }}
          >
            Close
          </button>

          <p
            style={{
              backgroundColor: "white",
              marginLeft: "15%",
              textAlign: "start",
              width: "70%",
              fontSize: "1.5rem",
              padding: "10px",
            }}
          >
            <h3 style={{ marginLeft: "35%" }}>VEROHIVE TERMS OF SERVICE</h3>
            <h4>
              IMPORTANT NOTICE: THESE TERMS AND CONDITIONS CONTAIN A BINDING
              ARBITRATION PROVISION AND WAIVER OF JURY TRIALS AND CLASS ACTIONS
              GOVERNING DISPUTES ARISING FROM USE OF THE VEROHIVE SERVICES. IT
              AFFECTS YOUR LEGAL RIGHTS AS DETAILED IN THE MANDATORY ARBITRATION
              AND WAIVER OF CLASS ACTION SECTION BELOW. PLEASE READ CAREFULLY.
            </h4>
            These VEROHIVE Services Terms and Conditions (“Terms”) govern access
            to and use of the VEROHIVE (“VEROHIVE,” “we” or “us”) web sites,
            applications and services (collectively, the “Site”) by site
            visitors (“Site Visitors”) and by individuals or entities who
            purchase services (“VEROHIVE Services”) or create an account
            (“Account”) and their Authorized Users (collectively, “Customers”).
            By using the Site or any VEROHIVE Services, you as a Site Visitor,
            Application User or Customer accept these Terms (whether on behalf
            of yourself or a legal entity you represent). An “Authorized User”
            of a Customer is each an individual natural person, whether an
            employee, business partner, contractor, or agent of a Customer who
            is registered or permitted by Customer to use the VEROHIVE Services
            subject to these Terms and up to any maximum number of users or uses
            specified at the time of purchase. Customers and Site Visitors may
            be referred to in these Terms as “you” and “your” as applicable.
            <br></br>
            <br></br>
            BY CLICKING/CHECKING THE “AGREE” BUTTON/BOX, ACCESSING VEROHIVE,
            USING, OR DOWNLOADING ANY MATERIALS FROM THE VEROHIVE WEBSITE OR
            APPLICATIONS, UTILIZING VEROHIVE SERVICES, YOU AGREE TO FOLLOW AND
            BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, YOU ARE
            NOT AUTHORIZED AND MUST CEASE USING THE SITE IMMEDIATELY. <br></br>
            <br></br>
            VEROHIVE will provide the Services, and you may access and use the
            Services, in accordance with this Agreement. If You order Services
            through an on-line registration page or an order form (each an
            &quot;Order Form&quot;), the Order Form may contain additional terms
            and conditions and information regarding the Services you are
            ordering. Unless otherwise expressly set forth in any such
            additional terms and conditions applicable to the specific Service
            which You choose to use, those additional terms are hereby
            incorporated into this Agreement in relation to Your use of that
            Service.<br></br>
            <br></br>
            System Requirements . Use of the Services requires one or more
            compatible devices, Internet access (fees may apply), and certain
            software (fees may apply), and may require obtaining updates or
            upgrades from time to time. Because use of the Services involves
            hardware, software, and Internet access, Your ability to access and
            use the Services may be affected by the performance of these
            factors. High speed Internet access is recommended. You acknowledge
            and agree that such system requirements, which may be changed from
            time to time, are your sole responsibility.<br></br>
            <br></br>
            1.        UPDATES AND COMMUNICATIONS<br></br>
            <br></br>
            1.1       We may revise these Terms or any additional terms and
            conditions that are relevant to a particular VEROHIVE Service from
            time to time to reflect changes in the law or to the VEROHIVE
            Services. We will post the revised terms on the Site with a “last
            updated” date. PLEASE REVIEW THE SITE ON A REGULAR BASIS TO OBTAIN
            TIMELY NOTICE OF ANY REVISIONS. IF YOU CONTINUE TO USE THE VEROHIVE
            SERVICES AFTER THE REVISIONS TAKE EFFECT, YOU AGREE TO BE BOUND BY
            THE REVISED TERMS. You agree that we shall not be liable to you or
            to any third party for any modification of the Terms.<br></br>
            <br></br>
            1.2       You agree to receive all communications, agreements, and
            notices that we provide in connection with any VEROHIVE Services
            (“Communications”), including, but not limited to, Communications
            related to our delivery of the VEROHIVE Services and your purchase
            of or subscription to the VEROHIVE Services, via electronic means,
            including by e-mail, text, in-app notifications, or by posting them
            on the Site or through any VEROHIVE Services. You agree that all
            Communications we provide to you electronically satisfy any legal
            requirement that such Communications be in writing or be delivered
            in a particular manner and you agree to keep your Account contact
            information current.<br></br>
            <br></br>
            2.       ADDITIONAL TERMS FOR VEROHIVE SERVICES<br></br>
            2.1       VEROHIVE Video Conferencing and Messenger. If you use
            VEROHIVE’s Video Conferencing and Messenger, you accept the Terms of
            the VEROHIVE Video Conferencing and Messenger Schedule below.
            <br></br>
            <br></br>
            2.2       Payments. If you use the “Payments” feature in VEROHIVE
            Video Conferencing and Messenger, you accept the terms of the
            Payments Attachment below.<br></br>
            <br></br>
            2.3       Comments. If you use the “Comments” feature in VEROHIVE
            Video Conferencing and Messenger, you accept the terms of the
            Comments Attachment below.<br></br>
            <br></br>
            2.4       VEROHIVE Portals. If you use VEROHIVE Portals, you accept
            the Terms of the VEROHIVE Portals Schedule below.<br></br>
            <br></br>
            3.        USAGE AND ACCESS RIGHTS<br></br>
            3.1       Eligibility to Use. You represent and warrant that you
            are: (a) of legal age (18 years of age or older or otherwise of
            legal age in your resident jurisdiction) and competent to agree to
            these Terms; and (b) you (or your Authorized Users, as applicable)
            are not and will not when using the Site be located in, under the
            control of, or a national or resident of a U.S. embargoed country or
            territory and are not a prohibited end user under Export Control
            Laws (as defined in Section 12.3). You acknowledge that you are not
            permitted to use the Site if you cannot make these representations.
            If VEROHIVE has previously prohibited you from accessing the Site or
            using the VEROHIVE Services, you are not permitted to access the
            Site or use the VEROHIVE Services. <br></br>
            <br></br>
            If you are agreeing to these Terms on behalf of an organization or
            entity, you represent and warrant that you are authorized to agree
            to these Terms on that organization or entity’s behalf and bind them
            to these Terms (in which case, the references to &quot;you&quot; and
            &quot;your&quot; in these Terms, except for in this sentence, refer
            to that organization or entity). You may only use the Services
            pursuant to the terms of this Agreement. You are solely responsible
            for your and your End Users’ use of the Services and shall abide by,
            and ensure compliance with, all Laws in connection with your and
            each End User’s use of the Services, including but not limited to
            Laws related to recording, intellectual property, privacy and export
            control. Use of the Services is void where prohibited.<br></br>
            <br></br>
            3.2 Beta Services. VEROHIVE may, from time to time, offer access to
            services that are classified as Beta version. Access to and use of
            Beta versions may be subject to additional agreements. VEROHIVE
            makes no representations that a Beta version will ever be made
            generally available and reserves the right to discontinue or modify
            a Beta version at any time without notice. Beta versions are
            provided AS IS, may contain bugs, errors or other defects, and your
            use of a Beta version is at your sole risk.<br></br>
            <br></br>
            3.3       Limited License. Upon your acceptance of these Terms, we
            grant you a limited, non-exclusive and non-transferable license to
            access and use the Site for your internal business purposes and only
            as expressly permitted in these Terms and any applicable paid
            Customer plan that enables registration of an Account for the use of
            a VEROHIVE Service (“Subscription Plan”) when applicable. You shall
            not use or permit use of the Site for any illegal purpose or in any
            manner inconsistent with the provisions of these Terms. If you are
            or become a direct competitor of VEROHIVE, you may not access or use
            the VEROHIVE Services without VEROHIVE’s explicit, advance, written
            consent, and then only for the purposes authorized in writing.
            Except as otherwise restricted by these Terms, VEROHIVE grants you
            permission on a non- exclusive, non-transferable, limited basis to
            display, copy, and download content and materials on the Site
            provided that you: (a) retain all copyright and other proprietary
            notices on the content and materials; (b) use them solely for
            personal or internal, non- commercial use or in accordance with any
            applicable Subscription Plan; and (c) do not modify them in any way.
            Each discrete Subscription Plan includes restrictions and
            requirements that outline the features that Customer will be able to
            access. Any violation by you of the license provisions contained in
            this Section 3 may result in the immediate termination of your right
            to use the Site, as well as potential liability for copyright
            infringement or other claims depending on the circumstances.
            <br></br>
            <br></br>
            3.4 Recordings. You are responsible for compliance will all
            recording laws. The host can choose to record VEROHIVE meetings and
            Webinars. By using the Services, you are giving VEROHIVE consent to
            store recordings for any or all VEROHIVE meetings or webinars that
            you join, if such recordings are stored in our systems. You will
            receive a notification (visual or otherwise) when recording is
            enabled. If you do not consent to being recorded, you can choose to
            leave the meeting or webinar.<br></br>
            <br></br>
            3.5 Prohibited Use. You agree that you will not use, and will not
            permit any End User to use, the Services to:<br></br> (i) modify,
            disassemble, decompile, prepare derivative works of, reverse
            engineer or otherwise attempt to gain access to the source code of
            the Services;<br></br> (ii) knowingly or negligently use the
            Services in a way that abuses,<br></br>
            <br></br>
            interferes with, or disrupts VEROHIVEs networks, your accounts, or
            the Services;<br></br>
            (iii) engage in activity that is illegal, fraudulent, false, or
            misleading,
            <br></br> (iv) transmit through the Services any material that may
            infringe the intellectual property or other rights of third parties;{" "}
            <br></br>(v) build or benchmark a competitive product or service, or
            copy any features, functions or graphics of the Services; or{" "}
            <br></br>(vi) use the Services to communicate any message or
            material that is harassing, libelous, threatening, obscene,
            indecent, would violate the intellectual property rights of any
            party or is otherwise unlawful, that would give rise to civil
            liability, or that constitutes or encourages conduct that could
            constitute a criminal offense, under any applicable law or
            regulation; <br></br>(vii) upload or transmit any software, Content
            or code that does or is intended to harm, disable, destroy or
            adversely affect performance of the Services in any way or which
            does or is intended to harm or extract information or data from
            other hardware, software or networks of VEROHIVE or other users of
            Services; <br></br>(viii) engage in any activity or use the Services
            in any manner that could damage, disable, overburden, impair or
            otherwise interfere with or disrupt the Services, or any servers or
            networks connected to the Services or VEROHIVE&#39;s security
            systems. <br></br>(ix) use the Services in violation of any VEROHIVE
            policy or in a manner that violates applicable law, including but
            not limited to anti-spam, export control, privacy, and
            anti-terrorism laws and regulations and laws requiring the consent
            of subjects of audio and video recordings, and You agree that you
            are solely responsible for compliance with all such laws and
            regulations.<br></br>
            <br></br>
            3.6 Registration Information. You may be required to provide
            information about Yourself in order to register for and/or use
            certain Services. You agree that any such information shall be
            accurate. You may also be asked to choose a user name and password.
            You are entirely responsible for maintaining the security of your
            user name and password and agree not to disclose such to any third
            party.
            <br></br>
            <br></br>
            3.7 Limitations on Use.You may not reproduce, resell, or distribute
            the Services or any reports or data generated by the Services for
            any purpose unless You have been specifically permitted to do so
            under a separate agreement with VEROHIVE. You may not offer or
            enable any third parties to use the Services purchased by you,
            display on any website or otherwise publish the Services or any
            Content obtained from a Service (other than Content created by you)
            or otherwise generate income from the Services or use the Services
            for the development, production or marketing of a service or product
            substantially similar to the Services.<br></br>
            <br></br>
            4.        OWNERSHIP<br></br>
            <br></br>
            4.1       Intellectual Property. The Site contains materials that
            are proprietary and are protected by copyright laws, international
            treaty provisions, trademarks, service marks, and other intellectual
            property laws and treaties.<br></br>
            <br></br>
            4.1.1    The Site is also protected as a collective work or
            compilation under copyright and other laws and treaties. You agree
            to abide by all applicable copyright and other laws, as well as any
            additional copyright notices or restrictions contained on the Site.
            You acknowledge that the Site contains original works that have been
            developed, compiled, prepared, revised, selected, and arranged by
            VEROHIVE and others<br></br>
            <br></br>
            through the application of methods and standards of judgment
            developed and applied through the expenditure of substantial time,
            effort, and money and which constitute valuable intellectual
            property of VEROHIVE and such others. All present and future rights
            in and to trade secrets, patents, designs, copyrights, trademarks,
            database rights, service marks, know-how, and other intellectual
            property or other proprietary rights of any type, Documentation, any
            improvements, design contributions, or derivative works thereto, and
            any knowledge or process related thereto, including rights in and to
            all applications and registrations relating to the Site, shall, as
            between you and VEROHIVE, at all times be and remain the sole and
            exclusive property of VEROHIVE.<br></br>
            <br></br>
            4.1.2    The trademarks, logos, taglines, and service marks
            displayed on the Site (collectively, the “Trademarks”) are
            registered and unregistered Trademarks of VEROHIVE and others. The
            Trademarks may not generally be used in any advertising or
            publicity, or otherwise to indicate VEROHIVE&#39;s sponsorship of or
            affiliation with any product, service, event, or organization
            without VEROHIVE&#39;s prior express written permission. VEROHIVE
            acknowledges the Trademarks of other organizations for their
            respective products or services mentioned on the Site. Any rights
            not expressly granted in these Terms or on the IP Pages are reserved
            by VEROHIVE and Megshoot, LLC. Other than as provided in these Terms
            incorporated herein by reference, your use of the Trademarks, or any
            other VEROHIVE content, is strictly prohibited.<br></br>
            <br></br>
            4.1.3    Copyright. VEROHIVE respects copyright law and expects its
            users to do the same. If you believe that any content or material on
            the Site infringes copyrights you own, please notify us in
            accordance with our Copyright Policy.<br></br>
            <br></br>
            4.2       Software Use Restrictions. Software available for
            downloading through the Site or third-party websites or applications
            (the “Software”) is the copyrighted work of VEROHIVE and third-party
            providers. Use of the Software is governed by these Terms.
            Unauthorized reproduction or distribution of the Software is
            expressly prohibited by law, and may result in civil and criminal
            penalties. Violators may be prosecuted. <br></br>
            <br></br>
            4.3 Your Content. You agree that you are solely responsible for the
            content (&quot;Content&quot;) sent or transmitted by you or
            displayed or uploaded by you in using the Services and for
            compliance with all Laws pertaining to the Content, including, but
            not limited to, Laws requiring You to obtain the consent of a third
            party to use the Content and to provide appropriate notices of third
            party rights. You represent and warrant that you have the right to
            upload the Content to VEROHIVE and that such use does not violate or
            infringe on any rights of any third party. Under no circumstances
            will VEROHIVE be liable in any way for any
            <br></br> (a) Content that is transmitted or viewed while using the
            Services, <br></br>
            (b) errors or omissions in the Content, or<br></br>
            (c) any loss or damage of any kind incurred as a result of the use
            of, access to, or denial of access to Content. Although VEROHIVE is
            not responsible for any Content, VEROHIVE may delete any Content, at
            any time without notice to you, if VEROHIVE becomes aware that it
            violates any provision of this Agreement, or any law. You retain
            copyright and any other rights You already hold in Content which You
            submit, post or display on or through, the Services.<br></br>
            <br></br>
            4.4       Non-eDocument Content and Submissions/User Content. 
            <br></br>
            4.4.1    Submissions. The Site or VEROHIVE Services may enable you
            to submit, post, upload, or otherwise make available (collectively,
            &quot;Post&quot;) content such as questions, public messages, ideas,
            product feedback, comments, and other content (collectively,
            &quot;User Content&quot;) that may or may not be viewable by other
            users. If you Post User Content, unless we indicate otherwise, you
            grant us a nonexclusive, royalty- free, and fully sub-licensable
            right to access, view, use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, copy, and
            display such User Content throughout the world in any form, media,
            or technology now known or hereafter developed. You also permit any
            other user to view, copy, access, store, or reproduce such User
            Content for that user’s personal use. You grant us the right to use
            the name and other information about you that you submit in
            connection with such User Content. You represent and warrant that:
            <br></br>
            <br></br>(a) you own or otherwise control all of the rights to the
            User Content that you Post;<br></br>
            <br></br>
            (b) the User Content you Post is truthful and accurate; and{" "}
            <br></br>
            <br></br>
            (c) use of the User Content you Post does not violate these Terms or
            any applicable laws. For the avoidance of doubt, User Content does
            not include any video (streaming or stored) or documents shared peer
            to peer, such as a contract, disclosure, or notice that you share
            through the VEROHIVE platform(s) for processing (“eDocuments”).
            <br></br>
            <br></br>
            4.4.2    Screening &amp; Removal. You acknowledge and agree that
            VEROHIVE and its designees may or may not, at VEROHIVE&#39;s
            discretion, pre-screen User Content before its appearance on the
            Site or VEROHIVE Services, but that VEROHIVE has no obligation to do
            so. You further acknowledge and agree that VEROHIVE reserves the
            right (but does not assume the obligation) in its sole discretion to
            reject, move, edit, or remove any User Content that is contributed
            to the Site or VEROHIVE Services. Without limiting the
            foregoing,VEROHIVE and its designees shall have the right to remove
            any User Content that violates these Terms or is otherwise
            objectionable in VEROHIVE&#39;s sole discretion. You acknowledge and
            agree that VEROHIVE does not verify, adopt, ratify, or sanction User
            Content, and you agree that you must evaluate and bear all risks
            associated with your use of User Content or your reliance on the
            accuracy, completeness, or usefulness of User Content.
            <br></br>
            <br></br>
            5.        RESTRICTIONS ON USE OF THE SITE <br></br>
            <br></br>
            5.1       By using the Site or associated applications, including
            any VEROHIVE Service, you specifically agree not to engage in any
            activity or transmit any information that, in our sole discretion:
            <br></br>
            <br></br>
            a) Is illegal, or violates any federal, state, or local law or
            regulation;<br></br>
            b) Advocates illegal activity or discusses illegal activities with
            the intent to commit them;<br></br>
            c) Violates any third-party right, including, but not limited to,
            right of privacy, right of publicity, copyright, trademark, patent,
            trade secret, or any other intellectual property or proprietary
            rights;<br></br>
            <br></br>
            d) Is harmful, threatening, abusive, harassing, tortious, indecent,
            defamatory, sexually explicit or pornographic, discriminatory,
            vulgar, profane, obscene, libelous, hate speech, violent or inciting
            violence, inflammatory, or otherwise objectionable;<br></br>
            <br></br>
            e) Interferes with any other party’s use and enjoyment of the
            Services;<br></br>
            <br></br>
            f) Attempts to impersonate another person or entity;<br></br>
            <br></br>
            g) Is commercial in a way that violates these Terms, including but
            not limited to, using the Site for spam, surveys, contests, pyramid
            schemes, or other advertising materials;<br></br>
            <br></br>
            h) Falsely states, misrepresents, or conceals your affiliation with
            another person or entity;<br></br>
            <br></br>
            i) Accesses or uses the account of another user without permission;
            <br></br>
            <br></br>
            j) Distributes computer viruses or other code, files, or programs
            that interrupt, destroy, or limit the functionality of any computer
            software or hardware or electronic communications equipment;
            <br></br>
            <br></br>
            k) Interferes with, disrupts, disables, overburdens, or destroys the
            functionality or use of any features of the Site, or the servers or
            networks connected to the Site, or any of the VEROHIVE Services;
            <br></br>
            <br></br>
            l) “Hacks” or accesses without permission our proprietary or
            confidential records, those of another user, or those of anyone
            else;<br></br>
            <br></br>
            m) Improperly solicits personal or sensitive information from other
            users including without limitation address, credit card or financial
            account information, or passwords;<br></br>
            <br></br>
            n) Decompiles, reverse engineers, disassembles, or otherwise
            attempts to derive source code from the Site, except as expressly
            permitted in these Terms or by law, unless and then only to the
            extent permitted by applicable law without consent;<br></br>
            <br></br>
            o) Removes, circumvents, disables, damages, or otherwise interferes
            with security- related features, or features that enforce
            limitations on use of the Site;<br></br>
            <br></br>
            p) Uses automated or manual means to violate the restrictions in any
            robot exclusion headers on the Site, if any, or bypasses or
            circumvents other measures employed to prevent or limit access, for
            example by engaging in practices such as “screen scraping,”
            “database scraping,” or any other activity with the purpose of
            obtaining lists of users or other information;<br></br>
            <br></br>
            q) Modifies, copies, scrapes or crawls, displays, distributes,
            publishes, licenses, sells, rents, leases, lends, transfers, or
            otherwise commercializes any materials or content on the Site;
            <br></br>
            <br></br>
            r) Uses the Services for benchmarking, or to compile information for
            a product or service;<br></br>
            <br></br>
            s) Downloads (other than through page caching necessary for personal
            use, or as otherwise expressly permitted by these Terms),
            distributes, posts, transmits, performs, reproduces, broadcasts,
            duplicates, uploads, licenses, creates derivative works from, or
            offers for sale any content or other information contained on or
            obtained from or through the Site or VEROHIVE Services, by any means
            except as provided for in these Terms or with the prior written
            consent of VEROHIVE; or<br></br>
            <br></br>
            t) Attempts to do any of the foregoing.<br></br>
            <br></br>
            If you believe content on the Site violates the above restrictions,
            please contact us here: privacytos at verohive.com.<br></br>
            <br></br>
            5.2       In addition, Customers shall not, and shall not permit
            others to, do the following with respect to the VEROHIVE Services:
            <br></br>
            <br></br>
            a) Use the VEROHIVE Services or allow access to them in a manner
            that circumvents contractual usage restrictions or that exceeds
            authorized use or usage metrics set forth in these Terms, any
            applicable Subscription Plan or VEROHIVE’s Reasonable Use Policy
            incorporated herein by reference;<br></br>
            <br></br>  b) License, sub-license, sell, re-sell, rent, lease,
            transfer, distribute or time share or otherwise make any portion of
            the VEROHIVE Services or VEROHIVE’s then- current technical and
            functional documentation for the VEROHIVE Services (“Documentation”)
            available for access by third parties except as otherwise expressly
            provided in these Terms; or<br></br>
            <br></br>
            c) Access or use the VEROHIVE Services or Documentation for the
            purpose of developing or operating products or services intended to
            be offered to third parties in competition with the VEROHIVE
            Services or allow access by a direct competitor of VEOHIVE.<br></br>
            <br></br>
            5.3       You may not frame the Site, place pop-up windows over its
            pages, or otherwise affect the display of its pages. You may link to
            the Site, provided that you acknowledge and agree that you will not
            link the Site to any website containing any inappropriate, profane,
            defamatory, infringing, obscene, indecent, or unlawful topic, name,
            material, or information or that violates any intellectual property,
            proprietary, privacy, or publicity rights. Any violation of this
            provision may, in our sole discretion, result in termination of your
            use of and access to the Site effective immediately.<br></br>
            <br></br>
            5.4       You acknowledge that we have no obligation to monitor your
            – or anyone else’s – access to or use of the Site for violations of
            these Terms, or to review or edit any content. However, we have the
            right to do so for the purpose of operating and improving the Site
            (including without limitation for fraud prevention, risk assessment,
            investigation and customer support purposes, analytics, and
            advertising), to ensure your compliance with these Terms and to
            comply with applicable law or the order or requirement of a court,
            consent decree, administrative agency or other governmental body.
            <br></br>
            <br></br>
            6.        PRIVACY<br></br>
            <br></br>
            6.1       VEROHIVE Privacy Policy. You acknowledge that except as
            described in these Terms or applicable Corporate Terms, the
            information you provide to us or that we collect will be used and
            protected as described in the VEROHIVE Privacy Policy<br></br>
            <br></br>
            6.2       Data Processing/Transfer. If Customer or Customer’s
            Affiliate is established in the United Kingdom, a Member State of
            the European Economic Area, or Switzerland, the Data Protection
            Attachment for VEROHIVE Signature found
            at:www.verohive.com/privacypolicy (“DPA”) applies to the processing
            of any Personal Data (as defined in Section 1 of the DPA).<br></br>
            <br></br>
            6.3       Access &amp; Disclosure. We may access, preserve, or share
            any of your information when we believe in good faith that such
            sharing is reasonably necessary to investigate, prevent, or take
            action regarding possible illegal activities or to comply with legal
            process (e.g. a subpoena or other legal process). We may also share
            your information in situations involving potential threats to the
            physical safety of any person, violations of the VEROHIVE Privacy
            Policy or our user agreements or terms; or to respond to the claims
            of violation of the rights of third parties and/or to protect the
            rights, property and safety of VEROHIVE, our employees, users, or
            the public. This may involve the sharing of your information with
            law enforcement, government agencies, courts, and/or other
            organizations.<br></br>
            <br></br>
            7.       TERMS SPECIFIC TO VEROHIVE SERVICES<br></br>
            <br></br>
            7.1       Right to Use VEROHIVE Services.  Subject to these Terms,
            VEROHIVE will provide the VEROHIVE Services to Customers in
            accordance with each Customer’s Subscription Plan, and VEROHIVE
            grants to each Customer a limited non-exclusive, non-transferrable
            right and license during the Term, solely for its internal business
            purposes and in accordance with the Documentation, to:<br></br>
            <br></br>
            <br></br>
            <br></br> (a) use the VEROHIVE Services;
            <br></br>
            <br></br> (b) implement, configure, and, through its Account
            Administrator(s), permit its Authorized Users to access and use the
            VEROHIVE Services up to any applicable limits or maximums; and
            <br></br>
            <br></br>(c) access and use the Documentation. <br></br>
            <br></br>
            7.1.1    Authorized Users.  Authorized Users of Customer must be
            identified by a unique email address and user name and two or more
            natural persons may not use the VEROHIVE Services as the same
            Authorized User. If the Authorized User is not an employee of
            Customer, use of the VEROHIVE Services will be allowed only if the
            user is under confidentiality and other obligations with Customer at
            least as restrictive as those in these Terms, and is accessing or
            using the VEROHIVE Services solely to support Customer’s internal
            business purposes.<br></br>
            <br></br>
            7.1.2    Account Administrator. Customer may assign and expressly
            authorize an Authorized User(s) as its agent to manage Customer’s
            Account, and management of Customer’s Account includes, without
            limitation, configuring administration settings, assigning access
            and use authorization, requesting different or additional services,
            providing usage and performance records, managing templates,
            executing approved campaigns and events, assisting in third-party
            product integrations, and accepting notices, disclosures, and terms
            and conditions (“Account Administrator”). Customer may appoint an
            employee, agent or a third-party business partner or contractor to
            act as its Account Administrator(s) and may change its designation
            at any time through its Account.<br></br>
            <br></br>
            7.1.3 VEROHIVE OBLIGATIONS FOR CONTENT. VEROHIVE will maintain
            reasonable physical and technical safeguards to prevent unauthorized
            disclosure of or access to Content, in accordance with industry
            standards. VEROHIVE will notify you if it becomes aware of
            unauthorized access to Content. VEROHIVE will not access, view or
            process Content except<br></br>
            <br></br> (a) as provided for in this Agreement and in VEROHIVE’s
            Privacy Policy; <br></br>
            <br></br>(b) as authorized or instructed by you, <br></br>
            <br></br>(c) as required to perform its obligations under this
            Agreement; or<br></br>
            <br></br> (d) as required by Law. VEROHIVE has no other obligations
            with respect to Content.<br></br>
            <br></br>
            7.1.4 INTENDED USE; RESTRICTION ON USE BY CHILDREN. The Services are
            intended for business use. You may choose to use the Services for
            other purposes, subject to the terms and limitations of this
            Agreement. VEROHIVE is not intended for use by individuals under the
            age of 18, unless it is through a Verified Educational Facility
            Subscriber using VEROHIVE for Education (K-12). Individuals under
            the age of 18 may not create accounts or use the Services except as
            described herein without parental consent.<br></br>
            <br></br>
            7.2       Payment Terms.<br></br>
            <br></br>
            7.2.1    Subscription Plan. The prices, features, and options of the
            VEROHIVE Services depend on the Subscription Plan selected as well
            as any changes instigated by Customer. VEROHIVE does not represent
            or warrant that a particular Subscription Plan will be offered
            indefinitely and reserves the right to change the prices for or
            alter the features and options in a particular Subscription Plan
            without prior notice.<br></br>
            <br></br>
            7.2.2    No Refunds. Customer will timely pay VEROHIVE all fees
            associated with its Subscription Plan, Account, or use of the
            VEROHIVE Services, including, but without limitation, by Authorized
            Users. CUSTOMER’S PAYMENTS ARE NON- REFUNDABLE EXCEPT AS EXPRESSLY
            PROVIDED IN THESE TERMS.<br></br>
            <br></br>
             Charges for pre-paid Subscription Plans will be billed to Customer
            in advance. Charges for per-use purchases and standard Subscription
            Plan charges will be billed in arrears unless otherwise specified in
            the Subscription Plan.<br></br>
            <br></br>
            7.2.3    Recurring Charges. When you purchase a Subscription Plan,
            you must provide accurate and complete information for a valid
            payment method that you are authorized to use. You will be billed
            for your Subscription Plan either through the payment method you
            provide, such as a credit card, or through an intermediary provider
            such as iTunes, Google Play, or a similar app store (“App Store”).
            Customer must promptly notify VEROHIVE of any change in its
            invoicing address and must update its Account with any changes
            related to its payment method. BY COMPLETING REGISTRATION FOR A
            SUBSCRIPTION PLAN, CUSTOMER AUTHORIZES VEROHIVE OR ITS AGENT TO
            CHARGE ITS PAYMENT METHOD ON A RECURRING (E.G. MONTHLY OR YEARLY)
            BASIS (“AUTHORIZATION”) FOR:
            <br></br>
            <br></br> (a) THE APPLICABLE SUBSCRIPTION PLAN CHARGES;
            <br></br>
            <br></br> (b) ANY AND ALL APPLICABLE TAXES; AND
            <br></br>
            <br></br>(c) ANY OTHER CHARGES INCURRED IN CONNECTION WITH
            CUSTOMER’S USE OF THE VEROHIVE SERVICES. The Authorization continues
            through the applicable Subscription Term and any Renewal Term (as
            defined in Section 8.2.3, below) until Customer cancels as set forth
            in Section 8.2 of these Terms.   <br></br>
            <br></br>
            7.2.4    Late Fees &amp; Collection Costs. If VEROHIVE does not
            receive payment from Customer’s payment method, Customer agrees to
            pay all amounts due upon demand. Any amount not paid when due will
            be subject to finance charges equal to 1.5% of the unpaid balance
            per month or the highest rate permitted by applicable law, whichever
            is less, determined and compounded daily from the date due until the
            date paid. Customer will reimburse any costs or expenses (including,
            but not limited to, reasonable attorneys’ fees) incurred by VEROHIVE
            to collect any amount that is not paid when due. VEROHIVE may accept
            payment in any amount without prejudice to VEROHIVE’s right to
            recover the balance of the amount due or to pursue any other right
            or remedy. Amounts due to VEROHIVE may not be withheld or offset by
            Customer for any reason against amounts due or asserted to be due
            from VEROHIVE.<br></br>
            <br></br>
            7.2.5    Invoices. VEROHIVE will provide billing and usage
            information in a format we choose, which may change from time to
            time. VEROHIVE reserves the right to correct any errors or mistakes
            that it identifies even if it has already issued an invoice or
            received payment. Customer agrees to notify us about any billing
            problems or discrepancies within thirty (30) days after they first
            appear on your invoice. If Customer does not bring such
            problems/discrepancies to our attention within thirty (30) days, it
            agrees to waive its right to dispute such problems or discrepancies.
            <br></br>
            <br></br>
            7.2.6    Billing Cycles. Billing cycle end dates may change from
            time to time. When a billing cycle covers less than or more than a
            full month, we may make reasonable adjustments and/or
            prorations. Customer agrees that we may (at our option) accumulate
            charges incurred during a billing cycle and submit them as one or
            more aggregate charges during or at the end of a cycle, and that we
            may delay obtaining authorization or payment from Customer’s payment
            card issuer or App Store until submission of the accumulated
            charge(s). <br></br>
            <br></br>
            7.2.7    Benefit Programs. You may receive or be eligible for
            certain pricing structures, discounts, features, promotions, and
            other benefits (collectively, &quot;Benefits&quot;) through a
            business or government agreement with us (&quot;Business
            Terms&quot;). Any and all such Benefits are provided solely as a
            result of the corresponding Business Terms and such Benefits may be
            modified or terminated without notice. If you use the VEROHIVE
            Services and a business or government entity pays your charges or is
            otherwise liable for the charges, you authorize us to share your
            account information with that entity and/or its authorized
            agents. If you are enrolled in a Subscription Plan or receive
            certain Benefits tied to Business Terms with us, but you are liable
            for your own charges, then you authorize us to share enough account
            information to verify your continuing eligibility for those Benefits
            and the Subscription Plan.<br></br>
            <br></br>
            7.2.8    Tax Responsibility. All payments required by these Terms
            are stated exclusive of all taxes, duties, levies, imposts, fines,
            or similar governmental assessments, including sales and use taxes,
            value-added taxes (“VAT”), goods and services taxes (“GST”), excise,
            business, service, and similar transactional taxes imposed by any
            jurisdiction and the interest and penalties thereon, excluding taxes
            based on VEROHIVE’s net income (collectively, “Taxes”). Customer
            shall be responsible for and bear Taxes associated with its purchase
            of, payment for, access to or use of the VEROHIVE Services. Taxes
            shall not be deducted from the payments to VEROHIVE, except as
            required by law, in which case Customer shall increase the<br></br>
            <br></br>
            amount payable as necessary so that after making all required
            deductions and withholdings, VEROHIVE receives and retains (free
            from any Tax liability) an amount equal to the amount it would have
            received had no such deductions or withholdings been made. Customer
            hereby confirms that VEROHIVE can rely on the name and address set
            forth in its registration for a Subscription Plan as being the place
            of supply for Tax purposes. VEROHIVE’s and Customer’s obligations
            under this Section 7.2.8 (Tax Responsibility) shall survive the
            termination or expiration of these Terms.<br></br>
            <br></br>
            7.2.9    Intermediary Provider Billing. If your Subscription Plan is
            based on intermediary provider billing, your intermediary provider
            will automatically charge your App Store account monthly for the
            cost of the Subscription Plan and any applicable taxes. If you are
            not current with your Subscription Plan payments, we reserve the
            right to terminate your account, suspend your access to your
            Subscription Plan, or convert your Subscription Plan subscription to
            a non-subscription account. You will be responsible for paying all
            past due amounts.<br></br>
            <br></br>
            7.3       Free Trial and Special Offers for VEROHIVE Services.
            <br></br>
            <br></br>
            7.3.1    If you register for a free trial, promotional offer, or
            other type of limited offer for use of VEROHIVE Services (“Free
            Trial”), you may be presented with additional terms and conditions
            when registering for a Free Trial, and any such additional terms and
            conditions are hereby incorporated into these Terms by reference and
            are legally binding. This Section 7.3 (Free Trial and Special Offers
            for VEOHIVE Services) supersedes and applies notwithstanding any
            conflicting provisions with regard to access and use of a Free
            Trial.<br></br>
            <br></br>
            7.3.2    VEROHIVE reserves the right to reduce the term of a trial
            period or end it altogether without prior notice.<br></br>
            <br></br>
            7.3.3    The version of the VEROHIVE Services that is available for
            a Free Trial may not include or allow access to all features or
            functions. ANY DATA THAT A CUSTOMER ENTERS INTO THE VEROHIVE
            SERVICES, AND ANY CONFIGURATIONS MADE BY OR FOR A CUSTOMER, DURING
            THE FREE TRIAL WILL BE PERMANENTLY LOST AT THE END OF THE TRIAL
            PERIOD UNLESS THE CUSTOMER: <br></br>
            <br></br>
            (a) PURCHASES A SUBSCRIPTION PLAN TO VEROHIVE SERVICES THAT IS
            EQUIVALENT TO OR GREATER THAN THOSE COVERED BY THE TRIAL; OR
            <br></br>
            <br></br>
            (b) EXPORTS SUCH DATA BEFORE THE END OF THE TRIAL PERIOD.<br></br>
            <br></br>
            7.3.4    Notwithstanding any other provision of these Terms,
            including without limitation the warranties described in Section 9
            (Warranties and Disclaimers) or any service-specific terms and
            conditions applicable to a particular VEROHIVE Service, including
            exhibits and attachments accompanying such schedule (“Service
            Schedule”), during a Free Trial the VEROHIVE Services are provided
            “AS IS” and “as available” without any warranty that may be set
            forth in these Terms, and<br></br>
            <br></br>
            VEROHIVE DISCLAIMS ANY IMPLIED WARRANTIES INCLUDING WITHOUT
            LIMITATION MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE AND
            VEROHIVE’S TOTAL AGGREGATE<br></br>
            <br></br>
            LIABILITY ARISING OUT OF OR RELATING TO CUSTOMER’S USE OF THE FREE
            TRIAL IS $100.<br></br>
            <br></br>
            7.4       Data.<br></br>
            <br></br>
            7.4.1    Data Generally. You shall be responsible for data that you
            provide or use in VEROHIVE Services. You are solely responsible for
            determining the suitability of the VEROHIVE Services for your
            business or organization and complying with any regulations, laws,
            or conventions applicable to the data you provide and your use of
            the VEROHIVE Services and Site.<br></br>
            <br></br>
            7.4.2    Personal Data. Customer warrants that its collection and
            use of any personal information or data provided while using the
            Site complies with all applicable data protection laws, rules, and
            regulations. Customer and its Authorized Users acknowledge that
            VEROHIVE may process such personal data in accordance with the
            VEROHIVE Privacy Policy.<br></br>
            <br></br>
            7.5       Customer Warranties. <br></br>
            <br></br>
            Customer hereby represents and warrants to VEROHIVE that:<br></br>
            <br></br> (a) it has all requisite rights and authority to use the
            VEROHIVE Services under these Terms and to grant all applicable
            rights herein;<br></br>
            <br></br> (b) it is responsible for all use of the VEROHIVE Services
            associated with its Account;<br></br>
            <br></br> (c) it is solely responsible for maintaining the
            confidentiality of its Account names and password(s);<br></br>
            <br></br> (d) it agrees to immediately notify VEROHIVE of any
            unauthorized use of Customer’s Account of which it becomes aware;{" "}
            <br></br>
            <br></br>(e) it agrees that VEROHIVE will not be liable for any
            losses incurred as a result of a third party&#39;s use of its
            Account, regardless of whether such use is with or without its
            knowledge and consent;<br></br>
            <br></br> (f) it will use the VEROHIVE Services for lawful purposes
            only and subject to these Terms; <br></br>
            <br></br>(g) any information it submits to VEROHIVE is true,
            accurate, and correct; and<br></br>
            <br></br> (h) it will not attempt to gain unauthorized access to the
            System or the VEROHIVE Services, other accounts,<br></br>
            <br></br>
            computer systems, or networks under the control or responsibility of
            VEROHIVE through hacking, cracking, password mining, or any other
            unauthorized means.<br></br>
            <br></br>
            7.6       Confidentiality.<br></br>
            <br></br>
            7.6.1    Confidential Information. “Confidential Information” means{" "}
            <br></br>
            <br></br>(a) for VEROHIVE, the VEROHIVE Services and Documentation;
            <br></br>
            <br></br> (b) for Customer, Customer Data;<br></br>
            <br></br> (c) any other information of a party that is disclosed in
            writing or orally and is designated as confidential or proprietary
            at the time of disclosure (and, in the case of oral disclosures,
            summarized in writing within thirty (30) days of the initial
            disclosure and delivered to the Recipient), or that due to the
            nature of the information the Recipient would clearly understand it
            to be confidential information of the disclosing party; and<br></br>
            <br></br> (d) the specific terms and conditions of these Terms, and
            any amendment and attachment thereof, between the parties.
            Confidential Information shall not include any information that:
            <br></br>
            <br></br> (i) was or becomes generally known to the public through
            no fault or breach of these Terms by the Recipient; <br></br>
            <br></br>(ii) was rightfully in the Recipient’s possession at the
            time of disclosure without restriction on use or disclosure;
            <br></br>
            <br></br> (iii) was independently developed by the Recipient without
            use of the disclosing party’s Confidential Information; or <br></br>
            <br></br>(iv) was rightfully obtained by the Recipient from a third
            party not under a duty of confidentiality and without restriction on
            use or disclosure. All information provided to VEROHIVE that is not
            Confidential Information will be treated in accordance with the
            VEROHIVE Privacy Policy. 7.6.2    Restricted Use and
            Nondisclosure. During and after the Subscription Term, the party
            receiving Confidential Information (“Recipient”) will: <br></br>
            <br></br>(a) use the Confidential Information of the other party
            solely for the purpose for which it is provided; <br></br>
            <br></br>(b) not disclose such Confidential Information to a third
            party, except on a need-to-know basis to its attorneys, auditors,
            consultants, and service providers who are under confidentiality
            obligations at least as restrictive as those contained herein; and{" "}
            <br></br>
            <br></br>(c) protect such Confidential Information from unauthorized
            use and disclosure to the same extent (but using no less than a
            reasonable degree of care) that it protects its own Confidential
            Information of a similar nature. Notwithstanding the foregoing,
            Customer expressly authorizes VEROHIVE to use and process Customer
            Data as described in the VEROHIVE Privacy Policy, which provides
            for, but is not limited to, delivering services as indicated by
            Customer’s use of the VEROHIVE Services and sharing Transaction Data
            with individuals who are authorized to view or participate in video
            meetings created by you.<br></br>
            <br></br>
            7.6.3    Required Disclosure. If VEOHIVE is required by law to
            disclose Confidential Information, VEROHIVE will give prompt written
            notice to Customer before making the disclosure, unless prohibited
            from doing so by the legal or administrative process, and assist
            Customer to obtain where reasonably available an order protecting
            the Confidential Information from public disclosure. 7.6.4   
            Ownership. Notwithstanding any other provision of these Terms,
            VEROHIVE acknowledges that, as between the parties, all Confidential
            Information it receives from Customer, including all copies thereof
            in Recipient’s possession or control, in any media, is proprietary
            to and exclusively owned by Customer. Nothing in these Terms grants
            VEROHIVE any right, title or interest in or to any of the Customer’s
            Confidential Information. VEROHIVE’s incorporation of the disclosing
            party’s Confidential Information into any of its own materials will
            not render Confidential Information non-confidential. 8.        TERM
            AND TERMINATION 8.1       Termination – Site Visitors. A Site
            Visitor may terminate its use of the Site at any time by ceasing
            further use of the Site. VEROHIVE may terminate your use of the Site
            and deny you access to the Site in our sole discretion for any
            reason or no reason, including for violation of these Terms. 8.2
                  Term and Termination – Customers. 8.2.1    Suspension of
            Access to VEROHIVE Services. VEROHIVE may suspend any use of the
            VEROHIVE Services, remove any content or disable or terminate any
            Account or Authorized User that VEROHIVE reasonably and in good
            faith believes violates these Terms. VEROHIVE will use commercially
            reasonable efforts to notify you prior to any such suspension or
            disablement, unless VEROHIVE reasonably believes that: (a) it is
            prohibited from doing so under applicable law or under legal
            process, such as court or government administrative agency
            processes, orders, mandates, and the like; or (b) it is necessary to
            delay notice in order to prevent imminent harm to the VEROHIVE
            Services or a third party. Under circumstances where notice is
            delayed, VEROHIVE will provide the notice if and when the related
            restrictions in the previous sentence no longer apply. 8.2.2   
            Term. The period of effectiveness of these Terms (“Term”), with
            respect to VEROHIVE Services, begins on the date the Customer
            accepts it and continues until the Customer’s Subscription Plan
            expires or its use of the VEROHIVE Services ceases (including as a
            result of termination in accordance with this Section 8.2),
            whichever is later. 8.2.3    Subscription Term and Automatic
            Renewals. VEROHIVE’s Subscription Plans automatically renew unless
            otherwise noted. If you purchase a Subscription Plan you agree to
            pay the then-current applicable fee associated with the Subscription
            Plan and further agree and acknowledge that it will automatically
            renew, unless, prior to the end of the current period of
            effectiveness of the Subscription Plan (“Subscription Term”): (a)
            you terminate your Account; (b) you set your Account not to
            auto-renew by logging in to VEROHIVE Services or contacting us here:
            privacytos at verohive.com; (c) VEROHIVE declines to renew your
            Subscription Plan; or (d) these Terms are otherwise properly
            terminated as expressly permitted herein. The Subscription Plan will
            automatically renew on a monthly or annual basis, depending on the
            method you choose (“Renewal Term”). Promotional codes may only be
            used for your first Subscription Term. If you purchased your
            Subscription Plan with a promotional code, each time your
            Subscription Plan renews you will be charged the full annual billing
            amount. If your Subscription Plan is ever terminated for any reason,
            and you purchase another Subscription Plan, you shall not be
            eligible to use a promotional code. We reserve the right to modify,
            terminate, or otherwise amend the fees and features associated with
            your Subscription Plan. We may also recommend that you purchase a
            new Subscription Plan that is comparable to your previous
            Subscription Plan that is ending. Before we change the fees and
            charges in effect, or add new fees and charges, we will give you
            advance notice of at least thirty (30) days. If we provide you such
            advance notice, your continued use of the VEROHIVE Services after
            the changes have been made will constitute your acceptance of the
            changes. If you do not wish to continue subscribing with the new
            fees or features, you may terminate your Subscription Plan as
            described in Section 8.2.4. If you accept the new Subscription Plan,
            its terms and conditions with these Terms will apply in the Renewal
            Term and thereafter. 8.2.4    Termination by Customer. You may
            terminate your Account at any time upon ten (10) days’ advance
            written notice to VEROHIVE. If you wish to terminate, you must
            provide notice by contacting privacytos at verohive.com. If you
            purchased your Subscription Plan through an external service, such
            as an App Store, you must use the tools made available by those
            services to manage and/or terminate your Subscription Plan. Section
            7.2.2 notwithstanding, if a Customer terminates its annual
            Subscription Plan within the first thirty (30) days of the initial
            Subscription Term, it may submit a written request to VEROHIVE for a
            refund of the fees paid to VEROHIVE for the initial Subscription
            Term, which VEROHIVE will consider, without obligation, in good
            faith. VEROHIVE has no obligation to consider refund requests
            related to a termination of a Subscription Plan if the termination
            does not occur in the first thirty (30) days of the initial
            Subscription Term, or if there has been a violation of other Terms
            herein, or if records indicate substantial productive use took place
            during that period. 8.2.5    Default; Termination by VEROHIVE. A
            Customer will be in default of these Terms if: (a) it fails to
            timely pay any amount owed to us or an Affiliate of ours; (b) it or
            an Authorized User associated with its Account breaches any
            provision of these Terms or violates any published policy applicable
            to the VEROHIVE Services; (c) it is or becomes subject to any
            proceeding under the Bankruptcy Code or similar laws; or (d) if, in
            our sole discretion, we believe that continued use of the VEROHIVE
            Services by the Customer (or its Authorized Users or signers)
            creates legal risk for VEROHIVE or presents a threat to the security
            of the VEROHIVE Services or VEROHIVE’s customers. If a Customer is
            in default, we may, without notice: (i) suspend its Account and use
            of the VEROHIVE Services; (ii) terminate its Account; (iii) charge
            reactivation fees in order to reactivate its Account; and (iv)
            pursue any other remedy available to us. A VEROHIVE “Affiliate”
            means any legal entity that Megahoot, LLC. owns, that owns VEROHIVE.
            or that is under common control with VEROHIVE, Inc.  A Customer
            “Affiliate” means any legal entity that Customer owns, that owns
            Customer or that is under common control with Customer. “Control”
            and “own” mean possessing greater than 50% interest in an entity or
            the right to direct the management of the entity. 8.2.6    Effect of
            Termination. If these Terms expires or are terminated for any
            reason: (a) Customer will pay to VEROHIVE any amounts that have
            accrued before, and remain unpaid as of, the date of the termination
            or expiration, including those for the billing cycle in which
            termination occurs; (b) any and all of Customer’s liabilities to
            VEROHIVE that have accrued before the effective date of the
            expiration or termination will survive; (c) licenses and use rights
            granted to Customer with respect to the Site and VEROHIVE Services
            and intellectual property will immediately terminate; (d) VEROHIVE’s
            obligation to provide any further services to Customer under these
            Terms will immediately terminate, except any such services that are
            expressly to be provided following expiration or termination of
            these Terms; and (e) the provisions of Section 3 (Usage and Access
            Rights), Section 4 (Ownership), Section 5.3 (Restrictions on Use of
            the Site), Section 5.4 (Compliance with Terms), Section 6 (Privacy),
            Section 7.2.2 (No Refunds), Section 7.2.7 (Benefit Programs),
            Section 7.2.8 (Tax Responsibility), Section 7.3 (Free Trial and
            Special Offers for VEROHIVE Services), Section 7.4 (Data), Section
            7.6 (Confidentiality), Section 8.2.6 (Effect of Termination),
            Section 9 (Warranties and Disclaimers), Section 10 (Indemnification
            Obligations), Section 11 (Limitations of Liability), and Section 12
            (General) will survive, as well as provisions designated to survive
            under any Service Schedules and accompanying attachments and
            Exhibits to these Terms.  9.      WARRANTIES AND DISCLAIMERS THE
            VEROHIVE SERVICES, DOCUMENTATION, AND SITE ARE PROVIDED “AS IS” AND
            “AS AVAILABLE.” YOUR USE OF THE VEROHIVE SERVICES, DOCUMENTATION,
            AND SITE SHALL BE AT YOUR SOLE RISK. VEROHIVE AND ITS RESPECTIVE
            OFFICERS, DIRECTORS, EMPLOYEES, MEMBERS, SHAREHOLDERS, AGENTS,
            AFFILIATES, SUBSIDIARIES, AND LICENSORS (“VEROHIVE PARTIES”): (a)
            MAKES NO ADDITIONAL REPRESENTATION OR WARRANTY OF ANY KIND WHETHER
            EXPRESS, IMPLIED (EITHER IN FACT OR BY OPERATION OF LAW), OR
            STATUTORY, AS TO ANY MATTER WHATSOEVER; (b) EXPRESSLY DISCLAIMS ALL
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, QUALITY, ACCURACY, AND TITLE; AND (c) DOES NOT WARRANT THAT
            THE VEROHIVE SERVICES, DOCUMENTATION, OR SITE ARE OR WILL BE
            ERROR-FREE, WILL MEET YOUR REQUIREMENTS, OR BE TIMELY OR SECURE. YOU
            WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE RESULTING FROM USE OF THE
            VEROHIVE SERVICES, DOCUMENTATION, OR SITE.  THE VEROHIVE PARTIES
            MAKE NO WARRANTIES OR REPRESENTATIONS THAT VEROHIVE SERVICES,
            DOCUMENTATION, AND SITE HAVE BEEN AND WILL BE PROVIDED WITH DUE
            SKILL, CARE AND DILIGENCE OR ABOUT THE ACCURACY OR COMPLETENESS OF
            THE VEROHIVE SERVICES, DOCUMENTATION, AND SITE CONTENT AND ASSUMES
            NO RESPONSIBILITY FOR ANY: (i) ERRORS, MISTAKES, OR INACCURACIES OF
            CONTENT; (ii) PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE
            WHATSOEVER RESULTING FROM YOUR ACCESS TO AND USE OF VEROHIVE
            SERVICES, DOCUMENTATION, AND SITE; (iii) ANY UNAUTHORIZED ACCESS TO
            OR USE OF OUR SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
            FINANCIAL INFORMATION STORED THEREIN; (iv) ANY INTERRUPTION OR
            CESSATION OF TRANSMISSION TO OR FROM THE SITE; (v) ANY BUGS,
            VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR
            THROUGH THE SITE THROUGH THE ACTIONS OF ANY THIRD PARTY; (vi) ANY
            LOSS OF YOUR DATA OR CONTENT FROM THE SITE; AND/OR (vii) ANY ERRORS
            OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND
            INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED,
            TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA VEROHIVE SERVICES,
            DOCUMENTATION, AND SITE. YOU WILL NOT HAVE THE RIGHT TO MAKE OR PASS
            ON ANY REPRESENTATION OR WARRANTY ON BEHALF OF VEROHIVE TO ANY THIRD
            PARTY. BECAUSE SOME STATES AND JURISDICTIONS DO NOT ALLOW
            LIMITATIONS ON IMPLIED WARRANTIES, THE ABOVE LIMITATION MAY NOT
            APPLY TO YOU. IN THAT EVENT, SUCH WARRANTIES ARE LIMITED TO THE
            MAXIMUM EXTENT PERMITTED BY AND FOR THE MINIMUM WARRANTY PERIOD
            ALLOWED BY THE MANDATORY APPLICABLE LAW. If you are a California
            resident, you hereby waive California Civil Code §1542, which says:
            “A general release does not extend to claims which the creditor does
            not know or suspect to exist in his favor at the time of executing
            the release, which if known by him must have materially affected his
            settlement with the debtor.” This release includes the criminal acts
            of others. Some jurisdictions do not allow the exclusion of certain
            warranties or the limitation or exclusion of liability for
            incidental or consequential damages such as in this Section 9 or
            below in Section 11. Accordingly, some of these limitations may not
            apply to you. If you are a New Jersey resident, or a resident of
            another state that permits the exclusion of these warranties and
            liabilities, then the limitations in Section 9 and Section 11
            specifically do apply to you. 10.     INDEMNIFICATION OBLIGATIONS
            You will defend, indemnify, and hold us, our Affiliates, officers,
            directors, employees, suppliers, consultants, and agents harmless
            from any and all third-party claims, liability, damages, and costs
            (including, but not limited to, attorneys&#39; fees) arising from or
            related to, as applicable: (a) your access to and use of the Site;
            (b) violation of these Terms by you or your Account Administrator(s)
            or Authorized Users, as applicable; (c) infringement of any
            intellectual property or other right of any person or entity by you;
            (d) the nature and content of all Customer Data processed by the
            VEROHIVE Services; or (e)  any products or services purchased or
            obtained by you in connection with the Site. VEROHIVE retains the
            exclusive right to settle, compromise, and pay, without your prior
            consent, any and all claims or causes of action that are brought
            against us. We reserve the right, at your expense, to assume the
            exclusive defense and control of any matter for which you are
            required to indemnify us and you agree to cooperate with our defense
            of these claims. You agree not to settle any matter in which we are
            named as a defendant and/or for which you have indemnity obligations
            without our prior written consent. We will use reasonable efforts to
            notify you of any such claim, action, or proceeding upon becoming
            aware of it. 11.     LIMITATIONS OF LIABILITY 11.1     Disclaimer of
            Consequential Damages. NOTWITHSTANDING ANYTHING TO THE CONTRARY
            CONTAINED IN THESE TERMS, VEROHIVE WILL NOT, UNDER ANY
            CIRCUMSTANCES, BE LIABLE TO YOU FOR ANY CONSEQUENTIAL, INCIDENTAL,
            SPECIAL, COVER, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR
            RELATED TO THE TRANSACTIONS CONTEMPLATED UNDER THESE TERMS,
            INCLUDING, BUT NOT LIMITED TO, GOODWILL, WORK STOPPAGE, LOST
            PROFITS, OR LOSS OF BUSINESS, EVEN IF APPRISED OF THE LIKELIHOOD OF
            SUCH LOSSES, AND WHETHER SUCH CLAIMS ARE MADE BASED ON CONTRACT,
            TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY. TO THE
            FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE
            VEROHIVE PARTIES BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT,
            INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER
            RESULTING FROM ANY: (a) USE OF THE SITE, DOCUMENTATION, OR VEROHIVE
            SERVICES; (b) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (c)
            PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE WHATSOEVER
            RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, DOCUMENTATION, OR
            VEROHIVE SERVICES; (d) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
            SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL
            INFORMATION STORED THEREIN; (e) ANY INTERRUPTION OR CESSATION OF
            TRANSMISSION TO OR FROM OUR SERVERS; (f) ANY BUGS, VIRUSES, TROJAN
            HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE SITE,
            DOCUMENTATION, OR VEROHIVE SERVICES BY ANY THIRD PARTY; (g) ANY LOSS
            OF YOUR DATA OR CONTENT FROM THE SITE, DOCUMENTATION, OR VEROHIVE
            SERVICES; (h) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS
            OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY
            CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
            SITE, DOCUMENTATION, OR VEROHIVE SERVICES, WHETHER BASED ON
            WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL
            THEORY, AND WHETHER OR NOT THE VEROHIVE PARTIES ARE ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES; AND/OR (i) THE DISCLOSURE OF
            INFORMATION PURSUANT TO THESE TERMS OR OUR PRIVACY POLICY. Some
            countries and jurisdictions do not allow the limitation or exclusion
            of consequential, direct, indirect, or other damages in contracts
            with consumers and to the extent you are a consumer the limitations
            or exclusions in this Section 11.1 may not apply to you. 11.2    
            Cap on Damages. OUR TOTAL LIABILITY TO YOU FOR ANY CAUSE OF ACTION
            ARISING OUT OF OR RELATED TO THESE TERMS OR TO YOUR USE OF THE SITE
            (INCLUDING WITHOUT LIMITATION WARRANTY CLAIMS), REGARDLESS OF THE
            FORUM AND REGARDLESS OF WHETHER ANY ACTION OR CLAIM IS BASED ON
            CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL OR
            EQUITABLE THEORY, WILL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO
            VEROHIVE FOR THE VEROHIVE SERVICE(S) GIVING RISE TO THE CLAIM UNDER
            THESE TERMS DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE DATE
            OF THE FIRST EVENT GIVING RISE TO LIABILITY, OR $100, WHICEVER IS
            GREATER. THE EXISTENCE OF MORE THAN ONE CLAIM SHALL NOT ENLARGE THIS
            LIMIT. 11.3     Independent Allocations of Risk. Each provision of
            these Terms that provides for a limitation of liability, disclaimer
            of warranties, or exclusion of damages represents an agreed
            allocation of the risks of these Terms between the parties. This
            allocation is an essential element of the basis of the bargain
            between the parties. Each of these provisions is severable and
            independent of all other provisions of these Terms, and each of
            these provisions will apply even if the warranties in these Terms
            have failed of their essential purpose. 11.4    Jurisdictional
            Limitations.  11.4.1  Because some states and jurisdictions do not
            allow limitation of liability in certain instances, portions of the
            above limitation may not apply to you. In that event, such
            exclusions and limitations shall apply to the maximum extent
            permitted by applicable mandatory law (and our liability shall be
            limited or excluded as permitted under mandatory applicable law). If
            you are a New Jersey resident, the limitations in Section 11
            specifically do apply to you. 11.4.2  VEROHIVE’s liability to you if
            you are domiciled in Germany is limited as described in Section 12.9
            below. 12.      GENERAL     12.1     Third Party Content. We may
            provide. VEROHIVE IS NOT RESPONSIBLE FOR THE CONTENT ON THE INTERNET
            OR WEB PAGES THAT ARE LOCATED OUTSIDE THE SITE OR POSTS OF USER
            CONTENT. Your correspondence or business dealings with, or
            participation in promotions of, advertisers or partners found on or
            through the Site, including payment and delivery of related goods or
            services, and any other terms, conditions, warranties, or
            representations associated with such dealings, are solely between
            you and such advertiser or partner. You agree that we are not
            responsible or liable for any loss or damage of any sort incurred as
            the result of any such dealings or as the result of the presence of
            such advertisers or links to third-party web sites or resources on
            the Site. 12.2     Relationship. At all times, you and VEROHIVE are
            independent contractors, and are not the agents or representatives
            of the other. These Terms are not intended to create a joint
            venture, partnership, or franchise relationship between the
            parties. Non- parties do not benefit from and cannot enforce these
            Terms. There are no third-party beneficiaries to these Terms. You
            must not represent to anyone that you are an agent of VEROHIVE or
            are otherwise authorized to bind or commit VEROHIVE in any way
            without VEROHIVE’s prior written authorization. 12.3     EXPORT
            RESTRICTIONS. You acknowledge that the Services, or portion thereof
            may be subject to the export control laws of the United States and
            other applicable country export control and trade sanctions laws
            (“Export Control and Sanctions Laws”). You and your End Users may
            not access, use, export, re-export, divert, transfer or disclose any
            portion of the Services or any related technical information or
            materials, directly or indirectly, in violation of any applicable
            export control or trade sanctions law or regulation. You represent
            and warrant that (i) You and your End Users are not citizens of, or
            located within, a country or territory that is subject to U.S. trade
            sanctions or other significant trade restrictions (including without
            limitation Cuba, Iran, North Korea, Syria, and the Crimea) and that
            you and your End Users will not access or use the Services, or
            export, re-export, divert, or transfer the Services, in or to such
            countries or territories; (ii) You and your End Users are not
            identified on any U.S. government restricted party lists (including
            without limitation the U.S. Treasury Department’s List of Specially
            Designated Nationals and Blocked Persons and Foreign Sanctions
            Evaders List, the U.S. Department of Commerce’s Denied Parties List,
            Entity List, and Unverified List, and the U.S. Department of State
            proliferation-related lists); and (iii) that no Content created or
            submitted by you or your End Users is subject to any restriction on
            disclosure, transfer, download, export or re-export under the Export
            Control Laws. You are solely responsible for complying with the
            Export Control Laws and monitoring them for any modifications. 12.4
            NO HIGH RISK USE. The Services are not designed or licensed for use
            in hazardous environments requiring fail-safe controls, including
            without limitation operation of nuclear facilities, aircraft
            navigation/communication systems, air traffic control, and life
            support or weapons systems. The Services shall not be used for or in
            any HIGH RISK environment.  12.5     Assignability. You may not
            assign your rights or obligations under these Terms without
            VEROHIVE’s prior written consent. If consent is given, these Terms
            will bind your successors and assigns. Any attempt by you to
            transfer your rights, duties, or obligations under these Terms
            except as expressly provided in these Terms is void. VEROHIVE may
            freely assign its rights, duties, and obligations under these Terms.
            12.6      Notices. Except as otherwise permitted by these Terms, any
            notice required or permitted to be given in connection with the
            VEROHIVE Services will be effective only if it is in writing and
            sent using: (a) VEROHIVE Services; (b) by certified or registered
            mail; or (c) insured courier, to the appropriate party at the
            address set forth in Customer’s registration information or on the
            Site for VEROHIVE, with a copy, in the case of VEROHIVE, to
            privacypolicytos at verohive.com. Customer or VEROHIVE may change
            its address for receipt of notice by notice to the other party in
            accordance with this Section 12. Notices are deemed given upon
            receipt if delivered using VEROHIVE Services, two (2) business days
            following the date of mailing, or one (1) business day following
            delivery to a courier. 12.7      Force Majeure. Except for any
            payment obligations, neither you nor VEROHIVE will be liable for
            failure to perform any obligation under these Terms to the extent
            such failure is caused by a force majeure event (including acts of
            God, natural disasters, war, civil disturbance, action by
            governmental entity, strike, and other causes beyond the party’s
            reasonable control). The party affected by the force majeure event
            will provide notice to the other party within a commercially
            reasonable time and will use commercially reasonable efforts to
            resume performance as soon as practicable. Obligations not performed
            due to a force majeure event will be performed as soon as reasonably
            possible when the force majeure event concludes. 12.8 INJUNCTIVE
            RELIEF. You acknowledge that any use of the Services contrary to
            this Agreement, or any transfer, sublicensing, copying or disclosure
            of technical information or materials related to the Services, may
            cause irreparable injury to VEROHIVE, its Affiliates, suppliers and
            any other party authorized by VEROHIVE to resell, distribute, or
            promote the Services (&quot;Resellers&quot;), and under such
            circumstances VEROHIVE, its Affiliates, suppliers and Resellers will
            be entitled to equitable relief, without posting bond or other
            security, including, but not limited to, preliminary and permanent
            injunctive relief. 12.9     Mandatory Arbitration, Waiver of Class
            Actions Applicable to Customers.  PLEASE READ THIS SECTION
            CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO
            FILE A LAWSUIT IN COURT. 12.7.1 You agree that these Terms affect
            interstate commerce and that the Federal Arbitration Act governs the
            interpretation and enforcement of these arbitration provisions. This
            Section 12.7 is intended to be interpreted broadly and governs any
            and all disputes between us including but not limited to claims
            arising out of or relating to any aspect of the relationship between
            us, whether based in contract, tort, statute, fraud,
            misrepresentation, or any other legal theory; claims that arose
            before these Terms or any prior; and claims that may arise after the
            termination of these Terms. The only disputes excluded from this
            broad prohibition are the litigation of certain intellectual
            property as provided below. 12.7.2 Initial Dispute Resolution. Most
            disputes can be resolved without resort to arbitration. If you have
            any dispute with us, you agree that before taking any formal action
            you will contact us at privacypolicytos at verohive.com provide a
            brief, written description of the dispute and your contact
            information (including your username, if your dispute relates to an
            Account). Except for intellectual property, you and VEROHIVE agree
            to use their reasonable efforts to settle any dispute, claim,
            question, or disagreement directly through consultation with
            VEROHIVE, and good faith negotiations shall be a condition to either
            party initiating a lawsuit or arbitration. 12.7.3 Arbitrator’s
            Powers. The arbitrator, and not any federal, state, or local court
            or agency, shall have exclusive authority to resolve all disputes
            arising out of or relating to the interpretation, applicability,
            enforceability, or formation of these Terms, including but not
            limited to any claim that all or any part of these Terms is void or
            voidable, whether a claim is subject to arbitration or the question
            of waiver by litigation conduct. The arbitrator shall be empowered
            to grant whatever relief would be available in a court under law or
            in equity. The arbitrator&#39;s award shall be written and shall be
            binding on the parties and may be entered as a judgment in any court
            of competent jurisdiction. 12.7.4 Filing a Demand. To start an
            arbitration, you must do the following: (a) Write a Demand for
            Arbitration that includes a description of the claim and the amount
            of damages you seek to recover (you may find a copy of a Demand for
            Arbitration at www.jamsadr.com); (b) Send three copies of the Demand
            for Arbitration, plus the appropriate filing fee, to JAMS, Two
            Embarcadero Center, Suite 1500, San Francisco California 94111; and
            (c) Send one copy of the Demand for Arbitration to us
            at:privacypolicytos at verohive.com. 12.7.5 No Jury Trial. The
            parties understand that, absent this mandatory arbitration section,
            they would have the right to sue in court and have a jury trial.
            They further understand that, in some instances, the costs of
            arbitration could exceed the costs of litigation and the right to
            discovery may be more limited in arbitration than in court. 12.7.6
            Venue. Arbitration shall be initiated and take place in Delaware,
            United States, and you and VEROHIVE agree to submit to the personal
            jurisdiction of any federal or state court in Delaware in order to
            compel arbitration, stay proceedings pending arbitration, or to
            confirm, modify, vacate, or enter judgment on the award entered by
            the arbitrator. 12.7.7 Class Action Waiver. The parties further
            agree that the arbitration shall be conducted in the party’s
            respective individual capacities only and not as a class action or
            other representative action, and the parties expressly waive their
            right to file a class action or seek relief on a class basis. YOU
            AND VEROHIVE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY
            IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS
            MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. If any
            court or arbitrator determines that the class action waiver set
            forth in this paragraph is void or unenforceable for any reason or
            that an arbitration can proceed on a class basis, then the
            arbitration provisions set forth above shall be deemed null and void
            in their entirety and the parties shall be deemed to have not agreed
            to arbitrate disputes. 12.7.8 Exception: Litigation of Intellectual
            Property. Notwithstanding the parties&#39; decision to resolve all
            disputes through arbitration, either party may bring enforcement
            actions, validity determinations, or claims arising from or relating
            to theft, piracy, or unauthorized use of intellectual property in
            any state or federal court with jurisdiction or in the U.S. Patent
            and Trademark Office to protect its intellectual property rights
            (“intellectual property rights” means patents, copyrights, moral
            rights, trademarks, and trade secrets, but not privacy or publicity
            rights). 12.7.9 Survival. This Mandatory Arbitration, Waiver of
            Class Actions section shall survive any termination of your use of
            the Site. 12.8     Entire Terms. These Terms, which include the
            language and paragraphs preceding Section 1, are the final,
            complete, and exclusive expression of the agreement between you and
            VEROHIVE regarding the VEROHIVE Services provided under these
            Terms. These Terms supersede and the parties disclaim any reliance
            on previous oral and written communications (including any
            confidentiality agreements pertaining to the VEROHIVE Services under
            these Terms) with respect to the subject matter hereof and apply to
            the exclusion of any other terms that you seek to impose or
            incorporate, or which are implied by trade, custom, practice or
            course of dealing. VEROHIVE hereby rejects any additional or
            conflicting terms appearing in a purchase order or any other
            ordering materials submitted by Customer and conditions assent
            solely based on these Terms and conditions of these Terms as offered
            by VEROHIVE. Except as explicitly permitted in these Terms, no
            modification or amendment of these Terms shall be effective unless
            it is in writing and signed by an authorized agent of the party
            against whom the modification or amendment is being asserted. In the
            event of an inconsistency or conflict, the order of precedence in
            descending order of control is as follows: (a) the Subscription
            Plan; (b) any attachments or appendix(ices) to the Service
            Schedule(s); (c) the Service Schedule; and (d) these Terms. 
            12.9   Governing Law &amp; Venue. These Terms will be interpreted,
            construed, and enforced in all respects in accordance with the local
            laws of the State of Delaware, U.S.A., without reference to its
            choice of law rules to the contrary. For purposes of determining the
            governing law, you and VEROHIVE agree that VEROHIVE is the proponent
            of these Terms. Notwithstanding Customer’s and VEROHIVE’s agreement
            to mandatory arbitration, either party may seek any interim or
            preliminary injunctive relief from a court of competent jurisdiction
            in Delaware, as necessary to protect the party&#39;s rights or
            property pending the completion of arbitration. Customer and
            VEROHIVE submit to the exclusive jurisdiction of, and venue in, any
            federal or state court of competent jurisdiction located in
            Delaware, U.S.A. 12.10   Language and Translations. VEROHIVE may
            provide translations of these Terms or other terms or
            policies. Translations are provided for informational purposes and
            if there is an inconsistency or conflict between a translation and
            the English version, the English version will control.
            12.11 Waiver. The waiver by either you or VEROHIVE of any breach of
            any provision of these Terms does not waive any other breach. The
            failure of any party to these Terms to insist on strict performance
            of any covenant or obligation in accordance with these Terms will
            not be a waiver of such party’s right to demand strict compliance in
            the future, nor will the same be construed as a novation of these
            Terms. 12.12   Severability. If any part of these Terms is found to
            be illegal, unenforceable, or invalid, the remaining portions of
            these Terms will remain in full force and effect. If any material
            limitation or restriction on the grant of any license to you under
            these Terms is found to be illegal, unenforceable, or invalid, the
            license will immediately terminate. 12.13 General Provisions. This
            Agreement embodies the entire understanding and agreement between
            the Parties respecting the subject matter of this Agreement and
            supersedes any and all prior understandings and agreements between
            the Parties respecting such subject matter, except that if you or
            your company have executed a separate written agreement or you have
            signed an order form referencing a separate agreement governing your
            use of the Services, then such agreement shall control to the extent
            that any provision of this Agreement conflicts with the terms of
            such agreement. VEROHIVE may elect to change or supplement the terms
            of this Agreement from time to time at its sole discretion. VEROHIVE
            will exercise commercially reasonable business efforts to provide
            notice to you of any material changes to this Agreement. Within ten
            (10) business days of posting changes to this Agreement (or ten (10)
            business days from the date of notice, if such is provided), they
            will be binding on you. If you do not agree with the changes, You
            should discontinue using the Services. If you continue using the
            Services after such ten- business-day period, You will be deemed to
            have accepted the changes to the terms of this Agreement. In order
            to participate in certain Services, You may be notified that you are
            required to download software and/or agree to additional terms and
            conditions. Unless expressly set forth in such additional terms and
            conditions, those additional terms are hereby incorporated into this
            Agreement. This Agreement has been prepared in the English Language
            and such version shall be controlling in all respects and any
            non-English version of this Agreement is solely for accommodation
            purposes.
          </p>
        </div>

        <div></div>

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
              <img src={copyrightlogo} style={{ width: "20px" }}></img>Megahoot.
              All Rights Reserved
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
          <img src={copyrightlogo} style={{ width: "20px" }}></img>Megahoot. All
          Rights Reserved
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

export default TermsCondition;
