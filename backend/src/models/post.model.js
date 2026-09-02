import mongoose , { Schema }from "mongoose";


const postSchema = new Schema(
    {
        name : {
            type: String,
            required : true,
            trim : true,
            maxLength : 30
        },
        description : {
            type : String,
            required : true,
            trim : true,
        },
        age : {
            type : Number,
            required : true,
            min : 14,
            max : 300
        }
    },
    {
        timestamps : true
    }
)

export const Post = mongoose.model("Post", postSchema);