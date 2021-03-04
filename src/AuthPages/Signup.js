import React, { Component } from 'react'
import { signupUser } from '../api-utils.js';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
    }

    handleEmailChange = (e) => this.setState({ email: e.target.value })

    handlePasswordChange = (e) => this.setState({ password: e.target.value })

    handleSubmit = async (e) => {
        e.preventDefault();

        // call POST function on auth/signup route to sign up new user and get token
        const user = await signupUser(this.state.email, this.state.password);
    }
    render() {
        return (
            <div>
                <h1>Signup Page</h1>
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
