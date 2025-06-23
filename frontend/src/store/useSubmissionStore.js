import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useSubmissionStore = create((set) => ({
    isLoading:null,
    submissions: [],
    submission:null,
    submissionCount:null,

    getAllSubmissions: async () => {
        try {
            set({isLoading: true});
            const response = await axiosInstance.get("/submission/get-all-submissions");
            set({ submissions: response.data.submissions });
            toast.success(response.data.message);   
        } catch (error) {
            console.error("Error fetching submissions:", error);
            toast.error("Error fetching submissions");
        }
        finally{
            set({isLoading: false});
        }
    },

    getSubmissionForProblem: async (problemId) => {
        try {
            const response = await axiosInstance.get(`/submission/get-submission/${problemId}`);
            set({ submission: response.data.submissions });
        } catch (error) {
            console.error("Error fetching submissions for problem:", error);
            toast.error("Error fetching submissions for problem");
        }
    },

    getSubmissionCountForProblem: async (problemId) => {
        try {
            const response = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`);
            set({ submissionCount: response.data.count });
        } catch (error) {
            console.error("Error fetching submission count for problem:", error);
            toast.error("Error fetching submission count for problem");
        }
    },

    
}));
