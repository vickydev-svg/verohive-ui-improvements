import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { FaShareAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdPersonalVideo } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import Avatar from "../../imgs/logo.png";
// import DashboardPopup from "../Popups/Dasboard_Popup/DashboardPopup";
// import ContactPopup from "../Popups/Contact_Popup/contactPopup";
// import MettingPopup from "../Popups/Meeting_Popup/MettingPopup";
import { Navigate } from "react-router-dom";
import Contact from "../../profile/contact";
function Sidebar() {
  const auth = localStorage.getItem("user");
  //   const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // navigate("/");
  };
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showMettingPopup, setShowMettingPopup] = useState(false);
  return (
    <>
      <div className="sidebar_navbar">
        {/* <Contact
          close_contact={() => setShowContactPopup(false)}
          show_contact={showContactPopup}
        /> */}
        {/* <DashboardPopup close={() => setShowModal(false)} show={showModal} />
         */}
        {/* <MettingPopup
          close_metting={() => setShowMettingPopup(false)}
          show_metting={showMettingPopup}
        /> */}
        <div className="hamburger">
          <GiHamburgerMenu
            style={{ color: "white", fontSize: "2rem" }}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <div className={open ? "sidebar_wrapper" : "sidebar_wrapper active"}>
        <div className="user_upperpart">
          <div className="user_photo_logout">
            <div className="user_photo">
              <img
                src={Avatar}
                alt=""
                style={{ height: "80px", width: "80px", borderRadius: "50%" }}
              />
            </div>
            {/* <p className="welcome">Welcome {JSON.parse(auth).userName}</p> */}
            <p>hii</p>
            <div className="user_logout">
              <button className="sidebar_logout" onClick={logout}>
                LOGOUT
              </button>
            </div>
          </div>
          <div className="share_button">
            <FaShareAlt
              style={{
                fontSize: "3rem",
                color: " #2e80af",
                marginRight: "5px",
              }}
            />
          </div>
        </div>

        <div className="user_lower_part">
          <ul className="user_lower_part_list">
            <li className="user_lower_part_list_items">
              <a href="#" className="user_lower_part_list_items_links">
                <MdDashboard className="common" style={{ color: " #fe6a68" }} />
                <span className="user_links">Dashboard</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a
                href="#"
                className="user_lower_part_list_items_links"
                variant="outlined"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <MdTipsAndUpdates
                  className="common"
                  style={{ color: " #fe6a68" }}
                />
                <span className="user_links">Update Profile</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a href="#" className="user_lower_part_list_items_links">
                <CgProfile className="common" />
                <span className="user_links">Public Profile</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a href="#" className="user_lower_part_list_items_links">
                <MdPersonalVideo className="common" />
                <span className="user_links">Background</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a
                href="#"
                className="user_lower_part_list_items_links"
                onClick={() => {
                  setShowContactPopup(!showContactPopup);
                }}
              >
                <MdOutlineContactPhone className="common" />
                <span className="user_links">Contacts</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a
                href="#"
                className="user_lower_part_list_items_links"
                onClick={() => {
                  setShowMettingPopup(!showMettingPopup);
                }}
              >
                <MdMeetingRoom className="common" />
                <span className="user_links">Schedule Meeting</span>
              </a>
            </li>

            <li className="user_lower_part_list_items">
              <a
                href="https://megahoot.org/upgrade/?source=PO39IDH98023FJNIOEDPFJ290U846H3U58H93HFE9PDSNIPDONF092H74U803H6T57-056I4KMH89T64J39JE28HE8722GD76F23VBF8B42I3NYVB89032UNV894-HNG983HE7DHC982H2HFH943Y6JEDSG87DGCS8NCV3R89256784Y6NVY729WE45161YDSAVYU-32Y78DC92378Y4D7892YJ489728&e=vickydevsvg@gmail.com&string=FD7EFWF89292H32JD092T8934H913BHD1GD8Y91BD91U2N9F8H4389FG3HJ0J01JH8D902HJ10DHJ213GD1789GB94TH5Y9G8YURVN8928923H98C4"
                className="user_lower_part_list_items_links"
                target="_blank"
              >
                <MdCardMembership className="common" />
                <span className="user_links">Upgrade Membership</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
