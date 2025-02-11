const conn = require('../config/connection')
const employerModel = {};
const mongoose = require('mongoose');


employerModel.convertToObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid candidateId format');
    }
    return new mongoose.Types.ObjectId(id);
}

employerModel.sendJobAlerts = async (candidateId) => {
    try {

    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // Re-throw if necessary
    }
}

employerModel.addJob = async (jobDetails) => {
    try {
        const model = await conn.getJobDbModel();

        // Add the new job to the 'jobs' collection
        const jobAdded = await model.db.collection('jobs').insertOne({ jobDetails });

        if (jobAdded) {
            console.log("New job added:", jobAdded);

            // Fetch all candidates
            const modell = await conn.getCandidateDbModel();
            const candidates = await modell.db.collection('candidate').find({}).toArray();

            // Loop through all candidates and check if they match the job's requirements
            const job = jobDetails; // The new job details being added

            let matchingCandidatesCount = 0; // Initialize a count for matching candidates

            for (let i = 0; i < candidates.length; i++) {
                const candidate = candidates[i];

                // Check if candidate's skills match the job's skills and experience is sufficient
                if (candidate.skills.some(skill => job.skills.includes(skill)) && candidate.experience >= job.experience) {
                    matchingCandidatesCount++; // Increment count if there's a match

                    // Update the candidate's jobNotification field to indicate the match
                    await modell.db.collection('candidate').updateOne(
                        { _id: candidate._id },  // Match the candidate by ID
                        {
                            $set: {
                                jobNotification: {
                                    jobId: jobAdded.insertedId, // The job that matched
                                    jobTitle: job.title,        // The job title
                                    jobSkills: job.skills,      // The skills required for the job
                                    jobExperience: job.experience, // The experience required
                                    notificationDate: new Date(),  // The date when the notification was added
                                    isNotified: true            // Flag indicating that the candidate was notified
                                }
                            }
                        }
                    );
                    console.log(`Notification added to candidate ${candidate._id}`);
                }
            }

            // Optionally, you can log the number of matching candidates
            console.log(`Number of candidates matching the job: ${matchingCandidatesCount}`);

            // Optionally, attach matching candidates count to the jobAdded object
            jobAdded.matchingCandidates = matchingCandidatesCount;

            return jobAdded;
        }

    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // Re-throw if necessary
    }
}

employerModel.getAllJobs = async () => {
    try {
        const model = await conn.getJobDbModel();
        const jobs = await model.db.collection('jobs').find({}).toArray();
        return jobs;
    } catch (error) {
    }
}

//=================================================
employerModel.getAllAppliedJobsCandidateDetails = async (employerId, filters) => {
    try {
        //console.log("filters ", filters);

        console.log("filters ", filters);

        // Step 1: Get jobs posted by the employer
        const jobModel = await conn.getJobDbModel();
        const employerIdd = employerModel.convertToObjectId(employerId);
        const jobs = await jobModel.db.collection('jobs').find({ employerId: employerIdd }).toArray();

        if (jobs.length === 0) {
            console.log("No jobs found for employer");
        }

        // Step 2: Get job applications for the jobs posted by the employer
        const jobIds = jobs.map(job => job._id);

        console.log("job ids ", jobIds)
        const jobApplicationModel = await conn.getJobApplicationDBModel();
        const jobApplications = await jobApplicationModel.db.collection('jobApplication').find({ jobId: { $in: jobIds } }).toArray();

        console.log("Job applications: ", jobApplications);

        if (jobApplications.length === 0) {
            console.log("No job applications found for the employer");
        }

        // Step 3: Get candidate IDs from job applications
        const candidateIds = jobApplications.map(application => application.candidateId);
        console.log("Candidate IDs: ", candidateIds);

        // Ensure that candidateIds are all ObjectId format before query
        const objectIds = candidateIds.map(id => new mongoose.Types.ObjectId(id));

        // Prepare the query to filter candidates
        let query = { _id: { $in: objectIds } };

        // Apply filters dynamically
        if (filters.skills && filters.skills.length && filters.skills[0] !== null) {
            query['skills'] = { $in: filters.skills };
        }

        if (filters.location) {
            query['preferences.location'] = { $regex: filters.location, $options: 'i' }; // Case-insensitive search
        }

        if (filters.experience && filters.experience !== null) {
            query['workExperience.experience'] = { $gte: filters.experience };
        }

        if (filters.degree && filters.degree !== '') {
            query['education.degree'] = { $regex: filters.degree, $options: 'i' }; // Case-insensitive search
        }

        console.log("Candidate query: ", query);

        // Fetch candidates based on the filtered query
        const candidateModel = await conn.getCandidateDbModel();
        // const allcandidates = await candidateModel.db.collection('candidate').find().toArray();
        // console.log("All candidates" , allcandidates);
        const candidates = await candidateModel.db.collection('candidate').find(query).toArray();

        console.log("Queried candidates: ", candidates);


        // Step 4: Combine job, job application, and candidate details
        const result = jobApplications.map(application => {
            const job = jobs.find(job => job._id.toString() === application.jobId.toString());
            const candidate = candidates.find(candidate => candidate._id.toString() === application.candidateId.toString());

            if (!candidate) {
                console.log(`Candidate not found for application ID: ${application._id}`);
                return null; // Skip this entry if no candidate is found
            }

            return {
                jobDetails: {
                    jobTitle: job.title,
                    companyName: job.company_name,
                    experience: job.experience,
                    salaryRange: job.salary_range,
                    skills: job.skills,
                },
                applicationDetails: {
                    applicationId: application._id,
                    status: application.status,
                    appliedOn: application.applicationDate,
                },
                candidateDetails: {
                    candidateId: candidate._id,
                    candidateName: candidate.name,
                    candidateEmail: candidate.email,
                    candidatePhone: candidate.contactNumber,
                    candidateSkills: candidate.skills,
                    candidateExperience: candidate.workExperience.experience,
                    candidatePreference: candidate.preferences,
                    candidateEducation: candidate.education,
                }
            };
        }).filter(item => item !== null);

        return result;

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


employerModel.getCandidateApplicationDetail = async (applicationId) => {
    const appId = employerModel.convertToObjectId(applicationId);
    const jobApplicationModel = await conn.getJobApplicationDBModel();
    const jobApplications = await jobApplicationModel.db.collection('jobApplication').find({ _id: appId }).toArray();

    console.log("job apps", jobApplications)

    const candidateId = jobApplications[0]?.candidateId; //
    const candidateModel = await conn.getCandidateDbModel();
    const candidates = await candidateModel.db.collection('candidate').find({ _id: candidateId }).toArray();

    console.log("candidate details: ", candidates)

    //job detail
    const jobModel = await conn.getJobDbModel();
    const jobDetail = await jobModel.db.collection('jobs').find({ _id: jobApplications[0]?.jobId }).toArray();

    console.log("job details ", jobDetail)

    const response = {
        jobApplication: jobApplications[0],
        candidate: candidates[0],
        job: jobDetail[0]
    }

    return response;
}


employerModel.updateApplicationStatus = async (applicationId, newStatus) => {
    try {
        const appId = employerModel.convertToObjectId(applicationId);
        const jobApplicationModel = await conn.getJobApplicationDBModel();
        const updateResult = await jobApplicationModel.db.collection('jobApplication').updateOne(
            { _id: appId },
            { $set: { status: newStatus.status } }
        );

        if (updateResult.modifiedCount > 0) {
            return { message: "Status updated successfully" };
        } else {
            console.log("No changes made to the status.");
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // Re-throw if necessary
    }
}




module.exports = employerModel;

