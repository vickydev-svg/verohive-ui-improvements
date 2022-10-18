import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelanding.png';


class Home extends Component {
  register = (email, password) => {
    console.log(email, password);
  };
  render() {
    return (
      <div className="landing-box">
        <img src={logo} className="landing-logo"></img><h4 style={{color:'white',marginLeft:'45%'}}>Beta Version 1.0</h4>
        <div className="landing-page-text">
          <>VEROHive is the secure collaboration platform for Businesses, for Education, for Everyone!
          Secure video and audio conferencing solutions and so much more
          Sign Up for FREE and start your VEROHive experience.</>
          <div className="landing-container">
            <button className="landing-btn-container">
              <Link to="/login">Sign In</Link>
            </button>


            <button className="landing-btn-container">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>
        </div>


      </div>
    );
  }
}

export default Home;
