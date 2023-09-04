const express = require('express')
const route = express()
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const isAuthenticated = require('../script');

// user route 
route.get('/',userController.loginView);
route.post('/',userController.login);
route.post('/logout',userController.logout);


// //adminroute
// route.get('/adminlogin',adminController);
// route.get('/admin',adminController);
// route.post('/adlogin',adminController);
// route.get('/logoutAd',adminController);

module.exports = route



