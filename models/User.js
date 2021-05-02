const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
 
//User Schema 
const UserSchema = new Schema({
  role: {
    type:  String,
    enum: ['client','realtor','admin'],
    default: 'client'
  },
  isVerified: {
	  type: Boolean,
	  default: false
  },
  randNo: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  }
});


UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: true
});

module.exports = User = mongoose.model("users", UserSchema);