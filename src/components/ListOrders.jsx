import React, { Component } from 'react';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';
import Loader from './common/Loader';
import ServiceUnavailable from './common/ServiceUnavailable';

class ListOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            serviceUnavailable: false
        }
        this.ListOrders = this.ListOrders.bind(this);
    }

    componentDidMount() {
        if (document.cookie) {
            var result = CookieService.getUserDtls();
            
            if(result.isUserLoggedIn) {
                Promise.all(
                    [CartService.listOrders(result.userEmail)]
                ).then(
                    (result) => {
                        console.log(result[0].data);
                        this.setState(
                            {
                                orderItems: result[0].data
                            }
                        );
                        console.log(this.state.orderItems);
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

    ListOrders(id) {
        this.props.history.push('/my-orders');
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
                        <div className="orders-table">
                            <br></br>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"><h5>Order ID</h5></th>
                                        <th scope="col"><h5>Order Date</h5></th>
                                        <th scope="col"><h5>Order Amount</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.orderItems.map(
                                            order => 
                                            <tr key={order.orderId}>
                                                <td><a href={'/order/' + order.orderId}><b>{order.orderId}</b></a></td>
                                                <td>{order.orderDate}</td>
                                                <td>₹ {order.orderAmt}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
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

export default ListOrders
