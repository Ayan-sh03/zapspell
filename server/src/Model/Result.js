import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  correct_spellings: { type: Number, default: 0 },
  total_attempts: { type: Number, default: 0 },
  success_percentage: {
    type: Number,
    default: function() {
      return this.total_attempts > 0 ? (this.correct_spellings / this.total_attempts) * 100 : 0;
    }
  },
  updated_at: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;

/*  POSSIBLE CHANGEs
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  correct_spellings: { type: Number, default: 0 },
  total_attempts: { type: Number, default: 0 },
  easy_correct: { type: Number, default: 0 },
  easy_attempts: { type: Number, default: 0 },
  medium_correct: { type: Number, default: 0 },
  medium_attempts: { type: Number, default: 0 },
  hard_correct: { type: Number, default: 0 },
  hard_attempts: { type: Number, default: 0 },
  success_percentage: {
    type: Number,
    default: function() {
      return this.total_attempts > 0 ? (this.correct_spellings / this.total_attempts) * 100 : 0;
    }
  },
  easy_success_percentage: {
    type: Number,
    default: function() {
      return this.easy_attempts > 0 ? (this.easy_correct / this.easy_attempts) * 100 : 0;
    }
  },
  medium_success_percentage: {
    type: Number,
    default: function() {
      return this.medium_attempts > 0 ? (this.medium_correct / this.medium_attempts) * 100 : 0;
    }
  },
  hard_success_percentage: {
    type: Number,
    default: function() {
      return this.hard_attempts > 0 ? (this.hard_correct / this.hard_attempts) * 100 : 0;
    }
  },
  updated_at: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
A
*/