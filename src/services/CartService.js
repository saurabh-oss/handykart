import axios from 'axios';

const CART_BASE_URL = 'http://kart-service-handykart-backend.apps.shared-na4.na4.openshift.opentlc.com/kart/';
const ORDER_BASE_URL = 'http://order-service-handykart-backend.apps.shared-na4.na4.openshift.opentlc.com/order/';

class CartService {
    // Create card for a user with list of product items
    createCart(cartItems) {
        return axios.post(CART_BASE_URL, cartItems);
    }

    getCart(userEmail) {
        return axios.get(CART_BASE_URL + 'userId/' + userEmail + '/');
    }

    deleteCart(userEmail) {
        return axios.delete(CART_BASE_URL + 'userId/' + userEmail + '/');
    }

    createOrder(orderDtls) {
        return axios.post(ORDER_BASE_URL, orderDtls);
    }

    getOrderById(orderId) {
        return axios.get(ORDER_BASE_URL + 'searchOrderId/' + orderId);
    }

    listOrders(userEmail) {
        return axios.get(ORDER_BASE_URL + 'searchOrderUserId/' + userEmail + '/');
    }
}

export default new CartService()
