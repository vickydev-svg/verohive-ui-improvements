import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelogo.png';
import API from './axios';
import {login} from '../auth'
var x=0
class AdminUpdate extends Component {
  state = {
    username: "",
    password: "",
    id:"",
    isSubmitting: false,
    errorMessage: "",
    joinid:null
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  componentDidMount()
  {
    // window.location.reload()
    this.setState({
      id:this.props.location.state.id
    })
  
  }
  
  async onSubmit(e) {
    e.preventDefault();
    const { username, password,id } = this.state;
    if (

      !this.refs.username.value ||
      !this.refs.password.value
    ) {
      return alert("Fill all the required fields");
    }
    // this.setState({ isSubmitting: true }
    await fetch("/adminupdate", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        id
      })
    })
      .then((res) => {
       
        alert("Updated Successfully")
        this.props.history.push("/admindashboard")
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
         
        <div style={{fontWeight:'lighter',fontSize:'2rem',color:'white'}}> Admin Update</div><br></br><br></br><br></br><br></br>

        <form className="form-login"

          onSubmit={e => {
            this.onSubmit(e);
          }}
        ><br></br>
         
          <div className="username" >
            
              {/* <i className="fa fa-user-circle icon  iconinput"></i> */}
             
              {/* <input className="input"
                type="text"
                name="username"
                placeholder="verified"
                ref="username"
                onChange={this.onChange}
              /> */}

             </div>
             <div className="username" >
            
            {/* <i className="fa fa-user-circle icon  iconinput"></i> */}
           <h4>Verified</h4>
            <input className="input"
              type="text"
              name="username"
              placeholder="verified"
              ref="username"
              onChange={this.onChange}
            />

           </div>
          <div className="password">
              <h4>
                User Type: <span style={{ color: "red" }}>*</span>
              </h4>
              {/* <i className="fa fa-key icon iconinput"></i> */}
              {/* <div ><div  ><Link to="/forget"><>Forgot password? </></Link></div> </div> */}
             
              <input className="input"
                type="text"
                name="password"
                placeholder="user type"
                ref="password"
                onChange={this.onChange}
              />
            </div>

          {/* <i className="fa fa-user-circle-o icon  iconinputlogin"></i>
          <input type="text" ref="username" name="username" onChange={this.onChange} placeholder="Username" className="input-field" /> */}
          
          
          {/* <i className="fa fa-key icon iconinputlogin"></i>
          <input type="password" ref="password" name="password" onChange={this.onChange} placeholder="Password" className="input-field" /> */}
          
          
          
          <div className="submit">
            <input type="submit" value="Update" className="btn-login" />

            {/* <div style={{fontSize:'1.3rem',fontWeight:'lighter',color:'white'}}>Don't have account?<Link to="/register"><> Sign Up here </></Link></div> */}
           
          </div>
          <div className="message">
            {this.state.isSubmitting ? "Checking details...." : ""}
          </div>
          <div className="errorMessage">{this.state.errorMessage}</div>

        </form>
<div className='footer'>(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default AdminUpdate;
