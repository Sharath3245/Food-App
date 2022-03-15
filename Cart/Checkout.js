import React, { useRef, useState } from "react";
import classes from "./Checkout.css";

const isempty = (value) => value.trim() === "";
const isfivechars = (value) => value.trim().length > 5;

function Checkout(props) {
  const [validity, setvalidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputref = useRef();
  const streetInputref = useRef();
  const postalInputref = useRef();
  const cityInputref = useRef();

  const preventHandler = (e) => {
    e.preventDefault();
    const enteredname = nameInputref.current.value;
    const streetname = streetInputref.current.value;
    const postalname = postalInputref.current.value;
    const cityname = cityInputref.current.value;

    const Data = {
      name: enteredname,
      street: streetname,
      postal: postalname,
      city: cityname,
    };
  

    const enterednameisvalid = !isempty(enteredname);
    const enteredstreetisvalid = !isempty(streetname);
    const enteredpostalisvalid = isfivechars(postalname);
    const enteredcityisvalid = !isempty(cityname);

    setvalidity({
      name: enterednameisvalid,
      street: enteredstreetisvalid,
      postal: enteredpostalisvalid,
      city: enteredcityisvalid,
    });

    const formisvalid =
      enteredcityisvalid &&
      enteredstreetisvalid &&
      enteredpostalisvalid &&
      enteredcityisvalid;

    if (!formisvalid) {
        console.log(formisvalid)
      return;
    }
    props.onuserdata(Data);
  };

  return (
    <div className="checkout">
    <form onSubmit={preventHandler} className={classes.form}>
      <div className={classes.control}>
        <label> Your Name</label>
        <br />
        <input type="text" id="name" ref={nameInputref} />
        {!validity.name && <p> please enter the valid name</p>}
      </div>

      <div className={classes.control}>
        <label>Street</label>
        <br />
        <input type="text" id="Street" ref={streetInputref} />
        {!validity.street && <p>please enter the proper street</p>}
      </div>
      <div className={classes.control}>
        <label>Postal Code</label>
        <br />
        <input type="text" id="postal" ref={postalInputref} />
        {!validity.postal && <p> please enter proper postal code</p>}
      </div>
      <div className={classes.control}>
        <label>City</label>
        <br />
        <input type="text" id="City" ref={cityInputref} />
        {!validity.city && <p>enter the valid City</p>}
      </div> 
      <div className={classes.control}>
          <button type="button"  onClick={props.cartclose}> Cancel</button>
        <button> confirm</button>
      </div>
    </form>
    </div>
  );
}

export default Checkout;
