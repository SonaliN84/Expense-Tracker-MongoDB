const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const downloadFileSchema= new Schema({
  fileURL:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  },
   userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})

module.exports=mongoose.model('DownloadFile',downloadFileSchema)
