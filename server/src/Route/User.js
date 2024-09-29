import express from "express";
import { createUser, getUser, getUserById } from "../Controller/User.js";
import { authorizationMiddleware } from "../Middleware/Auth.js";
const router = express.Router();

router.use(express.json());

router.post("/login", getUser);
router.post("/register", createUser);
router.get("/", authorizationMiddleware, getUserById);
router.post("/logout", authorizationMiddleware, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});
export const userRouter = router;
