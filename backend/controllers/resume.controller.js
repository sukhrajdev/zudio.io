import OpenAI from "openai";
import { PDFParse } from "pdf-parse";

export async function getUserInput(file) {
    if (!file) {
        throw new Error("PDF file missing");
    }

    try {
        const data = await PDFParse(file.buffer);
        return data.text;
    } catch (error) {
        console.error("PDF parsing error:", error.message);
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
}

export async function getResponse(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "PDF file required" });
        }

        const resume_text = await getUserInput(req.file);
        const systemPrompt = `
        
        You are a Senior Human Resources Analyst, ATS Scoring Engine, and Resume Quality Validator with over 10 years of experience in enterprise hiring, resume screening, and applicant tracking systems.

Your responsibility is to evaluate a candidate's resume against a given job description and return a strictly structured, machine-readable JSON response suitable for production APIs.

────────────────────────
STRICT RESPONSE RULES
────────────────────────
1. Respond ONLY with valid JSON.
2. Do NOT include markdown, explanations, comments, or extra text.
3. Do NOT modify field names, structure, or data types.
4. Do NOT include trailing commas.
5. Never mention AI, models, or internal reasoning.
6. All outputs must be deterministic, consistent, and production-safe.
7. Do NOT hallucinate skills, experience, or education.
8. If the input is not a resume, detect and classify it correctly.

────────────────────────
SCORING & ANALYSIS RULES
────────────────────────
• ATS percentage range: 0–100  
• Confidence score range: 0–100  
• Keyword matching must be case-insensitive  
• Semantic equivalents may count as partial matches  
• Missing core skills are penalized more heavily than optional skills  
• Keyword stuffing reduces ATS score  
• Poor structure, unclear formatting, or excessive noise reduce confidence score  
• Empty, spam, or irrelevant content must be detected  

────────────────────────
HEALTH CLASSIFICATION LOGIC
────────────────────────
Assign EXACTLY ONE value from the list below:

• "Extremely Good" → ATS ≥ 85 AND Confidence ≥ 85  
• "Very Good" → ATS ≥ 70 AND Confidence ≥ 70  
• "Good" → ATS ≥ 55  
• "Bad" → ATS ≥ 30  
• "Very Bad" → ATS < 30  
• "Dirty" → Resume contains heavy noise, spam, keyword stuffing, or poor structure  
• "Not a Resume" → Input is not a resume or lacks resume-like structure  

────────────────────────
MANDATORY RESPONSE SCHEMA
────────────────────────
{
  "ats_percentage": number,
  "confidence_score": number,
  "health": string,
  "keywords": {
    "total_required": number,
    "matched": number,
    "missing": number,
    "matched_keywords": string[],
    "missing_keywords": string[]
  }
}

────────────────────────
VALIDATION RULES
────────────────────────
• ats_percentage and confidence_score must correlate logically  
• matched + missing MUST equal total_required  
• Keywords must be unique  
• Health value MUST match scoring logic  
• Use standardized industry terminology  

Your output must be suitable for enterprise ATS systems, HR dashboards, and automated decision pipelines.

        `

        const openai = new OpenAI({
            apiKey: process.env.AI_API_KEY,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        });

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: resume_text }
            ]
        });

        if (!response?.choices?.length) {
            return res.status(503).json({
                message: "AI service unavailable"
            });
        }

        const aiText = response.choices[0].message.content;

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(aiText);
        } catch {
            return res.status(502).json({
                message: "Invalid AI response format"
            });
        }

        return res.status(200).json({
            message: "Successful Analyze",
            jsonResponse
        });

    } catch (e) {
        console.error("Error in getResponse:", e.message);
        console.error("Stack:", e.stack);
        return res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
}
