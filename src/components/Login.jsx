import React, { Component } from 'react';
import UserService from '../services/UserService';
import './Register.css';

class Login extends Component {
    loginUser() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        
        Promise.all(
            [UserService.loginUser(
                {
                    userName: email,
                    userPass: password
                }
            )]
        ).then(
            (res) => {
                console.log(res);
                document.cookie = 'user=' + email + ';path=/';
            }
        ).catch(
            err => {
                this.setState({ serviceUnavailable: true })
                console.log(err.code);
                console.log(err.message);
                console.log(err.stack);
            }
        );
        /*
        var userEQ = "user=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length;i++) {
            var c = ca[0];
            alert(c.substring(userEQ.length,c.length));
        }*/
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
                        <div className="form-group text-center"> <button type="submit" className="btn btn-blue btn-block" onClick={() => this.loginUser()}>Login</button> </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
