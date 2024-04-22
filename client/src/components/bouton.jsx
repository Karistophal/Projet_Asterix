import React from "react";
import "../assets/styles/bouton.css"

function Button({ taille, text, path, submit, onClick}) {
  let styleBtn = {
    padding: "10px 20px",
    fontSize: "14px"
  };

  switch (taille) {
    case "xs":
      styleBtn = {
        padding: "5px 10px",
        fontSize: "12px",
      };
      break;
    case "xl":
      styleBtn = {
        padding: "15px 40px",
        fontSize: "18px",
        fontWeight: "bold",
        letterSpacing: "0.6px"
      };
      break;
    default:
      break;
  }

  return (
    submit ? ( 
    <button type="submit" className="button" style={styleBtn} onClick={onClick}>{text}</button> 
  ) : (
  <a href={path} className="button" style={styleBtn}>{text}</a>)
  );
}

export default Button;
