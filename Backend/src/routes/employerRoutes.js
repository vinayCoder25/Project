const express = require('express');
const employerRouter = express.Router();
const employerService = require('../services/employerService');

employerRouter.post('/jobs/create', async (req, res, next) => {
    console.log("hhh",req.url);
    try {
        const response = await employerService.addJob(req.body);
        if(response) {
            res.status(200).json({response});
        }
        next()
    } catch (error) {
        next(error);
    }
})

employerRouter.get('/alljobs', async (req, res, next) => {
    try {
        const response = await employerService.getAllJobs();
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
})

employerRouter.post('/allAppliedJobs/:employerId', async (req, res, next) => {
    try {
        const response = await employerService.getAllAppliedJobsCandidateDetails(req.params.employerId, req.body);
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
})

employerRouter.get('/getApplicationDetails/:applicationId',async (req, res, next) => {
    try {
        const response = await employerService.getCandidateApplicationDetail(req.params.applicationId);
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
} )

employerRouter.post('/updateApplicationStatus/:applicationId', async (req, res, next) => {
    try {
        const response = await employerService.updateApplicationStatus(req.params.applicationId, req.body);
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = employerRouter;