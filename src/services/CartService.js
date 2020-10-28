import axios from 'axios';

const CART_BASE_URL = 'http://kartservice-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/kart/';

class CartService {
    // Create card for a user with list of product items
    createCart(cartItems) {
        return axios.post(CART_BASE_URL, cartItems);
    }

    getCart(userEmail) {
        return axios.get(CART_BASE_URL + 'userId/' + userEmail + '/');
    }
}

export default new CartService()
