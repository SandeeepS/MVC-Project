const UserModel = require('../models/userModel');



exports.loginView = async(req,res)=>{
  res.render('login');
}

exports.indexView = async(req,res)=>{
  if(!req.session.user){
    res.redirect('/');
  }else{
  res.render('index');
  }
  //res.render('index');
}


//login user
exports.login = async(req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
  
    try {
      // Query the database to find a user with the given username and password
      
      const user = await UserModel.findOne({ name: username, password: password }).exec();
  
      if (user) {
        // User exists in the database, set the session and redirect to index page
        req.session.user = user.name; // Store the user's name in the session
        console.log( req.session.user)
        res.redirect('/index');
      } else {
            res.redirect('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.redirect('/');
    }
  };

  //logout user


  exports.logoutIndex = (req,res)=>{
    req.session.destroy((err)=>{
      
      if(err){
        console.error('Error destroyng session',err);
      }else{
       
        res.redirect('/');
      
      }
    });
   
  };
  