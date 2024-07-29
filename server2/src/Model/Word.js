import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  word: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now }
});

const Word = mongoose.model('Word', wordSchema);

export default Word;