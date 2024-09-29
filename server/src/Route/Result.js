import express from 'express'
import { getLeaderboard, GetResultsByUserId } from '../Controller/Result.js'
const router = express.Router()


router.get("/", GetResultsByUserId)
// router.get("/leaderboard", getLeaderboard)
export const resultRouter = router