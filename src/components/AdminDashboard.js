import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './verohivelogo.png';
import API from './axios';
import {login} from '../auth'
import { Table} from 'react-bootstrap';
var x=0
class AdminDashboard extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: "",
    users:"",
    joinid:null
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }
  tostring=(value)=>{
    return value.tostring()
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  componentDidMount()
  {
    // window.location.reload()
   
    fetch("/findAllUsers", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
       
  
  
      })
        .then(response => response.json())
        .then((res) => {
          console.log("ff", res)
          this.setState({
              users:res
          })
        //   this.setState({
        //     privatekey: res.password.substr(0, 10),
        //     firstname: res.firstName,
        //     lastname: res.lastName,
        //     email: res.email,
        //     organization: res.organization,
        //     bio: res.bio,
        //     city: res.city,
        //     country: res.country,
        //     links: res.links,
        //     image1:res.ProfilePic
  
        //   })
  
        })
        .catch(err => console.log(err))
  
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
          if(this.state.joinid==null)
          {
         
          this.props.history.push('/private', {
            username: username
          })
          window.location.reload()
        }
        else
        {
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
         
        <div style={{fontWeight:'lighter',fontSize:'2rem',color:'white'}}>Admin Dashboard</div><br></br><br></br><br></br><br></br>
        {/* <div style={{backgroundColor:"white"}}> */}
        <Table striped bordered hover style={{position:'absolute',top:'100px',left:'50px',backgroundColor:'black',overflowY:'auto',maxHeight:'80vh'}}>
  <thead>
    <tr>
   
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Terms and Conditions</th>
      <th>Email</th>
      <th>Age</th>
      <th>Verified</th>
      <th>userType</th>
      <th>Update</th>
      
    </tr>
    
    
  </thead>


  {this.state.users && this.state.users.length > 0
            ? this.state.users.map((value, index) => {
              if (index <100) {
                return (
                    <tbody>
                    <tr>
                      <td>{value.firstName}</td>
                      <td>{value.lastName}</td>
                      <td>{value.username}</td>
                      <td>{value.termsandconditions.toString()}</td>
                <td>{value.email}</td>
                <td>{value.age.toString()}</td>
                <td>{value.verified}</td>
                <td>{value.userType}</td>
                <td><button onClick={()=>this.props.history.push('/adminupdate',{
                    id:value.email
                })}>Edit</button></td>
                    </tr>
                   
                  </tbody>
                        ) 
                   
                    

                 

                
              }
            })
            : null}
  
</Table>
{/* </div> */}
        {/* <form className="form-login"

          onSubmit={e => {
            this.onSubmit(e);
          }}
        ><br></br>
         
          <div className="username" >
            
              {/* <i className="fa fa-user-circle icon  iconinput"></i> */}
             
              {/* <input className="input"
                type="text"
                name="username"
                placeholder="Username"
                ref="username"
                onChange={this.onChange}
              />

             </div>
          <div className="password">
              <h4> */}
                {/* Password: <span style={{ color: "red" }}>*</span> */}
              {/* </h4> */}
              {/* <i className="fa fa-key icon iconinput"></i> */}
              {/* <div ><div  ><Link to="/forget"><>Forgot password? </></Link></div> </div> */}
             
              {/* <input className="input"
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
          
          
          
          {/* <div className="submit">
            <input type="submit" value="Sign In" className="btn-login" /> */}

            {/* <div style={{fontSize:'1.3rem',fontWeight:'lighter',color:'white'}}>Don't have account?<Link to="/register"><> Sign Up here </></Link></div> */}
           
          {/* </div>
          <div className="message">
            {this.state.isSubmitting ? "Checking details...." : ""}
          </div>
          <div className="errorMessage">{this.state.errorMessage}</div> */}
{/* 
        </form> */} 
<div className='footer'>(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default AdminDashboard;
