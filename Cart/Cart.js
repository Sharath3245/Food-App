import React, { useContext, useState } from "react";
import "./Cart.css";
import Modal from "../UI/Modal";
import CartContext from "../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [submitorder, setsubmitorder] = useState(false);
  const [didsubmit, setdidsubmit] = useState(false);
  const [IsCheckout, setIsCheckout] = useState(false);
  const Addhandleritem = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const removehandleritem = (id) => {
    cartctx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartctx = useContext(CartContext);
  const totalamount = cartctx.totalAmount;
  const hasitems = cartctx.item.length > 0;
  const cartItems = (
    <ul className="cartitems">
      {cartctx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removehandleritem.bind(null, item.id)}
          onAdd={Addhandleritem.bind(null, item)}
        />
      ))}
    </ul>
  );
  const d = new Date();
  let text = d.toLocaleString();
  const SubmitdataHandler = async (userData) => {
    setsubmitorder(true);
    await fetch(
      "https://sharath-e1aa4-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          time: text,
          user: userData,
          ordereditems: cartctx.itemss,
        }),
      }
    );
    setsubmitorder(false);
    setdidsubmit(true);
    cartctx.clearcart();
  };

 
  const Actions = (
    <div className="actions">
      <button className="close" onClick={props.onClose}>
        Close
      </button>
      {hasitems && (
        <button className="order" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartmodal = (
    <React.Fragment>
      <div>
        <div className="cart-items">
          <div>
            <span>{cartItems}</span>
          </div>
        </div>
        <div className="total">
          <span>Total Amount</span>
          <span>{totalamount}</span>
        </div>
        <div className="checkoutpage">
          {IsCheckout && (
            <Checkout
              cartclose={props.onClose}
              onuserdata={SubmitdataHandler}
            />
          )}
          {!IsCheckout && Actions}
        </div>
      </div>
    </React.Fragment>
  );
  const submittingdatawait=<p>Sending order data....</p>
  const didsubmitorder=<p>Relax! Order Confirmed</p>
  return <Modal onclose={props.onClose}>
    {!submitorder && !didsubmit &&cartmodal}
    {submitorder && submittingdatawait}
    {!submitorder&&didsubmit&&didsubmitorder}
    </Modal>;
}

export default Cart;
