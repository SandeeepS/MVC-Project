
//****Middleware to check if the user is authenticated

  function isAuthenticated(req, res, next) {
    if (req.session.user) {
      
      res.redirect('/index'); // User is authenticated, proceed to the next route handler
    } else {
      return next(); // User is not authenticated, redirect to login page
    }
  }


  //****middleware to check is the admin is authenticated 

  function adminAuthenticated(req,res,next){
    if(!req.session.user2){
     res.redirect('/admin/login')//is user is authenticated proceded the next route handler

    }else{
      return next();//user not authenticated procced the next route handler
    }
  }





module.exports = {
  isAuthenticated,adminAuthenticated
}