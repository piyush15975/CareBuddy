import { GoogleGenerativeAI } from "@google/generative-ai";

export const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
