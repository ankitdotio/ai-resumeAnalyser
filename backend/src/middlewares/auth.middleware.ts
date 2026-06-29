import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { blacklistTokenModel } from "../models/blacklistToken.model.js";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "TOKEN NOT PROVIDED",
    });
  }

  const isTokenBlacklisted = await blacklistTokenModel.findOne({
    token,
  });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "THE TOKEN IS INVALID",
    });
  }
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "INVALID TOKEN",
    });
  }
};
