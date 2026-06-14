const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title:{
        type: String,
        required:true,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        required:true,
        maxlength:2000

    },
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "archived"],
        default: "active"
    }

},{
    timestamps: true
});

projectSchema.index({ workspace: 1 });

module.exports = mongoose.model("Project", projectSchema);



