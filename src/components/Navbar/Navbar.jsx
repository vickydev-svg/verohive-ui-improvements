import React from "react";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className="Navbar">
      <ul className="list">
        <li className="listItem">
          <a
            href="https://www.verohive.com/"
            target="_blank"
            className="listItemLinked"
          >
            Learn about VeroHive
          </a>
        </li>
        <li className="listItem">
          <a
            href="https://www.verohive.com/verohive-town-hall/"
            className="listItemLinked"
            target="_blank"
          >
            VeroHive
          </a>
        </li>
        <li className="listItem">
          <a
            href="https://www.verohive.com/video-podcasting/"
            className="listItemLinked"
            target="_blank"
          >
            Video Podcasting
          </a>
        </li>
        <li className="listItem">
          <a
            href="https://www.verohive.com/verohive-faq/"
            className="listItemLinked"
            target="_blank"
          >
            VeroHive FAQ
          </a>
        </li>
        <li className="listItem">
          <a
            href="https://www.verohive.com/megahoot-pricing-and-plans/"
            className="listItemLinked"
            target="_blank"
          >
            Pricing and Plans
          </a>
        </li>
        <li className="listItem">
          <a
            href="https://www.megahoot.com/"
            className="listItemLinked"
            target="_blank"
          >
            MegaHoot Tech
          </a>
        </li>
      </ul>
    </div>
  );
}
