import Attempt from "../Model/Attempt.js";

export const addAttempt = async (req, res) => {
  const {  wordId:word_id, attemptWord:attempt_word, isCorrect:is_correct } = req.body;
  const  userId  = req.user;

  try {
    const newAttempt = await Attempt.create({
      user_id:userId,
      word_id,
      attempt_word,
      is_correct,
    });

    console.log('====================================');
    console.log(newAttempt);
    console.log('====================================');

    if (!newAttempt) {
      res.status(400).json({ error: "Error Adding attempt" });
      // throw new Error("Error adding attempt")
    }

    res.status(200).json({ status: 1, message: "Attempt added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAttemptByUserId = async (req, res) => {
  const  userId  = req.user;

  try {
    const attempts = await Attempt.find({user_id:userId});
    if (!attempts || attempts.length === 0) {
     return res.status(404).json({ error: "No attempts found" });
    }
    res.status(200).json({  data: attempts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAttemptPerWord  = async(req,res)=>{
    try{
        const {wordId} = req.params
        const attempts = await Attempt.find({wordId:wordId})
        if(!attempts){
            res.status(400).json({error:"No attempts found"})
        }
        res.status(200).json({data:attempts})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}


export const getAllAttemptsByUserIdPerWord = async (req, res) => {
  try {
    const { userId } = req.params;

    const attempts = await Attempt.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: Word.collection.name, 
          localField: 'word_id',
          foreignField: '_id',
          as: 'word'
        }
      },
      {
        $unwind: '$word'
      },
      {
        $group: {
          _id: '$word_id',
          word: { $first: '$word.word' },
          attempts: {
            $push: {
              _id: '$_id',
              attempt_word: '$attempt_word',
              is_correct: '$is_correct',
              attempted_at: '$attempted_at'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          word_id: '$_id',
          word: 1,
          attempts: 1
        }
      }
    ]);

    if (attempts.length === 0) {
      return res.status(404).json({ message: 'No attempts found for the user' });
    }

    res.status(200).json({ attempts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};