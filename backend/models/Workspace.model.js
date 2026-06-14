const mongoose = require("mongoose");


const workspaceSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        maxlength: 100,
    },
    description: {
        type:String,
        maxlength: 1000
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required:true
            },
            role: {
                type: String,
                enum: ["user", "admin", "member", "guest"],
                default:"member"
            },
            joinedAt : {
                type:Date,
                default:Date.now
            }
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
});

workspaceSchema.index({ owner: 1 });



module.exports= mongoose.model("Workspace", workspaceSchema)