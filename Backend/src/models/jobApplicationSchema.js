const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
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
  applicationDate: {
    type: Date,
    default: Date.now // The date the application was made
  },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'Applied' // The current status of the application
  },
  resume: {
    type: String, // This can be a URL or a path to the resume file (could be stored in a cloud storage or file server)
  },
  coverLetter: {
    type: String, // Optionally, the candidate can submit a cover letter
  },
  skillsMatch: {
    type: Number, // A score (0-100) or percentage showing how well the candidate’s skills match the job requirements
  },
  interviewSchedule: {
    type: Date, // If the candidate is selected for an interview, this is the scheduled interview date
  }
});

module.exports = jobApplicationSchema;