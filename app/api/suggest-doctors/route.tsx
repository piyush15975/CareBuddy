import { genai } from "@/config/gemmaModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      Return ONLY valid JSON in this shape:
      {
        "suggested_doctors": doctorAgent[]
      }
      doctorAgent list:
      ${JSON.stringify(AIDoctorAgents)}
      User symptoms: ${notes}
    `;

    const result = await model.generateContent(prompt);

    const JSONResp = JSON.parse(result.response.text());
    return NextResponse.json(JSONResp);

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: "Model failed" }, { status: 500 });
  }
}
