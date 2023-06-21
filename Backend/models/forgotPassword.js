const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const forgotPasswordSchema= new Schema({
   active:{
    type:Boolean,
    required:true
  },
  id:{
    type:String,
    required:true
  },
   userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
     required:true
  }

})

module.exports=mongoose.model('Forgotpassword',forgotPasswordSchema)


