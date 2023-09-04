const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

// user route 
Router.get =('/',userController,isAuthenticated,(req,res)+>{
    
})