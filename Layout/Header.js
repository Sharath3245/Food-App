import { Fragment } from "react";
import mealsimage from "../Assets/meals.jpg";
import './Header.css';
import  HeaderCartButton from './HeaderCartButton';
import { Link } from "react-router-dom";
import { auth } from "../Firebase";

function Header(props) {
  const userdetails=()=>{
    if(props.puser){
      auth.signOut();
    }
  }
  return (
    <Fragment>
      <header className="header">
        <h1>Foodie!</h1>
       <Link to={!props.puser &&"/login"}> <div className="signin" onClick={userdetails}><div className="hello">Hello</div>
       <div className="signinout">{props.puser?"signout":"signin"}</div></div></Link>
        < HeaderCartButton onClick={props.onshowCart}/>
      </header>
      <div className="main-image">
        <img src={mealsimage}  alt="Table full of food"/>
      </div>
    </Fragment>
  );
}
export default Header;
