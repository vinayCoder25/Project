const conn = require('../config/connection')
const candidateModel = {};
const mongoose = require('mongoose');

candidateModel.convertToObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid candidateId format');
  }
  return new mongoose.Types.ObjectId(id);
}

candidateModel.validateCandidateId = async (id) => {
  const model = await conn.getCandidateDbModel();
  const candidate = await model.db.collection('candidate').findOne({ _id: id });
  if (!candidate) {
    throw new Error('Candidate not found');
  }
}

candidateModel.validateJobId = async (id) => {
  const model = await conn.getJobDbModel();
  const job = await model.db.collection('jobs').findOne({ _id: id });
  if (!job) {
    throw new Error('Job not found');
  }
}



candidateModel.createProfile = async (candidateDetails) => {

  try {
    //change id to objectid
    const userId = new mongoose.Types.ObjectId(candidateDetails.userId);
    candidateDetails.userId = userId;
    console.log("candidate details: ", candidateDetails)
    const model = await conn.getCandidateDbModel();
    const res = await model.updateOne({ userId: candidateDetails.userId }, candidateDetails);
    if(res.nModified !== 0){ 
      //profile upadted
      // Step 1: Get the updated candidate's skills
      const candidate = await model.findOne({ userId: candidateDetails.userId });
      console.log("candidate", candidate)


      // Step 2: Find matching jobs
      const jobs = await Job.find({
        requiredSkills: { $in: candidate.skills } // Assuming `requiredSkills` is an array of skills in Job model
      });


      for (let job of jobs) {
        // Step 3.1: Check if the alert already exists (to avoid duplicates)
        const existingAlert = await NewCandidateAlert.findOne({
          candidateId: candidate._id,
          jobId: job._id,
        });

        if (!existingAlert) {
          const newAlert = new NewCandidateAlert({
            candidateId: candidate._id,
            jobId: job._id,
            employerId: job.employerId,
            isSeen: false
          });


          console.log(newAlert)
          await newAlert.save();
          console.log('New alert saved for job:', job._id);
        }
      }
    }
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }

}




candidateModel.getJobRecommendations = async (candidateId) => {
  try {
    const id = new mongoose.Types.ObjectId(candidateId);
    const model = await conn.getCandidateDbModel();
    const candidate = await model.db.collection('candidate').findOne({ _id: id });

    const jobColl = await conn.getJobDbModel();
    // const jobs = await jobColl.db.collection('jobs').find(
    //     {
    //         skills: { $in: candidate.skills },
    //         experience: { $lte: candidate.experience }
    //     }
    // ).toArray();
    const jobs = await jobColl.db.collection('jobs').find(
      {
        $or: [
          {
            skills: { $in: candidate.skills }  // Match if any of the candidate's skills are in the job posting
          },
          {
            experience: { $lte: candidate.experience }  // Match if the candidate's experience is greater than or equal to the job's required experience
          }
        ]
      }
    ).toArray();

    console.log("jovbs", jobs)

    if (jobs.length > 0) return jobs;


  } catch (error) {
    console.error('Error:', error.message);
    throw error;  // Re-throw if necessary
  }

}
candidateModel.getJobNotification = async (candidateId) => {
  try {
    const id = candidateModel.convertToObjectId(candidateId);

    //get all the jobId from the notification db having isNewJob - true
    const notificationModel = await conn.getJobNotificationSchema();
    const allNewJobs = await notificationModel.db.collection('jobNotification').find({ candidateId: id, isNewJob: true }).toArray();

    //get all the job details from the jobs db
    const jobColl = await conn.getJobDbModel();
    const newJobs = [];
    for (let i = 0; i < allNewJobs.length; i++) {
      const job = await jobColl.db.collection('jobs').findOne({ _id: allNewJobs[i].jobId });
      newJobs.push(job);
    }

    //find which job is matching to the candidate's skills and experience
    const model = await conn.getCandidateDbModel();
    const candidate = await model.db.collection('candidate').findOne({ _id: id });
    const recommendedJobs = [];
    for (let i = 0; i < newJobs.length; i++) {
      if (candidate.skills.some(skill => newJobs[i].skills.includes(skill)) && candidate.experience >= newJobs[i].experience) {
        recommendedJobs.push(newJobs[i]);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
    throw error;  // Re-throw if necessary
  }
}

candidateModel.submitJobApplication = async (applicationData) => {
  try {
    // Step 1: Validate Candidate ID and Job ID
    var { candidateId, jobId } = applicationData;
    candidateId = candidateModel.convertToObjectId(candidateId);
    jobId = candidateModel.convertToObjectId(jobId);
    candidateModel.validateCandidateId(candidateId);
    candidateModel.validateJobId(jobId);

    // Step 2: Extract necessary application data (resume, cover letter, etc.)
    // const { resume, coverLetter, appliedThrough = 'Website' } = applicationData;

    // Step 3: Calculate Skills Match (if necessary)
    // const skillsMatch = calculateSkillsMatch(candidate.skills, job.skills);

    // Step 4: Create Job Application
    const newApplication = {
      candidateId: candidateId,
      jobId: jobId,
      applicationDate: new Date(),
      status: 'Applied'
    };

    // Step 5: Save the job application
    //const savedApplication = await newApplication.save();
    const model = await conn.getJobApplicationDBModel();

    console.log("job app model ", model);
    const savedApplication = await model.db.collection('jobApplication').insertOne(newApplication);

    // Step 6: Optionally update job status, candidate status, etc.
    // (This can be done if required for your use case)

    console.log('Job Application submitted successfully:', savedApplication);
    return savedApplication;

  } catch (error) {
    console.error('Error submitting job application:', error.message);
    throw new Error(error.message);
  }
};

candidateModel.getAppliedJobs = async (candidateId) => {
  try {
    // Step 1: Convert candidateId to ObjectId if necessary
    candidateId = candidateModel.convertToObjectId(candidateId);
    // Step 2: Find all job applications for the candidate
    const model = await conn.getJobApplicationDBModel();
    const appliedJobs = await model.db.collection('jobApplication').find({ candidateId: candidateId }).toArray();

    // Step 3: Fetch job details for each applied job
    const jobModel = await conn.getJobDbModel(); // Assuming you have a job model to fetch job details
    const jobDetails = await Promise.all(
      appliedJobs.map(async (application) => {
        const job = await jobModel.db.collection('jobs').findOne({ _id: application.jobId });
        return {
          jobId: application.jobId,
          jobTitle: job.title,  // Assuming job has a title field
          company: job.company, // Assuming job has a company field
          status: application.status,
          appliedOn: application.applicationDate
        };
      })
    );

    // Step 4: Return the applied jobs with their status
    return jobDetails;

  } catch (error) {
    console.error('Error fetching applied jobs:', error.message);
    throw new Error(error.message);
  }
};






















module.exports = candidateModel;



// const email = "admin@gmail.com";
// const model = await conn.getUserDbModel();
// const user = await model.find();
// console.log("user",user);
// console.log("model",model);
// // Check if candidateId is a valid ObjectId
// if (!mongoose.Types.ObjectId.isValid(candidateId)) {
//     throw new Error('Invalid candidateId format');
// }

//  const id = new mongoose.Types.ObjectId(candidateId);
// // // Make sure conn.getCandidateDbModel() is correctly initialized
//  const modell = await conn.getCandidateDbModel();
//  console.log("model",modell);
// // // Query the candidate data by ObjectId
//  const data = await modell.db.collection('candidate').find().toArray();
// console.log(data);



// const candidateData = await model.findOne({ _id: id });



// const usermodel = await conn.getUserDbModel();
// const userData = await model.find();

// console.log("user data",userData)

// if (!candidateData) {
//     console.log('Candidate not found');
// } else {
//     console.log('Candidate data by id: ', candidateData);
// }
