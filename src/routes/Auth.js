import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiFillGithub, AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import AuthForm from "../components/AuthForm";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  // Social login function
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <div className="authContainer">
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <AuthForm />
        <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
            Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button onClick={onSocialClick} name="github" className="authBtn">
            Continue with Github <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
        <div className="footer">
          <footer className="footer__text">
            &copy; {new Date().getFullYear()} Jacob Ko
          </footer>
          <div className="footer__logo">
            <a href="https://jacobko.info/" target="_blank" rel="noreferrer">
              <AiOutlineHome />
            </a>
            <a
              href="https://github.com/jacobkosmart"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub />
              <a href="mailto: jacobkosmart@gmail.com">
                <AiOutlineMail />
              </a>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
