import React, { Component } from 'react';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';
import Loader from './common/Loader';
import ServiceUnavailable from './common/ServiceUnavailable';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            orderTotal: 0,
            emptyCart: false,
            serviceUnavailable: false,
            guestUser: false
        }
        this.viewCart = this.viewCart.bind(this);
    }

    viewCart(id) {
        this.props.history.push('/cart');
    }

    componentDidMount() {
        var orderTotal = 0;
        var cartItems = [];
        if (document.cookie) {
            var result = CookieService.getUserDtls();

            if(result.isUserLoggedIn) {
                Promise.all(
                    [CartService.getCart(result.userEmail)]
                ).then(
                    (res) => {
                        console.log(res);

                        if(res[0].data.none === 'None') {
                            this.setState({ emptyCart: true })
                        } else {
                            cartItems = res[0].data.prodDetails;
                            for(var i=0; i < cartItems.length; i++) {
                                orderTotal = orderTotal + cartItems[i].price * cartItems[i].qty;
                            }
                            this.setState({
                                cartItems: cartItems,
                                orderTotal: orderTotal,
                                emptyCart: false
                            });
                        }
                        document.getElementById('shipping').style.display = "none";
                    }
                ).catch(
                    err => {
                        this.setState({ serviceUnavailable: true })
                        console.log(err.code);
                        console.log(err.message);
                        console.log(err.stack);
                    }
                )
            } else{
                this.setState({ guestUser: true });
            }
        } else {
            this.setState({ guestUser: true });
        }
    }
    
    updateQnty(obj, mode) {
        if (document.cookie) {
            var result = CookieService.getUserDtls();
            var qntyChange = 0;
            if(mode === 'reduce')
                qntyChange = -1;
            if(mode === 'add')
                qntyChange = 1;
            if(mode === 'delete')
                qntyChange = -(document.getElementById(obj).value);

            if(result.isUserLoggedIn) {
                var payload = {
                    userId: result.userEmail,
                    productList: [obj],
                    qtyList: [qntyChange]
                };
                console.log(">>>>>>>>>>" + payload);
                this.updateCart(payload);
            }
        }
    }

    updateCart(payload) {
        CartService.createCart(payload).then(
            (res) => {
                console.log('cart updated');
                this.props.history.push('/home');
                this.props.history.push('/cart');
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

    placeOrder() {
        if (document.cookie) {
            var result = CookieService.getUserDtls();
            var cartItems = this.state.cartItems;
            var today = new Date().toISOString().slice(0, 10)
            var someNumber = Math.floor((Math.random() * 9999999) + 1);;
            var productListArr = [];
            var qtyListArr = [];
            
            if(result.isUserLoggedIn) {
                for(var i=0; i < cartItems.length; i++) {
                    productListArr.push(cartItems[i].itemId);
                    qtyListArr.push(cartItems[i].qty);

                }

                var payload = {   
                    userId: result.userEmail,
                    productList: productListArr,
                    qtyList: qtyListArr,
                    orderAmt: document.getElementById("orderTotal").value,
                    orderId: someNumber,
                    orderDate: today,
                    addressLine1: document.getElementById("addressLine1").value,
                    addressLine2: document.getElementById("addressLine2").value,
                    city: document.getElementById("city").value,
                    state: document.getElementById("state").value,
                    zipCode: document.getElementById("zipCode").value
                };
                
                CartService.createOrder(payload).then(
                    (res) => {
                        console.log('Order created');
                        this.props.history.push('/order/' + someNumber);
                    }
                ).catch(
                    err => {
                        this.setState({ serviceUnavailable: true })
                        console.log(err.code);
                        console.log(err.message);
                        console.log(err.stack);
                    }
                );

                CartService.deleteCart(result.userEmail).then(
                    (resp) => {
                        console.log('cart deleted');
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

    renderCartItemsTable() {
        return(
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col"><h5>Product</h5></th>
                        <th scope="col"><h5>Unit Price</h5></th>
                        <th scope="col"><h5>Quantity</h5></th>
                        <th scope="col"><h5>Price</h5></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.cartItems.map(
                            listItems => 
                            <tr key={listItems.itemId}>
                                <td>{listItems.title}</td>
                                <td>₹ {listItems.price}</td>
                                <td>
                                    <svg onClick={() => this.updateQnty(listItems.itemId, 'reduce')} color="red" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-square cart-actions" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                    </svg>
                                    &nbsp;&nbsp;&nbsp;
                                    <input id={listItems.itemId} className="quantity" defaultValue={listItems.qty} readOnly={true}></input>
                                    &nbsp;&nbsp;&nbsp;
                                    <svg onClick={() => this.updateQnty(listItems.itemId, 'add')} color="green" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square cart-actions" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </td>
                                <td>
                                    ₹ {listItems.price * listItems.qty}
                                </td>
                                <td>
                                    <svg onClick={() => this.updateQnty(listItems.itemId, 'delete')} color="red" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash cart-actions" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </td>
                            </tr>
                        )
                    }
                    <tr><td><input type="hidden" id="orderTotal" value={this.state.orderTotal} /></td></tr>
                </tbody>
            </table>
        );
    }

    renderCartTotal() {
        return(
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col"><h3>Total Amount</h3></th>
                        <th scope="col"><h3>₹ {this.state.orderTotal}</h3></th>
                    </tr>
                </thead>
            </table>
        );
    }

    renderShippingForm() {
        return(
            <div className="shipping-form" id="shipping">
                <br></br>
                <h3>Shipping Details:</h3>
                <hr></hr>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <input type="text" className="form-control" id="addressLine1" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input type="text" className="form-control" id="addressLine2" placeholder="Apartment, studio, or floor" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="state">State</label>
                            <input type="text" className="form-control" id="state" />
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="zipCode">Zip</label>
                        <input type="text" className="form-control" id="zipCode" />
                        </div>
                    </div>
                    <br></br>
                    <button type="button" className="btn btn-success" onClick={() => this.placeOrder()}>Place your Order 👍</button>
                </form>
            </div>
        );
    }

    showShippingForm() {
        if(document.getElementById('shipping').style.display === "none") {
            document.getElementById('shipping').style.display = "block";
            document.getElementById('cart').style.marginBottom = "0";
        }
        else {
            document.getElementById('shipping').style.display = "none";
            document.getElementById('cart').style.marginBottom = "140px";
        }
    }

    render() {
        if(this.serviceUnavailable === true) {
            return(<ServiceUnavailable />);
        } else {
            if(this.state.cartItems.length > 0) {
                return(
                    <div>
                        <div className="cart-table" id="cart">
                            <br></br>
        
                            {this.renderCartItemsTable()}
    
                            {this.renderCartTotal()}
                            
                            <div>
                                <a href="#shipping-form"><button type="button" className="btn btn-success" onClick={() => this.showShippingForm()}>
                                Proceed to Checkout</button></a>
                            </div>
                        </div>
                        {this.renderShippingForm()}
                    </div>
                );
            } else {
                if(this.state.guestUser) {
                    return(
                        <div className="service-unavailable">
                            <br></br>
                            It seems, your are not logged in yet 😟
                            <br></br>
                            Please Register or Login !
                        </div>
                    );
                } else {
                    if(this.state.emptyCart) {
                        return(
                            <div className="service-unavailable">
                                <br></br>
                                You haven't added any items in your cart yet 😟
                                <br></br>
                                Please browse our collection and add your desired products.
                            </div>
                        );
                    } else
                        return(<Loader />);
                }
            }
        }
    }
}

export default Cart
