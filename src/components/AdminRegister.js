import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelogo.png';
import API from './axios';
import Axios from 'axios';
import Home from './Home';
class AdminRegister extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    age: "",
    code: "",
    isRegistering: false,
    checked: false,
    checked1:false,
    verified: true
  };
  componentDidMount() {
    console.log(this.props.history);
  }
  renderLoading() {
    return <div>Loading...</div>;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheck = () => {
    console.log("checked")
    this.setState({ checked: !this.state.checked });
    if (this.state.checked == false) {
      alert("You need to verify before using VEROHive")
      const enteredemail = prompt("Enter email address of your parent")
      var rand, mailOptions, host, link;
      var rand1 = Math.floor((Math.random() * 100) + 54);
      var rand2 = Math.floor((Math.random() * 100) + 54);
      var rand3 = Math.floor((Math.random() * 100) + 54);
      rand = rand1.toString() + rand2.toString();

      this.setState({
        code: rand
      })



      fetch("/nodemailer", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          To: enteredemail,
          subject: "Please verify email",
          text: "Your Verification Code is" + rand,
          html: `<img src="./verohivelogo.png" style="width: 30%;">
          <h1 style="color: #5b5b5b;">Welcome to VEROHive</h1>
          <h3 style="color: #757575;">Please verify your email address by using the OTP below</h3>
         <p>${rand}</p>
          <h4 style="color: #757575;">After verification, you will be able to start using VEROHive</h4><br><br>
          
          
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">VEROHive Team</h4>"
          `

        })
      })

        .then(() => {

          console.log("ddd")
          this.verify()
        })
        .catch(err => console.log(err))
    }
  }
  handleCheck1 = () => {
    console.log("checked")
    this.setState({ checked1: !this.state.checked1 });
   
    
  }
  verify = () => {
    const { firstName, lastName, username, password, email, age } = this.state;
    const enteredcode = prompt("Enter Verification code")
    if (enteredcode == this.state.code) {
      alert("Successfully Verified")
     
      fetch("/adminsignup", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          email,
          age
        })
      })
        .then(() => {
          this.props.history.push('/login')
        })
        .catch(err => console.log(err))
    }
    else {
      alert("Invalid code")
      this.setState({
        verified: false
      })
    }
  }
  async onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, username, password, confirmpassword, email, age,checked,checked1 } = this.state;
    var rand1 = Math.floor((Math.random() * 100) + 54);
    var rand2 = Math.floor((Math.random() * 100) + 54);
   var rand = rand1.toString() + rand2.toString();
    if (password != confirmpassword) {
      return alert("Password do not match");
    }
    else

      if (this.state.verified == false || this.state.checked == true) {
        return alert("Please Verify your email address");
      }
      else
        if (
          !this.refs.firstName.value ||
          !this.refs.lastName.value ||
          !this.refs.username.value ||
          !this.refs.password.value ||
          !this.refs.email.value
        ) {
          return alert("Fill all the required boxes");
        }

        else {
         
          await fetch("/adminsignup", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              rand,
              firstName,
              lastName,
              username,
              password,
              email,
              checked,
              checked1
            })
          })
            .then(() => {
              this.props.history.push('/login')
            })
            .catch(err => console.log(err))
        }
  }
  render() {
    return (
      <div>

{/* <div className="header-2"><div ></div></div> */}
        <div className="header">
        <img src={logo} className='logo-vero'></img>
        </div>
       
        <div className="form-register" >
          <h3>ADMIN REGISTER</h3>
          <form
            onSubmit={e => {
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



            <div className="name">

              {/* <i className="fa fa-user icon iconinput"></i> */}
              <input className="input"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref="firstName"
                onChange={this.onChange}
              />
            </div>
            <div>
              <h4>
                {/* Last Name: <span style={{ color: "red" }}>*</span> */}
              </h4>
              {/* <i className="fa fa-user icon iconinput"></i> */}
              <input className="input"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref="lastName"
                onChange={this.onChange}
              />

            </div>
            <div className="username" >
              <h4>
                {/* Username: <span style={{ color: "red" }}>*</span> */}
              </h4>
              {/* <i className="fa fa-user-circle icon  iconinput"></i> */}
              <input className="input"
                type="text"
                name="username"
                placeholder="Username"
                ref="username"
                onChange={this.onChange}
              />
            </div>
            <div className="password">
              <h4>
                {/* Password: <span style={{ color: "red" }}>*</span> */}
              </h4>
              {/* <i className="fa fa-key icon iconinput"></i> */}
              <input className="input"
                type="password"
                name="password"
                placeholder="Password"
                ref="password"
                onChange={this.onChange}
              />
            </div>

            <div className="password">
              <h4>
                {/* Password: <span style={{ color: "red" }}>*</span> */}
              </h4>
              {/* <i className="fa fa-key icon iconinput "></i> */}
              <input className="input"
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                ref="confirmpassword"
                onChange={this.onChange}
              />
            </div>
            <div className="email">
              <h4>
                {/* Email: <span style={{ color: "red" }}>*</span> */}
              </h4>
              {/* <i className="fa fa-envelope icon iconinput" ></i> */}
              <input className="input"
                type="email"
                name="email"
                placeholder="Email"
                ref="email"
                onChange={this.onChange}
              />
            </div>
            {/* <div className="checkbox">
              <input type="checkbox" onChange={() => this.handleCheck1()} /><label>I agree to all Terms and conditions of VEROHive</label>
            </div>
            <div className="address">
              <div className="checkbox">
                <input type="checkbox" onChange={() => this.handleCheck()} defaultChecked={this.state.checked1} /><label>Check here if you are under 18 years old</label>

              </div> */}




              {/* <h4>
              Age: <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              type="text"
              name="age"
              placeholder="Age"
              ref="age"
              onChange={this.onChange}
            /> */}
            {/* </div> */}
           


            <div className="submit">
              <input type="submit" value="Submit" className="btn-signup" />
            </div>
            {/* <span> <Link to="/login"><h5>Already Registered? Sign In here </h5></Link></span><br></br> */}
          </form>
        </div>
        <div className='footer' >(c)VEROHive.All Rights Reserved</div>
      </div>
      
    );
  }
}
export default AdminRegister;
