import React from "react";
import "./LinkButton.css";

function LinkButton({ to, href, children }) {
  return (
    <a href={href || to} className="link-button" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default LinkButton;
