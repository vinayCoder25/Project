const mongoose = require('mongoose');

// Define the employer schema
const employerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,  // Company name is required
      trim: true,      // Removes whitespace around the string
    },
    email: {
      type: String,
      required: true,  // Email is required
      unique: true,    // Ensure email is unique
      lowercase: true, // Automatically converts to lowercase
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email format validation
    },
    contactNumber: {
      type: String,
      required: true,  // Contact number is required
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid contact number'], // Phone number validation
    },
    location: {
      type: String,
      required: true,  // Location is required
      trim: true,      // Removes whitespace around the string
    },
    companyDescription: {
      type: String,
      required: false, // Optional field for company description
      trim: true,      // Removes whitespace around the string
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the current date when an employer is created
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Employer model

module.exports = employerSchema;
