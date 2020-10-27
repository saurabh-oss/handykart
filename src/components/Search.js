import React, { Component } from 'react';

class Search extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><b><u>Categories:</u></b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Dress Material</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home Decor</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Masks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Silk Sarees</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Search
