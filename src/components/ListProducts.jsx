import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';

class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productArr: [],
            serviceUnavailable: false
        };
        this.listProducts = this.listProducts.bind(this);
    }

    filterByCategory(searchTerm) {
        Promise.all(
            [ProductService.searchProductsByCategory(searchTerm)]
        ).then(
            (res) => {
                this.setState({ productArr: res[0].data });
                console.log(res);
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

    componentDidMount() {
        this.fetchAllProducts();
    }

    fetchAllProducts() {
        Promise.all(
            [ProductService.listProducts()]
        ).then(
            (res) => {
                this.setState({ productArr: res[0].data });
                //console.log(res);
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

    listProducts() {
        this.props.history.push('/');
    }

    addToCart(obj){
        alert(obj);
        var payload = {
            itemId: obj,
            qntyChange: 1
        };
        CartService.createCart(payload).then(
            (res) => {
                console.log('cart updated');
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

    renderLoader() {
        return (
            <div className="page-loader">
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    renderServiceUnavailable() {
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
        )
    }

    renderSearch() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <button className="nav-link category" onClick={() => this.fetchAllProducts()}><b><u>All Categories</u></b></button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link category" onClick={() => this.filterByCategory('Dress Material')}>Dress Material</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link category" onClick={() => this.filterByCategory('Home Decor')}>Home Decor</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link category" onClick={() => this.filterByCategory('Mask')}>Mask</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="nav-link category" onClick={() => this.filterByCategory('Saree')}>Saree</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

    renderProductList() {
        return(
            <div className="row container-fluid product-list d-flex justify-content-center">
                {
                    this.state.productArr.map(
                        prod => 
                        <div key={prod.itemId} className="col-sm-4 card product-card">
                            <div className="row container-fluid">
                                <div className="col-sm-9 left product-header">
                                    <a href={"product/"+prod.itemId}><h5>{ prod.title }</h5></a>
                                </div>
                                <div className="col-sm-3 right product-header">
                                    <h6>₹ { prod.price }</h6>
                                </div>
                            </div>
                            <div><img className="pimage" alt="" src={'../images/' + prod.itemId + '.jpg'} /></div>
                            <button className="btn btn-dark product-add" onClick={() => this.addToCart(prod.itemId)}>Add to Cart</button>
                        </div>
                    )
                }
            </div>
        )
    }

    render() {
        if(this.state.serviceUnavailable === true) {
            return(
                <div>
                    {this.renderSearch()}
                    {this.renderServiceUnavailable()}
                </div>
            );
        } else {
            if(this.state.productArr !== null && this.state.productArr !== undefined && this.state.productArr.length > 0) {
                return (
                    <div>
                        {this.renderSearch()}
                        {this.renderProductList()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderSearch()}
                        {this.renderLoader()}
                    </div>
                );
            }
        }
    }
}

export default ListProducts
