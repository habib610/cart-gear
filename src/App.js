import { BrowserRouter, Link } from "react-router-dom";



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
          <div className="row">
            <h1>Home screen</h1>
          </div>
      </main>
      <footer className="row center ">
        <p>Copyright &copy {new Date().getFullYear()} Habib. All Rights Reserved</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
