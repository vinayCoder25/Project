const mongoose = require("mongoose");
const userSchema = require('../models/userModel');
const candidateSchema = require('../models/candidate');
const jobSchema = require('../models/jobSchema');
const notificationSchema = require('../models/notificationSchema');
const jobApplicationSchema = require('../models/jobApplicationSchema');

let collections = {};

const url = "mongodb://localhost:27017/jobNestDB";

collections.getUserDbModel = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("Users", userSchema);
        console.log("getting user db model");
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to user schema");
        err.status = 500;
        throw err;
    }
}

collections.getCandidateDbModel = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("candidate", candidateSchema);
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to user schema");
        err.status = 500;
        throw err;
    }
}

collections.getJobDbModel = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("jobs", jobSchema);
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to job schema");
        err.status = 500;
        throw err;
    }
}

collections.getJobNotificationSchema = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("jobNotification", notificationSchema);
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to notification schema");
        err.status = 500;
        throw err;
    }
}

collections.getJobApplicationDBModel = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("jobApplication", jobApplicationSchema);
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to job application schema");
        err.status = 500;
        throw err;
    }
}

collections.getCandidateAlertDBModel = async () => {
    try {
        const database = await mongoose.connect(url);
        const userModel = await database.model("candidateAlertColl", newCandidateAlertSchema);
        return userModel;
    } catch (error) {
        const err = new Error("Failed to connect to alert schema");
        err.status = 500;
        throw err;
    }
}

module.exports = collections;