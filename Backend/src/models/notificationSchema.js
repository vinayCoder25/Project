const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Candidate schema
const notificationSchema = new Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isNewJob: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });


module.exports = notificationSchema;
