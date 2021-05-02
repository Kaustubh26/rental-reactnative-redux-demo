/**
 * Apartment helper functions
 */
const config = require("../config");

const getusers = (token) => {
  let responseStatus;
  return fetch(config.API_URL + '/users/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      if (responseStatus == 200) {
        return responseData;
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

const adduser = (userData, token) => {
  let responseStatus;
  console.log(userData);
  return fetch(config.API_URL + '/users/create/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
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

const updateuser = (userData, token) => {
  let responseStatus;
  console.log(userData);
  return fetch(config.API_URL + '/users/update/' + userData.id, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
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

const deleteuser = (userId, token) => {
  let responseStatus;
  return fetch(config.API_URL + '/users/delete/' + userId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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

export default { getusers, adduser, updateuser, deleteuser };