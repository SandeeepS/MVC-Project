const UserModel = require('../models/userModel');
const AdminModel =require('../models/adminModel');

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
    
    const user2 = await AdminModel.findOne({ name: adUsername, password: adPassword }).exec();
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


//admin with searcing user
exports.admin = async (req, res) => {
  try {
    if (!req.session.user2) {
      res.redirect('/adminlogin');
    } else {
      const searchQuery = req.query.search || ''; // Get the search query from the query parameter

      const users = await UserModel.find({ name: { $regex: searchQuery, $options: 'i' } }).exec();
      const admins = await AdminModel.find().exec();

      res.render('admin', { users, admins, searchQuery });
    }
  } catch (error) {
    console.error("Error fetching user and admin details:", error);
    res.redirect('/adminlogin');
  }
};


//creating user from admin
exports.createUser =  async(req, res) => {
  if(req.session.user2){
    res.render('createUser'); 
  }
  
};

//route for creating user from 
exports.userByAdmin= async (req, res) => {
  try {
    const { name, email,password } = req.body;
    console.log(name);
    console.log(password);
    console.log(email);
    // Create a new document in the database
    const newData = new UserModel({ name, email ,password });
    await newData.save();

    res.redirect('/admin'); // Redirect back to the admin page after creating data
  } catch (error) {
    console.error("Error creating data:", error);
    res.redirect('/admin');
  }
};


//updating userdata
exports.updateUserData= async (req, res) => {
  try {
    const dataId = req.params.id;
    

    // Fetch the data to be updated from the database
    const dataToUpdate = await UserModel.findById(dataId).exec();

    res.render('updateUser', { dataToUpdate }); // Render a form for updating data
  } catch (error) {
    console.error("Error rendering update form:", error);
    res.redirect('/admin');
  }
};


// Route to handle the submission of updated data
exports.updatedUser =  async (req, res) => {
  try {
    const dataId = req.params.id;
    const { name, email,password } = req.body;

    // Update the data in the database
    await UserModel.findByIdAndUpdate(dataId, { name, email,password }).exec();

    res.redirect('/admin'); // Redirect back to the admin page after updating data
  } catch (error) {
    console.error("Error updating data:", error);
    res.redirect('/admin');
  }
};


//delete user
exports.deleteUserData = async (req, res) => {
  try {
    const dataId = req.params.id;

    // Delete the data from the database
    await UserModel.findByIdAndDelete(dataId).exec();

    res.redirect('/admin'); // Redirect back to the admin page after deleting data
  } catch (error) {
    console.error("Error deleting data:", error);
    res.redirect('/admin');
  }
};
  

//admin logout
exports.logoutAdmin = async(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      console.error('Error destroyng session',err);
    }else{
     
      res.redirect('/');
    
    }
   
  });
 
};
