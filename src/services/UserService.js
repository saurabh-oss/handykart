import axios from 'axios';

// IBM Cloud
const USER_API_BASE_URL = 'http://user-service-apache.redhat-hackathon-ocp-a39cdf59c11fe9ef74002319618f3999-0000.eu-gb.containers.appdomain.cloud/user/';

// Personal
//const USER_API_BASE_URL = 'http://hackathon-user-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/user/';

class UserService {
    registerUser(userObj) {
        return axios.post(USER_API_BASE_URL, userObj);
    }

    loginUser(userObj) {
        console.log(USER_API_BASE_URL + 'authUser/' + userObj.userName + '/' + userObj.userPass);
        return axios.get(USER_API_BASE_URL + 'authUser/' + userObj.userName + '/' + userObj.userPass);
        //return axios.get('http://hackathon-user-handykart-product-service.apps.shared-na4.na4.openshift.opentlc.com/user/authUser/pan@tcs.com/pan');
    }
}

export default new UserService()
