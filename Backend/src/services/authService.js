const authServiceModel = {};
const conn = require('../config/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Employer } = require('../models/model');

authServiceModel.registerUser = async (userDetails) => {

    const { email, password,userType } = userDetails;
    console.log("userDetails in auth Service",userDetails)

    //check if the user exists
    console.log("role is",userType)

    const model = await conn.getUserDbModel();

    console.log("model start time m",model)

    const existingUser = await model.findOne({ email: email });

    if (existingUser) {

        const error = new Error("Email already exists");

        error.status = 500;

        throw error;

    } else {

        console.log("not exists");

        //hash the pwd
        console.log("user details  dd",userDetails)
        userDetails.password = await bcrypt.hash(userDetails.password, 10);

        //create new user
        console.log("check new  se user",userDetails)
        const newUser = await model.create({
            email:email,
            password: userDetails.password,
            role:userDetails.userType
        });

        console.log("check new user",newUser)

        if(newUser) {

            const createCandidate = {

                email: newUser.email,

                userId: newUser._id,
                role:userDetails.userType

            }


 

            const candidateDB = await conn.getCandidateDbModel();
                console.log("model aa rha")
            const created = await candidateDB.create(createCandidate);
            console.log("check created: ", created)

        }

        //generate jwt

        const token = jwt.sign(

            {

                userId: newUser._id,

                email: newUser.email,

                role: newUser.role

            },

            '123456', //sec

            {

                expiresIn: '1h'

            }

        );

        return { message: 'User registered successfully', token };

    }

}

authServiceModel.loginUser = async (loginDetails) => {
    const { email, password } = loginDetails;
    try {
        const model = await conn.getUserDbModel();
        const user = await model.findOne({ email: email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            '123456',
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return {
            message: "login successfully",
            token,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = authServiceModel;