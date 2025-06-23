import { db } from "../libs/db.js"
import { pollBatchResults, getJudge0LanguageId , submitBatch} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    //going to get all the data from the req body
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

    //going to check the role of user once again
    // if (req.user !== "ADMIN") {
    //     return res.status(403).json({
    //         error: "You are not allowed to create a problem"
    //     })
    // }

    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({
                    error: `Language ${language} is not supported`
                })
            }
            const submission = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));
       
            const submissionResults = await submitBatch(submission);
       
            const tokens = submissionResults.map((res) => res.token);
       
            const results = await pollBatchResults(tokens);
       
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result----", result);
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`
                    });
                }
            }
        }
     
        

        //save the problem in the db

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            }
        });

        return res.status(201).json(newProblem);
    }
    catch (error) {
        console.error("Error creating problem:", error)
        res.status(500).json({
            error: "Error creating problem"
        })
    }
    //loop through each and every reference solution

}

export const getAllProblem = async (req, res) => {

    try {
        const problems = await db.problem.findMany(
            {
                include: {
                    solvedBy: {
                        where: {
                            userId: req.user.id
                        }
                    }
                }
            }
        );

        if(!problems){
            return res.status(400).json({
                error:"NO pronlems found"
            })
        }

        res.status(200).json({
            sucess:true,
            message:"Message Fetched Successfully",
            problems
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error While Fetching Problems"
        });
    }
}

export const getProblemById = async (req, res) => {
    const {id}=req.params;

    try {
        const problem = await db.problem.findUnique({
            where:{
                id
            }
        })
        if(!problem){
            return res.status(400).json({
                error:"Problem not found"
            })
        }
        res.status(200).json({
            sucess:true,
            message:"Message created Successfully",
            problem
        })
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error While Fetching Problem by id"
        });
    }

}

export const updateProblem = async (req, res) => {
     //it will same as create problem
     //most of the code part will be same
     //search the problem by id before data
      
}

export const deleteProblem = async (req, res) => {
    const {id}=req.params;
    try {
        const problem = await db.problem.findUnique({
            where:{
                id
            }
        })
        if(!problem){
            return res.status(404).json({
                error:"Problem not found"
            })
        }
        await db.problem.delete({
            where:{
                id
            }
        });
        res.status(200).json({
            sucess:true,
            message:"Message deleted Successfully"
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error While Deleting Problem"
        });  
    }
}

export const getAllProblemSolvedByUser = async (req, res) => {
    try {
        const problelms = await db.problem.findMany({
            where:{
                solvedBy:{
                    some:{
                        userId:req.user.id
                    }
                }
            },
            include:{
                solvedBy:{
                    where:{
                        userId:req.user.id
                    }
                }
            }
        })
        res.status(200).json({
            sucess:true,
            message:"Problem Fetched Successfully",
            problelms
        })
    } catch (error) {
        console.error("Error fetching Problem" , error)
        res.status(500).json({
            error:"Failed to fetch Problem"
        })
    }
}

