import React from "react";
import "./Footer.css";
import { CgCopyright } from "react-icons/cg";

function Footer() {
  return (
    <footer>
      ERP <CgCopyright /> {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
