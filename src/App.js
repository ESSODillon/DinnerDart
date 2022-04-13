import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useRole } from "./hooks/useRole";

// Pages and Components
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./pages/search/Search";
import Menu from "./pages/menu/Menu";
import Orders from "./pages/orders/Orders";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { role } = useRole();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {!user && <Redirect to="/login" />}
            {user && <Home />}
          </Route>
          <Route path="/profile">
            {!user && <Redirect to="/login" />}
            {user && <Profile />}
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
          <Route path="/orders">
            {!user && <Redirect to="/login" />}
            {role === "darter" && <Orders />}
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
        {user && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
