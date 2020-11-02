import React, { Component } from 'react';
import './Register.css';
import UserService from '../services/UserService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUnavailable: false
        };
        this.register = this.register.bind(this);
    }

    register() {
        this.props.history.push('/register');
    }

    registerUser() {
        var fullname = document.getElementById('reg-fullname').value;
        var email = document.getElementById('reg-email').value;
        var phone = document.getElementById('reg-phone').value;
        var password = document.getElementById('reg-password').value;

        var userObj = {
            userEmailId: email,
            userPassword: password,
            userContactNo: phone,
            userFullName: fullname
        };
        
        Promise.all(
            [UserService.registerUser(userObj)]
        ).then(
            (res) => {
                console.log('User Registered');
                this.props.history.push(`/`);
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
            <div>
                { this.state.serviceUnavailable && <div id="hideDiv2" role="alert">Sorry, Registration service is currently unavailable 😟</div> }
                <div className="padding container d-flex justify-content-center">
                    <div className="col-md-10 col-md-offset-1">
                        <form className="signup-form was-validated">
                            <h2 className="text-center">Sign up for an account !</h2>
                            <hr></hr>
                            <div className="form-group"> <input id="reg-fullname" type="text" className="form-control" placeholder="Full Name" required="required" /> </div>
                            <div className="form-group"> <input id="reg-email" type="email" className="form-control" placeholder="Email Address" required="required" /> </div>
                            <div className="form-group"> <input id="reg-phone" type="phone" className="form-control" placeholder="Mobile Number" required="required" /> </div>
                            <div className="form-group"> <input id="reg-password" type="password" className="form-control" placeholder="Password" required="required" /> </div>
                            <div className="form-group text-center"> <button type="button" className="btn btn-blue btn-block" onClick={() => this.registerUser()}>Register</button> </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register
