
import jwt from "jsonwebtoken";


export const authorizationMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({"message":"No Token Provided"})
		throw new Error("No token provided");
	}
	const token = authHeader.split("Bearer ")[1]; 
	try {
		const decoded = jwt.verify(token, process.env.JWT_AUTH);
		const { id } = decoded;
		req.user = id ;
	} catch (err) {
		throw new Error("Not authorized to access this route");
	}

	next();
};
