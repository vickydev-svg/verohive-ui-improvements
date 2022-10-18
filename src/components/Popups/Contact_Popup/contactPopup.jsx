import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import "./contactPopup.css";
function ContactPopup({ show_contact, close_contact }) {
  //   const [open, setOpen] = useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const [input, setInput] = useState({ email: "" });
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
        Open alert dialog
      </Button> */}
      <Dialog
        className="dialog"
        open={show_contact}
        onClose={close_contact}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            textAlign: "center",
            fontSize: "3rem",
            color: "#204C6D",
            borderBottom: "2px solid #204C6D",
          }}
        >
          CONTACT
        </DialogTitle>
        <DialogContent className="dialog_content">
          <DialogContentText
            id="alert-dialog-description"
            className="dialog_content_text"
          >
            <div className="email_contact">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                name="email"
                InputProps={{
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
                InputLabelProps={{
                  style: { fontSize: 20, margin: "0 0 0 10px" },
                }}
                onChange={handleChange}
              />

              <Button
                className="contact_button"
                variant="contained"
                endIcon={<SendIcon />}
              >
                Contact
              </Button>
            </div>

            <div className="loader">
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="success" />
              </Stack>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disableElevation
            onClick={() => close_contact()}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactPopup;
