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


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <Login {...routerProps} />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => <Signup {...routerProps} />}
            />
            <Route
              path="/search"
              exact
              render={(routerProps) => <Search {...routerProps} />}
            />
            <Route
              path="/favorites"
              exact
              render={(routerProps) => <Favorites {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

