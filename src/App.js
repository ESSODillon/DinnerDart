import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages and Components
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Search from "./pages/search/Search";
import Menu from "./pages/menu/Menu";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {!user && <Redirect to="/login" />}
            {user && <Home />}
          </Route>
          <Route path="/about">
            {!user && <Redirect to="/login" />}
            {user && <About />}
          </Route>
          <Route path="/cart">
            {!user && <Redirect to="/login" />}
            {user && <Cart />}
          </Route>
          <Route path="/search">
            {!user && <Redirect to="/login" />}
            {user && <Search />}
          </Route>
          <Route path="/restaurants/:id">
            {!user && <Redirect to="/login" />}
            {user && <Menu />}
          </Route>
          <Route path="/login">
            {user && <Redirect to="/" />}
            {!user && <Login />}
          </Route>
          <Route path="/signup">
            {user && <Redirect to="/" />}
            {!user && <Signup />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
