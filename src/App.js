import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./Components/Display/CartScreen";
import DetailsScreen from "./Components/Display/DetailsScreen";
import HomeScreen from "./Components/Display/HomeScreen";
import SignIn from "./Components/Display/SignIn";

function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

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
        <Link to="/signin">Sign In</Link>
         </div>

      </header>
      <main>
          <Route path="/" exact component={HomeScreen}></Route>
          <Route path="/cart/:id?"  component={CartScreen}></Route>
          <Route path="/products/:id" component={DetailsScreen} ></Route>
          <Route path="/signin" component={SignIn} ></Route>
      </main>
      <footer className="row center ">
        <p>Copyright &copy; {new Date().getFullYear()} Habib. All Rights Reserved</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
