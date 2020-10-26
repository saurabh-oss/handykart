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
            <div className="cart-table">
                <br></br>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"><h5>Product</h5></th>
                            <th scope="col"><h5>Unit Price</h5></th>
                            <th scope="col"><h5>Quantity</h5></th>
                            <th scope="col"><h5>Price</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{cartItems[0].name}</td>
                            <td>₹ {cartItems[0].price}</td>
                            <td>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                </svg>
                                &nbsp;&nbsp;&nbsp;
                                <input className="quantity" value={cartItems[0].quantity}></input>
                                &nbsp;&nbsp;&nbsp;
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </td>
                            <td>₹ {cartItems[0].price * cartItems[0].quantity}</td>
                        </tr>
                        <tr>
                            <td>{cartItems[1].name}</td>
                            <td>₹ {cartItems[1].price}</td>
                            <td>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                </svg>
                                &nbsp;&nbsp;&nbsp;
                                <input className="quantity" value={cartItems[0].quantity}></input>
                                &nbsp;&nbsp;&nbsp;
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </td>
                            <td>₹ {cartItems[1].price * cartItems[0].quantity}</td>
                        </tr>
                    </tbody>
                </table>
                <hr></hr>
                <hr></hr>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"><h3>Total Amount</h3></th>
                            <th scope="col"><h3>₹ {cartItems[0].price * cartItems[0].quantity + cartItems[1].price * cartItems[0].quantity}</h3></th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

const cartItems = [
    {
        name: "Sky Blue Silk Cotton Chanderi Saree",
        price: '7250',
        quantity: 2
    },
    {
        name: "Royal Blue Silk Rajkot Ikat-Patola Saree",
        price: '19000',
        quantity: 3
    },
]

export default Cart
