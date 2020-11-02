import React, { Component } from 'react';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';
import Loader from './common/Loader';
import ServiceUnavailable from './common/ServiceUnavailable';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            orderId: '',
            orderDate: '',
            orderTotal: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            serviceUnavailable: false
        }
        this.viewOrder = this.viewOrder.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (document.cookie) {
            var result = CookieService.getUserDtls();
            
            if(result.isUserLoggedIn) {
                Promise.all(
                    [CartService.getOrderById(id)]
                ).then(
                    (result) => {
                        console.log(result[0].data);
                        this.setState(
                            {
                                orderItems: result[0].data.prodDetails,
                                orderId: result[0].data.orderId,
                                orderDate: result[0].data.orderDate,
                                orderTotal: result[0].data.orderAmt,
                                addressLine1: result[0].data.addressLine1,
                                addressLine2: result[0].data.addressLine2,
                                city: result[0].data.city,
                                state: result[0].data.state,
                                zipCode: result[0].data.zipCode
                            }
                        );
                        //console.log(this.state.orderItems[0]);
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

    viewOrder(id) {
        this.props.history.push(`/order/${id}`);
    }

    render() {
        if(this.state.productServiceUnavailable === true) {
            return(
                <ServiceUnavailable />
            );
        } else {
            if(this.state.orderItems !== null && this.state.orderItems !== undefined && this.state.orderItems.id !== null) {
                return(
                    <div>
                        <div className="cart-table">
                            <br></br>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"><h3>Order Details</h3></th>
                                        <th scope="col"><h5>ID: {this.state.orderId}</h5></th>
                                        <th>&nbsp;</th>
                                        <th scope="col"><h5>Date: {this.state.orderDate}</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h5>Product</h5></td>
                                        <td><h5>Unit Price</h5></td>
                                        <td><h5>Quantity</h5></td>
                                        <td><h5>Price</h5></td>
                                    </tr>
                                    {
                                        this.state.orderItems.map(
                                            order => 
                                            <tr>
                                                <td>{order.title}</td>
                                                <td>₹ {order.price}</td>
                                                <td>
                                                    {order.qty}
                                                </td>
                                                <td>₹ {order.price * order.qty}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <hr></hr>
                            <table className="table">
                                <tr>
                                    <td>
                                        <b>Shipping Address: </b>
                                        {this.state.addressLine1},&nbsp;
                                        {this.state.addressLine2},&nbsp;
                                        {this.state.city},&nbsp;
                                        {this.state.state},&nbsp;
                                        {this.state.zipCode}
                                    </td>
                                </tr>
                            </table>
                            <hr></hr>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"><h3>Total Amount</h3></th>
                                        <th scope="col"><h3>₹ {this.state.orderTotal}</h3></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Loader />
                );
            }
        }
    }
}

export default ViewOrder
