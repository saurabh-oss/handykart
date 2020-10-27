import axios from 'axios';

//const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const CORS_ANYWHERE = '';
const USER_API_BASE_URL = 'http://hackathon-user-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/user';

class UserService {
    registerUser(userObj) {
        return axios.post(CORS_ANYWHERE + USER_API_BASE_URL, userObj);
    }

    loginUser(userObj) {
        return axios.get(CORS_ANYWHERE + USER_API_BASE_URL + '/authUser/' + userObj.userName + '/' + userObj.userPass);
    }
}

export default new UserService()
