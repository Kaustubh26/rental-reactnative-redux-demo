var express = require('express');
var router = express.Router();
const { validateGetApInput, validateCreateApInput, validateUpdateApInput, validateDeleteApInput } = require('../validation/apartmentValidation');
const auth = require('../auth/authMiddleWare');

// Load Apartment model
const Apartment = require("../models/Apartment");

/* GET Apartments  */
router.get('/', auth(['admin','realtor','client'], true), function(req, res, next) {

  //Construct proper filter queries
  console.log(req.query);
  if (req.query.price) req.query.price = (req.query.price.indexOf('-') > -1) ? {$gt: parseInt(req.query.price.split('-')[0]), $lt: parseInt(req.query.price.split('-')[1]) + 1} : (req.query.price.indexOf('plus') > -1) ? {$gt: parseInt(req.query.price.split('plus')[0])} : parseInt(req.query.price);

  if (req.query.rooms) req.query.rooms = (req.query.rooms.indexOf('-') > -1) ? {$gt: parseInt(req.query.rooms.split('-')[0]), $lt: parseInt(req.query.rooms.split('-')[1]) + 1} : (req.query.rooms.indexOf('plus') > -1) ? {$gt: parseInt(req.query.rooms.split('plus')[0])} : parseInt(req.query.rooms);

  if (req.query.area) req.query.area = (req.query.area.indexOf('-') > -1) ? {$gt: parseInt(req.query.area.split('-')[0]), $lt: parseInt(req.query.area.split('-')[1]) + 1} : (req.query.area.indexOf('plus') > -1) ? {$gt: parseInt(req.query.area.split('plus')[0])} : parseInt(req.query.area);
  
  validateGetApInput(req.query, function(error, isValid) {
  	// Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Find Apartments
    if (req.query.role  === 'client') req.query.isRented = false;
    
    let finalQuery = JSON.parse(JSON.stringify(req.query));
    delete finalQuery.role;

    console.log(finalQuery);

    Apartment.find(finalQuery, function(err, apartments){
      //complete check
      if(err){
        return next(err);
      }
      return res.status(200).send({apartments: apartments});
    });
  });
});

/* POST Create Apartment */
router.post('/create', auth(['admin', 'realtor']), function(req, res, next) {
  //Validate Creation data, same as registration data
  validateCreateApInput(req.body, function(error, isValid) {
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Register user
    Apartment.create(req.body, function(err, apartment) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ apartment: apartment });
    });
  }); 
});


/* PUT Update Apartment */
router.put('/update/:apartmentid', auth(['admin', 'realtor']), function(req, res, next) {
  let apartmentId  = req.params.apartmentid;
  //Validate Creation data, same as registration data
  validateUpdateApInput(req.body, apartmentId, function(error, isValid) {
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    let finalUpdate = JSON.parse(JSON.stringify(req.body));
    delete finalUpdate.apartmentId;
    //Register user
    Apartment.findByIdAndUpdate(apartmentId, req.body, function(err, apartment) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ apartment: apartment });
    });
  }); 
});

/* DELETE User */
router.delete('/delete/:apartmentid', auth(['admin', 'realtor']), function(req, res, next) {
  let apartmentId  = req.params.apartmentid;

  validateDeleteApInput( apartmentId, function(error, isValid){
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Update User
    Apartment.findByIdAndDelete(apartmentId, function(err, apartment){
      if (err) {
        return next(err);
      }
      return res.status(200).json({ apartment }); 
    });
  });
});

module.exports = router;
