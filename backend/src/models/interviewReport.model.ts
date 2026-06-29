import mongoose from "mongoose";

/**
* - job description schema : String
* - resume text : String
* - Self description : String
*
* - Technical questions :[{
*       question :"",
*        intension:"",
*        answer:""
*    
* }]
*
* -matchScore: Number
*
question : ""
*
intention : "",
*
answer: '''',
*
｝］
* - Behavioral questions : [
*
* - Skill gaps : [{
* 
*       skill :"",
*       severity :{
*           type: String
*           enum :["low", "medium","high"]          
* }
* }]
* - preparation plan : [{
*       day:Number,
*       focus: String,
*       tasks: [String],
*       
* }]
*
*/

const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "TECHNICAL QUESTION IS REQUIRED"],
    },
    intention: {
      type: String,
      required: [true, "INTENTION IS REQUIRED"],
    },
    answer: {
      type: String,
      required: [true, "ANSWER IS REQUIRED"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "TECHNICAL QUESTION IS REQUIRED"],
    },
    intention: {
      type: String,
      required: [true, "INTENTION IS REQUIRED"],
    },
    answer: {
      type: String,
      required: [true, "ANSWER IS REQUIRED"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      reuired: [true, "SKILL IS REQUIRED"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "SEVERITY IS REQUIRED"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "DAY IS REQUIRED"],
  },
  focus: {
    type: String,
    required: [true, "FOCUS IS REQUIRED"],
  },
  tasks: [
    {
      type: String,
      required: [true, "TASK IS REQUIRED"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "JOB DESCRIPTION IS REQUIRED"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "JOB TITLE IS REQUIRED"],
    },
  },
  {
    timestamps: true,
  },
);

export const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);
