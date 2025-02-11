const express = require('express');
const candidateRouter = express.Router();
const candidateService = require('../services/candidateService');



candidateRouter.get('/jobRecom/:candidateId', async (req, res, next) => {
    try {
        console.log("fd")
        const response = await candidateService.getJobRecommendations(req.params.candidateId);
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
})

candidateRouter.get('/jobNotification/:candidateId', async (req, res, next) => {
    try {
        console.log("fd")
        const response = await candidateService.getJobNotification(req.params.candidateId);
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
})

candidateRouter.post('/saveApplication', async (req, res, next) => {
    try {
        console.log("fd")
        const response = await candidateService.submitJobApplication(req.body); 
        if (response) {
            res.status(200).json({
                message: "Application submitted successfully",
                success: true,
                data: response // Include the response data here
            });
        }
    } catch (error) {
        next(error);
    }
})

candidateRouter.post('/createProfile', async (req, res, next) => {
    try {
        const response = await candidateService.createProfile(req.body); 
        if (response) {
            res.status(200).json({
                message: "updated successfully",
                success: true,
                data: response // Include the response data here
            });
        }
    } catch (error) {
        next(error);
    }
})

candidateRouter.get('/getAppliedJobs/:candidateId', async (req, res, next) => {
    try {
        console.log("fd")
        const response = await candidateService.getAppliedJobs(req.params.candidateId); 
        if (response) {
            res.status(200).json({
                message: "Applied Jobs",
                success: true,
                data: response // Include the response data here
            });
        }
    } catch (error) {
        next(error);
    }
})

module.exports = candidateRouter;