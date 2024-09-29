import express from 'express'
import { addManyWords, addWord, getNumberOfWords, getRandomWord, removeAllWords } from '../Controller/Word.js'
import { authorizationMiddleware } from '../Middleware/Auth.js'
const router = express.Router()

router.use(express.json())


router.post("/",addWord)
router.post("/many",addManyWords)
router.get("/count",getNumberOfWords)

// router.delete("/",removeAllWords)
router.get("/random",authorizationMiddleware,getRandomWord)

export const wordRouter = router