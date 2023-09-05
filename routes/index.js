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

route.get('/register',isAuthenticated,userController.getRegister)

//signup
route.post('/signup',userController.signup);


// //adminroute


route.get('/admin',adminController.admin);
route.get('/adminlogin',adminController.adminlogin);
route.post('/adlogin',adminController.adlogin);
// route.get('/logoutAd',adminController);

module.exports = route



