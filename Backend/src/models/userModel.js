const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  
        // lowercase: true,  
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employer', 'job_seeker'],  
        required: true,
    },
}, { timestamps: true });

//The { timestamps: true } option is optional, but it automatically adds createdAt and updatedAt fields to the document, which can be useful for tracking when users were created or last updated.
module.exports = userSchema;
