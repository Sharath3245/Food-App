import "./Modal.css";

import ReactDom from 'react-dom';
import  { Fragment } from "react";


const Backdrop=(props) =>{
  return <div className="backdrop" onClick={props.onYes}></div>;
}
const Modaloverlay=(props)=> {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
}
const portalelement= document.getElementById("sharath")
const Modal=(props)=> {
  return(
 <Fragment>


      {ReactDom.createPortal(<Backdrop onYes={props.onclose}/> , portalelement)}
      {ReactDom.createPortal(<Modaloverlay>{ props.children}</Modaloverlay> , portalelement)};

      </Fragment>
  )
 
   
}

export default Modal;
