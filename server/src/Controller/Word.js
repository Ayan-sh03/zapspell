import Word from "../Model/Word.js";
import { encrypt } from "../utils/encryption.js";   

export const addWord = async (req, res) => {
  try {
    const { word } = req.body;
    const newWord = await Word.create({ word });
    res.status(200).json(newWord);
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
    console.log(encryptedWord);
    res.status(200).json({ word: encryptedWord, id: word[0]._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
