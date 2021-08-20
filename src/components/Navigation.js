import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <>
      <ul className="ulNav">
        <li>
          <Link to="/" className="homeLink">
            <FontAwesomeIcon
              icon={faTwitter}
              className="chatLogo"
              color={"#04AAFF"}
              size="2x"
            />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="profileLink">
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span className="profileText">
              {userObj.displayName
                ? `${userObj.displayName} 의 Profile`
                : "Add your Name"}
            </span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
