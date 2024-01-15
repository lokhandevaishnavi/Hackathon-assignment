'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
   productName: {type: String, required: false },
   packSize: {type: String, required: false },
   categoryName:{type: String, required: false },
   price: {type: String, required: false },
   photos: [{
    photoName: { type: String, required: true },
    photoSize: { type: String, required: false },
    productStatus: { type: String, required: false, default: "Inactive" },
}],


},
{ timestamps: true },
{ read: 'secondaryPreferred' })

var addProduct = mongoose.model('product', productSchema);


module.exports = {
    addProduct: addProduct

};