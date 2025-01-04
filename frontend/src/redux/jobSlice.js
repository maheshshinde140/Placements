import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance"; // Assuming axiosInstance is already configured

// Thunks for asynchronous actions

// Create Job with Eligibility Criteria
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/create", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create job.");
    }
  }
);

// Get All Jobs (TNP Admin)
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/jobs/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to show eligible students
export const showEligibleStudents = createAsyncThunk(
  "jobs/showEligibleStudents",
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/eligible-students", criteria);
      return response.data; // Return the list of eligible students
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch eligible students.");
    }
  }
);

// Get Eligible Jobs for Students
export const getEligibleJobs = createAsyncThunk(
  "jobs/getEligibleJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/jobs/eligible");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Apply for Job
export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/jobs/${jobId}/apply`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Rounds Creation
export const createRounds = createAsyncThunk(
  "jobs/createRounds",
  async ({ jobId, rounds }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/jobs/${jobId}/rounds`, { rounds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Round Results
export const updateRoundResults = createAsyncThunk(
  "jobs/updateRoundResults",
  async ({ jobId, roundId, qualifiedStudents }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/jobs/${jobId}/rounds/${roundId}`, { qualifiedStudents });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating the job logo
export const updateLogo = createAsyncThunk(
  "jobs/updateLogo",
  async (formData, { rejectWithValue }) => {
    try {
      const jobId = formData.get("jobId"); // Extract jobId from FormData
      const response = await axiosInstance.put(`/jobs/${jobId}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      return response.data; // Response with updated logo URL
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update logo.");
    }
  }
);


// Slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    eligibleStudents: [], // New state for storing eligible students
    totalEligibleStudents: 0, // Count of eligible students
    jobDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload.job);
        state.success = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Eligible Jobs
      .addCase(getEligibleJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEligibleJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getEligibleJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job._id !== action.payload.jobId);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Apply for Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetails = action.payload.job; // Update job details after applying
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Rounds
      .addCase(createRounds.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRounds.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find(job => job._id === action.payload.jobId);
        if (job) {
          job.rounds = action.payload.rounds;
        }
      })
      .addCase(createRounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Round Results
      .addCase(updateRoundResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoundResults.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find(job => job._id === action.payload.jobId);
        if (job) {
          const round = job.rounds.find(round => round._id === action.payload.round._id);
          if (round) {
            round.qualifiedStudents = action.payload.round.qualifiedStudents;
          }
        }
      })
      .addCase(updateRoundResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLogo.pending, (state) => {
        state.loading = true;
        state.error = null; // Indicate loading during logo update
      })
      .addCase(updateLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedJob = state.jobs.find((job) => job._id === action.meta.arg.jobId);
        if (updatedJob) {
          updatedJob.logo = action.payload.logo;
        }
      })
      .addCase(updateLogo.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.payload; // Handle errors
      })

      // Show Eligible Students
      .addCase(showEligibleStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showEligibleStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.eligibleStudents = action.payload.students; // Store eligible students
        state.totalEligibleStudents = action.payload.totalEligibleStudents; // Store the total count
        state.success = true;
      })
      .addCase(showEligibleStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = jobsSlice.actions;
export default jobsSlice.reducer;
