/**
 * Apartment helper functions
 */
const config = require("../config");

const getapartment = (filterQuery, token) => {
  let responseStatus;
  let queryString = '';
  if (filterQuery.price) queryString += '?price=' + filterQuery.price;
  if (filterQuery.area) (queryString.indexOf('?') > -1) ? queryString += '&area=' + filterQuery.area : queryString += '?area=' + filterQuery.area;
  if (filterQuery.rooms) (queryString.indexOf('?') > -1) ? queryString += '&rooms=' + filterQuery.rooms : queryString += '?rooms=' + filterQuery.rooms;
  queryString = queryString.replace(/\+/g,"plus");
  console.log(queryString);

  return fetch(config.API_URL + '/apartments/' + queryString, {
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
      if (responseStatus == 200) {
        console.log(responseData);
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

const addapartment = (apartmentData, token) => {
  let responseStatus;
  console.log(apartmentData);
  return fetch(config.API_URL + '/apartments/create/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apartmentData),
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        return responseData.apartment;
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

const updateapartment = (apartmentData, token) => {
  let responseStatus;
  console.log(apartmentData);
  return fetch(config.API_URL + '/apartments/update/' + apartmentData.id, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apartmentData),
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        return responseData.apartment;
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

const deleteapartment = (apartmentId, token) => {
  let responseStatus;
  return fetch(config.API_URL + '/apartments/delete/' + apartmentId, {
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
        return responseData.apartment;
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

export default { getapartment, addapartment, updateapartment, deleteapartment };