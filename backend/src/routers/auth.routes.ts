import { Router } from "express";
import {
  getmeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/registerUser.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const authRouter: Router = Router();

/**
 * @route POST /api/auth/register
 * @description Registers a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/register
 * @desc logs in the user
 * @Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc clears token from the user cookies and adds it to the blacklist
 * @Public
 */
authRouter.post("/logout", logoutUserController);

/**
 * @route POST /api/auth/getme
 * @desc gets the current logged in user details
 * @Private
 */

authRouter.get("/getme", authUser, getmeController);
