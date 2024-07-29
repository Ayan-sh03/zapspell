import express from 'express'
import { addAttempt, getAllAttemptsByUserIdPerWord, getAttemptByUserId } from '../Controller/Attempt.js';
const router = express.Router()

router.use(express.json())



router.post("/add", addAttempt);
router.get("/get/:userId", getAttemptByUserId);
router.get("/get/:userId/:wordId", getAllAttemptsByUserIdPerWord);

export const attemptRouter = router