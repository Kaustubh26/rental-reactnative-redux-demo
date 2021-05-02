/**
 * Authentication helper functions
 */
import AsyncStorage from '@react-native-community/async-storage';
const config = require("../config");

//Call login API
const login = (username, password) => {
  let responseStatus;
  return fetch(config.API_URL + '/users/login', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password,
      })
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      if (responseStatus == 200 && responseData.token) {
        let user = { 
          username: username,
          token: responseData.token,
          name: responseData.name.replace(/%20/g,' '),
          role: responseData.role
        };
        AsyncStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      else {
        throw (responseData.error ? responseData.error : 'An error occured');
      }
    })
    .catch((error) =>{
      console.log(error);
      throw error;
    });
};

//Call Logout API
const logout = async() => {
  await AsyncStorage.removeItem("user");
  return;
};

//Assign Oauth Login
const oauthlogin = async(token, role, name) => {
  //Possible to introduce a verification API call to check token and role
  let user = { 
    token: token,
    name: name,
    role: role
  };
  await AsyncStorage.setItem("user", JSON.stringify(user));
  return user;
}

export default { login, logout, oauthlogin };