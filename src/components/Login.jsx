import React, { Component } from 'react';
import './Register.css';

class Login extends Component {
    render() {
        return (
            <div className="padding container d-flex justify-content-center">
                <div className="col-md-10 col-md-offset-1">
                    <form className="signup-form">
                        <h2 className="text-center">Login</h2>
                        <hr></hr>
                        <div className="form-group"> <input type="email" className="form-control" placeholder="Email Address" required="required" /> </div>
                        <div className="form-group"> <input type="text" className="form-control" placeholder="Password" required="required" /> </div>
                        <div className="form-group text-center"> <button type="submit" className="btn btn-blue btn-block">Login</button> </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
