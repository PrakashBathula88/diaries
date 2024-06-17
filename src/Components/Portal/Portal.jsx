import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../Portal/Portal.css" 

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.Onclose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
  
const portals = document.getElementById("Cart");

const CartPortal = (props) => {
  return (
    <Fragment>
      <div  className="aLL-BACK">
      {ReactDOM.createPortal(<Backdrop Onclose={props.Onclose} />, portals)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portals)}
      {/* <ModalOverlay>{props.children}</ModalOverlay> */}
      </div>
    </Fragment>
  );
};

export default CartPortal;
