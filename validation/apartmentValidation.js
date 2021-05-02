/**
 * Apartment calls validation
 */
const commonValidate = require('./commonValidate');

//Validate Registration Input Data 
const validateGetApInput = function(data, callback){
  let validationRule = {
	area: {
    $gt: 'numeric',
    $lt: 'numeric'
  },
	price: {
    $gt: 'numeric',
    $lt: 'numeric'
  },
  rooms:{
    $gt: 'numeric',
    $lt: 'numeric'
  },
	role: 'required|string|in:client,realtor,admin'
  };
  commonValidate(validationRule, data, callback);
}

//Validate Create Apartment Data 
const validateCreateApInput = function(data, callback){
  let validationRule = {
	area: 'required|numeric',
	price: 'required|numeric',
  rooms:'required|numeric',
  name: 'required|string',
  description: 'required|string',
  realtorId: 'required|email',
  location: {
    type: 'required|string|in:Point',
    coordinates: 'required|array'
  }
  };
  commonValidate(validationRule, data, callback);
}

//Validate Update Apartment Data 
const validateUpdateApInput = function(data, apartmentId, callback){
  data['apartmentId'] =  apartmentId;
  let validationRule = {
	area: 'numeric',
	price: 'numeric',
  rooms:'numeric',
  name: 'string',
  description: 'string',
  realtorId: 'email',
  location: {
    type: 'string|in:Point',
    coordinates: 'array'
  },
  isRented: 'boolean',
  apartmentId: 'required|string'
  };
  commonValidate(validationRule, data, callback);
}

//Validate Update User Inout
const validateDeleteApInput = function(id, callback){
  let validationRule = {
    id: 'required|string'
  };
  let data = {};
  data['id']  = id;
  commonValidate(validationRule, data, callback);
}

module.exports = { validateGetApInput,  validateCreateApInput, validateUpdateApInput, validateDeleteApInput };