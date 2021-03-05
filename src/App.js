import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Components/Header.js';
import Home from './HomePage/Home.js';
import Login from './AuthPages/Login.js';
import Signup from './AuthPages/Signup.js';
import Search from './SearchPage/Search.js';
import Favorites from './Favorites/Favorites.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { getUserFromLocalStorage, putUserInLocalStorage } from './local-storage-utils';

export default class App extends Component {
  // See LS utils
  state = {
    user: getUserFromLocalStorage()
  }

  // Callback of token from child component.  Then using the token, add user to state (Passed UP to parent from Signup)
  handleUserChange = (user) => {
    this.setState({ user })

    // also need to add user/token to local storage
    putUserInLocalStorage(user);

    // pass handleUserChange down to Login and Signup pages, to set state/token/user on those pages
  }

  // this will clear out user
  handleLogout = () => {
    this.handleUserChange();
  }



  render() {
    return (
      <div>
        <Router>
          <Header
            user={this.state.user}
            handleLogout={this.handleLogout} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <Login {...routerProps}
                handleUserChange={this.handleUserChange} />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => <Signup {...routerProps}
                handleUserChange={this.handleUserChange} />}
            />
            <Route
              path="/search"
              exact
              render={(routerProps) => <Search {...routerProps}
                user={this.state.user} />}
            />
            <PrivateRoute
              path="/favorites"
              exact
              token={this.state.user && this.state.user.token}
              render={(routerProps) => <Favorites
                user={this.state.user}
                {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

