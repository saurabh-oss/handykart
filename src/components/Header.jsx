import React, { Component } from 'react';
import logo from '../logo.png';
import CookieService from '../services/CookieService';
import UserService from '../services/UserService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
            firstPageLoadAfterLogin: true,
            invalidUser: false,
            userName: '',
            userEmail: '',
        };
        this.header = this.header.bind(this);
    }

    header() {
        this.props.history.push('/header');
    }

    componentDidMount() {
        if (document.cookie) {
            var result = CookieService.getUserDtls();

            if(result.isUserLoggedIn && result.userName.length > 0 && result.userEmail.length > 0) {
                this.setStateFromCookieAfterLogin(result);
            } else {
                this.setState({ isUserLoggedIn: false });
                this.setState({ userName: ''});
                this.setState({ userEmail: ''});
            }
        }
        document.getElementById('login-nav').style.display = "none";
    }

    async setStateFromCookieAfterLogin(result) {
        this.setState({ isUserLoggedIn: true });
        this.setState({ userName: result.userName });
        this.setState({ userEmail: result.userEmail });

        if((new Date().getTime() - result.loginTime) > 5000)
            this.state.firstPageLoadAfterLogin = false;
    }

    loginUser() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var loginTime = new Date().getTime();
        var payload = {
            userName: email,
            userPass: password
        };

        UserService.loginUser(payload).then(
            (res) => {
                console.log(res.data.userFullName);
                if(res.data.userFullName !== undefined && res.data.userFullName !== 'undefined') {
                    document.cookie = 'hkuser=' + res.data.userFullName + ';path=/';
                    document.cookie = 'hkemail=' + res.data.userEmailId + ';path=/';
                    document.cookie = 'hklogintime=' + loginTime + ';path=/';
                    this.setState(
                        {
                            isUserLoggedIn: true,
                            userName: res.data.userFullName
                        }
                    );
                    this.props.history.push('/');
                } else {
                    this.setState({invalidUser: true});
                }
            }
        ).catch(
            err => {
                this.setState({ serviceUnavailable: true })
                console.log(err.code);
                console.log(err.message);
                console.log(err.stack);
            }
        );
    }

    showLoginForm() {
        if(document.getElementById('login-nav').style.display === "none")
            document.getElementById('login-nav').style.display = "block";
        else
            document.getElementById('login-nav').style.display = "none";
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
                        <button id="login-btn" className="menu category" onClick={() => this.showLoginForm()}>Login</button>
                        <a href="/cart" className="cart-icon right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        </a>
                    </nav>
                    <nav className="navbar navbar-dark bg-dark login-form" id="login-nav">
                        <form className="form-inline">
                            <input id="email" type="email" className="form-control" placeholder="Email Address" required="required" />
                            &nbsp;&nbsp;&nbsp;
                            <input id="password" type="password" className="form-control" placeholder="Password" required="required" />
                            &nbsp;&nbsp;&nbsp;
                            <div className="form-group text-center"> <button type="button" className="btn btn-blue btn-block" onClick={() => this.loginUser()}>Login</button> </div>
                        </form>
                    </nav>
                    {
                        this.state.invalidUser && <div id="hideDiv2" role="alert">Invalid Email or Password !!</div>
                    }
                    {
                        this.state.serviceUnavailable && <div id="hideDiv2" role="alert">Sorry, Login service is currently unavailable 😟</div>
                    }
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
                        <a className="menu" href="/">My Orders</a>
                        <a className="menu" href="/logout">Logout</a>
                        <a href="/cart" className="cart-icon right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        </a>
                    </nav>
                    {
                        this.state.firstPageLoadAfterLogin && <div id="hideDiv" role="alert">You have successfully logged in !!</div>
                    }
                </div>
            );
        }
    }
}

export default Header
