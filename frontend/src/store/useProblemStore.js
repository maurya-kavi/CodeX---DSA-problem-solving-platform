import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useProblemStore = create((set)=>({
    problems:[],
    problem:null,
    solvedProblems:[],
    isProblemsLoading:false,
    isProblemLoading:false,
    

    getAllProblems:async()=>{
        try {
            set({isProblemsLoading:true})
            const res = await axiosInstance.get("/problems/get-all-problems");
            set({problems:res.data.problems})
        } catch (error) {
            console.log("Error getting all problems", error);
            toast.error("Error in getting problems");
        }
        finally{
            set({isProblemsLoading:false})
        }
    },

    getProblemById:async(id)=>{
        try {
            set({isProblemLoading:true})
            const res = await axiosInstance.get(`/problems/get-problem/${id}`); 
            set({problem:res.data.problem})
            toast.success(res.data.message);
        } catch (error) {
            console.log("error getting all problems", error)
            toast.error("Error in getting problems")

        }
        finally{
            set({isProblemLoading:false})
        }
    },

    getSolvedproblemByUser:async()=>{
        try {
            const res = await axiosInstance.get("/problems/get-solved-problem");
            set({solvedproblems:res.data.problems})

        } catch (error) {
            console.log("error getting all problems", error)
            toast.error("Error in getting problems")
        }
    },
    
}))