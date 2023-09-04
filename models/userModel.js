const mongoose = require('mongoose');

const sch = {
    name:String,
    email:String,
    password:Number
  }
  const monmodel = mongoose.model("users",sch);
  module.exports = monmodel;