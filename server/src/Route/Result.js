import express from 'express'
import { GetResultsByUserId } from '../Controller/Result.js'
const router = express.Router()


router.get("/", GetResultsByUserId)

export const resultRouter = router