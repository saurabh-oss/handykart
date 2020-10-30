class CookieService {
    getUserDtls() {
        var cookieKeyValue = null;
        var userName = '';
        var userEmail = '';

        if (document.cookie) {
            cookieKeyValue = document.cookie.split(';');
            for(var i = 0; i < cookieKeyValue.length; i++) {
                var cav = cookieKeyValue[i];
                var ca = cav.split('=');

                if(ca[0].trim() === "hkuser") {
                    userName = ca[1];
                }
                if(ca[0].trim() === "hkemail") {
                    userEmail = ca[1];
                }
            }

            var obj = {};
            if(userName.length > 0 && userEmail.length > 0) {
                obj = {
                    "isUserLoggedIn": true,
                    "userName": userName,
                    "userEmail": userEmail
                }
            } else {
                obj = {
                    "isUserLoggedIn": false,
                    "userName": '',
                    "userEmail": ''
                }
            }
            return obj;
        }
        return null;
    }
}

export default new CookieService()
