import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const structuredMessages = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const emergencyWords = [
      "chest pain",
      "can't breathe",
      "stroke",
      "suicide",
      "severe bleeding"
      ];

      const isEmergency = emergencyWords.some(word =>
      messages[messages.length-1].text.toLowerCase().includes(word)
      );

      if(isEmergency){
      return NextResponse.json({
        response:
        "This may require urgent medical attention. Please contact emergency services or visit the nearest emergency department."
      });
      }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
          You are MedCare AI, an intelligent healthcare appointment assistant.

          Your responsibilities:
          - Help users understand symptoms at a general level.
          - Help users choose the right medical specialist.
          - Help users prepare questions for their doctor.
          - Assist with appointment-related queries.

          Rules:
          - Never claim to diagnose a disease.
          - Never prescribe medicines or dosages.
          - Ask follow-up questions when information is missing.
          - Keep answers concise and easy to understand.
          - For emergencies, advise contacting emergency services immediately.

          Response style:
          - Friendly
          - Professional
          - Simple language
          - Maximum 3-5 sentences unless user asks for detail.
          `
        },
        ...structuredMessages,
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "No response from MedCare AI";

    console.log("Raw Groq response:", reply);

    return NextResponse.json({
      response: reply,
    });

  } catch (error) {
    console.error("Groq fetch error:", error.message);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}