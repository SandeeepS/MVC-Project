const express = require('express')
const adminRoute = express();
const adminController = require('../controllers/adminController');
const auth =require('../middleware/middleware');


//adminroute
adminRoute.get('/',auth.adminAuthenticated,adminController.admin);
adminRoute.get('/login',adminController.adminlogin);
adminRoute.post('/adlogin',adminController.adlogin);
adminRoute.post('/logout',adminController.logoutAdmin);



//admin operations
adminRoute.get('/updateUserData/:id',auth.adminAuthenticated,adminController.updateUserData);
adminRoute.post('/updateUser/:id',adminController.updatedUser)
adminRoute.get('/createUser',auth.adminAuthenticated,adminController.createUser);
adminRoute.post('/newUserByAdmin',adminController.userByAdmin);
adminRoute.get('/deleteUserData/:id',adminController.deleteUserData)

adminRoute.get('*',(req,res)=>res.send("404"));


module.exports = adminRoute;



