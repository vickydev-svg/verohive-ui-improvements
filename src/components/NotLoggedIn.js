import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelogo.png';
import API from './axios';
import {login} from '../auth'
class NotLoggedIn extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: ""
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  sayHello = () => {
    // console.log("Hello")
    // fetch("/logout", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },

    // })
    //   .then((res) => {
        localStorage.setItem('user',"test")
        this.props.history.push('/login', {
            joinid:  window.location.href.substr(36)
          })
          window.location.reload()
    //     console.log("ff", res)
    //   })
    //   .catch(err => console.log(err))
  }
  async onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (

      !this.refs.username.value ||
      !this.refs.password.value
    ) {
      return alert("Fill all the required fields");
    }
    // this.setState({ isSubmitting: true }
    await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((res) => {
        console.log("ff", window.location.href.substr(29))
        // localStorage.setItem('user',username)
        if (res.url == "https://verohive.org/login") {
          alert("invalid credentials")
        }
        else {
          localStorage.setItem('user',username)
          if(window.location.href=="https://verohive.org/login"||window.location.href=="https://verohive.org/")
          {
         
          this.props.history.push('/private', {
            username: username
          })
        }
        else
        {
          console.log("ss",this.props.history, window.location.href.substr(36))
          this.props.history.push({
            pathname: '/videochat',
            search: "?" + new URLSearchParams({ id: window.location.href.substr(36) }).toString(),
            state: {
              type: 'client',
              room_code: this.state.room_code,
              username: username
            }
          })
        }
        }
        //  
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
          {/* <div className="header-2"><div ></div></div> */}
        <div className="header">
        <img src={logo} className='logo-vero'></img><h4 style={{color:'white',marginLeft:'45%'}}>Beta Version 1.0</h4>
        </div>
         
        <div style={{fontWeight:'lighter',fontSize:'2rem',color:'white'}}>Please Login to enter the meeting room</div><br></br><br></br><br></br><br></br>

        <form className="form-login"><br></br>
         
          {/* <div className="username" >
             */}
              {/* <i className="fa fa-user-circle icon  iconinput"></i> */}
{/*              
              <input className="input"
                type="text"
                name="username"
                placeholder="Username"
                ref="username"
                onChange={this.onChange}
              />

             </div> */}
          {/* <div className="password">
              <h4> */}
                {/* Password: <span style={{ color: "red" }}>*</span> */}
              {/* </h4> */}
              {/* <i className="fa fa-key icon iconinput"></i> */}
              {/* <div ><div  ><Link to="/forget"><>Forgot password? </></Link></div> </div>
             
              <input className="input"
                type="password"
                name="password"
                placeholder="Password"
                ref="password"
                onChange={this.onChange}
              />
            </div> */}

          {/* <i className="fa fa-user-circle-o icon  iconinputlogin"></i>
          <input type="text" ref="username" name="username" onChange={this.onChange} placeholder="Username" className="input-field" /> */}
          
          
          {/* <i className="fa fa-key icon iconinputlogin"></i>
          <input type="password" ref="password" name="password" onChange={this.onChange} placeholder="Password" className="input-field" /> */}
          
          
          
          <div className="submit">
            {/* <input type="submit"  value="Login" className="btn-login" /> */}
            <button className="btn-login"
           
            onClick={() => this.sayHello()}>Login</button>
            {/* <div style={{fontSize:'1.3rem',fontWeight:'lighter',color:'white'}}><Link to="/login"><> Login</></Link></div> */}
            {/* <div style={{fontSize:'1.3rem',fontWeight:'lighter',color:'white'}}>Don't have account?<Link to="/register"><> Sign Up here </></Link></div> */}
           
          </div>
          {/* <div className="message">
            {this.state.isSubmitting ? "Checking details...." : ""}
          </div>
          <div className="errorMessage">{this.state.errorMessage}</div> */}

        </form>
<div className='footer'>(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default NotLoggedIn;
