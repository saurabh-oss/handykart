import axios from 'axios';

// IBM Cloud
/*const CART_BASE_URL = 'http://kart-service-apache.redhat-hackathon-ocp-a39cdf59c11fe9ef74002319618f3999-0000.eu-gb.containers.appdomain.cloud/kart/';
const ORDER_BASE_URL = 'http://order-service-apache.redhat-hackathon-ocp-a39cdf59c11fe9ef74002319618f3999-0000.eu-gb.containers.appdomain.cloud/order/';*/

// Personal
const CART_BASE_URL = 'http://kart-service-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/kart/';
const ORDER_BASE_URL = 'http://order-service-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/order/';

class CartService {
    // Create card for a user with list of product items
    createCart(cartItems) {
        return axios.post(CART_BASE_URL, cartItems);
    }

    getCart(userEmail) {
        return axios.get(CART_BASE_URL + 'userId/' + userEmail + '/');
    }

    createOrder(orderDtls) {
        return axios.post(ORDER_BASE_URL, orderDtls);
    }

    getOrderById(orderId) {
        return axios.get(ORDER_BASE_URL + 'searchOrderId/' + orderId);
    }
}

export default new CartService()
