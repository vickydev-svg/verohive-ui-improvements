import React, { Component } from "react";
// import AlertDialogSlide from "./LoginPopup/LoginPopup";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
// import Sidebar from "./components/Sidebar/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Overlay } from "react-portal-overlay";
// import logo from "./verohivelogo.png";
// import a from "./verifybadges/a.png";
// import b from "./verifybadges/b.png";
// import g from "./verifybadges/g.png";
// import p from "./verifybadges/p.png";
// import r from "./verifybadges/r.png";
// import y from "./verifybadges/y.png";
// import userpic from "./verifybadges/user.png";
// import * as Api from "./api";
import Linkify from "react-linkify";
import Toggle from "react-toggle";
// import Privacypolicy from "./privacypolicy";
// import copyrightlogo from "../imgs/CopyrightVERO.png";

class TermsCondition extends Component {
  state = {
    privacyPolicy: false,
    termCondition: false,
  };

  componentDidMount() {
    // const {username}=this.props;
  }

  handleClosePrivacyPolicy = () => {
    this.setState({
      privacyPolicy: false,
    });
  };

  handleClickOpenPrivacyPolicy = () => {
    this.setState({
      privacyPolicy: true,
    });
  };

  handleClickOpenTermsCondition = () => {
    this.setState({
      termCondition: true,
    });
  };

  handleCloseTermsCondition = () => {
    this.setState({
      termCondition: false,
    });
  };

  render() {
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    };

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    };

    const opencontact = () => {
      document.querySelector(".contactbar").classList.add("open");
    };

    const closecontact = () => {
      document.querySelector(".contactbar").classList.remove("open");
    };

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );

    return (
      <>
        <Dialog
          className="dialog"
          open={this.state.privacyPolicy}
          onClose={() => {
            this.handleClosePrivacyPolicy();
          }}
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
            Vero Hive Privacy Policy
          </DialogTitle>
          <DialogContent className="dialog_content">
            <DialogContentText
              id="alert-dialog-description"
              className="dialog_content_text"
              style={{ fontSize: "2rem" }}
            >
              <p>
                <br />
                <strong>A. Introduction</strong>
              </p>
              <p>
                1. VEROHive, a brand of Megahoot, LLC , values its visitors’
                privacy and we are committed to safeguarding it. This privacy
                policy is effective August 1, 2020 and it summarizes what
                information we might collect from a registered user or other
                visitor (“You”), and what we will and will not do with your
                personal information.
              </p>
              <p>
                2. Please note that this privacy policy does not govern the
                collection and use of information by companies that Megahoot,
                LLC does not control, nor by individuals not employed or managed
                by Megahoot, LLC. If you visit a website that we are mentioned n
                in or linked to, be sure to review its privacy policy before
                providing such as website any personal information.
              </p>
              <p>
                3. Consenting to our use of cookies in accordance with the terms
                of this policy when you first visit our website permits us to
                use cookies every time you visit our website.
              </p>
              <p>
                <strong>B. Collecting personal information</strong>
              </p>
              <p>
                What we do with your personally identifiable information
                <br />
                It is always up to you whether to disclose personally
                identifiable information to us, although if you elect not to do
                so, we reserve the right not to register you as a user or
                provide you with any products or services. “Personally
                identifiable information” means information that can be used to
                identify you as an individual.
              </p>
              <p>
                The following types of personal information may be collected,
                stored, and used:
              </p>
              <p>
                1. information about your computer including your IP address,
                geographical location, browser type and version, and operating
                system;
              </p>
              <p>
                2. session data for your login session, so that our network can
                communicate with your computer or device while you are logged
                in.
              </p>
              <p>
                3. information about your visits to and use of this website
                including the referral source, length of visit, page views, and
                website navigation paths;
              </p>
              <p>
                4. information, such as your email address, that you enter when
                you register with VEROHive;
              </p>
              <p>
                5. information that you enter when you create your profile on
                VEROHive, for example, your name, profile pictures, gender,
                birthday, company name and employment details;
              </p>
              <p>
                6. information, such as your name and email address, that you
                enter in order to set up subscriptions to our emails and/or
                newsletters;
              </p>
              <p>
                7. information that you enter while using the services on
                VEROHive;
              </p>
              <p>
                8. information that is generated while using our applications or
                website, including when, how often, and under what circumstances
                you use it;
              </p>
              <p>
                9. information relating to any upgrades that you make, services
                that you use, or transactions you make through our applications
                or website, which includes your name, address, telephone number,
                email address, and credit card details (if applicable) [THIS MAY
                NOT BE APPROPRIATE IF CREDIT CARD INFORMATION IS HANDLED BY A
                PAYMENT PROCESSOR];
              </p>
              <p>
                10. information contained in any communications that you send to
                us by email or through our applications or website, including
                its communication content and metadata;
              </p>
              <p>11. any other personal information that you send to us.</p>
              <p>
                <strong>C. Identifiable Information</strong>
              </p>
              <p>
                If you do provide personally identifiable information to us,
                either directly or through a reseller or other business partner,
                we will:
              </p>
              <p>
                1. not sell or rent it to a third party, we may use your contact
                information to provide you with information we believe you need
                to know or may find useful, such as (for example) news about our
                services and products and modifications to the Terms of Service;
              </p>
              <p>
                2. take commercially reasonable precautions to protect the
                information from loss, misuse and unauthorized access,
                disclosure, alteration and destruction;
              </p>
              <p>
                3. not use or disclose the information except:
                <br />
                &nbsp; 3.1. as necessary to provide services or products you
                have ordered, by providing it to a carrier to deliver products
                you have ordered;
                <br />
                &nbsp; 3.2. in other ways described in this privacy policy or to
                which you have otherwise consented;
                <br />
                &nbsp; 3.3. in the aggregate with other information in such a
                way so that your identity cannot reasonably be determined (for
                example, statistical compilations);
                <br />
                &nbsp; 3.4. as required by law in response to a subpoena or
                search warrant;
                <br />
                &nbsp; 3.5. to outside auditors who have agreed to keep the
                information confidential;
                <br />
                &nbsp; 3.6. as necessary to enforce the Terms of Service; <br />
                &nbsp; 3.7. as necessary to protect the rights, safety, or
                property of VEROHive and Megahoot, LLC, its users, or others;
                this may include exchanging information with other organizations
                for fraud protection and/or risk reduction.
              </p>
              <p>
                <strong>D. Prior to Disclosing Personal Information;</strong>
              </p>
              <p>
                Before you disclose to us the personal information of another
                person, you must obtain that person’s consent to both the
                disclosure and the processing of that personal information in
                accordance with this policy
              </p>
              <p>
                <strong>E. Using your personal information</strong>
              </p>
              <p>
                Personal information submitted to us through VEROHive will be
                used for the purposes specified in this policy or on the
                relevant pages of VEROHive’s web, desktop or mobile
                applications. We may use your personal information for the
                following:
              </p>
              <p>
                1. administering our website and business;
                <br />
                2. personalizing VEROHive for you;
                <br />
                3. enabling your use of the services available on VEROHive;
                <br />
                4. supplying services purchased through VEROHive;
                <br />
                5. sending statements, invoices, and payment reminders to you,
                and collecting payments from you;
                <br />
                6. sending you non-marketing commercial communications;
                <br />
                7. sending you email notifications that you have specifically
                requested;
                <br />
                8. sending you our email newsletter, if you have requested it
                (you can inform us at any time if you no longer require the
                newsletter);
                <br />
                9. sending you marketing communications relating to our business
                or our family of brands and companies carefully- we will never
                share your personal information or contact details to third
                parties;
                <br />
                10. dealing with inquiries and complaints made by or about you
                relating to VEROHive;
                <br />
                11. keeping VEROHive secure and prevent fraud;
                <br />
                12. verifying compliance with the terms and conditions governing
                the use of VEROHive’s web, desktop and mobile applications, we
                will not monitor private messages or save such data on our
                network, all communication from one user to another is private
                and confidential;
              </p>
              <p>
                If you submit personal information for publication on VEROHive,
                we will publish and otherwise use that information in accordance
                with the license you grant to us.
              </p>
              <p>
                Your privacy settings can be used to limit the publication of
                your information on VEROHive and can be adjusted using privacy
                controls on VEROHive.
              </p>
              <p>
                We will never share your personal information to any third party
                for their or any other third party’s marketing purposes or
                other.
              </p>
              <p>
                <strong>F. Disclosing personal information</strong>
              </p>
              <p>
                We may disclose your personal information to any of our
                employees, officers, insurers, professional advisers, agents, or
                subcontractors as reasonably necessary for the purposes set out
                in this policy.
                <br />
                We may disclose your personal information to any member of our
                group of companies (this means our subsidiaries, our ultimate
                holding company and all its subsidiaries) as reasonably
                necessary for the purposes set out in this policy.We may
                disclose your personal information:
              </p>
              <p>
                1. to the extent that we are required to do so by law;
                <br />
                2. in connection with any ongoing or prospective legal
                proceedings;
                <br />
                3. in order to establish, exercise, or defend our legal rights
                (including providing information to others for the purposes of
                fraud prevention and reducing credit risk);
                <br />
                4. to the purchaser (or prospective purchaser) of any business
                or asset that we are (or are contemplating) selling; and
                <br />
                5. to any person who we reasonably believe may apply to a court
                or other competent authority for disclosure of that personal
                information where, in our reasonable opinion, such court or
                authority would be reasonably likely to order disclosure of that
                personal information.
                <br />
                Except as provided in this policy, we will not provide your
                personal information to third parties.
              </p>
              <p>
                <strong>G. International data transfers</strong>
              </p>
              <p>
                1. Information that we collect may be stored, processed in, and
                transferred between any of the countries in which we operate in
                order to enable us to use the information in accordance with
                this policy.
              </p>
              <p>
                2. Information that we collect may be transferred to the
                following countries which do not have data protection laws
                equivalent to those in force in the European Economic Area: the
                United States of America,Russia, Japan, Asia, IndoAsia, the
                United Kingdom and India.
              </p>
              <p>
                3. Personal information that you may publish on VEROHive or
                submit for publication on our applications or website may be
                available, via the internet, around the world. We cannot prevent
                the use or misuse of such information by others.
              </p>
              <p>
                4. You expressly agree to the transfers of personal information
                described in this and Section F.
              </p>
              <p>
                <strong>H. Retaining personal information</strong>
              </p>
              <p>
                1. This Section H sets out our data retention policies and
                procedure, which are designed to help ensure that we comply with
                our legal obligations regarding the retention and deletion of
                personal information.
              </p>
              <p>
                2. Personal information that we process for any purpose or
                purposes shall not be kept for longer than is necessary for that
                purpose or those purposes.
              </p>
              <p>
                3. Without prejudice to article G-2, we will usually delete
                personal data falling within the categories set out below at the
                date/time set out below:
                <br />
                a. personal data type will be deleted daily; and
              </p>
              <p>
                4. Notwithstanding the other provisions of this Section H, we
                will retain documents (including electronic documents)
                containing personal data:
                <br />
                a. to the extent that we are required to do so by law;
                <br />
                b. if we believe that the documents may be relevant to any
                ongoing or prospective legal proceedings; and
                <br />
                c. in order to establish, exercise, or defend our legal rights
                (including providing information to others for the purposes of
                fraud prevention and reducing credit risk).
              </p>
              <p>
                <strong>I. Security of your personal information</strong>
              </p>
              <p>
                1. We will take reasonable technical and organizational
                precautions to prevent the loss, misuse, or alteration of your
                personal information.
              </p>
              <p>
                2. We will store all the personal information you provide on our
                secure (password- and firewall-protected) servers.
              </p>
              <p>
                3. All electronic financial transactions entered into through
                our website will be protected by encryption technology.
              </p>
              <p>
                4. You acknowledge that the transmission of information over the
                internet is inherently insecure, and we cannot guarantee the
                security of data sent over the internet.
              </p>
              <p>
                5. You are responsible for keeping the password you use for
                accessing VEROHive confidential; we will not ask you for your
                password (except when you log in to our applications or
                website).
              </p>
              <p>
                <strong>J. Amendments</strong>
              </p>
              <p>
                We may update this policy from time to time by publishing a new
                version on VEROHive. You should check this page occasionally to
                ensure you understand any changes to this policy. We may notify
                you of changes to this policy by email or through the private
                messaging system on VEROHive.
              </p>
              <p>
                <strong>K. Your rights</strong>
              </p>
              <p>
                You may instruct us to provide you with any personal information
                we hold about you; provision of such information will be subject
                to the following:
                <br />
                1. the payment of a fee : and
                <br />
                2. the supply of appropriate evidence of your identity such as a
                color photocopy of a government issued photo identification or
                other that would be deemed acceptable proof of identity.
                <br />
                We may withhold personal information that you request to the
                extent permitted by law.
              </p>
              <p>
                <strong>L. Updating information</strong>
              </p>
              <p>
                Please let us know if the personal information that we hold
                about you needs to be corrected or updated.
              </p>
              <p>
                <strong>M. Cookies</strong>
              </p>
              <p>
                VEROHive uses cookies. A cookie is a file containing an
                identifier (a string of letters and numbers) that is sent by a
                web server to a web browser and is stored by the browser. The
                identifier is then sent back to the server each time the browser
                requests a page from the server. Cookies may be either
                “persistent” cookies or “session” cookies: a persistent cookie
                will be stored by a web browser and will remain valid until its
                set expiry date, unless deleted by the user before the expiry
                date; a session cookie, on the other hand, will expire at the
                end of the user session, when the web browser is closed. Cookies
                do not typically contain any information that personally
                identifies a user, but personal information that we store about
                you may be linked to the information stored in and obtained from
                session cookies.
              </p>
              <p>
                1. Most browsers allow you to refuse to accept cookies—for
                example:
              </p>
              <p>
                a. in Internet Explorer (version 10) you can block cookies using
                the cookie handling override settings available by clicking
                “Tools,” “Internet Options,” “Privacy,” and then “Advanced”;
                <br />
                b. in Firefox (version 24) you can block all cookies by clicking
                “Tools,” “Options,” “Privacy,” selecting “Use custom settings
                for history” from the drop-down menu, and unticking “Accept
                cookies from sites”; and
                <br />
                c. in Chrome (version 29), you can block all cookies by
                accessing the “Customize and control” menu, and clicking
                “Settings,” “Show advanced settings,” and “Content settings,”
                and then selecting “Block sites from setting any data” under the
                “Cookies” heading. <br />
                d. Blocking all cookies will have a negative impact upon the
                usability of many websites. If you block cookies, you may not be
                able to use all the features on VEROHive. You can delete cookies
                already stored on your computer—for example:
                <br />
                e. in Internet Explorer (version 10), you must manually delete
                cookie files (you can find instructions for doing so at
                http://support.microsoft.com/kb/278835 );
                <br />
                f. in Firefox (version 24), you can delete cookies by clicking
                “Tools,” “Options,” and “Privacy”, then selecting “Use custom
                settings for history”, clicking “Show Cookies,” and then
                clicking “Remove All Cookies”; and
                <br />
                g. in Chrome (version 29), you can delete all cookies by
                accessing the “Customize and control” menu, and clicking
                “Settings,” “Show advanced settings,” and “Clear browsing data,”
                and then selecting “Delete cookies and other site and plug-in
                data” before clicking “Clear browsing data.” Deleting cookies
                will have a negative impact on the usability of many websites.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                this.handleClosePrivacyPolicy();
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        {/*  */}
        {/* PRIVACY POLICY DIALOG BOX ENDS */}
        <Dialog
          className="dialog"
          open={this.state.termCondition}
          onClose={() => {
            this.handleCloseTermsCondition();
          }}
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
            VEROHIVE TERMS OF SERVICE
          </DialogTitle>
          <DialogContent className="dialog_content">
            <DialogContentText
              id="alert-dialog-description"
              className="dialog_content_text"
            >
              <h2 style={{ fontSize: "1rem" }}>
                IMPORTANT NOTICE: THESE TERMS AND CONDITIONS CONTAIN A BINDING
                ARBITRATION PROVISION AND WAIVER OF JURY TRIALS AND CLASS
                ACTIONS GOVERNING DISPUTES ARISING FROM USE OF THE VEROHIVE
                SERVICES. IT AFFECTS YOUR LEGAL RIGHTS AS DETAILED IN THE
                MANDATORY ARBITRATION AND WAIVER OF CLASS ACTION SECTION BELOW.
                PLEASE READ CAREFULLY.
              </h2>
              <br />
              <br />
              <br />
              <p style={{ fontSize: "1rem" }}>
                These VEROHIVE Services Terms and Conditions (“Terms”) govern
                access to and use of the VEROHIVE (“VEROHIVE,” “we” or “us”) web
                sites, applications and services (collectively, the “Site”) by
                site visitors (“Site Visitors”) and by individuals or entities
                who purchase services (“VEROHIVE Services”) or create an account
                (“Account”) and their Authorized Users (collectively,
                “Customers”). By using the Site or any VEROHIVE Services, you as
                a Site Visitor, Application User or Customer accept these Terms
                (whether on behalf of yourself or a legal entity you represent).
                An “Authorized User” of a Customer is each an individual natural
                person, whether an employee, business partner, contractor, or
                agent of a Customer who is registered or permitted by Customer
                to use the VEROHIVE Services subject to these Terms and up to
                any maximum number of users or uses specified at the time of
                purchase. Customers and Site Visitors may be referred to in
                these Terms as “you” and “your” as applicable.
                <br></br>
                <br></br>
                BY CLICKING/CHECKING THE “AGREE” BUTTON/BOX, ACCESSING VEROHIVE,
                USING, OR DOWNLOADING ANY MATERIALS FROM THE VEROHIVE WEBSITE OR
                APPLICATIONS, UTILIZING VEROHIVE SERVICES, YOU AGREE TO FOLLOW
                AND BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS,
                YOU ARE NOT AUTHORIZED AND MUST CEASE USING THE SITE
                IMMEDIATELY. 
                <br></br>
                <br></br>
                VEROHIVE will provide the Services, and you may access and use
                the Services, in accordance with this Agreement. If You order
                Services through an on-line registration page or an order form
                (each an &quot;Order Form&quot;), the Order Form may contain
                additional terms and conditions and information regarding the
                Services you are ordering. Unless otherwise expressly set forth
                in any such additional terms and conditions applicable to the
                specific Service which You choose to use, those additional terms
                are hereby incorporated into this Agreement in relation to Your
                use of that Service.<br></br>
                <br></br>
                System Requirements . Use of the Services requires one or more
                compatible devices, Internet access (fees may apply), and
                certain software (fees may apply), and may require obtaining
                updates or upgrades from time to time. Because use of the
                Services involves hardware, software, and Internet access, Your
                ability to access and use the Services may be affected by the
                performance of these factors. High speed Internet access is
                recommended. You acknowledge and agree that such system
                requirements, which may be changed from time to time, are your
                sole responsibility.<br></br>
                <br></br>
                1.        UPDATES AND COMMUNICATIONS<br></br>
                <br></br>
                1.1       We may revise these Terms or any additional terms and
                conditions that are relevant to a particular VEROHIVE Service
                from time to time to reflect changes in the law or to the
                VEROHIVE Services. We will post the revised terms on the Site
                with a “last updated” date. PLEASE REVIEW THE SITE ON A REGULAR
                BASIS TO OBTAIN TIMELY NOTICE OF ANY REVISIONS. IF YOU CONTINUE
                TO USE THE VEROHIVE SERVICES AFTER THE REVISIONS TAKE EFFECT,
                YOU AGREE TO BE BOUND BY THE REVISED TERMS. You agree that we
                shall not be liable to you or to any third party for any
                modification of the Terms.
                <br></br>
                <br></br>
                1.2       You agree to receive all communications, agreements,
                and notices that we provide in connection with any VEROHIVE
                Services (“Communications”), including, but not limited to,
                Communications related to our delivery of the VEROHIVE Services
                and your purchase of or subscription to the VEROHIVE Services,
                via electronic means, including by e-mail, text, in-app
                notifications, or by posting them on the Site or through any
                VEROHIVE Services. You agree that all Communications we provide
                to you electronically satisfy any legal requirement that such
                Communications be in writing or be delivered in a particular
                manner and you agree to keep your Account contact information
                current.<br></br>
                <br></br>
                2.       ADDITIONAL TERMS FOR VEROHIVE SERVICES<br></br>
                2.1       VEROHIVE Video Conferencing and Messenger. If you use
                VEROHIVE’s Video Conferencing and Messenger, you accept the
                Terms of the VEROHIVE Video Conferencing and Messenger Schedule
                below.
                <br></br>
                <br></br>
                2.2       Payments. If you use the “Payments” feature in
                VEROHIVE Video Conferencing and Messenger, you accept the terms
                of the Payments Attachment below.<br></br>
                <br></br>
                2.3       Comments. If you use the “Comments” feature in
                VEROHIVE Video Conferencing and Messenger, you accept the terms
                of the Comments Attachment below.<br></br>
                <br></br>
                2.4       VEROHIVE Portals. If you use VEROHIVE Portals, you
                accept the Terms of the VEROHIVE Portals Schedule below.
                <br></br>
                <br></br>
                3.        USAGE AND ACCESS RIGHTS<br></br>
                3.1       Eligibility to Use. You represent and warrant that you
                are: (a) of legal age (18 years of age or older or otherwise of
                legal age in your resident jurisdiction) and competent to agree
                to these Terms; and (b) you (or your Authorized Users, as
                applicable) are not and will not when using the Site be located
                in, under the control of, or a national or resident of a U.S.
                embargoed country or territory and are not a prohibited end user
                under Export Control Laws (as defined in Section 12.3). You
                acknowledge that you are not permitted to use the Site if you
                cannot make these representations. If VEROHIVE has previously
                prohibited you from accessing the Site or using the VEROHIVE
                Services, you are not permitted to access the Site or use the
                VEROHIVE Services. <br></br>
                <br></br>
                If you are agreeing to these Terms on behalf of an organization
                or entity, you represent and warrant that you are authorized to
                agree to these Terms on that organization or entity’s behalf and
                bind them to these Terms (in which case, the references to
                &quot;you&quot; and &quot;your&quot; in these Terms, except for
                in this sentence, refer to that organization or entity). You may
                only use the Services pursuant to the terms of this Agreement.
                You are solely responsible for your and your End Users’ use of
                the Services and shall abide by, and ensure compliance with, all
                Laws in connection with your and each End User’s use of the
                Services, including but not limited to Laws related to
                recording, intellectual property, privacy and export control.
                Use of the Services is void where prohibited.<br></br>
                <br></br>
                3.2 Beta Services. VEROHIVE may, from time to time, offer access
                to services that are classified as Beta version. Access to and
                use of Beta versions may be subject to additional agreements.
                VEROHIVE makes no representations that a Beta version will ever
                be made generally available and reserves the right to
                discontinue or modify a Beta version at any time without notice.
                Beta versions are provided AS IS, may contain bugs, errors or
                other defects, and your use of a Beta version is at your sole
                risk.<br></br>
                <br></br>
                3.3       Limited License. Upon your acceptance of these Terms,
                we grant you a limited, non-exclusive and non-transferable
                license to access and use the Site for your internal business
                purposes and only as expressly permitted in these Terms and any
                applicable paid Customer plan that enables registration of an
                Account for the use of a VEROHIVE Service (“Subscription Plan”)
                when applicable. You shall not use or permit use of the Site for
                any illegal purpose or in any manner inconsistent with the
                provisions of these Terms. If you are or become a direct
                competitor of VEROHIVE, you may not access or use the VEROHIVE
                Services without VEROHIVE’s explicit, advance, written consent,
                and then only for the purposes authorized in writing. Except as
                otherwise restricted by these Terms, VEROHIVE grants you
                permission on a non- exclusive, non-transferable, limited basis
                to display, copy, and download content and materials on the Site
                provided that you: (a) retain all copyright and other
                proprietary notices on the content and materials; (b) use them
                solely for personal or internal, non- commercial use or in
                accordance with any applicable Subscription Plan; and (c) do not
                modify them in any way. Each discrete Subscription Plan includes
                restrictions and requirements that outline the features that
                Customer will be able to access. Any violation by you of the
                license provisions contained in this Section 3 may result in the
                immediate termination of your right to use the Site, as well as
                potential liability for copyright infringement or other claims
                depending on the circumstances.
                <br></br>
                <br></br>
                3.4 Recordings. You are responsible for compliance will all
                recording laws. The host can choose to record VEROHIVE meetings
                and Webinars. By using the Services, you are giving VEROHIVE
                consent to store recordings for any or all VEROHIVE meetings or
                webinars that you join, if such recordings are stored in our
                systems. You will receive a notification (visual or otherwise)
                when recording is enabled. If you do not consent to being
                recorded, you can choose to leave the meeting or webinar.
                <br></br>
                <br></br>
                3.5 Prohibited Use. You agree that you will not use, and will
                not permit any End User to use, the Services to:<br></br> (i)
                modify, disassemble, decompile, prepare derivative works of,
                reverse engineer or otherwise attempt to gain access to the
                source code of the Services;<br></br> (ii) knowingly or
                negligently use the Services in a way that abuses,<br></br>
                <br></br>
                interferes with, or disrupts VEROHIVEs networks, your accounts,
                or the Services;<br></br>
                (iii) engage in activity that is illegal, fraudulent, false, or
                misleading,
                <br></br> (iv) transmit through the Services any material that
                may infringe the intellectual property or other rights of third
                parties; <br></br>(v) build or benchmark a competitive product
                or service, or copy any features, functions or graphics of the
                Services; or <br></br>(vi) use the Services to communicate any
                message or material that is harassing, libelous, threatening,
                obscene, indecent, would violate the intellectual property
                rights of any party or is otherwise unlawful, that would give
                rise to civil liability, or that constitutes or encourages
                conduct that could constitute a criminal offense, under any
                applicable law or regulation; <br></br>(vii) upload or transmit
                any software, Content or code that does or is intended to harm,
                disable, destroy or adversely affect performance of the Services
                in any way or which does or is intended to harm or extract
                information or data from other hardware, software or networks of
                VEROHIVE or other users of Services; <br></br>(viii) engage in
                any activity or use the Services in any manner that could
                damage, disable, overburden, impair or otherwise interfere with
                or disrupt the Services, or any servers or networks connected to
                the Services or VEROHIVE&#39;s security systems. <br></br>(ix)
                use the Services in violation of any VEROHIVE policy or in a
                manner that violates applicable law, including but not limited
                to anti-spam, export control, privacy, and anti-terrorism laws
                and regulations and laws requiring the consent of subjects of
                audio and video recordings, and You agree that you are solely
                responsible for compliance with all such laws and regulations.
                <br></br>
                <br></br>
                3.6 Registration Information. You may be required to provide
                information about Yourself in order to register for and/or use
                certain Services. You agree that any such information shall be
                accurate. You may also be asked to choose a user name and
                password. You are entirely responsible for maintaining the
                security of your user name and password and agree not to
                disclose such to any third party.
                <br></br>
                <br></br>
                3.7 Limitations on Use.You may not reproduce, resell, or
                distribute the Services or any reports or data generated by the
                Services for any purpose unless You have been specifically
                permitted to do so under a separate agreement with VEROHIVE. You
                may not offer or enable any third parties to use the Services
                purchased by you, display on any website or otherwise publish
                the Services or any Content obtained from a Service (other than
                Content created by you) or otherwise generate income from the
                Services or use the Services for the development, production or
                marketing of a service or product substantially similar to the
                Services.<br></br>
                <br></br>
                4.        OWNERSHIP<br></br>
                <br></br>
                4.1       Intellectual Property. The Site contains materials
                that are proprietary and are protected by copyright laws,
                international treaty provisions, trademarks, service marks, and
                other intellectual property laws and treaties.<br></br>
                <br></br>
                4.1.1    The Site is also protected as a collective work or
                compilation under copyright and other laws and treaties. You
                agree to abide by all applicable copyright and other laws, as
                well as any additional copyright notices or restrictions
                contained on the Site. You acknowledge that the Site contains
                original works that have been developed, compiled, prepared,
                revised, selected, and arranged by VEROHIVE and others<br></br>
                <br></br>
                through the application of methods and standards of judgment
                developed and applied through the expenditure of substantial
                time, effort, and money and which constitute valuable
                intellectual property of VEROHIVE and such others. All present
                and future rights in and to trade secrets, patents, designs,
                copyrights, trademarks, database rights, service marks,
                know-how, and other intellectual property or other proprietary
                rights of any type, Documentation, any improvements, design
                contributions, or derivative works thereto, and any knowledge or
                process related thereto, including rights in and to all
                applications and registrations relating to the Site, shall, as
                between you and VEROHIVE, at all times be and remain the sole
                and exclusive property of VEROHIVE.<br></br>
                <br></br>
                4.1.2    The trademarks, logos, taglines, and service marks
                displayed on the Site (collectively, the “Trademarks”) are
                registered and unregistered Trademarks of VEROHIVE and others.
                The Trademarks may not generally be used in any advertising or
                publicity, or otherwise to indicate VEROHIVE&#39;s sponsorship
                of or affiliation with any product, service, event, or
                organization without VEROHIVE&#39;s prior express written
                permission. VEROHIVE acknowledges the Trademarks of other
                organizations for their respective products or services
                mentioned on the Site. Any rights not expressly granted in these
                Terms or on the IP Pages are reserved by VEROHIVE and Megshoot,
                LLC. Other than as provided in these Terms incorporated herein
                by reference, your use of the Trademarks, or any other VEROHIVE
                content, is strictly prohibited.
                <br></br>
                <br></br>
                4.1.3    Copyright. VEROHIVE respects copyright law and expects
                its users to do the same. If you believe that any content or
                material on the Site infringes copyrights you own, please notify
                us in accordance with our Copyright Policy.<br></br>
                <br></br>
                4.2       Software Use Restrictions. Software available for
                downloading through the Site or third-party websites or
                applications (the “Software”) is the copyrighted work of
                VEROHIVE and third-party providers. Use of the Software is
                governed by these Terms. Unauthorized reproduction or
                distribution of the Software is expressly prohibited by law, and
                may result in civil and criminal penalties. Violators may be
                prosecuted. <br></br>
                <br></br>
                4.3 Your Content. You agree that you are solely responsible for
                the content (&quot;Content&quot;) sent or transmitted by you or
                displayed or uploaded by you in using the Services and for
                compliance with all Laws pertaining to the Content, including,
                but not limited to, Laws requiring You to obtain the consent of
                a third party to use the Content and to provide appropriate
                notices of third party rights. You represent and warrant that
                you have the right to upload the Content to VEROHIVE and that
                such use does not violate or infringe on any rights of any third
                party. Under no circumstances will VEROHIVE be liable in any way
                for any
                <br></br> (a) Content that is transmitted or viewed while using
                the Services, <br></br>
                (b) errors or omissions in the Content, or<br></br>
                (c) any loss or damage of any kind incurred as a result of the
                use of, access to, or denial of access to Content. Although
                VEROHIVE is not responsible for any Content, VEROHIVE may delete
                any Content, at any time without notice to you, if VEROHIVE
                becomes aware that it violates any provision of this Agreement,
                or any law. You retain copyright and any other rights You
                already hold in Content which You submit, post or display on or
                through, the Services.<br></br>
                <br></br>
                4.4       Non-eDocument Content and Submissions/User Content. 
                <br></br>
                4.4.1    Submissions. The Site or VEROHIVE Services may enable
                you to submit, post, upload, or otherwise make available
                (collectively, &quot;Post&quot;) content such as questions,
                public messages, ideas, product feedback, comments, and other
                content (collectively, &quot;User Content&quot;) that may or may
                not be viewable by other users. If you Post User Content, unless
                we indicate otherwise, you grant us a nonexclusive, royalty-
                free, and fully sub-licensable right to access, view, use,
                reproduce, modify, adapt, publish, translate, create derivative
                works from, distribute, copy, and display such User Content
                throughout the world in any form, media, or technology now known
                or hereafter developed. You also permit any other user to view,
                copy, access, store, or reproduce such User Content for that
                user’s personal use. You grant us the right to use the name and
                other information about you that you submit in connection with
                such User Content. You represent and warrant that:
                <br></br>
                <br></br>(a) you own or otherwise control all of the rights to
                the User Content that you Post;<br></br>
                <br></br>
                (b) the User Content you Post is truthful and accurate; and{" "}
                <br></br>
                <br></br>
                (c) use of the User Content you Post does not violate these
                Terms or any applicable laws. For the avoidance of doubt, User
                Content does not include any video (streaming or stored) or
                documents shared peer to peer, such as a contract, disclosure,
                or notice that you share through the VEROHIVE platform(s) for
                processing (“eDocuments”).
                <br></br>
                <br></br>
                4.4.2    Screening &amp; Removal. You acknowledge and agree that
                VEROHIVE and its designees may or may not, at VEROHIVE&#39;s
                discretion, pre-screen User Content before its appearance on the
                Site or VEROHIVE Services, but that VEROHIVE has no obligation
                to do so. You further acknowledge and agree that VEROHIVE
                reserves the right (but does not assume the obligation) in its
                sole discretion to reject, move, edit, or remove any User
                Content that is contributed to the Site or VEROHIVE Services.
                Without limiting the foregoing,VEROHIVE and its designees shall
                have the right to remove any User Content that violates these
                Terms or is otherwise objectionable in VEROHIVE&#39;s sole
                discretion. You acknowledge and agree that VEROHIVE does not
                verify, adopt, ratify, or sanction User Content, and you agree
                that you must evaluate and bear all risks associated with your
                use of User Content or your reliance on the accuracy,
                completeness, or usefulness of User Content.
                <br></br>
                <br></br>
                5.        RESTRICTIONS ON USE OF THE SITE <br></br>
                <br></br>
                5.1       By using the Site or associated applications,
                including any VEROHIVE Service, you specifically agree not to
                engage in any activity or transmit any information that, in our
                sole discretion:
                <br></br>
                <br></br>
                a) Is illegal, or violates any federal, state, or local law or
                regulation;<br></br>
                b) Advocates illegal activity or discusses illegal activities
                with the intent to commit them;<br></br>
                c) Violates any third-party right, including, but not limited
                to, right of privacy, right of publicity, copyright, trademark,
                patent, trade secret, or any other intellectual property or
                proprietary rights;<br></br>
                <br></br>
                d) Is harmful, threatening, abusive, harassing, tortious,
                indecent, defamatory, sexually explicit or pornographic,
                discriminatory, vulgar, profane, obscene, libelous, hate speech,
                violent or inciting violence, inflammatory, or otherwise
                objectionable;<br></br>
                <br></br>
                e) Interferes with any other party’s use and enjoyment of the
                Services;<br></br>
                <br></br>
                f) Attempts to impersonate another person or entity;<br></br>
                <br></br>
                g) Is commercial in a way that violates these Terms, including
                but not limited to, using the Site for spam, surveys, contests,
                pyramid schemes, or other advertising materials;<br></br>
                <br></br>
                h) Falsely states, misrepresents, or conceals your affiliation
                with another person or entity;<br></br>
                <br></br>
                i) Accesses or uses the account of another user without
                permission;
                <br></br>
                <br></br>
                j) Distributes computer viruses or other code, files, or
                programs that interrupt, destroy, or limit the functionality of
                any computer software or hardware or electronic communications
                equipment;
                <br></br>
                <br></br>
                k) Interferes with, disrupts, disables, overburdens, or destroys
                the functionality or use of any features of the Site, or the
                servers or networks connected to the Site, or any of the
                VEROHIVE Services;
                <br></br>
                <br></br>
                l) “Hacks” or accesses without permission our proprietary or
                confidential records, those of another user, or those of anyone
                else;<br></br>
                <br></br>
                m) Improperly solicits personal or sensitive information from
                other users including without limitation address, credit card or
                financial account information, or passwords;<br></br>
                <br></br>
                n) Decompiles, reverse engineers, disassembles, or otherwise
                attempts to derive source code from the Site, except as
                expressly permitted in these Terms or by law, unless and then
                only to the extent permitted by applicable law without consent;
                <br></br>
                <br></br>
                o) Removes, circumvents, disables, damages, or otherwise
                interferes with security- related features, or features that
                enforce limitations on use of the Site;<br></br>
                <br></br>
                p) Uses automated or manual means to violate the restrictions in
                any robot exclusion headers on the Site, if any, or bypasses or
                circumvents other measures employed to prevent or limit access,
                for example by engaging in practices such as “screen scraping,”
                “database scraping,” or any other activity with the purpose of
                obtaining lists of users or other information;<br></br>
                <br></br>
                q) Modifies, copies, scrapes or crawls, displays, distributes,
                publishes, licenses, sells, rents, leases, lends, transfers, or
                otherwise commercializes any materials or content on the Site;
                <br></br>
                <br></br>
                r) Uses the Services for benchmarking, or to compile information
                for a product or service;<br></br>
                <br></br>
                s) Downloads (other than through page caching necessary for
                personal use, or as otherwise expressly permitted by these
                Terms), distributes, posts, transmits, performs, reproduces,
                broadcasts, duplicates, uploads, licenses, creates derivative
                works from, or offers for sale any content or other information
                contained on or obtained from or through the Site or VEROHIVE
                Services, by any means except as provided for in these Terms or
                with the prior written consent of VEROHIVE; or<br></br>
                <br></br>
                t) Attempts to do any of the foregoing.<br></br>
                <br></br>
                If you believe content on the Site violates the above
                restrictions, please contact us here: privacytos at
                verohive.com.
                <br></br>
                <br></br>
                5.2       In addition, Customers shall not, and shall not permit
                others to, do the following with respect to the VEROHIVE
                Services:
                <br></br>
                <br></br>
                a) Use the VEROHIVE Services or allow access to them in a manner
                that circumvents contractual usage restrictions or that exceeds
                authorized use or usage metrics set forth in these Terms, any
                applicable Subscription Plan or VEROHIVE’s Reasonable Use Policy
                incorporated herein by reference;<br></br>
                <br></br>  b) License, sub-license, sell, re-sell, rent, lease,
                transfer, distribute or time share or otherwise make any portion
                of the VEROHIVE Services or VEROHIVE’s then- current technical
                and functional documentation for the VEROHIVE Services
                (“Documentation”) available for access by third parties except
                as otherwise expressly provided in these Terms; or<br></br>
                <br></br>
                c) Access or use the VEROHIVE Services or Documentation for the
                purpose of developing or operating products or services intended
                to be offered to third parties in competition with the VEROHIVE
                Services or allow access by a direct competitor of VEOHIVE.
                <br></br>
                <br></br>
                5.3       You may not frame the Site, place pop-up windows over
                its pages, or otherwise affect the display of its pages. You may
                link to the Site, provided that you acknowledge and agree that
                you will not link the Site to any website containing any
                inappropriate, profane, defamatory, infringing, obscene,
                indecent, or unlawful topic, name, material, or information or
                that violates any intellectual property, proprietary, privacy,
                or publicity rights. Any violation of this provision may, in our
                sole discretion, result in termination of your use of and access
                to the Site effective immediately.<br></br>
                <br></br>
                5.4       You acknowledge that we have no obligation to monitor
                your – or anyone else’s – access to or use of the Site for
                violations of these Terms, or to review or edit any content.
                However, we have the right to do so for the purpose of operating
                and improving the Site (including without limitation for fraud
                prevention, risk assessment, investigation and customer support
                purposes, analytics, and advertising), to ensure your compliance
                with these Terms and to comply with applicable law or the order
                or requirement of a court, consent decree, administrative agency
                or other governmental body.
                <br></br>
                <br></br>
                6.        PRIVACY<br></br>
                <br></br>
                6.1       VEROHIVE Privacy Policy. You acknowledge that except
                as described in these Terms or applicable Corporate Terms, the
                information you provide to us or that we collect will be used
                and protected as described in the VEROHIVE Privacy Policy
                <br></br>
                <br></br>
                6.2       Data Processing/Transfer. If Customer or Customer’s
                Affiliate is established in the United Kingdom, a Member State
                of the European Economic Area, or Switzerland, the Data
                Protection Attachment for VEROHIVE Signature found
                at:www.verohive.com/privacypolicy (“DPA”) applies to the
                processing of any Personal Data (as defined in Section 1 of the
                DPA).<br></br>
                <br></br>
                6.3       Access &amp; Disclosure. We may access, preserve, or
                share any of your information when we believe in good faith that
                such sharing is reasonably necessary to investigate, prevent, or
                take action regarding possible illegal activities or to comply
                with legal process (e.g. a subpoena or other legal process). We
                may also share your information in situations involving
                potential threats to the physical safety of any person,
                violations of the VEROHIVE Privacy Policy or our user agreements
                or terms; or to respond to the claims of violation of the rights
                of third parties and/or to protect the rights, property and
                safety of VEROHIVE, our employees, users, or the public. This
                may involve the sharing of your information with law
                enforcement, government agencies, courts, and/or other
                organizations.<br></br>
                <br></br>
                7.       TERMS SPECIFIC TO VEROHIVE SERVICES<br></br>
                <br></br>
                7.1       Right to Use VEROHIVE Services.  Subject to these
                Terms, VEROHIVE will provide the VEROHIVE Services to Customers
                in accordance with each Customer’s Subscription Plan, and
                VEROHIVE grants to each Customer a limited non-exclusive,
                non-transferrable right and license during the Term, solely for
                its internal business purposes and in accordance with the
                Documentation, to:
                <br></br>
                <br></br>
                <br></br>
                <br></br> (a) use the VEROHIVE Services;
                <br></br>
                <br></br> (b) implement, configure, and, through its Account
                Administrator(s), permit its Authorized Users to access and use
                the VEROHIVE Services up to any applicable limits or maximums;
                and
                <br></br>
                <br></br>(c) access and use the Documentation. <br></br>
                <br></br>
                7.1.1    Authorized Users.  Authorized Users of Customer must be
                identified by a unique email address and user name and two or
                more natural persons may not use the VEROHIVE Services as the
                same Authorized User. If the Authorized User is not an employee
                of Customer, use of the VEROHIVE Services will be allowed only
                if the user is under confidentiality and other obligations with
                Customer at least as restrictive as those in these Terms, and is
                accessing or using the VEROHIVE Services solely to support
                Customer’s internal business purposes.<br></br>
                <br></br>
                7.1.2    Account Administrator. Customer may assign and
                expressly authorize an Authorized User(s) as its agent to manage
                Customer’s Account, and management of Customer’s Account
                includes, without limitation, configuring administration
                settings, assigning access and use authorization, requesting
                different or additional services, providing usage and
                performance records, managing templates, executing approved
                campaigns and events, assisting in third-party product
                integrations, and accepting notices, disclosures, and terms and
                conditions (“Account Administrator”). Customer may appoint an
                employee, agent or a third-party business partner or contractor
                to act as its Account Administrator(s) and may change its
                designation at any time through its Account.
                <br></br>
                <br></br>
                7.1.3 VEROHIVE OBLIGATIONS FOR CONTENT. VEROHIVE will maintain
                reasonable physical and technical safeguards to prevent
                unauthorized disclosure of or access to Content, in accordance
                with industry standards. VEROHIVE will notify you if it becomes
                aware of unauthorized access to Content. VEROHIVE will not
                access, view or process Content except<br></br>
                <br></br> (a) as provided for in this Agreement and in
                VEROHIVE’s Privacy Policy; <br></br>
                <br></br>(b) as authorized or instructed by you, <br></br>
                <br></br>(c) as required to perform its obligations under this
                Agreement; or<br></br>
                <br></br> (d) as required by Law. VEROHIVE has no other
                obligations with respect to Content.<br></br>
                <br></br>
                7.1.4 INTENDED USE; RESTRICTION ON USE BY CHILDREN. The Services
                are intended for business use. You may choose to use the
                Services for other purposes, subject to the terms and
                limitations of this Agreement. VEROHIVE is not intended for use
                by individuals under the age of 18, unless it is through a
                Verified Educational Facility Subscriber using VEROHIVE for
                Education (K-12). Individuals under the age of 18 may not create
                accounts or use the Services except as described herein without
                parental consent.
                <br></br>
                <br></br>
                7.2       Payment Terms.<br></br>
                <br></br>
                7.2.1    Subscription Plan. The prices, features, and options of
                the VEROHIVE Services depend on the Subscription Plan selected
                as well as any changes instigated by Customer. VEROHIVE does not
                represent or warrant that a particular Subscription Plan will be
                offered indefinitely and reserves the right to change the prices
                for or alter the features and options in a particular
                Subscription Plan without prior notice.<br></br>
                <br></br>
                7.2.2    No Refunds. Customer will timely pay VEROHIVE all fees
                associated with its Subscription Plan, Account, or use of the
                VEROHIVE Services, including, but without limitation, by
                Authorized Users. CUSTOMER’S PAYMENTS ARE NON- REFUNDABLE EXCEPT
                AS EXPRESSLY PROVIDED IN THESE TERMS.<br></br>
                <br></br>
                 Charges for pre-paid Subscription Plans will be billed to
                Customer in advance. Charges for per-use purchases and standard
                Subscription Plan charges will be billed in arrears unless
                otherwise specified in the Subscription Plan.<br></br>
                <br></br>
                7.2.3    Recurring Charges. When you purchase a Subscription
                Plan, you must provide accurate and complete information for a
                valid payment method that you are authorized to use. You will be
                billed for your Subscription Plan either through the payment
                method you provide, such as a credit card, or through an
                intermediary provider such as iTunes, Google Play, or a similar
                app store (“App Store”). Customer must promptly notify VEROHIVE
                of any change in its invoicing address and must update its
                Account with any changes related to its payment method. BY
                COMPLETING REGISTRATION FOR A SUBSCRIPTION PLAN, CUSTOMER
                AUTHORIZES VEROHIVE OR ITS AGENT TO CHARGE ITS PAYMENT METHOD ON
                A RECURRING (E.G. MONTHLY OR YEARLY) BASIS (“AUTHORIZATION”)
                FOR:
                <br></br>
                <br></br> (a) THE APPLICABLE SUBSCRIPTION PLAN CHARGES;
                <br></br>
                <br></br> (b) ANY AND ALL APPLICABLE TAXES; AND
                <br></br>
                <br></br>(c) ANY OTHER CHARGES INCURRED IN CONNECTION WITH
                CUSTOMER’S USE OF THE VEROHIVE SERVICES. The Authorization
                continues through the applicable Subscription Term and any
                Renewal Term (as defined in Section 8.2.3, below) until Customer
                cancels as set forth in Section 8.2 of these Terms.   <br></br>
                <br></br>
                7.2.4    Late Fees &amp; Collection Costs. If VEROHIVE does not
                receive payment from Customer’s payment method, Customer agrees
                to pay all amounts due upon demand. Any amount not paid when due
                will be subject to finance charges equal to 1.5% of the unpaid
                balance per month or the highest rate permitted by applicable
                law, whichever is less, determined and compounded daily from the
                date due until the date paid. Customer will reimburse any costs
                or expenses (including, but not limited to, reasonable
                attorneys’ fees) incurred by VEROHIVE to collect any amount that
                is not paid when due. VEROHIVE may accept payment in any amount
                without prejudice to VEROHIVE’s right to recover the balance of
                the amount due or to pursue any other right or remedy. Amounts
                due to VEROHIVE may not be withheld or offset by Customer for
                any reason against amounts due or asserted to be due from
                VEROHIVE.<br></br>
                <br></br>
                7.2.5    Invoices. VEROHIVE will provide billing and usage
                information in a format we choose, which may change from time to
                time. VEROHIVE reserves the right to correct any errors or
                mistakes that it identifies even if it has already issued an
                invoice or received payment. Customer agrees to notify us about
                any billing problems or discrepancies within thirty (30) days
                after they first appear on your invoice. If Customer does not
                bring such problems/discrepancies to our attention within thirty
                (30) days, it agrees to waive its right to dispute such problems
                or discrepancies.
                <br></br>
                <br></br>
                7.2.6    Billing Cycles. Billing cycle end dates may change from
                time to time. When a billing cycle covers less than or more than
                a full month, we may make reasonable adjustments and/or
                prorations. Customer agrees that we may (at our option)
                accumulate charges incurred during a billing cycle and submit
                them as one or more aggregate charges during or at the end of a
                cycle, and that we may delay obtaining authorization or payment
                from Customer’s payment card issuer or App Store until
                submission of the accumulated charge(s). <br></br>
                <br></br>
                7.2.7    Benefit Programs. You may receive or be eligible for
                certain pricing structures, discounts, features, promotions, and
                other benefits (collectively, &quot;Benefits&quot;) through a
                business or government agreement with us (&quot;Business
                Terms&quot;). Any and all such Benefits are provided solely as a
                result of the corresponding Business Terms and such Benefits may
                be modified or terminated without notice. If you use the
                VEROHIVE Services and a business or government entity pays your
                charges or is otherwise liable for the charges, you authorize us
                to share your account information with that entity and/or its
                authorized agents. If you are enrolled in a Subscription Plan or
                receive certain Benefits tied to Business Terms with us, but you
                are liable for your own charges, then you authorize us to share
                enough account information to verify your continuing eligibility
                for those Benefits and the Subscription Plan.<br></br>
                <br></br>
                7.2.8    Tax Responsibility. All payments required by these
                Terms are stated exclusive of all taxes, duties, levies,
                imposts, fines, or similar governmental assessments, including
                sales and use taxes, value-added taxes (“VAT”), goods and
                services taxes (“GST”), excise, business, service, and similar
                transactional taxes imposed by any jurisdiction and the interest
                and penalties thereon, excluding taxes based on VEROHIVE’s net
                income (collectively, “Taxes”). Customer shall be responsible
                for and bear Taxes associated with its purchase of, payment for,
                access to or use of the VEROHIVE Services. Taxes shall not be
                deducted from the payments to VEROHIVE, except as required by
                law, in which case Customer shall increase the<br></br>
                <br></br>
                amount payable as necessary so that after making all required
                deductions and withholdings, VEROHIVE receives and retains (free
                from any Tax liability) an amount equal to the amount it would
                have received had no such deductions or withholdings been made.
                Customer hereby confirms that VEROHIVE can rely on the name and
                address set forth in its registration for a Subscription Plan as
                being the place of supply for Tax purposes. VEROHIVE’s and
                Customer’s obligations under this Section 7.2.8 (Tax
                Responsibility) shall survive the termination or expiration of
                these Terms.<br></br>
                <br></br>
                7.2.9    Intermediary Provider Billing. If your Subscription
                Plan is based on intermediary provider billing, your
                intermediary provider will automatically charge your App Store
                account monthly for the cost of the Subscription Plan and any
                applicable taxes. If you are not current with your Subscription
                Plan payments, we reserve the right to terminate your account,
                suspend your access to your Subscription Plan, or convert your
                Subscription Plan subscription to a non-subscription account.
                You will be responsible for paying all past due amounts.
                <br></br>
                <br></br>
                7.3       Free Trial and Special Offers for VEROHIVE Services.
                <br></br>
                <br></br>
                7.3.1    If you register for a free trial, promotional offer, or
                other type of limited offer for use of VEROHIVE Services (“Free
                Trial”), you may be presented with additional terms and
                conditions when registering for a Free Trial, and any such
                additional terms and conditions are hereby incorporated into
                these Terms by reference and are legally binding. This Section
                7.3 (Free Trial and Special Offers for VEOHIVE Services)
                supersedes and applies notwithstanding any conflicting
                provisions with regard to access and use of a Free Trial.
                <br></br>
                <br></br>
                7.3.2    VEROHIVE reserves the right to reduce the term of a
                trial period or end it altogether without prior notice.<br></br>
                <br></br>
                7.3.3    The version of the VEROHIVE Services that is available
                for a Free Trial may not include or allow access to all features
                or functions. ANY DATA THAT A CUSTOMER ENTERS INTO THE VEROHIVE
                SERVICES, AND ANY CONFIGURATIONS MADE BY OR FOR A CUSTOMER,
                DURING THE FREE TRIAL WILL BE PERMANENTLY LOST AT THE END OF THE
                TRIAL PERIOD UNLESS THE CUSTOMER: <br></br>
                <br></br>
                (a) PURCHASES A SUBSCRIPTION PLAN TO VEROHIVE SERVICES THAT IS
                EQUIVALENT TO OR GREATER THAN THOSE COVERED BY THE TRIAL; OR
                <br></br>
                <br></br>
                (b) EXPORTS SUCH DATA BEFORE THE END OF THE TRIAL PERIOD.
                <br></br>
                <br></br>
                7.3.4    Notwithstanding any other provision of these Terms,
                including without limitation the warranties described in Section
                9 (Warranties and Disclaimers) or any service-specific terms and
                conditions applicable to a particular VEROHIVE Service,
                including exhibits and attachments accompanying such schedule
                (“Service Schedule”), during a Free Trial the VEROHIVE Services
                are provided “AS IS” and “as available” without any warranty
                that may be set forth in these Terms, and<br></br>
                <br></br>
                VEROHIVE DISCLAIMS ANY IMPLIED WARRANTIES INCLUDING WITHOUT
                LIMITATION MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE
                AND VEROHIVE’S TOTAL AGGREGATE<br></br>
                <br></br>
                LIABILITY ARISING OUT OF OR RELATING TO CUSTOMER’S USE OF THE
                FREE TRIAL IS $100.<br></br>
                <br></br>
                7.4       Data.<br></br>
                <br></br>
                7.4.1    Data Generally. You shall be responsible for data that
                you provide or use in VEROHIVE Services. You are solely
                responsible for determining the suitability of the VEROHIVE
                Services for your business or organization and complying with
                any regulations, laws, or conventions applicable to the data you
                provide and your use of the VEROHIVE Services and Site.<br></br>
                <br></br>
                7.4.2    Personal Data. Customer warrants that its collection
                and use of any personal information or data provided while using
                the Site complies with all applicable data protection laws,
                rules, and regulations. Customer and its Authorized Users
                acknowledge that VEROHIVE may process such personal data in
                accordance with the VEROHIVE Privacy Policy.<br></br>
                <br></br>
                7.5       Customer Warranties. <br></br>
                <br></br>
                Customer hereby represents and warrants to VEROHIVE that:
                <br></br>
                <br></br> (a) it has all requisite rights and authority to use
                the VEROHIVE Services under these Terms and to grant all
                applicable rights herein;<br></br>
                <br></br> (b) it is responsible for all use of the VEROHIVE
                Services associated with its Account;<br></br>
                <br></br> (c) it is solely responsible for maintaining the
                confidentiality of its Account names and password(s);<br></br>
                <br></br> (d) it agrees to immediately notify VEROHIVE of any
                unauthorized use of Customer’s Account of which it becomes
                aware; <br></br>
                <br></br>(e) it agrees that VEROHIVE will not be liable for any
                losses incurred as a result of a third party&#39;s use of its
                Account, regardless of whether such use is with or without its
                knowledge and consent;<br></br>
                <br></br> (f) it will use the VEROHIVE Services for lawful
                purposes only and subject to these Terms; <br></br>
                <br></br>(g) any information it submits to VEROHIVE is true,
                accurate, and correct; and<br></br>
                <br></br> (h) it will not attempt to gain unauthorized access to
                the System or the VEROHIVE Services, other accounts,<br></br>
                <br></br>
                computer systems, or networks under the control or
                responsibility of VEROHIVE through hacking, cracking, password
                mining, or any other unauthorized means.<br></br>
                <br></br>
                7.6       Confidentiality.<br></br>
                <br></br>
                7.6.1    Confidential Information. “Confidential Information”
                means <br></br>
                <br></br>(a) for VEROHIVE, the VEROHIVE Services and
                Documentation;
                <br></br>
                <br></br> (b) for Customer, Customer Data;<br></br>
                <br></br> (c) any other information of a party that is disclosed
                in writing or orally and is designated as confidential or
                proprietary at the time of disclosure (and, in the case of oral
                disclosures, summarized in writing within thirty (30) days of
                the initial disclosure and delivered to the Recipient), or that
                due to the nature of the information the Recipient would clearly
                understand it to be confidential information of the disclosing
                party; and<br></br>
                <br></br> (d) the specific terms and conditions of these Terms,
                and any amendment and attachment thereof, between the parties.
                Confidential Information shall not include any information that:
                <br></br>
                <br></br> (i) was or becomes generally known to the public
                through no fault or breach of these Terms by the Recipient;{" "}
                <br></br>
                <br></br>(ii) was rightfully in the Recipient’s possession at
                the time of disclosure without restriction on use or disclosure;
                <br></br>
                <br></br> (iii) was independently developed by the Recipient
                without use of the disclosing party’s Confidential Information;
                or <br></br>
                <br></br>(iv) was rightfully obtained by the Recipient from a
                third party not under a duty of confidentiality and without
                restriction on use or disclosure. All information provided to
                VEROHIVE that is not Confidential Information will be treated in
                accordance with the VEROHIVE Privacy Policy. 7.6.2    Restricted
                Use and Nondisclosure. During and after the Subscription Term,
                the party receiving Confidential Information (“Recipient”) will:{" "}
                <br></br>
                <br></br>(a) use the Confidential Information of the other party
                solely for the purpose for which it is provided; <br></br>
                <br></br>(b) not disclose such Confidential Information to a
                third party, except on a need-to-know basis to its attorneys,
                auditors, consultants, and service providers who are under
                confidentiality obligations at least as restrictive as those
                contained herein; and <br></br>
                <br></br>(c) protect such Confidential Information from
                unauthorized use and disclosure to the same extent (but using no
                less than a reasonable degree of care) that it protects its own
                Confidential Information of a similar nature. Notwithstanding
                the foregoing, Customer expressly authorizes VEROHIVE to use and
                process Customer Data as described in the VEROHIVE Privacy
                Policy, which provides for, but is not limited to, delivering
                services as indicated by Customer’s use of the VEROHIVE Services
                and sharing Transaction Data with individuals who are authorized
                to view or participate in video meetings created by you.
                <br></br>
                <br></br>
                7.6.3    Required Disclosure. If VEOHIVE is required by law to
                disclose Confidential Information, VEROHIVE will give prompt
                written notice to Customer before making the disclosure, unless
                prohibited from doing so by the legal or administrative process,
                and assist Customer to obtain where reasonably available an
                order protecting the Confidential Information from public
                disclosure. 7.6.4    Ownership. Notwithstanding any other
                provision of these Terms, VEROHIVE acknowledges that, as between
                the parties, all Confidential Information it receives from
                Customer, including all copies thereof in Recipient’s possession
                or control, in any media, is proprietary to and exclusively
                owned by Customer. Nothing in these Terms grants VEROHIVE any
                right, title or interest in or to any of the Customer’s
                Confidential Information. VEROHIVE’s incorporation of the
                disclosing party’s Confidential Information into any of its own
                materials will not render Confidential Information
                non-confidential. 8.        TERM AND TERMINATION 8.1      
                Termination – Site Visitors. A Site Visitor may terminate its
                use of the Site at any time by ceasing further use of the Site.
                VEROHIVE may terminate your use of the Site and deny you access
                to the Site in our sole discretion for any reason or no reason,
                including for violation of these Terms. 8.2       Term and
                Termination – Customers. 8.2.1    Suspension of Access to
                VEROHIVE Services. VEROHIVE may suspend any use of the VEROHIVE
                Services, remove any content or disable or terminate any Account
                or Authorized User that VEROHIVE reasonably and in good faith
                believes violates these Terms. VEROHIVE will use commercially
                reasonable efforts to notify you prior to any such suspension or
                disablement, unless VEROHIVE reasonably believes that: (a) it is
                prohibited from doing so under applicable law or under legal
                process, such as court or government administrative agency
                processes, orders, mandates, and the like; or (b) it is
                necessary to delay notice in order to prevent imminent harm to
                the VEROHIVE Services or a third party. Under circumstances
                where notice is delayed, VEROHIVE will provide the notice if and
                when the related restrictions in the previous sentence no longer
                apply. 8.2.2    Term. The period of effectiveness of these Terms
                (“Term”), with respect to VEROHIVE Services, begins on the date
                the Customer accepts it and continues until the Customer’s
                Subscription Plan expires or its use of the VEROHIVE Services
                ceases (including as a result of termination in accordance with
                this Section 8.2), whichever is later. 8.2.3    Subscription
                Term and Automatic Renewals. VEROHIVE’s Subscription Plans
                automatically renew unless otherwise noted. If you purchase a
                Subscription Plan you agree to pay the then-current applicable
                fee associated with the Subscription Plan and further agree and
                acknowledge that it will automatically renew, unless, prior to
                the end of the current period of effectiveness of the
                Subscription Plan (“Subscription Term”): (a) you terminate your
                Account; (b) you set your Account not to auto-renew by logging
                in to VEROHIVE Services or contacting us here: privacytos at
                verohive.com; (c) VEROHIVE declines to renew your Subscription
                Plan; or (d) these Terms are otherwise properly terminated as
                expressly permitted herein. The Subscription Plan will
                automatically renew on a monthly or annual basis, depending on
                the method you choose (“Renewal Term”). Promotional codes may
                only be used for your first Subscription Term. If you purchased
                your Subscription Plan with a promotional code, each time your
                Subscription Plan renews you will be charged the full annual
                billing amount. If your Subscription Plan is ever terminated for
                any reason, and you purchase another Subscription Plan, you
                shall not be eligible to use a promotional code. We reserve the
                right to modify, terminate, or otherwise amend the fees and
                features associated with your Subscription Plan. We may also
                recommend that you purchase a new Subscription Plan that is
                comparable to your previous Subscription Plan that is ending.
                Before we change the fees and charges in effect, or add new fees
                and charges, we will give you advance notice of at least thirty
                (30) days. If we provide you such advance notice, your continued
                use of the VEROHIVE Services after the changes have been made
                will constitute your acceptance of the changes. If you do not
                wish to continue subscribing with the new fees or features, you
                may terminate your Subscription Plan as described in Section
                8.2.4. If you accept the new Subscription Plan, its terms and
                conditions with these Terms will apply in the Renewal Term and
                thereafter. 8.2.4    Termination by Customer. You may terminate
                your Account at any time upon ten (10) days’ advance written
                notice to VEROHIVE. If you wish to terminate, you must provide
                notice by contacting privacytos at verohive.com. If you
                purchased your Subscription Plan through an external service,
                such as an App Store, you must use the tools made available by
                those services to manage and/or terminate your Subscription
                Plan. Section 7.2.2 notwithstanding, if a Customer terminates
                its annual Subscription Plan within the first thirty (30) days
                of the initial Subscription Term, it may submit a written
                request to VEROHIVE for a refund of the fees paid to VEROHIVE
                for the initial Subscription Term, which VEROHIVE will consider,
                without obligation, in good faith. VEROHIVE has no obligation to
                consider refund requests related to a termination of a
                Subscription Plan if the termination does not occur in the first
                thirty (30) days of the initial Subscription Term, or if there
                has been a violation of other Terms herein, or if records
                indicate substantial productive use took place during that
                period. 8.2.5    Default; Termination by VEROHIVE. A Customer
                will be in default of these Terms if: (a) it fails to timely pay
                any amount owed to us or an Affiliate of ours; (b) it or an
                Authorized User associated with its Account breaches any
                provision of these Terms or violates any published policy
                applicable to the VEROHIVE Services; (c) it is or becomes
                subject to any proceeding under the Bankruptcy Code or similar
                laws; or (d) if, in our sole discretion, we believe that
                continued use of the VEROHIVE Services by the Customer (or its
                Authorized Users or signers) creates legal risk for VEROHIVE or
                presents a threat to the security of the VEROHIVE Services or
                VEROHIVE’s customers. If a Customer is in default, we may,
                without notice: (i) suspend its Account and use of the VEROHIVE
                Services; (ii) terminate its Account; (iii) charge reactivation
                fees in order to reactivate its Account; and (iv) pursue any
                other remedy available to us. A VEROHIVE “Affiliate” means any
                legal entity that Megahoot, LLC. owns, that owns VEROHIVE. or
                that is under common control with VEROHIVE, Inc.  A Customer
                “Affiliate” means any legal entity that Customer owns, that owns
                Customer or that is under common control with Customer.
                “Control” and “own” mean possessing greater than 50% interest in
                an entity or the right to direct the management of the entity.
                8.2.6    Effect of Termination. If these Terms expires or are
                terminated for any reason: (a) Customer will pay to VEROHIVE any
                amounts that have accrued before, and remain unpaid as of, the
                date of the termination or expiration, including those for the
                billing cycle in which termination occurs; (b) any and all of
                Customer’s liabilities to VEROHIVE that have accrued before the
                effective date of the expiration or termination will survive;
                (c) licenses and use rights granted to Customer with respect to
                the Site and VEROHIVE Services and intellectual property will
                immediately terminate; (d) VEROHIVE’s obligation to provide any
                further services to Customer under these Terms will immediately
                terminate, except any such services that are expressly to be
                provided following expiration or termination of these Terms; and
                (e) the provisions of Section 3 (Usage and Access Rights),
                Section 4 (Ownership), Section 5.3 (Restrictions on Use of the
                Site), Section 5.4 (Compliance with Terms), Section 6 (Privacy),
                Section 7.2.2 (No Refunds), Section 7.2.7 (Benefit Programs),
                Section 7.2.8 (Tax Responsibility), Section 7.3 (Free Trial and
                Special Offers for VEROHIVE Services), Section 7.4 (Data),
                Section 7.6 (Confidentiality), Section 8.2.6 (Effect of
                Termination), Section 9 (Warranties and Disclaimers), Section 10
                (Indemnification Obligations), Section 11 (Limitations of
                Liability), and Section 12 (General) will survive, as well as
                provisions designated to survive under any Service Schedules and
                accompanying attachments and Exhibits to these Terms.  9.     
                WARRANTIES AND DISCLAIMERS THE VEROHIVE SERVICES, DOCUMENTATION,
                AND SITE ARE PROVIDED “AS IS” AND “AS AVAILABLE.” YOUR USE OF
                THE VEROHIVE SERVICES, DOCUMENTATION, AND SITE SHALL BE AT YOUR
                SOLE RISK. VEROHIVE AND ITS RESPECTIVE OFFICERS, DIRECTORS,
                EMPLOYEES, MEMBERS, SHAREHOLDERS, AGENTS, AFFILIATES,
                SUBSIDIARIES, AND LICENSORS (“VEROHIVE PARTIES”): (a) MAKES NO
                ADDITIONAL REPRESENTATION OR WARRANTY OF ANY KIND WHETHER
                EXPRESS, IMPLIED (EITHER IN FACT OR BY OPERATION OF LAW), OR
                STATUTORY, AS TO ANY MATTER WHATSOEVER; (b) EXPRESSLY DISCLAIMS
                ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, QUALITY, ACCURACY, AND TITLE; AND (c) DOES
                NOT WARRANT THAT THE VEROHIVE SERVICES, DOCUMENTATION, OR SITE
                ARE OR WILL BE ERROR-FREE, WILL MEET YOUR REQUIREMENTS, OR BE
                TIMELY OR SECURE. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE
                RESULTING FROM USE OF THE VEROHIVE SERVICES, DOCUMENTATION, OR
                SITE.  THE VEROHIVE PARTIES MAKE NO WARRANTIES OR
                REPRESENTATIONS THAT VEROHIVE SERVICES, DOCUMENTATION, AND SITE
                HAVE BEEN AND WILL BE PROVIDED WITH DUE SKILL, CARE AND
                DILIGENCE OR ABOUT THE ACCURACY OR COMPLETENESS OF THE VEROHIVE
                SERVICES, DOCUMENTATION, AND SITE CONTENT AND ASSUMES NO
                RESPONSIBILITY FOR ANY: (i) ERRORS, MISTAKES, OR INACCURACIES OF
                CONTENT; (ii) PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE
                WHATSOEVER RESULTING FROM YOUR ACCESS TO AND USE OF VEROHIVE
                SERVICES, DOCUMENTATION, AND SITE; (iii) ANY UNAUTHORIZED ACCESS
                TO OR USE OF OUR SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                AND/OR FINANCIAL INFORMATION STORED THEREIN; (iv) ANY
                INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE;
                (v) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE
                TRANSMITTED TO OR THROUGH THE SITE THROUGH THE ACTIONS OF ANY
                THIRD PARTY; (vi) ANY LOSS OF YOUR DATA OR CONTENT FROM THE
                SITE; AND/OR (vii) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR
                ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
                OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE
                AVAILABLE VIA VEROHIVE SERVICES, DOCUMENTATION, AND SITE. YOU
                WILL NOT HAVE THE RIGHT TO MAKE OR PASS ON ANY REPRESENTATION OR
                WARRANTY ON BEHALF OF VEROHIVE TO ANY THIRD PARTY. BECAUSE SOME
                STATES AND JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED
                WARRANTIES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN THAT
                EVENT, SUCH WARRANTIES ARE LIMITED TO THE MAXIMUM EXTENT
                PERMITTED BY AND FOR THE MINIMUM WARRANTY PERIOD ALLOWED BY THE
                MANDATORY APPLICABLE LAW. If you are a California resident, you
                hereby waive California Civil Code §1542, which says: “A general
                release does not extend to claims which the creditor does not
                know or suspect to exist in his favor at the time of executing
                the release, which if known by him must have materially affected
                his settlement with the debtor.” This release includes the
                criminal acts of others. Some jurisdictions do not allow the
                exclusion of certain warranties or the limitation or exclusion
                of liability for incidental or consequential damages such as in
                this Section 9 or below in Section 11. Accordingly, some of
                these limitations may not apply to you. If you are a New Jersey
                resident, or a resident of another state that permits the
                exclusion of these warranties and liabilities, then the
                limitations in Section 9 and Section 11 specifically do apply to
                you. 10.     INDEMNIFICATION OBLIGATIONS You will defend,
                indemnify, and hold us, our Affiliates, officers, directors,
                employees, suppliers, consultants, and agents harmless from any
                and all third-party claims, liability, damages, and costs
                (including, but not limited to, attorneys&#39; fees) arising
                from or related to, as applicable: (a) your access to and use of
                the Site; (b) violation of these Terms by you or your Account
                Administrator(s) or Authorized Users, as applicable; (c)
                infringement of any intellectual property or other right of any
                person or entity by you; (d) the nature and content of all
                Customer Data processed by the VEROHIVE Services; or (e)  any
                products or services purchased or obtained by you in connection
                with the Site. VEROHIVE retains the exclusive right to settle,
                compromise, and pay, without your prior consent, any and all
                claims or causes of action that are brought against us. We
                reserve the right, at your expense, to assume the exclusive
                defense and control of any matter for which you are required to
                indemnify us and you agree to cooperate with our defense of
                these claims. You agree not to settle any matter in which we are
                named as a defendant and/or for which you have indemnity
                obligations without our prior written consent. We will use
                reasonable efforts to notify you of any such claim, action, or
                proceeding upon becoming aware of it. 11.     LIMITATIONS OF
                LIABILITY 11.1     Disclaimer of Consequential
                Damages. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED IN
                THESE TERMS, VEROHIVE WILL NOT, UNDER ANY CIRCUMSTANCES, BE
                LIABLE TO YOU FOR ANY CONSEQUENTIAL, INCIDENTAL, SPECIAL, COVER,
                PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATED TO THE
                TRANSACTIONS CONTEMPLATED UNDER THESE TERMS, INCLUDING, BUT NOT
                LIMITED TO, GOODWILL, WORK STOPPAGE, LOST PROFITS, OR LOSS OF
                BUSINESS, EVEN IF APPRISED OF THE LIKELIHOOD OF SUCH LOSSES, AND
                WHETHER SUCH CLAIMS ARE MADE BASED ON CONTRACT, TORT (INCLUDING
                NEGLIGENCE), OR ANY OTHER LEGAL THEORY. TO THE FULLEST EXTENT
                PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE VEROHIVE
                PARTIES BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL,
                SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING
                FROM ANY: (a) USE OF THE SITE, DOCUMENTATION, OR VEROHIVE
                SERVICES; (b) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (c)
                PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE WHATSOEVER
                RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE,
                DOCUMENTATION, OR VEROHIVE SERVICES; (d) ANY UNAUTHORIZED ACCESS
                TO OR USE OF OUR SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                AND/OR FINANCIAL INFORMATION STORED THEREIN; (e) ANY
                INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR
                SERVERS; (f) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT
                MAY BE TRANSMITTED TO OR THROUGH THE SITE, DOCUMENTATION, OR
                VEROHIVE SERVICES BY ANY THIRD PARTY; (g) ANY LOSS OF YOUR DATA
                OR CONTENT FROM THE SITE, DOCUMENTATION, OR VEROHIVE SERVICES;
                (h) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR
                DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY
                CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
                SITE, DOCUMENTATION, OR VEROHIVE SERVICES, WHETHER BASED ON
                WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
                LEGAL THEORY, AND WHETHER OR NOT THE VEROHIVE PARTIES ARE
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; AND/OR (i) THE
                DISCLOSURE OF INFORMATION PURSUANT TO THESE TERMS OR OUR PRIVACY
                POLICY. Some countries and jurisdictions do not allow the
                limitation or exclusion of consequential, direct, indirect, or
                other damages in contracts with consumers and to the extent you
                are a consumer the limitations or exclusions in this Section
                11.1 may not apply to you. 11.2     Cap on Damages. OUR TOTAL
                LIABILITY TO YOU FOR ANY CAUSE OF ACTION ARISING OUT OF OR
                RELATED TO THESE TERMS OR TO YOUR USE OF THE SITE (INCLUDING
                WITHOUT LIMITATION WARRANTY CLAIMS), REGARDLESS OF THE FORUM AND
                REGARDLESS OF WHETHER ANY ACTION OR CLAIM IS BASED ON CONTRACT,
                TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL OR EQUITABLE
                THEORY, WILL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO VEROHIVE
                FOR THE VEROHIVE SERVICE(S) GIVING RISE TO THE CLAIM UNDER THESE
                TERMS DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE DATE OF
                THE FIRST EVENT GIVING RISE TO LIABILITY, OR $100, WHICEVER IS
                GREATER. THE EXISTENCE OF MORE THAN ONE CLAIM SHALL NOT ENLARGE
                THIS LIMIT. 11.3     Independent Allocations of Risk. Each
                provision of these Terms that provides for a limitation of
                liability, disclaimer of warranties, or exclusion of damages
                represents an agreed allocation of the risks of these Terms
                between the parties. This allocation is an essential element of
                the basis of the bargain between the parties. Each of these
                provisions is severable and independent of all other provisions
                of these Terms, and each of these provisions will apply even if
                the warranties in these Terms have failed of their essential
                purpose. 11.4    Jurisdictional Limitations.  11.4.1  Because
                some states and jurisdictions do not allow limitation of
                liability in certain instances, portions of the above limitation
                may not apply to you. In that event, such exclusions and
                limitations shall apply to the maximum extent permitted by
                applicable mandatory law (and our liability shall be limited or
                excluded as permitted under mandatory applicable law). If you
                are a New Jersey resident, the limitations in Section 11
                specifically do apply to you. 11.4.2  VEROHIVE’s liability to
                you if you are domiciled in Germany is limited as described in
                Section 12.9 below. 12.      GENERAL     12.1     Third Party
                Content. We may provide. VEROHIVE IS NOT RESPONSIBLE FOR THE
                CONTENT ON THE INTERNET OR WEB PAGES THAT ARE LOCATED OUTSIDE
                THE SITE OR POSTS OF USER CONTENT. Your correspondence or
                business dealings with, or participation in promotions of,
                advertisers or partners found on or through the Site, including
                payment and delivery of related goods or services, and any other
                terms, conditions, warranties, or representations associated
                with such dealings, are solely between you and such advertiser
                or partner. You agree that we are not responsible or liable for
                any loss or damage of any sort incurred as the result of any
                such dealings or as the result of the presence of such
                advertisers or links to third-party web sites or resources on
                the Site. 12.2     Relationship. At all times, you and VEROHIVE
                are independent contractors, and are not the agents or
                representatives of the other. These Terms are not intended to
                create a joint venture, partnership, or franchise relationship
                between the parties. Non- parties do not benefit from and cannot
                enforce these Terms. There are no third-party beneficiaries to
                these Terms. You must not represent to anyone that you are an
                agent of VEROHIVE or are otherwise authorized to bind or commit
                VEROHIVE in any way without VEROHIVE’s prior written
                authorization. 12.3     EXPORT RESTRICTIONS. You acknowledge
                that the Services, or portion thereof may be subject to the
                export control laws of the United States and other applicable
                country export control and trade sanctions laws (“Export Control
                and Sanctions Laws”). You and your End Users may not access,
                use, export, re-export, divert, transfer or disclose any portion
                of the Services or any related technical information or
                materials, directly or indirectly, in violation of any
                applicable export control or trade sanctions law or regulation.
                You represent and warrant that (i) You and your End Users are
                not citizens of, or located within, a country or territory that
                is subject to U.S. trade sanctions or other significant trade
                restrictions (including without limitation Cuba, Iran, North
                Korea, Syria, and the Crimea) and that you and your End Users
                will not access or use the Services, or export, re-export,
                divert, or transfer the Services, in or to such countries or
                territories; (ii) You and your End Users are not identified on
                any U.S. government restricted party lists (including without
                limitation the U.S. Treasury Department’s List of Specially
                Designated Nationals and Blocked Persons and Foreign Sanctions
                Evaders List, the U.S. Department of Commerce’s Denied Parties
                List, Entity List, and Unverified List, and the U.S. Department
                of State proliferation-related lists); and (iii) that no Content
                created or submitted by you or your End Users is subject to any
                restriction on disclosure, transfer, download, export or
                re-export under the Export Control Laws. You are solely
                responsible for complying with the Export Control Laws and
                monitoring them for any modifications. 12.4 NO HIGH RISK USE.
                The Services are not designed or licensed for use in hazardous
                environments requiring fail-safe controls, including without
                limitation operation of nuclear facilities, aircraft
                navigation/communication systems, air traffic control, and life
                support or weapons systems. The Services shall not be used for
                or in any HIGH RISK environment.  12.5     Assignability. You
                may not assign your rights or obligations under these Terms
                without VEROHIVE’s prior written consent. If consent is given,
                these Terms will bind your successors and assigns. Any attempt
                by you to transfer your rights, duties, or obligations under
                these Terms except as expressly provided in these Terms is
                void. VEROHIVE may freely assign its rights, duties, and
                obligations under these Terms. 12.6      Notices. Except as
                otherwise permitted by these Terms, any notice required or
                permitted to be given in connection with the VEROHIVE Services
                will be effective only if it is in writing and sent using: (a)
                VEROHIVE Services; (b) by certified or registered mail; or (c)
                insured courier, to the appropriate party at the address set
                forth in Customer’s registration information or on the Site for
                VEROHIVE, with a copy, in the case of VEROHIVE, to
                privacypolicytos at verohive.com. Customer or VEROHIVE may
                change its address for receipt of notice by notice to the other
                party in accordance with this Section 12. Notices are deemed
                given upon receipt if delivered using VEROHIVE Services, two (2)
                business days following the date of mailing, or one (1) business
                day following delivery to a courier. 12.7      Force
                Majeure. Except for any payment obligations, neither you nor
                VEROHIVE will be liable for failure to perform any obligation
                under these Terms to the extent such failure is caused by a
                force majeure event (including acts of God, natural disasters,
                war, civil disturbance, action by governmental entity, strike,
                and other causes beyond the party’s reasonable control). The
                party affected by the force majeure event will provide notice to
                the other party within a commercially reasonable time and will
                use commercially reasonable efforts to resume performance as
                soon as practicable. Obligations not performed due to a force
                majeure event will be performed as soon as reasonably possible
                when the force majeure event concludes. 12.8 INJUNCTIVE
                RELIEF. You acknowledge that any use of the Services contrary to
                this Agreement, or any transfer, sublicensing, copying or
                disclosure of technical information or materials related to the
                Services, may cause irreparable injury to VEROHIVE, its
                Affiliates, suppliers and any other party authorized by VEROHIVE
                to resell, distribute, or promote the Services
                (&quot;Resellers&quot;), and under such circumstances VEROHIVE,
                its Affiliates, suppliers and Resellers will be entitled to
                equitable relief, without posting bond or other security,
                including, but not limited to, preliminary and permanent
                injunctive relief. 12.9     Mandatory Arbitration, Waiver of
                Class Actions Applicable to Customers.  PLEASE READ THIS SECTION
                CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO
                FILE A LAWSUIT IN COURT. 12.7.1 You agree that these Terms
                affect interstate commerce and that the Federal Arbitration Act
                governs the interpretation and enforcement of these arbitration
                provisions. This Section 12.7 is intended to be interpreted
                broadly and governs any and all disputes between us including
                but not limited to claims arising out of or relating to any
                aspect of the relationship between us, whether based in
                contract, tort, statute, fraud, misrepresentation, or any other
                legal theory; claims that arose before these Terms or any prior;
                and claims that may arise after the termination of these Terms.
                The only disputes excluded from this broad prohibition are the
                litigation of certain intellectual property as provided below.
                12.7.2 Initial Dispute Resolution. Most disputes can be resolved
                without resort to arbitration. If you have any dispute with us,
                you agree that before taking any formal action you will contact
                us at privacypolicytos at verohive.com provide a brief, written
                description of the dispute and your contact information
                (including your username, if your dispute relates to an
                Account). Except for intellectual property, you and VEROHIVE
                agree to use their reasonable efforts to settle any dispute,
                claim, question, or disagreement directly through consultation
                with VEROHIVE, and good faith negotiations shall be a condition
                to either party initiating a lawsuit or arbitration. 12.7.3
                Arbitrator’s Powers. The arbitrator, and not any federal, state,
                or local court or agency, shall have exclusive authority to
                resolve all disputes arising out of or relating to the
                interpretation, applicability, enforceability, or formation of
                these Terms, including but not limited to any claim that all or
                any part of these Terms is void or voidable, whether a claim is
                subject to arbitration or the question of waiver by litigation
                conduct. The arbitrator shall be empowered to grant whatever
                relief would be available in a court under law or in equity. The
                arbitrator&#39;s award shall be written and shall be binding on
                the parties and may be entered as a judgment in any court of
                competent jurisdiction. 12.7.4 Filing a Demand. To start an
                arbitration, you must do the following: (a) Write a Demand for
                Arbitration that includes a description of the claim and the
                amount of damages you seek to recover (you may find a copy of a
                Demand for Arbitration at www.jamsadr.com); (b) Send three
                copies of the Demand for Arbitration, plus the appropriate
                filing fee, to JAMS, Two Embarcadero Center, Suite 1500, San
                Francisco California 94111; and (c) Send one copy of the Demand
                for Arbitration to us at:privacypolicytos at verohive.com.
                12.7.5 No Jury Trial. The parties understand that, absent this
                mandatory arbitration section, they would have the right to sue
                in court and have a jury trial. They further understand that, in
                some instances, the costs of arbitration could exceed the costs
                of litigation and the right to discovery may be more limited in
                arbitration than in court. 12.7.6 Venue. Arbitration shall be
                initiated and take place in Delaware, United States, and you and
                VEROHIVE agree to submit to the personal jurisdiction of any
                federal or state court in Delaware in order to compel
                arbitration, stay proceedings pending arbitration, or to
                confirm, modify, vacate, or enter judgment on the award entered
                by the arbitrator. 12.7.7 Class Action Waiver. The parties
                further agree that the arbitration shall be conducted in the
                party’s respective individual capacities only and not as a class
                action or other representative action, and the parties expressly
                waive their right to file a class action or seek relief on a
                class basis. YOU AND VEROHIVE AGREE THAT EACH MAY BRING CLAIMS
                AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND
                NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
                REPRESENTATIVE PROCEEDING. If any court or arbitrator determines
                that the class action waiver set forth in this paragraph is void
                or unenforceable for any reason or that an arbitration can
                proceed on a class basis, then the arbitration provisions set
                forth above shall be deemed null and void in their entirety and
                the parties shall be deemed to have not agreed to arbitrate
                disputes. 12.7.8 Exception: Litigation of Intellectual
                Property. Notwithstanding the parties&#39; decision to resolve
                all disputes through arbitration, either party may bring
                enforcement actions, validity determinations, or claims arising
                from or relating to theft, piracy, or unauthorized use of
                intellectual property in any state or federal court with
                jurisdiction or in the U.S. Patent and Trademark Office to
                protect its intellectual property rights (“intellectual property
                rights” means patents, copyrights, moral rights, trademarks, and
                trade secrets, but not privacy or publicity rights). 12.7.9
                Survival. This Mandatory Arbitration, Waiver of Class Actions
                section shall survive any termination of your use of the Site.
                12.8     Entire Terms. These Terms, which include the language
                and paragraphs preceding Section 1, are the final, complete, and
                exclusive expression of the agreement between you and VEROHIVE
                regarding the VEROHIVE Services provided under these
                Terms. These Terms supersede and the parties disclaim any
                reliance on previous oral and written communications (including
                any confidentiality agreements pertaining to the VEROHIVE
                Services under these Terms) with respect to the subject matter
                hereof and apply to the exclusion of any other terms that you
                seek to impose or incorporate, or which are implied by trade,
                custom, practice or course of dealing. VEROHIVE hereby rejects
                any additional or conflicting terms appearing in a purchase
                order or any other ordering materials submitted by Customer and
                conditions assent solely based on these Terms and conditions of
                these Terms as offered by VEROHIVE. Except as explicitly
                permitted in these Terms, no modification or amendment of these
                Terms shall be effective unless it is in writing and signed by
                an authorized agent of the party against whom the modification
                or amendment is being asserted. In the event of an inconsistency
                or conflict, the order of precedence in descending order of
                control is as follows: (a) the Subscription Plan; (b) any
                attachments or appendix(ices) to the Service Schedule(s); (c)
                the Service Schedule; and (d) these Terms.  12.9   Governing Law
                &amp; Venue. These Terms will be interpreted, construed, and
                enforced in all respects in accordance with the local laws of
                the State of Delaware, U.S.A., without reference to its choice
                of law rules to the contrary. For purposes of determining the
                governing law, you and VEROHIVE agree that VEROHIVE is the
                proponent of these Terms. Notwithstanding Customer’s and
                VEROHIVE’s agreement to mandatory arbitration, either party may
                seek any interim or preliminary injunctive relief from a court
                of competent jurisdiction in Delaware, as necessary to protect
                the party&#39;s rights or property pending the completion of
                arbitration. Customer and VEROHIVE submit to the exclusive
                jurisdiction of, and venue in, any federal or state court of
                competent jurisdiction located in Delaware, U.S.A.
                12.10   Language and Translations. VEROHIVE may provide
                translations of these Terms or other terms or
                policies. Translations are provided for informational purposes
                and if there is an inconsistency or conflict between a
                translation and the English version, the English version will
                control. 12.11 Waiver. The waiver by either you or VEROHIVE of
                any breach of any provision of these Terms does not waive any
                other breach. The failure of any party to these Terms to insist
                on strict performance of any covenant or obligation in
                accordance with these Terms will not be a waiver of such party’s
                right to demand strict compliance in the future, nor will the
                same be construed as a novation of these Terms. 12.12  
                Severability. If any part of these Terms is found to be illegal,
                unenforceable, or invalid, the remaining portions of these Terms
                will remain in full force and effect. If any material limitation
                or restriction on the grant of any license to you under these
                Terms is found to be illegal, unenforceable, or invalid, the
                license will immediately terminate. 12.13 General
                Provisions. This Agreement embodies the entire understanding and
                agreement between the Parties respecting the subject matter of
                this Agreement and supersedes any and all prior understandings
                and agreements between the Parties respecting such subject
                matter, except that if you or your company have executed a
                separate written agreement or you have signed an order form
                referencing a separate agreement governing your use of the
                Services, then such agreement shall control to the extent that
                any provision of this Agreement conflicts with the terms of such
                agreement. VEROHIVE may elect to change or supplement the terms
                of this Agreement from time to time at its sole discretion.
                VEROHIVE will exercise commercially reasonable business efforts
                to provide notice to you of any material changes to this
                Agreement. Within ten (10) business days of posting changes to
                this Agreement (or ten (10) business days from the date of
                notice, if such is provided), they will be binding on you. If
                you do not agree with the changes, You should discontinue using
                the Services. If you continue using the Services after such ten-
                business-day period, You will be deemed to have accepted the
                changes to the terms of this Agreement. In order to participate
                in certain Services, You may be notified that you are required
                to download software and/or agree to additional terms and
                conditions. Unless expressly set forth in such additional terms
                and conditions, those additional terms are hereby incorporated
                into this Agreement. This Agreement has been prepared in the
                English Language and such version shall be controlling in all
                respects and any non-English version of this Agreement is solely
                for accommodation purposes.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                this.handleCloseTermsCondition();
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
        <div className="footer">
          <span style={{ fontSize: "1rem" }}>
            &copy; Megahoot. All Rights Reserved
          </span>
          <button
            onClick={() => this.handleClickOpenPrivacyPolicy()}
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              backgroundColor: "#033A5A",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Privacy Policy &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button
            onClick={() => this.handleClickOpenTermsCondition()}
            style={{
              cursor: "pointer",
              backgroundColor: "#033A5A",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Terms & Conditions
          </button>{" "}
        </div>
      </>
    );
  }
}

export default TermsCondition;
