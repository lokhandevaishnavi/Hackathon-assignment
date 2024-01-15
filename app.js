const express = require('express');
const mongoose = require('mongoose');
var userAPI = require('./routes/userManagment/user_controller.js');
var categoryAPI = require("./routes/categoryManagment/category_controller.js")
var fileAPI = require("./routes/fileManagment/file_controller.js");
var productAPI = require("./routes/productManagment/product_controller.js")

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/Assignment', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/', userAPI);
app.use('/',categoryAPI);
app.use('/',fileAPI);
app.use('/',productAPI)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});