import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ListProducts from './components/ListProducts';
import ViewProduct from './components/ViewProduct';
import Register from './components/Register';
import Cart from './components/Cart';
import Logout from './components/Logout';
import ViewOrder from './components/ViewOrder';

function App () {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Switch>
                        <Route path="/" exact component={ListProducts}></Route>
                        <Route path="/product/:id" component={ViewProduct}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/order/:id" component={ViewOrder}></Route>
                        {}
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
