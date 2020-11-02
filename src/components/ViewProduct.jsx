import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import CookieService from '../services/CookieService';
import ServiceUnavailable from './common/ServiceUnavailable';
import Loader from './common/Loader';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            reviews: [],
            guestUser: false,
            dataLoaded: false,
            productServiceUnavailable: false,
            reviewServiceUnavailable: false,
            cartServiceUnavailable: false
        }
        this.viewProduct = this.viewProduct.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        Promise.all(
            [ProductService.viewProduct(id)]
        ).then(
            (results) => {
                console.log(results[0]);
                const productDetails = results[0];
                this.setState({ product: productDetails.data, dataLoaded: true });
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
                        this.setState({ cartServiceUnavailable: true })
                        console.log(err.code);
                        console.log(err.message);
                        console.log(err.stack);
                    }
                );
            } else {
                this.setState({ guestUser: true });
            }
        } else {
            this.setState({ guestUser: true });
        }
    }

    renderProductView() {
        return(
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
        );
    }

    render() {
        if(this.state.productServiceUnavailable === true) {
            return(
                <ServiceUnavailable />
            );
        } else {
            if(this.state.product !== null 
                && this.state.product !== undefined 
                && this.state.product.itemId !== null 
                && this.state.product.itemId !== ""
                && this.state.dataLoaded) {
                return (
                    <div>
                        { this.state.guestUser && <div id="hideDiv2" role="alert">Please Login !!</div> }
                        { this.state.cartServiceUnavailable && <div id="hideDiv2" role="alert">Sorry, Cart service is currently unavailable 😟</div> }
                            <div className="row container-fluid">
                                <div className="col-sm-1">&nbsp;</div>
                                <div className="col-sm-10 card product-card">
                                    <div className="row">
                                        <div className="col-sm-6"><h3 className="left product-header">{this.state.product.title}</h3></div>
                                        <div className="col-sm-6"><h3 className="right product-header">₹ {this.state.product.price}</h3></div>
                                    </div>

                                    {this.renderProductView()}
                                
                                    <a href="#shopHeader">
                                        <button className="btn btn-dark product-add" onClick={() => this.addToCart(this.state.product.itemId)}>Add to Cart</button>
                                    </a>

                                    {!this.state.reviewServiceUnavailable &&
                                    <div className="product-review">
                                        <h5><i>Reviews:</i></h5>
                                        <br></br>
                                        {this.state.reviews.length > 0 && this.state.reviews.map(
                                            review => 
                                            <div key={ review.id }>
                                                <b>{ review.reviewTitle }</b>
                                                <br></br>
                                                { review.reviewMessage }
                                                <br></br>
                                                <br></br>
                                            </div>
                                        )}
                                        {this.state.reviews.length <= 0 && <div>There are no reviews on this product yet.</div>}
                                    </div>
                                    }
                                    { this.state.reviewServiceUnavailable && <ServiceUnavailable /> }
                                </div>
                            <div className="col-sm-1">&nbsp;</div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <Loader />
                );
            }
        }
    }
}

export default ViewProduct
