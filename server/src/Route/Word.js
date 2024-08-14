import express from 'express'
import { addWord, getRandomWord } from '../Controller/Word.js'
const router = express.Router()

router.use(express.json())


router.post("/",addWord)
router.get("/random",getRandomWord)

export const wordRouter = router