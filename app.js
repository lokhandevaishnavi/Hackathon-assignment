const express = require('express');
const mongoose = require('mongoose');
var userAPI = require('./routes/userManagement/user_controller.js');
var categoryAPI = require("./routes/productListManagement/product_controller.js")
var fileAPI = require("./routes/fileManagement/file_controller.js");


const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/Assignment', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/', userAPI);
app.use('/',categoryAPI);
app.use('/',fileAPI);






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});