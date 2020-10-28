import React, { Component } from 'react';

class Shipping extends Component {
    placeOrder() {
        this.props.history.push('/order');
    }

    render() {
        return(
            <div className="shipping-form">
                <br></br>
                <h3>Shipping Details:</h3>
                <hr></hr>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputAddress">Address Line 1</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputAddress2">Address Line 2</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <input type="text" class="form-control" id="inputState" />
                        </div>
                        <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip" />
                        </div>
                    </div>
                    <br></br>
                    <button type="submit" class="btn btn-success" onClick={() => this.placeOrder()}>Place Order</button>
                </form>
            </div>
        );
    }
}

export default Shipping
