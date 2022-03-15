import { useState,useEffect } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";
import Authentication from "./components/Authentication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {auth} from './components/Firebase';

function App() {
  const[puser,setpuser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
     setpuser(user)}
      else{
        setpuser(null)
      }
    })
console.log(puser)
  },[])
  const [CartIsShown, setCartIsShown] = useState(false);
  const ShowcartHandler = () => {
    setCartIsShown(true);
  };
  const HidecartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Authentication />
            </Route>
            <Route path="/">
              {CartIsShown && <Cart onClose={HidecartHandler} />}
              <Header onshowCart={ShowcartHandler} puser={puser}/>

              <Meals />
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
