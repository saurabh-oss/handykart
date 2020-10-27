import React, { Component } from 'react';

class Logout extends Component {
    render () {
        document.cookie = 'user=;path=/';
        this.props.history.push('/');
        return(
            <div></div>
        );
    }
}

export default Logout
