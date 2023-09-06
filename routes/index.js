const express = require('express')
const route = express();
const userController = require('../controllers/userController');
const auth = require('../middleware/middleware');

// user route 
route.get('/',auth.isAuthenticated,userController.loginView);
route.post('/login',userController.login);
route.post('/logout',userController.logoutIndex);
route.get('/index',userController.indexView);
route.get('/register',auth.isAuthenticated,userController.getRegister)

//signup
route.post('/signup',userController.signup);



module.exports = route



