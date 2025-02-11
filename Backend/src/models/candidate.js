const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Candidate schema
// const candidateSchema = new Schema({
//   name: {
//     type: String

//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   skills: [
//     {
//       type: String,

//     }
//   ],
//   preferences: {
//     location: [
//       {
//         type: String,
//       }
//     ],
//     role: {
//       type: String,
//     }
//   },
//   workExperience: {
//    companyName: {
//     type: String
//    },
//    experience: {
//     type: Number
//    }
//   },
//   education: {
//     degree: {
//       type: String
//     },
//     year: {
//       type: Number
//     }
//   }
// });


const candidateSchema = mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    required: true

  },

  name: {

    type: String,

    //required: true

  },

  email: {

    type: String,

    required: true,

    unique: true

  },

  password: {

    type: String,

    // required: true

  },

  skills: [{ type: String }],

  preferences: {

    location: [{ type: String }],

    role: {
      type: String,

      //required: true

    }

  },

  workExperience: {

    companyName: {

      type: String,

      //required: true

    },

    experience: {

      type: Number,

      //required: true

    }

  },

  education: {

    degree: {

      type: String,

      // required: true

    },

    year: {

      type: Number,

      // required: true

    }

  },

  resume: {

    type: String,

    // required: true

  },

  coverLetter: {

    type: String

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

});


module.exports = candidateSchema;
