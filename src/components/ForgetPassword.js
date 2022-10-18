import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./verohivelogo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./forgetPassword.css";
import "./recoverPassword.css";
class ForgetPassword extends Component {
  state = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: "",
    code: "",
    verifycode: "",
    confirmpassword: "",
    show: false,
    invalidcode: "",
    passworddidnotmatch: "",
    passwordchangesuccess: "",
    enteremail: "",
    checkyouremail: "",
  };
  renderLoading() {
    return <div>Logging in...</div>;
  }

  backMe = () => {
    this.props.history.goBack();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async onSubmit1(e) {
    e.preventDefault();
    const { email, verifycode, code, password, confirmpassword } = this.state;
    if (code != verifycode) {
      return this.setState({
        invalidcode: "sorry,you entered an invalid code",
      });
    } else if (password != confirmpassword) {
      return this.setState({ passworddidnotmatch: "Password do not match" });
    }
    // this.setState({ isSubmitting: true });
    else {
      fetch("/updatepassword", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(() => {
          this.setState({
            passwordchangesuccess: "password changed successfully",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  async onSubmit(e) {
    console.log("Sss");
    e.preventDefault();
    const { email } = this.state;
    if (email == "") {
      return this.setState({ enteremail: "Please enter your email" });
    }
    // this.setState({ isSubmitting: true });

    var rand;
    var rand1 = Math.floor(Math.random() * 100 + 54);
    var rand2 = Math.floor(Math.random() * 100 + 54);

    rand = rand1.toString() + rand2.toString();

    this.setState({
      code: rand,
    });
    fetch("/nodemailer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        To: email,
        subject: "Please enter this code to change your password",
        text: "Your Verification Code is" + rand,
        html: `<img src="./verohivelogo.png" style="width: 30%;">
          <h1 style="color: #5b5b5b;"> VEROHive</h1>
          <h3 style="color: #757575;">Please change your password by using the OTP below</h3>
         <p>${rand}</p>
        
          
          
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">VEROHive Team</h4>"
          `,
      }),
    })
      .then(() => {
        this.setState({
          checkyouremail: "Check Your Email to Change Your Password",
        });
        this.setState({
          show: true,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="forget_nav">
          <img src={logo} className="forget_logo_vero"></img>
          <h4
            className="forget_version"
            style={{ color: "white", marginLeft: "45%" }}
          >
            V4.1.1
          </h4>
        </div>
        {/* <img src={logo} className='logo-vero'></img> */}

        {this.state.invalidcode != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.4rem",
              position: "absolute",
              top: "10%",
              left: "40%",
            }}
          >
            <span>
              {" "}
              {this.state.invalidcode}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  this.setState({
                    invalidcode: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.passworddidnotmatch != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.4rem",
              position: "absolute",
              top: "10%",
              left: "40%",
            }}
          >
            <span>
              {" "}
              {this.state.passworddidnotmatch}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  this.setState({
                    passworddidnotmatch: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.passwordchangesuccess != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.4rem",
              position: "absolute",
              top: "10%",
              left: "40%",
            }}
          >
            <span>
              {" "}
              {this.state.passwordchangesuccess}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  this.setState({
                    passwordchangesuccess: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.enteremail != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.4rem",
              position: "absolute",
              top: "10%",
              left: "40%",
            }}
          >
            <span>
              {" "}
              {this.state.enteremail}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  this.setState({
                    enteremail: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}

        {this.state.checkyouremail != "" ? (
          <div
            style={{
              zIndex: "10000000",
              backgroundColor: "white",
              padding: "10px",
              color: "grey",
              fontSize: "1.4rem",
              position: "absolute",
              top: "10%",
              left: "40%",
            }}
          >
            <span>
              {" "}
              {this.state.checkyouremail}
              <br></br>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "#4FADD3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  this.setState({
                    checkyouremail: "",
                  })
                }
              >
                OK
              </button>
            </span>
          </div>
        ) : null}
        {this.state.show ? (
          <div className="recover_detail_wrapper">
            <p
              style={{
                color: "#1565C0",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Recover Detail{" "}
            </p>
            <form
              className="recover_detail_form"
              onSubmit={(e) => {
                this.onSubmit1(e);
              }}
            >
              <div className="recover_detail_input">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="standard-basic"
                    label="Enter the code "
                    type="password"
                    variant="standard"
                    ref="verifycode"
                    name="verifycode"
                    onChange={this.onChange}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "95%",
                        // margin: "20px 5px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 20, margin: "0 0px 0 0px" },
                    }}
                  />
                </FormControl>
              </div>

              <div className="recover_detail_input">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="standard-basic"
                    label="New Password "
                    type="password"
                    name="password"
                    ref="password"
                    onChange={this.onChange}
                    variant="standard"
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "95%",
                        // margin: "20px 5px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 20, margin: "0 0px 0 0px" },
                    }}
                  />
                </FormControl>
              </div>

              <div className="recover_detail_input">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="standard-basic"
                    label="Confirm New Password "
                    type="password"
                    name="confirmpassword"
                    ref="confirmpassword"
                    onChange={this.onChange}
                    variant="standard"
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "95%",
                        // margin: "20px 5px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 20, margin: "0 0px 0 0px" },
                    }}
                  />
                </FormControl>
              </div>

              <Button
                style={{ outline: "none" }}
                type="submit"
                value="submit"
                variant="contained"
                endIcon={<ArrowUpwardIcon />}
              >
                {" "}
                SUBMIT{" "}
              </Button>

              <div className="message" style={{ display: "none" }}>
                {this.state.isSubmitting ? "Checking details...." : ""}
              </div>
              <div className="errorMessage">{this.state.errorMessage}</div>
            </form>
          </div>
        ) : (
          <div>
            <form
              // className="form-login"
              onSubmit={(e) => {
                this.onSubmit(e);
              }}
            >
              <div className="recover_wrapper">
                <div className="recover_content">
                  <form action="" className="recover_form">
                    <div className="registered_email">
                      <p className="registered_email_para">
                        Enter the registered email
                      </p>
                    </div>
                    <div className="input_recover">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          id="standard-basic"
                          label="Email"
                          type="email"
                          name="email"
                          onChange={this.onChange}
                          ref="email"
                          variant="standard"
                          InputProps={{
                            style: {
                              fontSize: 15,
                              fontWeight: 500,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "95%",
                              // margin: "20px 5px 0px 0px",
                            },
                          }}
                          InputLabelProps={{
                            style: { fontSize: 20, margin: "0 0px 0 0px" },
                          }}
                        />
                      </FormControl>
                    </div>

                    <div className="recover_buttons">
                      <Button variant="contained" endIcon={<ArrowBackIcon />}>
                        <Link
                          to="/login"
                          style={{
                            color: "white",
                            fontSize: "1rem",
                            textDecoration: "none !important",
                          }}
                        >
                          Go back
                        </Link>
                      </Button>
                      <Button
                        type="submit"
                        value="submit"
                        variant="contained"
                        endIcon={<ArrowUpwardIcon />}
                      >
                        {/* <NavLink
                  to="/recover_detail"
                  style={{
                    color: "white",
                    fontSize: "1rem",
                    textDecoration: "none !important",
                    borderBottom: "none",
                  }}
                > */}
                        Submit
                        {/* </NavLink> */}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="message" style={{ display: "none" }}>
                {this.state.isSubmitting ? "Checking details...." : ""}
              </div>
              <div className="errorMessage">{this.state.errorMessage}</div>
            </form>
          </div>
        )}

        <div className="footer">(c)VEROHive.All Rights Reserved</div>
      </div>
    );
  }
}

export default ForgetPassword;
