import express from "express";
import { login, register, logout , check } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"


const authRoutes = express.Router()

authRoutes.post("/register" , register)  // rigister karne ke liye login nhi chahiye
authRoutes.post("/login" , login)   // login karne ke liye pahle se login nhi chahiye
authRoutes.post("/logout" , authMiddleware, logout)    // logout karne ke liye user login huaa rahna chahiye
authRoutes.get("/check" , authMiddleware, check )

export default authRoutes;