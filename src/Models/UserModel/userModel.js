const mongoose=require('mongoose');

const userSchema=mongoose.Schema({

   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role: { type: String, enum: ["admin", "user"], required: true },
   cart: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
      quantity: { type: Number, default: 1 },
    },
]
})

const UserModel=mongoose.model('User',userSchema);

module.exports={
    UserModel
}