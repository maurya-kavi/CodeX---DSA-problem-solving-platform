import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getSubmissionsForProblem, getAllTheSubmissionsForTheProblem } from "../controllers/submission.controller.js";    


const submissionRoutes = express.Router();  

submissionRoutes.get("/get-all-submissions", authMiddleware , getAllSubmission);
submissionRoutes.get("/get-submission/:problemId", authMiddleware , getSubmissionsForProblem);

submissionRoutes.get("/get-submissions-count/:problemId", authMiddleware , authMiddleware , getAllTheSubmissionsForTheProblem);

export default submissionRoutes;