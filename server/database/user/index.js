import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";




const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String},
    address: [{ detail: {type: String}, for: { type: String}}],
    phoneNumber: [{type: Number}],
},
{
    timestamps: true,
      
})


// generate token method - global access
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoAPP"); 
}

UserSchema.statics.findByEmailAndPhone = async ( {email, phoneNumber}) => {
     // check if email exists
     const checkUserByEmail = await UserModel.findOne({ email });
     const checkUserByPhone = await UserModel.findOne({ phoneNumber});

     if( checkUserByEmail || checkUserByPhone) {
         throw new Error(" User Already Exists...!");
     }

     return false;
};


// when user is created this is called
UserSchema.pre("save", function(next) {
    const user = this; // this is the details provided

    // pwd is modified
    if(!user.isModified("password")) return next();

    // gen bycrypt salt
    bcrypt.genSalt(8, (error, salt) => {
      if (error) return next(error);

      // hash the pwd
      bcrypt.hash(user.password, salt, (error, hash) => {
          if(error) return next(error);

      // assigning hashed pwd
      user.password=hash;
      return next();
    });
});

});

export const UserModel = mongoose.model("Users", UserSchema);