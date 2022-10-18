import React, { Component } from "react";

import logo from './verohivelogo.png';
import * as Api from './api'
import Linkify from 'react-linkify';



class Home1 extends Component {
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
    
  };



  componentDidMount() {
    // const {username}=this.props;
    console.log("dd", this.props.location.state.username)
    var username = this.props.location.state.username
    this.setState({
      id: this.props.location.state.username
    })

    fetch("/getuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,

      })


    })
      .then(response => response.json())
      .then((res) => {
        console.log("ff", res)
        this.setState({
          privatekey: res.password.substr(0, 10),
          firstname: res.firstName,
          lastname: res.lastName,
          email: res.email,
          organization: res.organization,
          bio: res.bio,
          city: res.city,
          country: res.country,
          links: res.links,
          image1:res.ProfilePic

        })

      })
      .catch(err => console.log(err))


  }

  recording = () => {
    this.props.history.push('/recording', {
      username: this.state.id
    })
  }

  sayHello1 = () => {
    this.props.history.push('/profile', {
      username: this.state.id
    })
  }
 publicProfile = () => {
    this.props.history.push('/publicProfile', {
      username: this.state.id
    })
  }
  sayHello = () => {
    console.log("Hello")
    fetch("/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },

    })
      .then((res) => {
        localStorage.removeItem('user')
        this.props.history.push('/login')
        window.location.reload()
        console.log("ff", res)
      })
      .catch(err => console.log(err))
  }
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  joinRoom = () => {
    if (
      !this.state.room_code) {
      return alert("Enter the room code");
    }
    // API.get('/rooms/join/'+this.state.room_code, {

    // }).then((res) => {
    // 	console.log("dd",res)
    // 	// this.props.flashHandler('success', 'Room Joined!');
    // 	this.setState({ room_name: res.data.data.room_name, type: 'client' });
    this.props.history.push({
      pathname: '/videochat',
      search: "?" + new URLSearchParams({ id: this.state.room_code }).toString(),
      state: {
        type: 'client',
        room_code: this.state.room_code,
        username: this.state.id
      }
    })
    // }).catch((error) => {
    // 	this.props.flashHandler('error', 'Room is full!');
    // });
  }
  createRoom = () => {
    if (
      !this.state.room_name) {
      return alert("Create the room name");
    }

    var rand, mailOptions, host, link;
    var rand1 = Math.floor((Math.random() * 100) + 54);
    var rand2 = Math.floor((Math.random() * 100) + 54);
    var rand3 = Math.floor((Math.random() * 100) + 54);

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
    this.props.history.push({
      pathname: '/videochat',
      search: "?" + new URLSearchParams({ id: rand }).toString(),
      state: {
        type: 'host',
        room_code: rand,
        username: this.state.id
      }
      // })
      // this.props.history.push('/room', {
      // 	type: 'host',
      // 	room_code: res.data.data.roomCode
      //   });
    }).catch((error) => {
      console.log(error);
      this.props.flashHandler('error', 'An Error occured');
    });
  }
  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      [field]: value
    });
  }
  Upload1_To_AWS_S3 = () => {
    var that = this;
    const { email } = this.state;
    console.log("Dddd", this.state.image)
    let formData = new FormData();
    formData.append("photo", this.state.image);
    try {
      const res = Api.uploadImageToAwsS3(formData)
      res.then(function (value) {
        console.log(value); // "Success"
        // that.setState({
        //   image: value
        // })
        fetch("/updateProfilePic", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
             email,
             value
  
          })
        })
  
          .then(() => {
  
           alert("profile pic changed successfully")
           that.setState({
            image1: value
          })
         
          })
          .catch(err => console.log(err))
      })



    } catch (e) {

    }

  }

  async onSubmit(e) {
    e.preventDefault();
    const { username } = this.state;

    this.props.history.push({
      pathname: '/videochat',
      search: "?" + new URLSearchParams({ id: username }).toString(),
      state: { username: this.state.id }
    })




  }


  render() {

    // const openMenu = () => {

    //   document.querySelector(".sidebar").classList.add("open");
    // };

    // const closeMenu = () => {

    //   document.querySelector(".sidebar").classList.remove("open");
    // }

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>


    );

    return (
      <div className="home-main">
        <div className="header">
          <div className="brand">
           


          </div>
          <img src={logo} className='logo-vero'></img>
        </div>


      




        <div>

        </div>
        <div  style={{ position: "absolute",
  padding: "1%",
 right: "30%",
 
  top: "8%",
  width: "55%",
  height: "130vh"}}>
        <div style={{ width: "100px", height: "90px", backgroundColor: "#034063", marginLeft:- '10px' }}>
              
         { this.state.image1 ? <img src={this.state.image1} style={{ width: "100px", height: "70px"}}  /> : (null) }
 
                 </div>
</div>
        <form
       
        >




          <div className="profile-container">

            <ul>
              <div className="profile-pic">
               
                

                <ul>
                  <h2><li>{this.state.firstname} {this.state.lastname}</li></h2>
                  <ul style={{ marginTop: '-15px', marginLeft: '-30px', textAlign: 'start' }}>
                    <li>Username:{this.state.id}</li>
                    <li>private key: {this.state.privatekey}</li>
                    <li>Organization: {this.state.organization}</li>

                    <li>Country: {this.state.country}</li>
                    <li>City: {this.state.city}</li>
                   

                  </ul>
                </ul>
              </div>
              <div className="profile-description">
                <ul>
                
                  <li>Email :{this.state.email}</li>
                 

                </ul>

              </div>


            </ul>
          </div>


        </form>
        <div className='footer'>(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default Home1;