import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { userSignOutActions } from "./Components/Actions/userActions";
import CartScreen from "./Components/Display/CartScreen";
import DetailsScreen from "./Components/Display/DetailsScreen";
import HomeScreen from "./Components/Display/HomeScreen";
import PaymentMethod from "./Components/Display/PaymentMethod";
import PlaceOrder from "./Components/Display/OrderPlace";
import Register from "./Components/Display/Register";
import ShippingAddress from "./Components/Display/ShippingAddress";
import SignIn from "./Components/Display/SignIn";
import OrderSummary from "./Components/Display/OrderSummary";
import OrderHistory from "./Components/Display/OrderHistory";
import OrderHistoryScreen from "./Components/Display/OrderHistory";

function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const singInInfo = useSelector(state => state.singInInfo);
  const {userInfo} = singInInfo;
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(userSignOutActions())
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
        <Link to="/" className="brand">cartGear</Link>
        </div>
         <div>
        <Link to="/cart">Cart {
          cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )
        } </Link>
        {
          userInfo ? (
            <div className="dropdown">
              <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
              <ul className="dropdown-item">
                <li>
                <Link onClick={ signOut} to="#signout">Signout</Link>
                </li>
                <li>
                <Link to="/history">Order History</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )
        }

         </div>

      </header>
      <main>
         
          <Route path="/" exact component={HomeScreen}></Route>
          <Route path="/cart/:id?"  component={CartScreen}></Route>
          <Route path="/products/:id" component={DetailsScreen} ></Route>
          <Route path="/signin" component={SignIn} ></Route>
          <Route path="/register" component={Register} ></Route>
          <Route path="/shipping" component={ShippingAddress} ></Route>
          <Route path="/payment" component={PaymentMethod} ></Route>
          <Route path="/placeorder" component={PlaceOrder} ></Route>
          <Route path="/history" component={OrderHistoryScreen}></Route>
          <Route path="/order/:id" component={OrderSummary} ></Route>
      </main>
      <footer className="row center ">
        <p>Copyright &copy; {new Date().getFullYear()} Habib. All Rights Reserved</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
