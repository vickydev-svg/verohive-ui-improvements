import React, { Component } from "react";
import io from 'socket.io-client'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { use } from "passport";
import Linkify from 'react-linkify';
import * as Api from './api';

import { Overlay } from 'react-portal-overlay';



class Messanger extends Component {
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
        createroomalert: ""
    };
    componentDidMount() {

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

                })

            })
            .catch(err => console.log(err))
       
    }

    sayHello1 = () => {
        this.props.history.push('/profile', {
            username: this.state.id
        })
    }


    socialProfile = () => {
        this.props.history.push('/socialProfile', {
            username: this.state.id
        })
    }

    openModal = () => {

        this.setState({
            open: true

        })
    }
    recording = () => {
        this.props.history.push('/recording', {
            username: this.state.id
        })
    }

    Home = () => {
        this.props.history.push('/private', {
            username: this.state.id
        })
    }
    contact = () => {
        this.props.history.push('/contact', {
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
                this.props.history.push('/login')
                console.log("ff", res)
            })
            .catch(err => console.log(err))
    }

    renderLoading() {
        return <div>Loading...</div>;
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
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
    // async onSubmit(e) {
    //   e.preventDefault();
    //   const { firstName, lastName, username, password, confirmpassword, bio, city, country, links, Facebook, FacebookLive, Youtube, YoutubeLive, Instagram, LinkedIn, Twitter, Weblink1, Weblink2, organization, email, age, checked, checked1 } = this.state;
    //   var rand1 = Math.floor((Math.random() * 100) + 54);
    //   var rand2 = Math.floor((Math.random() * 100) + 54);
    //   var rand = rand1.toString() + rand2.toString();

    //   if (
    //     !this.refs.firstName.value ||
    //     !this.refs.lastName.value ||
    //     !this.refs.username.value
    //     // !this.refs.email.value
    //   ) {
    //     return alert("Fill all the required boxes");
    //   }

    //   else {
    //     await fetch("/updateprofile", {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         organization,
    //         links,
    //         bio,
    //         city,
    //         country,
    //         username,
    //         firstName,
    //         lastName,
    //         Facebook,
    //         FacebookLive,
    //         Twitter,
    //         LinkedIn,
    //         Youtube,
    //         YoutubeLive,
    //         Instagram,
    //         Weblink1,
    //         Weblink2,
    //         email,

    //       })
    //     })
    //       .then(() => {
    //         alert("Profile successfully updated")
    //       })
    //       .catch(err => console.log(err))
    //   }
    // }

    joinRoom = () => {
        if (
            !this.state.room_code) {
            return this.setState({ enterroomcode: "Enter the room Id" })
            // return alert("Enter the room code");
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
            return this.setState({ createroomalert: "Enter the room name" })
            // return alert("Create the room name");
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

        const openMenu = () => {

            document.querySelector(".sidebar").classList.add("open");
        };

        const closeMenu = () => {

            document.querySelector(".sidebar").classList.remove("open");
        }



        const componentDecorator = (href, text, key) => (
            <a href={href} key={key} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        );
        return (
            <div>





            </div>
        );
    }
}

export default Messanger;

