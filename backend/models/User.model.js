const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,

    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password: {
        type:String,
        required: true,
        select: false
    },
    avatar: {
        url: {
            type: String,
            default: null
        },
        publicId: {
            type: String,
            default: null
        }
    },
    role: {
        type:String,
        enum:["user", "admin"],
        default:"user" 
    },
    isVerified: {
        type:Boolean,
        default: false

    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);

