import React, { Component } from 'react';
import logo from '../logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <div className="col-sm-10">
                            <div className="row right">
                                <div className="col-sm-10 right">
                                    <a className="menu" href="/">Home</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a className="menu" href="/register">Register</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a className="menu" href="/login">Login</a>
                                </div>
                                <div className="col-sm-2">
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header
