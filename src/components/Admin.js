import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelogo.png';
import API from './axios';
import { login } from '../auth'
var x = 0
class Admin extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: "",
    joinid: null
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    // window.location.reload()
    if (this.props.location.state != undefined) {
      // x++;
      // if(x==1)
      // {
      //   window.location.reload()
      // }

      var joinid = this.props.location.state.joinid
      this.setState({
        joinid: joinid
      })
    }
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
    await fetch("/adminlogin", {
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
        // console.log("ff", window.location.href.substr(29))
        // localStorage.setItem('user',username)
        if (res.url == "https://verohive.org/eRDRVJMnbc3qExHQE2sn") {
          alert("invalid credentials")
        }
        else {
          //   localStorage.setItem('user',username)
          if (this.state.joinid == null) {

            this.props.history.push('/admindashboardeRDRVJMnbc3qExHQE2sn', {
              username: username
            })
            //   window.location.reload()
          }
          else {
            // console.log("ss",this.props.history, window.location.href.substr(36))
            //   // this.props.history.pop()
            //   this.props.history.replace({
            //     pathname: '/videochat',
            //     search: "?" + new URLSearchParams({ id:this.state.joinid }).toString(),
            //     state: {
            //       type: 'client',
            //       room_code: this.state.joinid,
            //       username: username
            //     }
            //   })
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
          <img src={logo} className='logo-vero'></img>
        </div>

        <div style={{ fontWeight: 'lighter', fontSize: '2rem', color: 'white' }}>Admin Login</div><br></br><br></br><br></br><br></br>

        <form className="form-login"

          onSubmit={e => {
            this.onSubmit(e);
          }}
        ><br></br>

          <div className="username" >

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
            {/* <div ><div  ><Link to="/forget"><>Forgot password? </></Link></div> </div> */}

            <input className="input"
              type="password"
              name="password"
              placeholder="Password"
              ref="password"
              onChange={this.onChange}
            />
          </div>

          {/* <i className="fa fa-user-circle-o icon  iconinputlogin"></i>
          <input type="text" ref="username" name="username" onChange={this.onChange} placeholder="Username" className="input-field" /> */}


          {/* <i className="fa fa-key icon iconinputlogin"></i>
          <input type="password" ref="password" name="password" onChange={this.onChange} placeholder="Password" className="input-field" /> */}



          <div className="submit">
            <input type="submit" value="Sign In" className="btn-login" />

            {/* <div style={{fontSize:'1.3rem',fontWeight:'lighter',color:'white'}}>Don't have account?<Link to="/register"><> Sign Up here </></Link></div> */}

          </div>
          {/* <div className="message">
            {this.state.isSubmitting ? "Checking details...." : ""}
          </div> */}
          {/* <div className="errorMessage">{this.state.errorMessage}</div> */}

        </form>
        <div className='footer'>(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default Admin;
