import React, { Component } from 'react';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        
    }

    viewCart(id) {
        this.props.history.push('/cart');
    }

    render() {
        return(
            <div>Cart data will be shown here</div>
        );
    }
}

export default Cart
