import React, { Component } from 'react';
import UserService from '../services/UserService';
import './Register.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUnavailable: false
        };
        this.loginPage = this.loginPage.bind(this);
    }

    loginPage() {
        this.props.history.push('/login');
    }

    loginUser() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var payload = {
            userName: email,
            userPass: password
        };

        UserService.loginUser(payload).then(
            (res) => {
                console.log(res.data.userFullName);
                document.cookie = 'hkuser=' + res.data.userFullName + ';path=/';
                document.cookie = 'hkemail=' + res.data.userEmailId + ';path=/';
                this.props.history.push('/');
                this.props.message = 'login';
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

    render() {
        return (
            <div className="padding container d-flex justify-content-center">
                <div className="col-md-10 col-md-offset-1">
                    <form className="signup-form">
                        <h2 className="text-center">Login</h2>
                        <hr></hr>
                        <div className="form-group"> <input id="email" type="email" className="form-control" placeholder="Email Address" required="required" /> </div>
                        <div className="form-group"> <input id="password" type="password" className="form-control" placeholder="Password" required="required" /> </div>
                        <div className="form-group text-center"> <button type="button" className="btn btn-blue btn-block" onClick={() => this.loginUser()}>Login</button> </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
