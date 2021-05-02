/**
 * Register helper functions
 */

const config = require("../config");

const register = (userData) => {
  let responseStatus;
  return fetch(config.API_URL + '/users/register', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        return responseData.user;
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

const verifyMail = (email) => {
  let responseStatus;
  return fetch(config.API_URL + '/users/sendmail/?emailTo=' + email.toString(), {
      method: 'GET'
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        return true;
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

export default { register, verifyMail };