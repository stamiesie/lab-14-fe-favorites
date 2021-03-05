import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                <NavLink className="nav-button" to="/">Home</NavLink>
                <NavLink className="nav-button" to="/search">Search</NavLink>
                {
                    (!this.props.user || !this.props.user.token) && <>
                        <NavLink className="nav-button" to="/login">Login</NavLink>
                        <NavLink className="nav-button" to="/signup">Signup</NavLink>
                    </>
                }

                {
                    this.props.user && this.props.user.token && <>
                        <NavLink className="nav-button" to="/favorites">Favorites</NavLink>
                        <button onClick={this.props.handleLogout}>Sign Out</button>
                    </>
                }
            </div>
        )
    }
}
