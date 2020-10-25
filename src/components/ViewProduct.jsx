import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import pimage from '../images/product.jpg';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
        this.viewProduct = this.viewProduct.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        Promise.all(
            [ProductService.viewProduct(id)]
        ).then(
            (res) => {
                this.setState({ product: res[0].data });
            }
        )
    }

    viewProduct(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6"><h3 className="left">{this.state.product.title}</h3></div>
                    <div className="col-sm-6"><h3 className="right">{this.state.product.price}</h3></div>
                </div>
                <div className="row">
                    <div className="col-sm-12"><img className="pimage" alt="" src={pimage} /></div>
                </div>
                <div>
                    <div className="col-sm-12"><button className="pcart" onClick={() => alert('added to cart')}>Add to Cart</button></div>
                </div>
          </div>
        );
    }
}

export default ViewProduct
