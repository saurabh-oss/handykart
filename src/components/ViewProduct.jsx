import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            reviews: [],
            productServiceUnavailable: false,
            reviewServiceUnavailable: false
        }
        this.viewProduct = this.viewProduct.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        Promise.all(
            [ProductService.viewProduct(id)]
        ).then(
            (results) => {
                //console.log(results[0]);
                const productDetails = results[0];
                this.setState({ product: productDetails.data });
            }
        ).catch(
            err => {
                this.setState({ productServiceUnavailable: true })
                console.log(err.code);
                console.log(err.message);
                console.log(err.stack);
            }
        );

        Promise.all(
            [ProductService.listReviews(id)]
        ).then(
            (results) => {
                //console.log(results[0]);
                const reviewDetails = results[0];
                this.setState({ reviews: reviewDetails.data });
            }
        ).catch(
            err => {
                this.setState({ reviewServiceUnavailable: true })
                console.log(err.code);
                console.log(err.message);
                console.log(err.stack);
            }
        );
    }

    viewProduct(id) {
        this.props.history.push(`/product/${id}`);
    }

    addToCart(obj) {
        if (document.cookie) {
            var result = CookieService.getUserDtls();

            if(result.isUserLoggedIn) {
                var payload = {
                    userId: result.userEmail,
                    productList:  [obj],
                    qtyList:  ["1"]
                };
                CartService.createCart(payload).then(
                    (res) => {
                        console.log('cart updated');
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
        }
    }

    render() {
        if(this.state.productServiceUnavailable === true) {
            return(
                <div className="service-unavailable">
                    <svg width="10.625em" height="10em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                    </svg>
                    <br></br>
                    Sorry, it looks the service is currently unavailable 😟
                    <br></br>
                    Please try again after sometime.
                </div>
            );
        } else {
            if(this.state.product !== null && this.state.product !== undefined && this.state.product.id !== null) {
                return (
                    <div className="row container-fluid">
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-10 card product-card">
                            <div className="row">
                                <div className="col-sm-6"><h3 className="left product-header">{this.state.product.title}</h3></div>
                                <div className="col-sm-6"><h3 className="right product-header">₹ {this.state.product.price}</h3></div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6"><img alt="" src={'../images/' + this.state.product.itemId + '.jpg'} /></div>
                                <div className="col-sm-6">
                                    <br></br>
                                    <div className="left">
                                        <h5><i>Category: </i>{this.state.product.category}</h5>
                                    </div>
                                    <br></br>
                                    <div className="left">
                                        <i><b>Stock: </b></i>Only {this.state.product.inventory} items left !
                                    </div>
                                    <br></br>
                                    <div className="left">
                                        <h5><i>Description: </i></h5>{this.state.product.description}
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-dark product-add" onClick={() => this.addToCart(this.state.product.itemId)}>Add to Cart</button>

                            {!this.state.reviewServiceUnavailable &&
                                <div className="product-review">
                                    <h5><i>Reviews:</i></h5>
                                    <br></br>
                                    {
                                    this.state.reviews.map(
                                        review => 
                                        <div key={ review.id }>
                                        <b>{ review.reviewTitle }</b>
                                        <br></br>
                                        { review.reviewMessage }
                                        <br></br>
                                        <br></br>
                                        </div>
                                        )
                                    }
                                </div>
                            }
                            {this.state.reviewServiceUnavailable &&
                                <div className="service-unavailable">
                                    <svg width="10.625em" height="10em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                    </svg>
                                    <br></br>
                                    Sorry, it looks the service is currently unavailable 😟
                                    <br></br>
                                    Please try again after sometime.
                                </div>
                            }
                        </div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                );
            } else {
                return (
                    <div className="page-loader">
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-secondary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-info" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-dark" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default ViewProduct
