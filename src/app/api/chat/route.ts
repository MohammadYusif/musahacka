import { NextRequest } from "next/server";
import { openai } from "@/lib/openai";

const CHAT_SYSTEM_PROMPT = `You are Wisal Assistant, a helpful AI medical tourism assistant for Al-Ahsa, Saudi Arabia. You help international patients with:

1. Finding the right medical facilities and specialists
2. Understanding treatment options and pricing
3. Navigating the medical tourism process (visas, travel, accommodation)
4. Providing general health information and guidance

Key information about facilities in Al-Ahsa:
- Al-Moosa Specialist Hospital: Leading private hospital with Cardiology, Orthopedics, Neurology, General Surgery, Oncology, Urology
- King Fahd Hospital: Major government hospital with Cardiac Surgery, Nephrology, Pediatrics, Obstetrics
- Saad Specialist Hospital: JCI-accredited, known for Cardiology, Orthopedics, Oncology, Ophthalmology
- Al-Ahsa Medical Center: Modern center for Internal Medicine, Endocrinology, Gastroenterology

Important guidelines:
- Always recommend consulting with a doctor for medical decisions
- Be warm, professional, and culturally sensitive
- Mention that you can help with booking appointments
- If asked about emergencies, direct them to call 911 or go to the nearest emergency department
- Respond in the same language the user writes in`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: CHAT_SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
