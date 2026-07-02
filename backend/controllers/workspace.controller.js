const express = require("express");
const Workspace = require("../models/Workspace.model");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");


const isMember = (workspace, userId) => {
  workspace.owner.toString() === userId.toString() || workspace.members.some((m) => m.user.toString() === userId.toString()); 
};
