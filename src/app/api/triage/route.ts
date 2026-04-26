import { NextRequest, NextResponse } from "next/server";
import { openai, TRIAGE_SYSTEM_PROMPT, TRIAGE_PROMPT_AR } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const locale = (formData.get("locale") as string) || "en";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const systemPrompt = locale === "ar" ? TRIAGE_PROMPT_AR : TRIAGE_SYSTEM_PROMPT;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: locale === "ar"
                ? "يرجى تحليل هذا التقرير الطبي وتقديم تقييم منظم."
                : "Please analyze this medical report and provide a structured assessment.",
            },
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No analysis generated" }, { status: 500 });
    }

    let analysis;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { summary: content, findings: [], recommendedSpecialty: "General", urgency: "low", suggestedActions: [], recommendedTests: [] };
    } catch {
      analysis = { summary: content, findings: [], recommendedSpecialty: "General", urgency: "low", suggestedActions: [], recommendedTests: [] };
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Triage error:", error);
    return NextResponse.json(
      { error: "Failed to analyze report" },
      { status: 500 }
    );
  }
}
