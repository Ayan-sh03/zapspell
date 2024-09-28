import express from 'express'
import { addManyWords, addWord, getNumberOfWords, getRandomWord, removeAllWords } from '../Controller/Word.js'
const router = express.Router()

router.use(express.json())


router.post("/",addWord)
router.post("/many",addManyWords)
router.get("/count",getNumberOfWords)

router.delete("/",removeAllWords)
router.get("/random",getRandomWord)

export const wordRouter = router