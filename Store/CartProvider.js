import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultcartstate = {
  item: [],
  totalAmount: 0,
};
const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedtotalamount =
      state.totalAmount + action.item.price * action.item.amount;
      //console.log(updatedtotalamount)
    const exisitingcartitemindex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingitem = state.item[exisitingcartitemindex];
    //console.log(exisitingitem);
    let updateditems;
    if (exisitingitem) {
      const updateditem = {
        ...exisitingitem,
        amount: exisitingitem.amount + action.item.amount,
      };
      updateditems = [...state.item];
      //console.log(updateditems)
      updateditems[exisitingcartitemindex] = updateditem;
      console.log(updateditem)
    } else {
      updateditems = state.item.concat(action.item);
    }/////////////////////////////////////////////////////////////////////////////////**-* */

    return {
      item: updateditems,
      totalAmount: updatedtotalamount,
    };
  };
  if (action.type === "REMOVE") {
    const exisitingcartitemindex = state.item.findIndex(
      (item) => item.id === action.id
    );
    console.log(exisitingcartitemindex);
    console.log(state.item);
    
    const exisitingitem = state.item[exisitingcartitemindex];
    console.log(exisitingitem)
    const updatedtotalamount = state.totalAmount - exisitingitem.price;
    console.log(updatedtotalamount);
   
    let updateditems;
    if (exisitingitem.amount === 1) {
      updateditems = state.item.filter((item) => item.id !== action.id);
    } else {
      const updateditem = {
        ...exisitingitem,
        amount: exisitingitem.amount-1,
      };
      updateditems = [...state.item];
      console.log(updateditems)
      updateditems[exisitingcartitemindex] = updateditem;
    }
    return {
      item: updateditems,
      totalAmount:updatedtotalamount
    };
    
  }
  if (action.type==="clear")
  {
    return defaultcartstate;

  }

  return defaultcartstate;
};


function CartProvider(props) {
  const [cartstate, dispathacartaction] = useReducer(
    CartReducer,
    defaultcartstate
  );
  const addItemHandler = (item) => {
    return dispathacartaction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    return dispathacartaction({ type: "REMOVE", id: id });
  };
  const clearcarthandler=()=>{
    dispathacartaction({type:"clear"})
  };

  const cartContext = {
    item: cartstate.item,
    totalAmount: cartstate.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearcart:clearcarthandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
