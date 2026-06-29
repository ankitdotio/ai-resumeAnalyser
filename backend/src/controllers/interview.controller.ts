import type { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

export const generateInterViewReportController = async (
  req: Request,
  res: Response,
) => {
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file!.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "interview report generated successfully",
    interviewReport,
  });
};

/**
 * desc controller to get interview report by id
 */

export const getInterViewReportByIdController = async (
  req: Request,
  res: Response,
) => {
  const reportId = req.params;
  const interviewReport = await interviewReportModel.findOne({
    id: reportId,
    user: req.user.id,
  });
  if (!interviewReport) {
    return res.status(400).json({
      message: "NO REPORT FOUND",
    });
  }

  res.status(200).json({
    message: "REPORT FETCHED SUCCESSFULLY",
    interviewReport,
  });
};

/**
 * desc controller to get all interview report by id
 */
export const getAllInterViewReportByIdController = async (
  req: Request,
  res: Response,
) => {
  const id = req.params;
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(-resume - selfDescription - jobDescription);

  res.status(200).json({
    message: "REPORTS FETCHED SUCCESFULLY",
    interviewReports,
  });
};
