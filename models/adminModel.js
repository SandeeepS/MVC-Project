const mongoose = require('mongoose');

const sch = {
    name:String,
    email:String,
    password:Number
  }

const monmodelA = mongoose.model("admins",sch);
module.exports = monmodelA;