import express, { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import {
  generateInterViewReportController,
  getAllInterViewReportByIdController,
  getInterViewReportByIdController,
} from "../controllers/interview.controller.js";

export const interviewRouter: Router = express.Router();

/**
 * @route POST  /api/interview/
 * @description generates new interview report on the basis of user selfdescription , resume pdf and job description
 * @access private
 */

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterViewReportController,
);

/**
 * @route GET  /api/interview/report/:id
 * @description fetches interview report on the basis of id
 * @access private
 *
 */

interviewRouter.get("/report/:id", authUser, getInterViewReportByIdController);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access  private
 */

interviewRouter.get(
  "/report/:id",
  authUser,
  getAllInterViewReportByIdController,
);
