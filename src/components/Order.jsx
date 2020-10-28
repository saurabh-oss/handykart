import React, { Component } from 'react';

class Order extends Component {
    render() {
        return(
            <div className="cart-table">
                <br></br>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"><h3>Order Details</h3></th>
                            <th scope="col"><h5>ID: HK202010-8574654654</h5></th>
                            <th>&nbsp;</th>
                            <th scope="col"><h5>Date: 28-Oct-2020</h5></th>
                        </tr>
                    </thead>
                    <br></br>
                    <tbody>
                        <tr>
                            <td scope="col"><h5>Product</h5></td>
                            <td scope="col"><h5>Unit Price</h5></td>
                            <td scope="col"><h5>Quantity</h5></td>
                            <td scope="col"><h5>Price</h5></td>
                        </tr>
                        <tr>
                            <td>{cartItems[0].name}</td>
                            <td>₹ {cartItems[0].price}</td>
                            <td>
                                {cartItems[0].quantity}
                            </td>
                            <td>₹ {cartItems[0].price * cartItems[0].quantity}</td>
                        </tr>
                        <tr>
                            <td>{cartItems[1].name}</td>
                            <td>₹ {cartItems[1].price}</td>
                            <td>
                                {cartItems[0].quantity}
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
        itemId: 1001,
        name: "Sky Blue Silk Cotton Chanderi Saree",
        price: '7250',
        quantity: 2
    },
    {
        itemId: 1002,
        name: "Royal Blue Silk Rajkot Ikat-Patola Saree",
        price: '19000',
        quantity: 3
    },
]

export default Order
