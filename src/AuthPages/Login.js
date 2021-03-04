import React, { Component } from 'react'
import { loginUser } from '../api-utils.js';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleEmailChange = (e) => this.setState({ email: e.target.value })

    handlePasswordChange = (e) => this.setState({ password: e.target.value })

    handleSubmit = async (e) => {
        e.preventDefault();

        // use POST function on auth/signin route for returning user
        const user = await loginUser(this.state.email, this.state.password)
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <label> Email Address:
                        <input value={this.state.email} onChange={this.handleEmailChange}></input>
                    </label>
                    <label> Password:
                        <input value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
