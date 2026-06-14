const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    status: {
        type: String,
        enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE", "BLOCKED"],
        default: "TODO"

    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "top"],
        default: "medium"
    },
    dueDate: {
        type: Date

    },
    startDate: {
        type: Date,
        default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    labels: [
      {
        type: String,
        trim: true
      }
    ],
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    subtasks: [
      {
        title: {
          type: String,
          required: true
        },

        completed: {
          type: Boolean,
          default: false
        }
      }
    ],
    estimatedHours: {
      type: Number,
      min: 0,
      default: 0
    },
    actualHours: {
      type: Number,
      min: 0,
      default: 0
    },


},{
    timestamps: true
});

taskSchema.index({ project: 1 });

taskSchema.index({ assignee: 1 });

taskSchema.index({ project: 1, status: 1 });

taskSchema.index({ dueDate: 1 });

taskSchema.index({ workspace: 1 });

module.exports = mongoose.model("Task", taskSchema);
