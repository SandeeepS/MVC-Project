const UserModel = require('../models/userModel');

//rendering register page 
exports.getRegister = async (req,res)=>{
  res.render("register");
};

//render the login page 
exports.loginView = async(req,res)=>{
  res.render('login');
}


//rendering the index(Home page)
exports.indexView = async(req,res)=>{
  if(!req.session.user){
    res.redirect('/');
  }else{  
    
  res.render('index');
  }
  
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
  

//signup
exports.signup = async (req, res) => {
  try {
    const data = new UserModel({
      "name": req.body.name,
      "email": req.body.email,
      "password": req.body.password
    });
    const {name}=data;
    req.session.user=name;
    const savedData = await data.save();

    if (savedData) {
      console.log("Record inserted successfully");
      res.redirect("/index");
    } else {
      console.log("Failed to insert record");
      res.redirect("/register");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.redirect("/register");
  }
};
