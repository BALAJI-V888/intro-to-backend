
import mongoose , { Schema } from "mongoose";
import bcrypt from "bcrypt";

// User model
const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            special : false,
            underscore : true,
            trim : true,
            minLength : 5,
            maxLength : 25,
        },
        password : {
            type : String,
            required : true,
            unique : false,
            minLength : 5,
            maxLength : 15,
        },

        email : {
            type : String, 
            required : true,
            lowercase : true,
            unique : true,
            trim : true,
            match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        }
    },
    {
        timestamps : true,
    }
) 

//Before saving any passwords we need to hash it
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare passwords
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password); 
}

export const User = mongoose.model("User", userSchema);

