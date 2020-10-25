import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import pimage from '../images/product.jpg';

class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productArr: []
        };
        this.listProducts = this.listProducts.bind(this);
    }

    componentDidMount() {
        Promise.all(
            [ProductService.listProducts()]
        ).then(
            (res) => {
                this.setState({ productArr: res[0].data });
            }
        )
    }

    listProducts() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row prow">
                {
                    this.state.productArr.map(
                        prod => 
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-10">
                                    <a href={"product/"+prod.id}><h4>{ prod.title }</h4></a>
                                </div>
                                <div className="col-sm-2">
                                    <h4>{ prod.price }</h4>
                                </div>
                            </div>
                            <div><img className="pimage" alt="" src={pimage} /></div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default ListProducts
