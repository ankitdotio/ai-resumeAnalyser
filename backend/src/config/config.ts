import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_USERNAME) {
  throw new Error("DB USERNAME NOT IN ENV FILE");
}

if (!process.env.MONGODB_PASSWORD) {
  throw new Error("DB PASSWORD NOT IN ENV FILE");
}

if (!process.env.MONGODB_URI) {
  throw new Error("DB URI NOT IN ENV FILE");
}

if (!process.env.PORT) {
  throw new Error("PORT IS NOT PRESENT IN THE DOTENV FILE");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET IS NOT PRESENT IN THE DOTENV FILE");
}
if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("GEMINI API KEY MISSING");
}
export const config = {
  mongodb_username: process.env.MONGODB_USERNAME,
  mongodb_uri: process.env.MONGODB_URI,
  mongodb_password: process.env.MONGODB_PASSWORD,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  ai_api_key: process.env.GOOGLE_GENAI_API_KEY,
};
