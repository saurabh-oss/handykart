import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import pimage from './images/product.jpg';
import './App.css';

class Product extends React.Component {
  addToCart(id) {
      cart.push(id);
      console.log(cart);
  }

  render() {
      return (
          <div id={this.props.id}>
              <div className="row">
                  <div className="col-sm-6 price"><h3 className="left">{this.props.title}</h3></div>
                  <div className="col-sm-6"><h3 className="right">{this.props.price}</h3></div>
              </div>
              <div className="row">
                  <div className="col-sm-12"><img className="pimage" alt="" src={pimage} /></div>
              </div>
              <div>
                  <div className="col-sm-12"><button className="pcart" onClick={() => this.addToCart(this.props.id)}>Add to Cart</button></div>
              </div>
          </div>
      );
  }
}

class ProductList extends React.Component {
  renderProduct(i) {
      return (
          <Product 
              id={products[i].id}
              title={products[i].title}
              price={products[i].price}
          />
      );
  }

  render() {
      return (
          <div className="row product-list">
              <div className="row prow">
                  <div className="col-sm-4">{this.renderProduct(0)}</div>
                  <div className="col-sm-4">{this.renderProduct(1)}</div>
                  <div className="col-sm-4">{this.renderProduct(2)}</div>
              </div>
              <div className="row prow">
                  <div className="col-sm-4">{this.renderProduct(3)}</div>
                  <div className="col-sm-4">{this.renderProduct(4)}</div>
                  <div className="col-sm-4">{this.renderProduct(5)}</div>
              </div>
              <div className="row prow">
                  <div className="col-sm-4">{this.renderProduct(6)}</div>
                  <div className="col-sm-4">{this.renderProduct(7)}</div>
                  <div className="col-sm-4">{this.renderProduct(8)}</div>
              </div>
          </div>
      );
  }
}

class Shop extends React.Component {
    getProducts() {
        return axios.get('https://api.github.com/organizations');
    }

    render() {
        /*
        Promise.all([this.getProducts()]).then(function (results) {
            const acct = results[0];
            console.log(acct.data[0]);
        });

        console.log("API Response: " + this.getProducts());
        */
        return (
            <div>
                <ProductList />
                <div className="row footer">
                    <div className="col-sm-12">Thank You for Shopping with Us !!</div>
                </div>
            </div>
        );
    }
}

function App () {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
            </svg>
          </header>
          <Shop />
        </div>
      );
}

const products = [
  {
      id: 1001,
      title: 'Clay Pot',
      price: 250,
  },
  {
      id: 1002,
      title: 'Basket',
      price: 590,
  },
  {
      id: 1003,
      title: 'Cups',
      price: 990,
  },
  {
      id: 1004,
      title: 'Wooden Tray',
      price: 1015,
  },
  {
      id: 1005,
      title: 'Wall Hanging',
      price: 1590,
  },
  {
      id: 1006,
      title: 'Mobile stand',
      price: 399,
  },
  {
      id: 1007,
      title: 'Cutting Board',
      price: 250,
  },
  {
      id: 1008,
      title: 'Wooden Chair',
      price: 1015,
  },
  {
      id: 1009,
      title: 'Winter Shawl',
      price: 2999,
  }
];

const cart = [];

export default App;
