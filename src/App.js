import { BrowserRouter, Link, Route } from "react-router-dom";
import DetailsScreen from "./Components/Display/DetailsScreen";
import HomeScreen from "./Components/Display/HomeScreen";

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
        <Link to="/" className="brand">cartGear</Link>
        </div>
         <div>
        <Link to="/">Cart</Link>
        <Link to="/">Sign In</Link>
         </div>

      </header>
      <main>
          <Route path="/" exact component={HomeScreen}></Route>
          <Route path="/products/:id" component={DetailsScreen} ></Route>
      </main>
      <footer className="row center ">
        <p>Copyright &copy {new Date().getFullYear()} Habib. All Rights Reserved</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
