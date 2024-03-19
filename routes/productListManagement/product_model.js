'use strict';
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({

    productTitle:{type: String, required: false },
    description:{type: String, required: false },
    productPic:{type: String, required: false },
    productStatus: { type: String, required: false},
},

{ timestamps: true },
{ read: 'secondaryPreferred' }
);

var addProduct = mongoose.model('product', productSchema);


module.exports = {
    addProduct: addProduct

};
