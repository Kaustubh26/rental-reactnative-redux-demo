/**
 * Auth middleware for protecting
 * API end points.
 */
const passport = require('passport');
const createError = require('http-errors');

module.exports = function(role, returnRole){
  return function(req, res, next){ 
	passport.authenticate('jwt', function (err, user, info) {
	  try{
        if (err){
	  	  // internal server error occurred
	      return res.status(500).json({ error: err});
		}
		if (!user){
		   //Invalid user or token
		   throw 'Invalid User Credentials';
		}
		if (user.isVerified){
		  if (!role) next();
		  if (role.indexOf(user.role) <= -1){
		  	//Invalid role
		  	throw 'User Does not have access';
		  }
		  else{ 
		    if (returnRole) req.query.role = user.role;
		  	next();
		  }
		}
		else{
			throw 'Email not verified';
		}
	  }
	  catch(err){
		// user not found or jwt not authenticated
		console.log(err);
		return res.status(401).json({ error: err});
	  }
	})(req, res, next);
  }
}
