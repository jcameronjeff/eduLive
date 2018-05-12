import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import { Provider } from "react-redux";
import ClassRoom from "./components/ClassRoom";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import PropsRoute from "./components/common/PropsRoute";
import Quiz from "./components/quiz/Quiz";
import Chart from "./components/quiz/Chart";
import CanvasChart from "./components/quiz/CanvasChart";
import io from "socket.io-client";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PriChat from "./components/chat/PrivateChat/PriChat";
import Paint from "./components/paint/Paint";
const socket = io(window.location.origin);

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container-fluid">
              <div className="wrap">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PropsRoute
                  exact
                  path="/canvaschart"
                  component={CanvasChart}
                  socket={socket}
                />
                <PropsRoute
                  exact
                  path="/quiz"
                  component={Quiz}
                  socket={socket}
                />
                <PropsRoute
                  exact
                  path="/chart"
                  component={Chart}
                  socket={socket}
                />
                <PropsRoute
                  exact
                  path="/prichat"
                  component={PriChat}
                  socket={socket}
                />
                <PropsRoute
                  exact
                  path="/paint"
                  component={Paint}
                  socket={socket}
                />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/classroom"
                    component={ClassRoom}
                    socket={socket}
                  />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
