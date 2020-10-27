import React, { Component } from 'react';
import './Register.css';
import UserService from '../services/UserService';

class Register extends Component {
    registerUser() {
        var fullname = document.getElementById('fullname').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        var userObj = {
            userEmailId: email,
            userPassword: password,
            userContactNo: '9865321245',
            userFullName: fullname
        };

        Promise.all(
            [UserService.registerUser(userObj)]
        ).then(
            (res) => {
                console.log('User Registered');
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
                        <h2 className="text-center">Sign up for an account !</h2>
                        <hr></hr>
                        <div className="form-group"> <input id="fullname" type="text" className="form-control" placeholder="Full Name" required="required" /> </div>
                        <div className="form-group"> <input id="email" type="email" className="form-control" placeholder="Email Address" required="required" /> </div>
                        <div className="form-group"> <input id="password" type="text" className="form-control" placeholder="Password" required="required" /> </div>
                        <div className="form-group text-center"> <button type="submit" className="btn btn-blue btn-block" onClick={() => this.registerUser()}>Register</button> </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register
