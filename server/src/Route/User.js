import express from 'express'
import { createUser, getUser } from '../Controller/User.js'
const router = express.Router()

router.use(express.json())


router.post("/login", getUser)
router.post("/register", createUser)


export const userRouter = router