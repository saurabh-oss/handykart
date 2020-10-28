import axios from 'axios';

const CART_BASE_URL = 'http://hackathon-kart-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/kart';

class CartService {
    // Create card for a user with list of product items
    createCart(cartItems) {
        return axios.get(CART_BASE_URL, cartItems);
    }

    getCart(userId) {
        return axios.get(CART_BASE_URL);
    }
}

export default new CartService()
