import React, { useState } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const JobInternContent = ({ appliedJobsHistory }) => {
  const [showMoreJobs, setShowMoreJobs] = useState(false);
  const [showMoreInternships, setShowMoreInternships] = useState(false);
  if (!appliedJobsHistory) return null;

  // Filter and map jobs
  const jobs = appliedJobsHistory
    .filter((job) => job.jobId.type === "job")
    .map((job) => ({
      id: job._id,
      company: job.jobId.company || null,
      position: job.jobId.title || null,
      logo: job.jobId.logo || null,
      appliedOn: job.appliedOn || null,
      location: job.jobId.location || null,
      employmentType: job.jobId.type || null,
      description: job.jobId.description || null,
      selected: true, // Assuming all jobs in appliedJobsHistory are selected
    }));

  // Filter and map internships
  const internships = appliedJobsHistory
    .filter((job) => job.jobId.type === "Internship")
    .map((job) => ({
      id: job._id,
      company: job.jobId.company || null,
      position: job.jobId.title || null,
      logo: job.jobId.logo || null,
      appliedOn: job.appliedOn || null,
      location: job.jobId.location || null,
      employmentType: job.jobId.type || null,
      description: job.jobId.description || null,
      selected: true, // Assuming all internships in appliedJobsHistory are selected
    }));

  return (
    <div className="flex justify-between">
      <div className="w-[48%]">
        <h2 className="text-[22px] mt-7  font-semibold  mb-2 text-gray-700">
          Job :
        </h2>
        <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
          {(showMoreJobs ? jobs : jobs.slice(0, 3)).map((job) => (
            <div
              key={job.id}
              className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full "
            >
              <div className="flex items-center">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt="company-logo"
                    className="w-[50px] h-[50px] rounded-md mr-2"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] rounded-md mr-2 flex items-center justify-center bg-gray-200">
                    <HiOutlineBuildingOffice2 className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-[17px] font-medium">{job.company}</h3>
                  <p className="text-[16px] font-normal">{job.position}</p>
                </div>
                <button className="ml-auto bg-[#A6C0CF] text-text-[rgb(22,22,59)] border border-[#84a7bb] rounded-xl px-3 py-1 shadow-md hover:bg-[#84a7bb]">
                  Remove
                </button>
              </div>
              <div className="mt-2 text-[14px]">
                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(job.appliedOn).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Employment Type:</strong> {job.employmentType}
                </p>
                <p>
                  <strong>About:</strong> {job.description}
                </p>
              </div>
              {job.selected && (
                <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">
                  &#10003;
                </span>
              )}
            </div>
          ))}
          <p
            onClick={() => setShowMoreJobs(!showMoreJobs)}
            className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
          >
            {showMoreJobs ? "See less..." : "See more..."}
          </p>
        </div>
        <p className="mt-1 ml-2 text-[rgb(64,64,148)]">
          Applied {jobs.filter((job) => job.selected).length}/{jobs.length}
        </p>
      </div>

      <div className="w-[48%]">
        <h2 className="text-[22px] mt-7 mb-2  font-semibold  text-gray-700">
          Internship :
        </h2>
        <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
          {(showMoreInternships ? internships : internships.slice(0, 3)).map(
            (internship) => (
              <div
                key={internship.id}
                className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full"
              >
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="company-logo"
                    className="w-12 h-12 rounded-md mr-2"
                  />
                  <div>
                    <h3 className="text-[17px] font-medium">
                      {internship.company}
                    </h3>
                    <p className="text-[16px] font-normal">
                      {internship.position}
                    </p>
                  </div>
                  <button className="ml-auto bg-[#A6C0CF] text-[rgb(22,22,59)] border border-[#84a7bb] rounded-lg px-3 py-1 shadow-md hover:bg-[#84a7bb] ">
                    Remove
                  </button>
                </div>
                <div className="mt-2 text-[14px]">
                  <p>
                    <strong>Applied on:</strong>{" "}
                    {new Date(internship.appliedOn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {internship.location}
                  </p>
                  <p>
                    <strong>Employment Type:</strong>{" "}
                    {internship.employmentType}
                  </p>
                  <p>
                    <strong>About:</strong> {internship.description}
                  </p>
                </div>
                {internship.selected && (
                  <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">
                    &#10003;
                  </span>
                )}
              </div>
            )
          )}
          <p
            onClick={() => setShowMoreInternships(!showMoreInternships)}
            className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
          >
            {showMoreInternships ? "See less..." : "See more..."}
          </p>
        </div>
        <p className="mt-1 ml-2 text-[rgb(64,64,148)]">
          Applied {internships.filter((intern) => intern.selected).length}/
          {internships.length}
        </p>
      </div>
    </div>
  );
};

export default JobInternContent;