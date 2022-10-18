import React, { Component } from "react";

import logo from "./verohivelogo.png";
import gmail from "./gmail.png";
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

import TermsCondition from "./TermsCondition";

class Minilanding extends Component {
  componentDidMount() {
    var mylocalvar = parseInt(window.location.search.substr(1));
    window.onload = () => {
      window.location = "verohive://id" + mylocalvar;
    };
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
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="brand"></div>
          <img src={logo} className="logo-vero"></img>
          <h4 style={{ color: "white", marginRight: "45%" }}>
          V4.1.1
          </h4>
        </div>

        <div className="wrapper" style={{ textAlign: "center" }}>
          <p>When Prompted Please Allow The VEROHive Application to Open</p>
          <br></br> <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p>or</p>
          <p>
            If You Do Not Have The VEROHive Mini App Please Download Here to
            Join the Meeting
          </p>
          <button
            onClick={() => {
              window.location = "https://verohive.net/desktop/VEROHiveMini.exe";
            }}
            className="btn-login"
          >
            Download it
          </button>
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
    );
  }
}

export default Minilanding;
