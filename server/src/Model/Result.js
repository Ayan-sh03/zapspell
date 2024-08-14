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