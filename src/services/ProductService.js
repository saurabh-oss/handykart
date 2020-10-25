import axios from 'axios';

const PRODUCT_API_BASE_URL = 'http://hackathon-git-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/product/';

class ProductService {
    viewProduct(id) {
        return axios.get(PRODUCT_API_BASE_URL + id);
    }

    listProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }
}

export default new ProductService()
