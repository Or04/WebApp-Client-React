import axios from 'axios';

class ApiService {
    

    createUser(userid, email) {
        return axios.post('https://bodyfitx.herokuapp.com/createUser', {
            userName: userid,
            password: "111111",
            email: email,
        });
    }

    setUserBlockList(userid, upper, middle, lower, short, long) {
        return axios.post('https://bodyfitx.herokuapp.com/setUserBlockList', {
            userID: userid,
            upper: upper,
            middle: middle,
            lower: lower,
            long: long,
            short: short
        });
    }
  

}
const api = new ApiService();
export default api;