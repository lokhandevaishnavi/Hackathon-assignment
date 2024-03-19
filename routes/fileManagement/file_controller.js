var express = require('express');
var router = express.Router();
var upload = require("../fileManagement/file_model.js").upload;


const jwt = require('jsonwebtoken');



router.post('/uploadImage', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: 'More than three files uploaded!' });
        }

        // Extract the JWT token from the request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token missing' });
        }

        
        jwt.verify(token, 'djdnskDSJnfjdkdsjadjnHKJDSkhLSHkdSIdsHDdasqrewOS', (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Unauthorized - Token expired' });
                }
             
            }
        
            var file = req.files;
            res.status(200).send({ filesUploaded: file, status: true });
        });
    });
});


module.exports = router;