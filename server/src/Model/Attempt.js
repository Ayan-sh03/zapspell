import mongoose from 'mongoose';
import Result from './Result.js';

const attemptSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  word_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  attempt_word: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
  attempted_at: { type: Date, default: Date.now }   
});

// Middleware to update results after saving an attempt
/* This code snippet is a middleware function in a Mongoose schema for attempts. Specifically, it is a
post-save middleware function that runs after a document is saved in the `Attempt` collection.
*/
attemptSchema.post('save', async function(doc, next) {
  try {
    const result = await Result.findOne({ user_id: doc.user_id });

    if (result) {
      result.total_attempts += 1;
      if (doc.is_correct) {
        result.correct_spellings += 1;
      }
      result.success_percentage = result.total_attempts > 0 ? (result.correct_spellings / result.total_attempts) * 100 : 0;
      result.updated_at = new Date();
      await result.save();
    } else {
      const newResult = new Result({
        user_id: doc.user_id,
        total_attempts: 1,
        correct_spellings: doc.is_correct ? 1 : 0
      });
      await newResult.save();
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Attempt = mongoose.model('Attempt', attemptSchema);

export default Attempt;

//* POSSIBLE CHANGES
/**
 * 
 * attemptSchema.post('save', async function(doc, next) {
  try {
    const result = await Result.findOne({ user_id: doc.user_id });

    if (result) {
      result.total_attempts += 1;
      if (doc.is_correct) {
        result.correct_spellings += 1;
      }

      // Update difficulty-specific fields
      switch (doc.difficulty) {
        case 'easy':
          result.easy_attempts += 1;
          if (doc.is_correct) result.easy_correct += 1;
          break;
        case 'medium':
          result.medium_attempts += 1;
          if (doc.is_correct) result.medium_correct += 1;
          break;
        case 'hard':
          result.hard_attempts += 1;
          if (doc.is_correct) result.hard_correct += 1;
          break;
      }

      // Recalculate percentages
      result.success_percentage = result.total_attempts > 0 ? (result.correct_spellings / result.total_attempts) * 100 : 0;
      result.easy_success_percentage = result.easy_attempts > 0 ? (result.easy_correct / result.easy_attempts) * 100 : 0;
      result.medium_success_percentage = result.medium_attempts > 0 ? (result.medium_correct / result.medium_attempts) * 100 : 0;
      result.hard_success_percentage = result.hard_attempts > 0 ? (result.hard_correct / result.hard_attempts) * 100 : 0;

      result.updated_at = new Date();
      await result.save();
    } else {
      const newResult = new Result({
        user_id: doc.user_id,
        total_attempts: 1,
        correct_spellings: doc.is_correct ? 1 : 0,
        [`${doc.difficulty}_attempts`]: 1,
        [`${doc.difficulty}_correct`]: doc.is_correct ? 1 : 0
      });
      await newResult.save();
    }
    next();
  } catch (err) {
    next(err);
  }
});

 * 
 * / */