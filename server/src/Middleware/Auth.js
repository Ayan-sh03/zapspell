import jwt from "jsonwebtoken";

export const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH);
    const { id } = decoded;
    req.user = id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Not authorized to access this route" });
  }
};