import { all } from "axios";
import { db } from "../libs/db.js"
import { pollBatchResults, submitBatch, getLanguageName } from "../libs/judge0.lib.js";


export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_outputs, problemId } = req.body

        const userId = req.user.id;

        //validate test cases
        if (
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length
        ) {
            return res.status(400).json({
                error: "Invalid test cases"
            })
        }

        //2. prapare each test cases for judge0 batch submission
        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
        }));

        //3. send batch of submission to judge0 
        const submitResponse = await submitBatch(submissions);

        const tokens = submitResponse.map((res) => res.token);

        //4. pull judge0 for the result of each test case
        const results = await pollBatchResults(tokens);

        console.log('Result-----')
        console.log(results)

        //Analyze the testcases results
        let allPassed = true;
        const detailedResults = results.map((result, i) => {
            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim()

            const passed = stdout === expected_output;

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.stderr || null,
                compile_output: result.compile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined
            }

            // console.log(`Test Case #${i + 1}`);
            // console.log(`Input for testcase #${i+1}: ${stdin[i]}`);
            // console.log(`Expected Output for the testcase #${i+1}: ${expected_output}`);
            // console.log(`Actual Output for testcase #${i+1}: ${stdout}`);
            // console.log(`Matched testcase #${i+1}: ${passed}`);
        })

        console.log(detailedResults)

        //store submission summary
        const submission = await db.submission.create({
            data: {
                problemId,
                userId,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                stderr: detailedResults.some((r) => r.status)
                    ? JSON.stringify(detailedResults.map((r) => r.stderr))
                    : null,
                compileOutput: detailedResults.some((r) => r.compile_output)
                    ? JSON.stringify(detailedResults.map((r) => r.compile_output))
                    : null,
                status: allPassed ? "Accepted" : "Wrong Answer",
                memory: detailedResults.some((r) => r.memory)
                    ? JSON.stringify(detailedResults.map((r) => r.memory))
                    : null,
                time: detailedResults.some((r) => r.time)
                    ? JSON.stringify(detailedResults.map((r) => r.time))
                    : null
            }
        })

        //if all passed = true mark problem as solved for the user
        if (allPassed) {
            console.log("userId:", userId);
            console.log("problemId:", problemId);

            await db.problemSolved.upsert({
                //upsert means if record doesn't exist create it otherwise update it
                where:{
                    userId_problemId:{
                        userId,
                        problemId
                    },
                },
                update:{},
                create:{
                    user:    { connect: { id: userId } },   // ✅ link existing user
                    problem: { connect: { id: problemId } } // ✅ link existing problem
                }   
            });

        }


        //8 save individual test case result
        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submission.id,
            testCase: String(result.testCase),
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compile_output,
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));

        await db.testCaseResult.createMany({
            data: testCaseResults,
        })

        const submissionWithTestCase = await db.submission.findUnique({
            where: {
                id: submission.id,
            },
            include: {
                testCases: true
            }
        })


        res.status(200).json({
            success: true,
            message: "Code Executed!",
            submission: submissionWithTestCase  
        });
    }
    catch (error) {
        console.error("Error executing code:", error.message);
        return res.status(500).json({
            error: "Error While Executing Code"
        });
    }
}