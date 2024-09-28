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
    const word = await Word.aggregate([{ $sample: { size: 1 } }]);
    const encryptedWord = encrypt(word[0].word);
    res.status(200).json({ word: encryptedWord, id: word[0]._id,difficulty:word[0].difficulty });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
