import React, { Component } from 'react';

class Billing extends Component {
    placeOrder() {
        this.props.history.push('/order');
    }

    render() {
        return(
            <div className="billing-form">
                <br></br>
                <h3>Billing Details:</h3>
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

const cartItems = [
    {
        itemId: 1001,
        name: "Sky Blue Silk Cotton Chanderi Saree",
        price: '7250',
        quantity: 2
    },
    {
        itemId: 1002,
        name: "Royal Blue Silk Rajkot Ikat-Patola Saree",
        price: '19000',
        quantity: 3
    },
]

export default Billing
