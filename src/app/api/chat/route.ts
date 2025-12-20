import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, context, situation, mode } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set in environment variables." },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        let systemPrompt = "";

        if (mode === "quiz") {
            systemPrompt = `You are an expert teacher. Generate a 3-question multiple choice quiz about ${context}.
      Return ONLY a JSON array with this format:
      [
        { "q": "Question text", "options": ["A", "B", "C", "D"], "correct": 0 },
        ...
      ]
      Do not wrap in markdown code blocks. Just the raw JSON.`;
        } else if (mode === "schedule") {
            systemPrompt = `You are an expert study strategist. Create a detailed, step-by-step study schedule for a student in ${context} who is facing this situation: "${situation}".
      The user's specific request is: "${message}".
      Format the response with bold headings, bullet points, and time estimates. Be encouraging but firm.`;
        } else {
            // Default Chat Mode
            systemPrompt = `You are an expert high school tutor and mentor for Knowledge Groove Academy. 
      Your goal is to help students succeed in their courses by providing specific, actionable advice, practice problems, and explanations.
      
      Context:
      - Course: ${context || "General High School Advice"}
      - Student Situation: ${situation || "General Inquiry"}
      
      Guidelines:
      1. Be encouraging but realistic.
      2. If the student asks for practice, generate 1-2 specific problems relevant to their course and situation.
      3. If they are confused, explain concepts simply using analogies.
      4. If they are behind, prioritize the most important topics.
      5. Keep responses concise (under 3 paragraphs) unless asked for a detailed plan.
      `;
        }

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready." }],
                },
            ],
        });

        const result = await chat.sendMessage(message || "Generate");
        const response = await result.response;
        let text = response.text();

        // Clean up JSON if needed
        if (mode === "quiz") {
            text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Error generating response:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate response." },
            { status: 500 }
        );
    }
}
