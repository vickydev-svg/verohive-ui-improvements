import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./dasboardPopup.css";

export default function DashboardPopup({ show, close }) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const [input, setInput] = useState({
    city: "",
    country: "",
    organisation: "",
  });

  const [inputLinks, setInputLinks] = useState({
    linkedIn: "",
    facebook: "",
    facebookLive: "",
    twitter: "",
    instagram: "",
    youtube: "",
    youtubeLive: "",
    otherWebsite1: "",
    otherWebsite2: "",
  });

  const handleLinks = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValueLinks = inputLinks;
    inputValueLinks = { ...inputValueLinks, [name]: value };
    setInputLinks(inputValueLinks);
    console.log(inputLinks);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputVal = input;
    inputVal = { ...inputVal, [name]: value };
    setInput(inputVal);
    console.log(input);
  };
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}

      <Dialog
        className="dialog"
        open={show}
        keepMounted
        onClose={close}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>UPDATE PROFILE</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog_content"
            style={{
              width: "100%",
              height: "100vh",
            }}
          >
            <form
              action=""
              className="update_profile_form"
              style={{
                width: "100%",
                height: "90%",
              }}
            >
              <div
                className="update_form_left_part"
                style={{
                  width: "100%",
                  height: "10%",
                }}
              >
                <Box
                  className="material_ui_box"
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: "25ch",
                    },
                  }}
                  style={{ width: "100%", height: "100%" }}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    className="read_only"
                    style={{
                      width: "100%",
                      height: "100%",

                      margin: "0",
                      padding: "0",
                    }}
                  >
                    <TextField
                      id="standard-read-only-input"
                      label="First Name"
                      defaultValue="Vicky"
                      InputProps={{
                        readOnly: true,
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 10px",
                        },
                      }}
                      variant="standard"
                      InputLabelProps={{
                        style: { fontSize: 20, margin: "0 0 0 10px" },
                      }}
                    />

                    <TextField
                      id="standard-read-only-input"
                      label="Last Name"
                      defaultValue="Kumar"
                      InputProps={{
                        readOnly: true,
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 20px",
                        },
                      }}
                      variant="standard"
                      InputLabelProps={{
                        style: { fontSize: 20 },
                      }}
                    />
                  </div>
                  <div className="write_only " style={{ width: "100%" }}>
                    <TextField
                      id="standard-basic"
                      label="City"
                      variant="standard"
                      name="city"
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />

                    <TextField
                      id="standard-basic"
                      label="Country"
                      variant="standard"
                      name="country"
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />

                    <TextField
                      id="standard-basic"
                      label="Organisation"
                      variant="standard"
                      name="organisation"
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          margin: "20px 0px 0px 0px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 15, marginLeft: "0px" },
                      }}
                    />
                  </div>
                </Box>
              </div>

              <div className="update_form_right_part ">
                <div className="two_inputs" style={{ width: "100%" }}>
                  <TextField
                    id="standard-read-only-input"
                    label="First Name"
                    defaultValue="Vicky"
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontSize: 10,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                        margin: "20px 0px 0px 10px",
                      },
                    }}
                    variant="standard"
                    InputLabelProps={{
                      style: { fontSize: 20, margin: "0px 0px 0px 10px" },
                    }}
                  />

                  <TextField
                    id="standard-read-only-input"
                    label="Email"
                    defaultValue="vickydevsvg@gmail.com"
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontSize: 10,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "86%",
                        margin: "20px 0px 0px 20px",
                      },
                    }}
                    variant="standard"
                    InputLabelProps={{
                      style: { fontSize: 20 },
                    }}
                  />
                </div>
                <p className="website_links">WEBSITE LINKS</p>
                <div
                  className="small_field_inputs"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="LinkedIn"
                    variant="standard"
                    onChange={handleLinks}
                    name="linkedIn"
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Facebook"
                    variant="standard"
                    name="facebook"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Facebook Live"
                    variant="standard"
                    name="facebookLive"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Twitter"
                    variant="standard"
                    name="twitter"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Instagram"
                    variant="standard"
                    name="instagram"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Youtube"
                    variant="standard"
                    name="youtube"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Youtube Live"
                    variant="standard"
                    name="youtubeLive"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Other Website"
                    variant="standard"
                    name="otherWebsite1"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                  <TextField
                    className="small_links"
                    id="standard-basic"
                    label="Other Website"
                    variant="standard"
                    name="otherWebsite2"
                    onChange={handleLinks}
                    InputProps={{
                      style: {
                        fontSize: 15,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        margin: "20px 0px 0px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, marginLeft: "0px" },
                    }}
                  />
                </div>
                <DialogActions>
                  <Button
                    onClick={() => close()}
                    style={{ position: "relative", top: "90%" }}
                    variant="contained"
                    disableElevation
                  >
                    UPDATE
                  </Button>
                </DialogActions>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
