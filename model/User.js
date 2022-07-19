const mongoose=require("mongoose");
const Schema=e=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
})

module.exports=mongoose.model("User",userSchema)