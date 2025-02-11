const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Job Posting schema
const jobPostingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  salary_range: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  skills: [
    {
      type: String,
      required: true
    }
  ]
});

// Create the model

module.exports = jobPostingSchema;
