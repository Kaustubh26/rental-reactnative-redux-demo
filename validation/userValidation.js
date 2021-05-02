/**
 * User calls validation
 */
const commonValidate = require('./commonValidate');

//Validate Registration Input Data 
const validateRegisterInput = function(data, callback){
  let validationRule = {
	  email: 'required|email',
	  password: 'required|string|min:6',
	  role: 'required|string|in:client,realtor',
    name: 'string'
  };
  commonValidate(validationRule, data, callback);
}

//Validate Create User Inout
const validateCreateInput = function(data, callback){
  let validationRule = {
    email: 'required|email',
    password: 'required|string|min:6',
    role: 'required|string|in:client,realtor,admin',
    name: 'string'
  };
  commonValidate(validationRule, data, callback);
}

//Validate email to send verification
const validateSendEmail = function(data, callback){
  let validationRule = {
	  emailTo: 'required|email'
  };
  commonValidate(validationRule, data, callback);
}

//Validate verification params
const validateVerifyEmail =  function(data, callback){
  let validationRule = {
	  user: 'required|email',
	  id: 'required|numeric'
  };
  commonValidate(validationRule, data, callback);
}

//Validate Update User Inout
const validateUpdateInput = function(data, id, callback){
  data['id']  = id;
  let validationRule = {
    id: 'required|string',
    role: 'required|string|in:client,realtor,admin',
    name: 'string',
    email: 'email'
  };
  commonValidate(validationRule, data, callback);
}

//Validate Update User Inout
const validateDeleteInput = function(id, callback){
  let validationRule = {
    id: 'required|string'
  };
  let data = {};
  data['id']  = id;
  commonValidate(validationRule, data, callback);
}

module.exports = { validateRegisterInput, validateCreateInput, validateSendEmail, validateVerifyEmail, validateUpdateInput, validateDeleteInput };
