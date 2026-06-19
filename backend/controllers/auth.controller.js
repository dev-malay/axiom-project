const express = require("express");
const User = require("../models/User.model");



exports.register = async(req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.create(email, password);
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.login = async(req,res) => {
    try {
        const {}
    } catch (error) {
        res.status(500).json(message: error.message)
    }
}