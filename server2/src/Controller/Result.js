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
