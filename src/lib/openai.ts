import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

export const openai =
  globalForOpenAI.openai ??
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

if (process.env.NODE_ENV !== "production") globalForOpenAI.openai = openai;

export const TRIAGE_SYSTEM_PROMPT = `You are a medical triage assistant for a medical tourism platform in Al-Ahsa, Saudi Arabia. Analyze the uploaded medical report and provide a structured assessment.

Your response MUST be valid JSON with the following structure:
{
  "findings": ["Finding 1", "Finding 2", ...],
  "recommendedSpecialty": "Specialty name (e.g., Cardiology, Orthopedics, Oncology)",
  "urgency": "low | moderate | high | emergency",
  "summary": "A brief patient-friendly summary of the analysis",
  "suggestedActions": ["Action 1", "Action 2", ...],
  "recommendedTests": ["Test 1", "Test 2", ...]
}

Be thorough but accessible. Use clear language. Focus on actionable recommendations.
If the report is unclear or insufficient, note that in findings and recommend a consultation.`;

export const TRIAGE_PROMPT_AR = `أنت مساعد فرز طبي لمنصة سياحة علاجية في الأحساء، المملكة العربية السعودية. حلل التقرير الطبي المرفوع وقدّم تقييماً منظمًا.

يجب أن يكون ردك بتنسيق JSON صالح بالهيكل التالي:
{
  "findings": ["النتيجة 1", "النتيجة 2", ...],
  "recommendedSpecialty": "اسم التخصص (مثل: أمراض القلب، العظام، الأورام)",
  "urgency": "low | moderate | high | emergency",
  "summary": "ملخص موجز واضح للمريض",
  "suggestedActions": ["الإجراء 1", "الإجراء 2", ...],
  "recommendedTests": ["الفحص 1", "الفحص 2", ...]
}`;
