const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newCandidateAlertSchema = new Schema({
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate', // Reference to the candidate who is applying for the job
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job', // Reference to the job the candidate is applying for
        required: true
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = newCandidateAlertSchema;