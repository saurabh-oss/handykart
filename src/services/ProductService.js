import axios from 'axios';

const PRODUCT_API_BASE_URL = 'http://hackathon-git-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/product/';
const REVIEW_API_BASE_URL = 'http://hackathon-review-git-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/review/search/productId/';

class ProductService {
    // List of products based on category name
    searchProductsByCategory(searchTerm) {
        return axios.get(PRODUCT_API_BASE_URL + 'search/cat/' + searchTerm);
    }

    // List of products based on product title
    searchProductsByTitle(searchTerm) {
        return axios.get(PRODUCT_API_BASE_URL + 'search/title/' + searchTerm);
    }

    // List of all products with all attributes
    listProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    // Details for a single product using id
    viewProduct(id) {
        return axios.get(PRODUCT_API_BASE_URL + id);
    }

    // Review data for a product using id
    listReviews(id) {
        return axios.get(REVIEW_API_BASE_URL + id);
    }
}

export default new ProductService()
