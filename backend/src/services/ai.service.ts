import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js";
import { z } from "zod";

const client = new GoogleGenAI({
  apiKey: config.ai_api_key,
});

interface GenerateInterviewReportInput {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}

export const InterviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  summary: z.string(),

  strengths: z.array(z.string()),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  title: z
    .string()
    .describe("The title of the job for which the report is generated"),
});

export type InterviewReport = z.infer<typeof InterviewReportSchema>;

const interviewReportSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
    },

    summary: {
      type: "string",
    },

    strengths: {
      type: "array",
      items: {
        type: "string",
      },
    },

    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          intention: {
            type: "string",
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          intention: {
            type: "string",
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
          },
        },
        required: ["skill", "severity"],
      },
    },

    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "number",
          },
          focus: {
            type: "string",
          },
          tasks: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: [
    "matchScore",
    "summary",
    "strengths",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}: GenerateInterviewReportInput): Promise<InterviewReport> => {
  const prompt = `
You are an experienced Senior Technical Recruiter and Interview Coach.

Analyze the candidate's Resume and Self Description against the Job Description.

Return ONLY valid JSON.

Instructions:

- Match score between 0 and 100.
- Short summary.
- Relevant strengths.
- Exactly 5 technical interview questions.
- Exactly 5 behavioral interview questions.
- Every question must contain:
  - question
  - intention
  - answer
- Identify missing skills.
- Severity must be one of:
  - low
  - medium
  - high
- Create a 7-day preparation plan.
- Every day must contain:
  - day
  - focus
  - 3-5 tasks.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportSchema,
      },
    });

    if (!response.text) {
      throw new Error("AI returned an empty response.");
    }

    const parsed = JSON.parse(response.text);
    return parsed;
    // return InterviewReportSchema.parse(parsed);
  } catch (error) {
    console.error("Failed to generate interview report:", error);
    throw new Error("Failed to generate interview report.");
  }
};
