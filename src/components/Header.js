import React, { Component } from 'react';
import logo from '../logo.svg';
import CookieService from '../services/CookieService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
            userName: '',
            userEmail: '',
            forReload: ''
        };
    }

    componentDidMount() {
        if (document.cookie) {
            var result = CookieService.getUserDtls();

            if(result.isUserLoggedIn && result.userName.length > 0 && result.userEmail.length > 0) {
                this.setCookieAfterLogin(result);
            } else {
                this.setState({ isUserLoggedIn: false });
                this.setState({ userName: ''});
                this.setState({ userEmail: ''});
            }
        }
    }

    async setCookieAfterLogin(result) {
        this.setState({ isUserLoggedIn: true });
        this.setState({ userName: result.userName });
        this.setState({ userEmail: result.userEmail });
    }

    render() {
        if(!this.state.isUserLoggedIn) {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <img src={logo} className="App-logo" alt="logo" />
                        <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
                        <a className="menu" href="/">Home</a>
                        <a className="menu" href="/register">Register</a>
                        <a className="menu" href="/login">Login</a>
                        <a href="/cart" className="cart-icon right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        </a>
                    </nav>
                </div>
            );
        } else {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <img src={logo} className="App-logo" alt="logo" />
                        <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
                        <div className="welcome" id="wlcm" value=""><i>Welcome</i>, <b>{this.state.userName}</b>&nbsp;😎</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <a className="menu" href="/">Home</a>
                        <a className="menu" href="#">My Orders</a>
                        <a className="menu" href="/logout">Logout</a>
                        <a href="/cart" className="cart-icon right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        </a>
                    </nav>
                    <div id="hideDiv" role="alert">You have successfully logged in !!</div>
                </div>
            );
        }
    }
}

export default Header
