import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";
import { comparePasswords, encryptPassword } from "../utils/encryption.js";

export const getUser = async (req, res) => {
  console.log('Request body:', req.body);
  const { email, password } = req.body;

  // console.log("Received request body:", req.body);
  // console.log("Received headers:", req.headers);

  console.log('====================================');
  console.log(email);
  console.log(password);
  console.log('====================================');

  if (!email || !password) {
    // return res.status(402).json({"message":"Bad request "})
    throw new Error("Invalid email or password");
  }
  const checkUser = await User.findOne({ email: email });

  if (!checkUser) {
    res.status(400).json({ message: "Email is not registered" });
    return;
  }

  if (!comparePasswords(password, checkUser.password)) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }

  const { id, email: userEmail } = checkUser;
  const token = jwt.sign({ id, userEmail }, process.env.JWT_AUTH, {
    expiresIn: "30d",
  });

  // Set the token as an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 days
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    sameSite: 'strict'
  });

  res.status(200).json({  token: token, email: userEmail });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};                

export const getUserById = async (req, res) => {
  const id  = req.user;
  // console.log(id);
  const user = await User.findById(id);
  // console.log(user);
  const { email } = user;
  const userWithoutPassword = {email};
  res.status(200).json(userWithoutPassword);
};

export const createUser = async (req, res) => {
  const { first_name, last_name, password, email } = req.body;

  console.log('====================================');
  console.log(email);
  console.log(password);
  console.log('====================================');


  const checkEmail = await User.findOne({ email: email });

  if (checkEmail) {
    res.status(400).json({ message: "Email is already registered" });
    return;
  }

  const hashedPassword = await encryptPassword(password);

  const user = await User.create({
    first_name,
    last_name,
    password: hashedPassword,
    email: email,
  });

  const { id } = user;
  const token = jwt.sign({ id }, process.env.JWT_AUTH, {
    expiresIn: "30d",
  });

  // Set the token as an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    sameSite: 'strict'
  });

  res.status(200).json({ token: token });
};
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json({  user: user });
};
