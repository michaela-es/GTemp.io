import React from "react";
import LinkButton from "./LinkButton.jsx";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <LinkButton href="https://twitter.com">Twitter</LinkButton>
        <LinkButton href="https://facebook.com">Facebook</LinkButton>
        <LinkButton href="/faq">FAQ</LinkButton>
        <LinkButton href="/blog">Blog</LinkButton>
        <LinkButton href="/contact">Contact Us</LinkButton>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} GTemp.io. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
