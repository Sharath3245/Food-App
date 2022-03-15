import { useContext } from "react";
import "./HeaderCartButton.css";
import CartIcon from "./CartIcon";
import CartContext from "../Store/CartContext";

function HeaderCartButton(props) {
  const cartctx = useContext(CartContext);
  const NoofCartItems = cartctx.item.reduce((curNumber, item) => {
    return curNumber + item.amount}
  , 0);
  return (
    <div>
      <button className="button" onClick={props.onClick}>
        <span className="icon">
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className="badge">{NoofCartItems}</span>
      </button>
    </div>
  );
}

export default HeaderCartButton;
