import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import ServiceUnavailable from './common/ServiceUnavailable';
import Loader from './common/Loader';

class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productArr: [],
            serviceUnavailable: false
        };
        this.listProducts = this.listProducts.bind(this);
    }

    componentDidMount() {
        this.fetchAllProducts();
    }

    listProducts() {
        this.props.history.push('/');
    }

    filterByTitle() {
        var searchTerm = document.getElementById('searchTerm').value;
        Promise.all(
            [ProductService.searchProductsByTitle(searchTerm)]
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

    renderSearch() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <form className="form-inline">
                    <input id="searchTerm" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button id="searchBtn" className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => this.filterByTitle()}>Search</button>
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
                    <ServiceUnavailable />
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
                        <Loader />
                    </div>
                );
            }
        }
    }
}

export default ListProducts
