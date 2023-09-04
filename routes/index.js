const express = require('express')
const route = express();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const isAuthenticated = require('../middleware/middleware');

// user route 
route.get('/',isAuthenticated,userController.loginView);
route.post('/login',userController.login);
route.post('/logout',userController.logoutIndex);
route.get('/index',userController.indexView);


// //adminroute
route.get('/register',adminController.getRegister)
// route.get('/adminlogin',adminController);
// route.get('/admin',adminController);
// route.post('/adlogin',adminController);
// route.get('/logoutAd',adminController);

module.exports = route



