const UserModel = require('../models/userModel');




  //admin with searcing user
exports.admin = async (req, res) => {
  try {
    if (!req.session.user2) {
      res.redirect('/adminlogin');
    } else {
      const searchQuery = req.query.search || ''; // Get the search query from the query parameter

      const users = await UserModel.find({ name: { $regex: searchQuery, $options: 'i' } }).exec();
      const admins = await UserModel.find().exec();

      res.render('admin', { users, admins, searchQuery });
    }
  } catch (error) {
    console.error("Error fetching user and admin details:", error);
    res.redirect('/adminlogin');
  }
};


//admin login

exports.adminlogin= async (req,res)=>{
  if(!req.session.user2){
    res.render('adminlogin');
  }else{
    res.redirect("/admin")
  }
 
};


//adlogin
exports.adlogin =  async (req, res) => {
  const { adUsername, adPassword } = req.body;
  console.log(adUsername);
  console.log(adPassword);

  try {
    // Query the database to find a user with the given username and password
    
    const user2 = await UserModel.findOne({ name: adUsername, password: adPassword }).exec();
    console.log("User found in the database:", user2);

    if (user2) {
      // User exists in the database, set the session 
      req.session.user2 = user2.name;// Store the user's name in the session
      console.log(req.session.user2);
      res.redirect('/admin');
    } else {
     
      res.redirect('/adminlogin');
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect('/adminlogin');
  }
};




  