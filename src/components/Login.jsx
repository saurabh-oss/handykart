import React, { Component } from 'react';
import './Register.css';

class Login extends Component {
    setUserName() {
        alert("Setting the cookie via JS");
        document.cookie = "user=Saurabh;path=/";
    }

    printUserName() {
        var userEQ = "user=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length;i++) {
            var c = ca[0];
            alert(c.substring(userEQ.length,c.length));
        }
    }

    render() {
        return (
            <div className="padding container d-flex justify-content-center">
                <div className="col-md-10 col-md-offset-1">
                    <form className="signup-form">
                        <h2 className="text-center">Login</h2>
                        <hr></hr>
                        <div className="form-group"> <input type="email" className="form-control" placeholder="Email Address" required="required" /> </div>
                        <div className="form-group"> <input type="text" className="form-control" placeholder="Password" required="required" /> </div>
                        <div className="form-group text-center"> <button type="submit" className="btn btn-blue btn-block" onClick={() => this.printUserName()}>Login</button> </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
