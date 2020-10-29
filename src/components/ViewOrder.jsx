import React, { Component } from 'react';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            serviceUnavailable: false,
        }
        this.viewOrder = this.viewOrder.bind(this);
    }

    viewOrder(id) {
        this.props.history.push(`/order/${id}`);
    }

    componentDidMount() {
        if (document.cookie) {
            var result = CookieService.getUserDtls();
            
            if(result.isUserLoggedIn) {
                const { id } = this.props.match.params;
                Promise.all(
                    [CartService.getOrderById(id)]
                ).then(
                    (res) => {
                        //console.log(res);
                        this.setState({
                            cartItems: res[0].data.prodDetails
                        });
                        console.log(this.state.cartItems[0].title);
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
        }
    }

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
                            <td><h5>Product</h5></td>
                            <td><h5>Unit Price</h5></td>
                            <td><h5>Quantity</h5></td>
                            <td><h5>Price</h5></td>
                        </tr>
                        <tr>
                            <td>{this.state.cartItems[0].title}</td>
                            <td>₹ {this.state.cartItems[0].price}</td>
                            <td>
                                {this.state.cartItems[0].qty}
                            </td>
                            <td>₹ {this.state.cartItems[0].price * this.state.cartItems[0].qty}</td>
                        </tr>
                    </tbody>
                </table>
                <hr></hr>
                <hr></hr>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"><h3>Total Amount</h3></th>
                            <th scope="col"><h3>₹ {this.state.cartItems[0].price * this.state.cartItems[0].qty}</h3></th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default ViewOrder
