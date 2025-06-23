import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, addProblemToPlaylist, removeProblemFromPlaylist  } from "../controllers/playlist.controller.js";

const playlistRoutes = express.Router()

playlistRoutes.get("/",authMiddleware,getAllListDetails)
playlistRoutes.get("/:playlistId", authMiddleware , getPlayListDetails)
playlistRoutes.post("/create-playlist", authMiddleware , createPlaylist)
playlistRoutes.post("/:playlistId/add-problem", authMiddleware , addProblemToPlaylist)
playlistRoutes.delete("/:playlistId", authMiddleware , deletePlaylist) //delete playlist

playlistRoutes.delete("/:playlistId/remove-problem", authMiddleware, removeProblemFromPlaylist)  //delete problem from playlist


export default playlistRoutes;