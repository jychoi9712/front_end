import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Links from "./components/Links";
import NavLinks from "./components/NavLinks";

const isLogin = false;

function App() {
    return (
        // React Router Hooks
        <BrowserRouter>
            <Links />
            <NavLinks />
            <Switch>
                <Route
                    path="/login"
                    render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
                />
                <Route path="/profile/:id" component={Profile} />
                <Route path="/profile" component={Profile} />
                <Route path="/about" component={About} />
                <Route path="/" exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
