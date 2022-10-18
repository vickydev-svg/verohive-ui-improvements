// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import ForgetPassword from "./components/ForgetPassword";
// import Dashboard from "./Home"
// import Video from "./Dashboard"
// import Profile from "./profile/userProfile"
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <>
//           <Route exact path="/" component={Login} />
//           <Route path="/register" component={Register} />
//           <Route path="/login" component={Login} />
//           <Route path="/private" component={Dashboard}/>
//           <Route path="/videochat" component={Video}/>
//           <Route path="/forget" component={ForgetPassword}/>
//           <Route path="/profile" component={Profile}/>

//         </>
//       </Router>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
//Utilities
import API from "./components/axios";
import { loadProgressBar } from "axios-progress-bar";
// import {logout} from './auth';
import Flash from "./components/utilities/flash";
//Components
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotLoggedIn from "./components/NotLoggedIn";
import Home from "./Home";
import Home1 from "./Home1";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
// import Dashboard from "./Home"
import Video from "./Dashboard";
import Profile from "./profile/userProfile";
import recording from "./profile/contact";
import publicProfile from "./profile/publicProfile";
import pro from "./components/Profile";
// import Homepage from './components/homepage';
// import Login from './components/Logins';

import room from "./components/room";
import Admin from "./components/Admin";

import AdminUpdate from "./components/AdminUpdate";
import AdminDashboard from "./components/AdminDashboard";
import AdminSignUp from "./components/AdminRegister";

import Dashboard from "./components/dashboard";
//CSS Files
// import "./css/ui.css";
// import "./css/theme.css";
import "axios-progress-bar/dist/nprogress.css";
//Images
import Logo from "./imgs/logo.png";
import AdminRegister from "./components/AdminRegister";
import Contact from "./profile/contact";
import meetingScheduler from "./meetingScheduler";
import TermsCondition from "./TermsCondition";

import Messanger from "./messanger";
import Miniapp from "./miniapp";
import Emailme from "./email";
import WaitingRoom from "./waitingRoom";
import Minilanding from "./miniLanding";
import messangerLanding from "./messangerLanding";
import screenShare from "./screenShare";
import Membership from "./Membership";
import errorPage from "./errorPage";
import "./App.css";

function App() {
  const [loginVisible, showLogin] = useState(0);
  const [signupVisible, showSignup] = useState(0);
  const [loggedIn, setLogin] = useState(0);
  const [username, setUsername] = useState("username");
  const [insideRoom, setInsideRoom] = useState(0);
  const [flashVisible, setFlashVisible] = useState(0);
  const [flashMessages, setFlashMessages] = useState({});
  const [interceptorID, setInterceptorID] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  var isLogged;
  //    if(localStorage.getItem('user')!=null)
  //    {
  // 	   setisLoggedIn(true)
  // 	   isLogged=true
  //    }
  //Check if user is already logged in
  useEffect(() => {
    window.addEventListener("popstate", () => {
      window.history.go(1);
    });
    //Attach Axios loading bar
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user") != null) {
      setisLoggedIn(true);
      isLogged = true;
    }
    loadProgressBar({}, API);
    console.log("rohan", window.location.href);
    if (localStorage.getItem("userData")) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      setLogin(1);
      //Send Token with Each request
      API.interceptors.request.use(
        (config) => {
          config.headers.token = userData.token;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      setUsername(userData.username);
    }
  }, []);

  // let logoutHandler = () => {
  // 	logout(interceptorID);
  // 	flashHandler('success', 'Logged out succesfully!');
  // 	setLogin(0);
  // }

  let flashHandler = (status, messages) => {
    setFlashVisible(1);
    setFlashMessages({ status, messages });
    setTimeout(() => {
      setFlashVisible(0);
    }, 2000);
  };

  let render;
  // if(loggedIn){
  // 	render = <Dashboard flashHandler={flashHandler} setInsideRoom = {setInsideRoom} insideRoom = {insideRoom}/>;
  // }else{
  // 	render = <Homepage showLogin = {showLogin} showSignup = {showSignup}/>;
  // }
  let button;
  if (!insideRoom) {
    // button = <a onClick={() => {logoutHandler()}} className="button red" href="#">Logout</a>;
  }
  return (
    <div className="main">
      <Router>
        <>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/private" component={Home} />
          {isLoggedIn == true || loggedIn == true ? (
            <Route path="/videochat" component={Video} />
          ) : (
            <Route path="/videochat" component={Video} />
          )}

          <Route path="/forget" component={ForgetPassword} />
          <Route path="/error" component={errorPage} />
          <Route path="/eRDRVJMnbc3qExHQE2sn" component={Admin} />
          <Route
            path="/admindashboardeRDRVJMnbc3qExHQE2sn"
            component={AdminDashboard}
          />
          {/* <Route path="/adminsignup" component={AdminRegister}/> */}
          <Route
            path="/adminsignupeRDRVJMnbc3qExHQE2sn"
            component={AdminRegister}
          />
          <Route path="/adminupdate" component={AdminUpdate} />
          <Route path="/profile" component={Profile} />

          <Route path="/contact" component={Contact} />
          <Route path="/Membership" component={Membership} />
          <Route path="/screenShare/:id?/:userName?" component={screenShare} />
          <Route path="/TermsCondition" component={TermsCondition} />
          <Route path="/meetingScheduler" component={Emailme} />
          <Route path="/waitingRoom" component={WaitingRoom} />

          <Route path="/publicProfile" component={publicProfile} />
          <Route path="/chat" component={Messanger} />
          <Route path="/room" component={room} />
          <Route exact path="/Miniapp/:id?/:userName?" component={Miniapp} />
          <Route
            exact
            path="/VEROHivemeetings/:id?/:userName?"
            component={Minilanding}
          />
          <Route path="/screenShare" component={Dashboard} />

          <Route
            exact
            path="/21AEF56E76A866F1161468CEBF5B23A9CE43F5E6319D050E498E77C02FDDD7BDcbvhjdferut4545347nvfrjhrt43734/:id?/:userName?"
            component={messangerLanding}
          />
        </>
      </Router>
    </div>
  );
}

export default App;
