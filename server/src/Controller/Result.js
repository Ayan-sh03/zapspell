import Result from "../Model/Result.js";

/**
 * The function `GetResultsByUserId` retrieves results based on the user ID and returns them in JSON
 * format, handling errors appropriately.
 * @param req - The `req` parameter in the `GetResultsByUserId` function typically represents the
 * request object in an Express route handler. It contains information about the HTTP request that was
 * made, such as the request headers, parameters, body, and user information. In this specific
 * function, `req.user` is
 * @param res - The `res` parameter in the `GetResultsByUserId` function is the response object that
 * will be used to send the response back to the client making the request. It is typically used to set
 * the status code and send data back in the response.
 * @returns The function `GetResultsByUserId` is returning either a success response with the results
 * for the specified user if found, or an error response with a message if there was an error during
 * the process. If no results are found for the user, it will return a 404 status with a message
 * indicating that no results were found.
 */
export const GetResultsByUserId = async (req, res) => {
  const userId = req.user;
  try {
    const results = await Result.find({ user_id: userId });
    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for the user' });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $project: {
          user_id: 1,
          correct_spellings: 1,
          total_attempts: 1,
          success_percentage: 1,
          combined_score: {
            $add: [
              { $multiply: ['$success_percentage', 0.5] },
              { $multiply: ['$correct_spellings', 0.3] },
              { $multiply: ['$total_attempts', 0.2] },
            ],
          },
        },
      },
      { $sort: { combined_score: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users', // Change 'Users' to 'users' (MongoDB collection is lowercase)
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' }, // Unwind the user array to access the fields
      {
        $project: {
          _id: 0,
          first_name: '$user.first_name', // Access first_name and last_name from 'user'
          last_name: '$user.last_name',
          correct_spellings: 1,
          total_attempts: 1,
          success_percentage: 1,
          combined_score: 1,
        },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error during aggregation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// export const getLeaderboard = async (req, res) => {


//   const leaderboard = await Result.aggregate([
//     {
//       $project: {
//         user_id: 1,
//         correct_spellings: 1,
//         total_attempts: 1,
//         success_percentage: 1,
//         combined_score: {
//           $add: [
//             { $multiply: ['$success_percentage', 0.5] },
//             { $multiply: ['$correct_spellings', 0.3] },
//             { $multiply: ['$total_attempts', 0.2] }
//           ]
//         }
//       }
//     },
//     { $sort: { combined_score: -1 } },
//     { $limit: 10 }
//   ]); 
  
//   console.log(leaderboard);

//   res.status(200).json(leaderboard);

// };