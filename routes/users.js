/**
 * Define routes for Users.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require("nodemailer");
const config = require("../config");
const auth = require('../auth/authMiddleWare');
const { validateRegisterInput, validateCreateInput, validateSendEmail, validateVerifyEmail, validateUpdateInput, validateDeleteInput } = require('../validation/userValidation');

// Load User model
const User = require("../models/User");


/* Load SMTP Mail server to send verification emails */
let smtpTransport = nodemailer.createTransport({
    service: config.smtp.mail,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.password
    }
});

/* GET Users listing. */
router.get('/', auth(['admin']), function(req, res, next) {
  try{
    User.find(function(err, users){
      //complete check
      if(err){
        return next(err);
      }
      return res.status(200).send({users: users});
    });
  }
  catch(err){
    return next(err);
  }
});

/* GET Send verification email */
router.get('/sendmail', function(req, res, next){ 
  //Validate email to param
  validateSendEmail(req.query, function(error, isValid){
    // Check validation
    if (!isValid) {
      return res.status(400).json({error: error });
    }
    //Create and send mail
    try{
      let emailTo = req.query.emailTo;
      let randNo = Math.floor((Math.random() * 1000) + 1234); //TODO: Use a key and encryption method
      let host = req.get('host');
      let link="http://" + req.get('host')+"/users/verify?id=" + randNo + '&user=' + emailTo;
      let mailOptions={
          to : req.query.emailTo,
          subject : "Please confirm your Email account",
          html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      }

      User.updateOne({email:emailTo}, {randNo: randNo}, function (err, docs) { 
        if (err){ 
          return next(err);
        } 
        else{ 
          smtpTransport.sendMail(mailOptions, function(err, response){
            if(err){
              return next(err);
            }else{
              return res.status(200).send({success: "Email sent" });
            }
          });
        } 
      }); 
    }
    catch(err){
      return next(err);
    }
  });
});

/* GET Verify Email */
router.get('/verify', function(req, res, next){
  //Validate email verfication params
  validateVerifyEmail(req.query, function(error, isValid){
    try{
      let userEmail = req.query.user;
      let randNo = req.query.id;

      User.findOne({ email: userEmail}, function(err, user){
        if(err){
          return next(err);
        }
        else{
          //check if codes match
          if (user.randNo === parseInt(randNo)) {
            User.updateOne({email:userEmail}, {randNo: 0, isVerified: true}, function (err, docs) { 
              if (err){
                return next(err);
              }
              return res.status(200).render('email');
            });
          }
          else
          {
            return res.status(401).send({ error: 'Invalid request' });
          }       
        }
      });
    }
    catch(err){
      return next(err);
    }
  });
});

/* POST User Registration */
router.post('/register', function (req, res, next) {
  //Validate Registration data
  validateRegisterInput(req.body, function(error, isValid) {
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Register user
    User.register(new User({ email: req.body.email, role: req.body.role, name: req.body.name }), req.body.password, function (err, user) {
      if (err) {
        if (typeof err.name !==  'undefined' && err.name === 'UserExistsError')  return res.status(400).send({ error: 'Email address in use.' });
        return next(err);
      }
      res.status(200).send({ user: user.id });
    });
  }); 
});

/* POST Create User */
router.post('/create', auth(['admin']), function(req, res, next) {
  //Validate Creation data, same as registration data
  validateCreateInput(req.body, function(error, isValid) {
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Register user
    User.register(new User({ email: req.body.email, role: req.body.role, name: req.body.name }), req.body.password, function (err, user) {
      if (err) {
        if (typeof err.name !==  'undefined' && err.name === 'UserExistsError')  return res.status(400).send({ error: 'Email address in use.' });
        return next(err);
      }
      res.status(200).send({ user: user });
    });
  }); 
});

/* POST Login */
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    //Invalid credentials
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials.' });
    }
    //Check if user is verified
    if (user.isVerified) {
      var token = jwt.sign({ id: user._id, email: user.email }, config.secretOrKey);
      return res.status(200).send({token: token, role: user.role, name: user.name});
    }
    else{
      return res.status(401).send({ error: 'Email not verified' });
    }
  })(req, res, next);
});

//TODO: Change Password API call if required

/* PUT Update User */
router.put('/update/:userid', auth(['admin']), function(req, res, next) {
  let userId  = req.params.userid;

  validateUpdateInput(req.body, userId, function(error, isValid){
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Update User
    User.findByIdAndUpdate(userId, {email: req.body.email, role: req.body.role, name: req.body.name}, function(err, user){
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user }); 
    });
  });
});

/* DELETE User */
router.delete('/delete/:userid', auth(['admin']), function(req, res, next) {
  let userId  = req.params.userid;

  validateDeleteInput( userId, function(error, isValid){
    // Check validation
    if (!isValid) {
      return res.status(400).send({error: error });
    }
    //Update User
    User.findByIdAndDelete(userId, function(err, user){
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user }); 
    });
  });
});


//Google & LinkedIn Oauth Sign In
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: config.googleClientId, // Add your clientID
  clientSecret: config.googleClientSecret, // Add the secret here
  callbackURL: '/users/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({email: profile._json.email}).then((currentUser)=>{
    if(currentUser){
      //if we already have a record with the given profile ID
      done(null, currentUser);
    } else{
      //if not, create a new user with role client
      new User({
        email: profile._json.email,
        role: 'client',
        name: profile.displayName,
        isVerified: true
      }).save().then((newUser) =>{
        done(null, newUser);
      });
    } 
  })
}));


passport.use(new LinkedInStrategy({
  clientID: config.linkedinClientId,
  clientSecret: config.linkedinClientSecret,
  callbackURL: "/users/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({email: profile.emails[0].value}).then((currentUser)=>{
    if(currentUser){
      //if we already have a record with the given profile ID
      console.log(currentUser);
      done(null, currentUser);
    } else{
      //if not, create a new user with role client
      new User({
        email: profile.emails[0].value,
        role: 'client',
        name: profile.displayName,
        isVerified: true
      }).save().then((newUser) =>{
        console.log(newUser);
        done(null, newUser);
      });
    } 
  })
}));

//Serialize
passport.serializeUser((user, done) => {
  done(null, user);
})
//Desrialize
passport.deserializeUser((user, done) => {
  done(null, user);
})

// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Linkedin Oauth2
router.get('/auth/linkedin',
  passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'], state: true
}));

// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
  try{
    var token = jwt.sign({ id: req.user._id, email: req.user.email }, config.secretOrKey);
    //TODO:Encode jwt with user details and then post as single parameter
    res.redirect("toprental://login/?jwt=" + token + "&role=" + req.user.role + "&name=" + req.user.name);
  }
  catch(err){
    return next(err);
  }
});

//Linkedin Oauth2 callback url
router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), (req, res, next) => {
  try{
    console.log(req.user);
    var token = jwt.sign({ id: req.user._id, email: req.user.email }, config.secretOrKey);
    //TODO:Encode jwt with user details and then post as single parameter
    res.redirect("toprental://login/?jwt=" + token + "&role=" + req.user.role + "&name=" + req.user.name);
  }
  catch(err){
    return next(err);
  }
});



module.exports = router;
