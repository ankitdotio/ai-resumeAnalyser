import type { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.models.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { blacklistTokenModel } from "../models/blacklistToken.model.js";

/**
 *
 * @name registerUserController
 * @desc registers a new user ,expects name , email,password
 *
 * @access Public
 */
export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).send("PLEASE PROVIDE - USERNAME ,EMAIL ,PASSWORD");
  }

  const UserAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (UserAlreadyExists) {
    return res.status(400).json({ message: "USERNAME OR EMAIL ALREADY TAKEN" });
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password: passwordHashed,
  });

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    config.jwt_secret,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "USER CREATED SUCCESSFULLY",
  });
};
/**
 *
 * @name loginUserController
 * @desc logs in the user, takes userName and password
 * @Public
 * @returns
 */
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });

  if (!user) {
    return res.status(400).json({ message: "USER DOES NOT EXISTS" });
  }

  const isPasswordCorrect = bcrypt.compare(password, user?.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "PASSWORD IS INVALID" });
  }

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    config.jwt_secret,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "USER SUCCESSFULLY LOGGED IN",
    user: {
      userName: user.userName,
      id: user._id,
    },
  });
};
/**
 *
 * @name logoutUserController
 * @desc clears the token and adds it to black list
 * @Public
 * @returns
 */
export const logoutUserController = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({
      token,
      expiresAt: new Date(jwt.decode(token).exp * 1000),
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "USER LOGGED OUT SUCCESSFULLY",
  });
};

/**
 *
 * @name getmeController
 * @desc get the current logged in user details
 * @access Private
 * @returns
 */
export const getmeController = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "USER NOT FOUND",
    });
  }
  return res.status(200).json({
    message: "USER FETCHED SUCCESSFULLY",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
};
