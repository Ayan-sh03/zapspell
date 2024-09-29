import Attempt from "../Model/Attempt.js";
import Word from "../Model/Word.js";
import { encrypt } from "../utils/encryption.js";   

export const addWord = async (req, res) => {
  try {
    const { word ,difficulty } = req.body;
    const newWord = await Word.create({ word ,difficulty});
    res.status(200).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getNumberOfWords = async (req, res) => {
  try {
    const count = await Word.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addManyWords = async (req, res) => {
  try {
    const words = req.body;
    const newWords = await Word.insertMany(words);
    res.status(200).json(newWords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeAllWords = async (req, res) => {
  try {
    await Word.deleteMany({});
    res.status(200).json({ message: "All words removed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getWordById = async (id) => {
  const word = await Word.findById(id);
  return word;
};

export const getRandomWord = async (req, res) => {
  try {
    const { difficulty } = req.query;
    const userId = req.user; // Assuming req.user contains the user object with _id

    let query = {
      _id: { $nin: await getUserAttemptedWordIds(userId) }
    };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const word = await Word.aggregate([
      { $match: query },
      { $sample: { size: 1 } }
    ]);

    if (word.length === 0) {
      return res.status(404).json({ message: "No new words available for the specified criteria" });
    }

    const encryptedWord = encrypt(word[0].word);
    res.status(200).json({ word: encryptedWord, id: word[0]._id, difficulty: word[0].difficulty });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


async function getUserAttemptedWordIds(userId) {
  const userAttempts = await Attempt.find({ user_id: userId }).distinct('word_id');
  return userAttempts;
}