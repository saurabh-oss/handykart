import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ListProducts from './components/ListProducts';
import ViewProduct from './components/ViewProduct';

function App () {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Switch>
                        <Route path="/" exact component={ListProducts}></Route>
                        <Route path="/product/:id" component={ViewProduct}></Route>
                        {}
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
