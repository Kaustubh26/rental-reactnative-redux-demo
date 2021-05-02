/**
 * Common Validate Function
 */
const Validator = require('validatorjs'); 


module.exports = function (validationRule, data, callback){
  let validation = new Validator(data, validationRule);
  validation.passes(() => {
	  callback(null, true);
  });
  validation.fails(() => {
  	try{
  	  let errors = validation.errors.all();
	    let errorFirst = validation.errors.all()[Object.keys(validation.errors.all())[0]][0];
	    callback(errorFirst, false);
  	}
  	catch(err){
      callback('Data validation failed', false);
  	}	
  });
}