'use strict';

var mongoose = require('mongoose');
    // Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    firstName: { type: String,required:true },
    lastName: { type: String,required:true },
  
    email: { type: String,required:true,unique:true,lowercase:true },
    password: { type: String, select: false },
    contactNo: { type: Number,required:true },

}, { timestamps: true }, { read: 'secondaryPreferred' });
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }

bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
    });
});
});


var User = mongoose.model('User', userSchema);
module.exports = {
    User: User,
  };
  
