'use strict';
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({

    categoryName:{type: String, required: false },
    description:{type: String, required: false },
    categoryStatus: { type: String, required: false, default: "Inactive" },
},

{ timestamps: true },
{ read: 'secondaryPreferred' }
);

var addCategory = mongoose.model('category', categorySchema);


module.exports = {
    addCategory: addCategory

};
