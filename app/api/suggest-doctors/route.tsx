import { genai } from "@/config/gemmaModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

function scoreDoctorMatch(notes: string, doctor: (typeof AIDoctorAgents)[number]) {
  const text = notes.toLowerCase();
  const keywordMap: Record<string, string[]> = {
    "General Physician": ["fever", "cough", "cold", "headache", "fatigue", "pain", "infection", "weakness"],
    Pediatrician: ["child", "baby", "infant", "kid", "toddler", "pediatric"],
    Dermatologist: ["skin", "rash", "acne", "eczema", "itch", "itching", "hair", "nail"],
    "Orthopedic Surgeon": ["bone", "joint", "fracture", "sprain", "back pain", "knee", "shoulder", "muscle"],
    Psychiatrist: ["anxiety", "depression", "stress", "panic", "sleep", "mental", "mood"],
    "ENT Specialist": ["ear", "nose", "throat", "sinus", "hearing", "sore throat", "tonsil"],
    Oncologist: ["cancer", "tumor", "tumour", "lump", "mass", "chemo"],
    Ophthalmologist: ["eye", "vision", "blurry", "sight", "cataract", "red eye"],
    Urologist: ["urine", "urinary", "bladder", "kidney", "prostate", "bladder pain"],
    Gastroenterologist: ["stomach", "abdomen", "nausea", "vomit", "vomiting", "diarrhea", "constipation", "acid reflux", "digestive"],
    Endocrinologist: ["diabetes", "thyroid", "hormone", "insulin", "sugar", "weight"],
  };

  const keywords = keywordMap[doctor.specialist] ?? [];
  return keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0);
}

function getFallbackDoctors(notes: string) {
  const rankedDoctors = [...AIDoctorAgents].sort((left, right) => {
    const rightScore = scoreDoctorMatch(notes, right);
    const leftScore = scoreDoctorMatch(notes, left);

    if (rightScore !== leftScore) {
      return rightScore - leftScore;
    }

    return left.id - right.id;
  });

  return rankedDoctors.slice(0, 3);
}

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  const userNotes = typeof notes === "string" ? notes : "";

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
      User symptoms: ${userNotes}
    `;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();
    const JSONResp = JSON.parse(responseText);
    return NextResponse.json(JSONResp);

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      {
        suggested_doctors: getFallbackDoctors(userNotes),
        fallback: true,
      },
      { status: 200 }
    );
  }
}
