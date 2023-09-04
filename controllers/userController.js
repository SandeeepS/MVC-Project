const UserModel = require('../models/userModel');

//login user
exports.login = async(req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
  
    try {
      // Query the database to find a user with the given username and password
      
      const user = await monmodel.findOne({ name: username, password: password }).exec();
  
      if (user) {
        // User exists in the database, set the session and redirect to index page
        req.session.user = user.name; // Store the user's name in the session
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


  exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
      if(err){
        console.error('Error destroyng session',err);
      }else{
       
        res.redirect('/');
      
      }
    });
   
  };
  