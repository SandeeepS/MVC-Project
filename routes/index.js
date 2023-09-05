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
route.get('/logoutAd',adminController.logoutAdmin);


//admin operations

route.get('/updateUserData/:id',adminController.updateUserData);
route.post('/updateUser/:id',adminController.updatedUser)
route.get('/createUser',adminController.createUser);
route.post('/newUserByAdmin',adminController.userByAdmin);
route.get('/deleteUserData/:id',adminController.deleteUserData)



module.exports = route



