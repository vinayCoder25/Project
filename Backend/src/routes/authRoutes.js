const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    console.log("register called");
    try {
        console.log(req)
        const response = await authService.registerUser(req.body);
        console.log("response",response)
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        console.log("Error occured",error);
        
    }
})
router.post('/login', async (req, res, next) => {
    try {
        const response = await authService.loginUser(req.body);
        if(response) {
            res.status(200).json({response, success: true});
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;