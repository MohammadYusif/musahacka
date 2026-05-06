import { NextRequest } from "next/server";

interface FakeEntry { keywords: string[]; ar: string; en: string }
const FAKE_RESPONSES: FakeEntry[] = [
  {
    keywords: ["قلب", "cardiolog", "cardiac", "cardio", "heart doctor", "heart"],

    ar: `يسعدني مساعدتك في إيجاد **طبيب قلب متخصص في الأحساء** 🏥

**أفضل الخيارات:**

1️⃣ **مستشفى موسى التخصصي**
• قسم أمراض القلب والأوعية الدموية  
• استشاريون متخصصون  
• أجهزة قسطرة وتصوير حديثة  

2️⃣ **مستشفى سعد التخصصي (معتمد JCI)**
• مركز قلب متكامل  
• جراحة قلب مفتوح وتداخلية  
• أطباء معتمدون دولياً  

3️⃣ **مستشفى الملك فهد**
• جراحة قلب متقدمة  
• طوارئ 24/7  

هل ترغب بمساعدتي في حجز موعد؟`,

    en: `I'd be happy to help you find a **cardiologist in Al-Ahsa** 🏥

**Top options:**

1️⃣ **Al-Moosa Specialist Hospital**
• Cardiology & vascular department  
• Specialist cardiac consultants  
• Advanced imaging & catheterization  

2️⃣ **Saad Specialist Hospital (JCI Accredited)**
• Full cardiac center  
• Open-heart & interventional surgery  
• Internationally certified doctors  

3️⃣ **King Fahd Hospital**
• Advanced cardiac surgery  
• 24/7 emergency services  

Would you like help booking an appointment?`,
  },

  {
    keywords: ["عظام", "orthoped", "bone", "joint", "knee", "hip", "spine"],

    ar: `أكيد! هذه أفضل مستشفيات **جراحة العظام في الأحساء** 🦴

**أفضل الخيارات:**

1️⃣ **مستشفى سعد التخصصي**
• الأفضل في جراحة العظام  
• استبدال مفاصل + عمود فقري + كسور  
• معتمد دولياً  

2️⃣ **مستشفى موسى التخصصي**
• قسم عظام متكامل  
• جراحات بالمنظار  
• إعادة تأهيل بعد العمليات  

3️⃣ **مستشفى الملك فهد**
• جراحة الكسور المعقدة  
• وحدة عمود فقري  

**التكاليف التقريبية:**
• استبدال الركبة: 25,000 – 45,000 ريال  
• العمود الفقري: 30,000 – 60,000 ريال  

هل لديك حالة محددة؟`,

    en: `Absolutely! Here are the best **orthopedic hospitals in Al-Ahsa** 🦴

**Top options:**

1️⃣ **Saad Specialist Hospital (JCI Accredited)**
• Leading orthopedic center  
• Joint replacement, spine, fractures  
• International accreditation  

2️⃣ **Al-Moosa Specialist Hospital**
• Full orthopedics department  
• Arthroscopic surgeries  
• Post-op rehabilitation  

3️⃣ **King Fahd Hospital**
• Complex fractures  
• Spine unit  

**Estimated costs:**
• Knee replacement: SAR 25,000 – 45,000  
• Spine surgery: SAR 30,000 – 60,000  

Do you have a specific condition?`,
  },

  {
    keywords: ["تكلفة", "سعر", "كم", "cost", "price", "how much", "فحص القلب", "fee", "charge"],

    ar: `هذه نظرة سريعة على **تكاليف فحوصات القلب في الأحساء** 💰

**الفحوصات:**
• ECG: 80 – 150 ريال  
• Echo: 400 – 800 ريال  
• اختبار الجهد: 350 – 600 ريال  
• CT Angio: 1,200 – 2,500 ريال  

**الاستشارات:**
• أول زيارة: 300 – 600 ريال  
• متابعة: 200 – 400 ريال  

**باقات شاملة:**
• مستشفى سعد: ~1,800 ريال  
• مستشفى موسى: ~1,500 ريال  

💡 التأمين يغطي غالباً جزء أو كامل التكاليف  

هل تريد حجز موعد؟`,

    en: `Here's a quick overview of **cardiac test costs in Al-Ahsa** 💰

**Tests:**
• ECG: SAR 80 – 150  
• Echo: SAR 400 – 800  
• Stress test: SAR 350 – 600  
• CT Angio: SAR 1,200 – 2,500  

**Consultations:**
• First visit: SAR 300 – 600  
• Follow-up: SAR 200 – 400  

**Packages:**
• Saad Hospital: ~SAR 1,800  
• Al-Moosa Hospital: ~SAR 1,500  

💡 Insurance often covers most costs  

Would you like to book an appointment?`,
  },

  {
    keywords: ["تخطيط", "رحلة", "سفر", "plan", "trip", "travel", "tourism", "medical trip", "علاجية"],

    ar: `أهلاً! خلني أساعدك في **رحلتك العلاجية إلى السعودية** ✈️

**الخطوات:**

1️⃣ التشخيص  
• إرسال التقارير  
• الحصول على رأي طبي  

2️⃣ التأشيرة  
• صالحة 3 أشهر  
• إصدار خلال 7–14 يوم  

3️⃣ السكن  
• فنادق: 150–400 ريال/ليلة  
• شقق: 2,000–5,000 ريال/شهر  

4️⃣ أثناء العلاج  
• ترجمة طبية  
• مواصلات  
• متابعة كاملة  

⏱️ مدة الإقامة: 3 – 21 يوم  

هل تريد أبدأ الترتيب معك؟`,

    en: `Welcome! Let me help you plan your **medical trip to Saudi Arabia** ✈️

**Steps:**

1️⃣ Diagnosis  
• Send medical reports  
• Get expert opinion  

2️⃣ Visa  
• Valid for 3 months  
• Processing: 7–14 days  

3️⃣ Accommodation  
• Hotels: SAR 150–400/night  
• Apartments: SAR 2,000–5,000/month  

4️⃣ During treatment  
• Medical translation  
• Transportation  
• Full coordination  

⏱️ Stay duration: 3 – 21 days  

Would you like to get started?`,
  },
];

const DEFAULT = {
  ar: `أهلاً بك في **مساعد وصال الطبي** 😊

أقدر أساعدك في:

• إيجاد الطبيب المناسب  
• مقارنة التكاليف  
• التخطيط لرحلة علاجية  
• حجز المواعيد  

🏥 مستشفياتنا:
• مستشفى موسى التخصصي  
• مستشفى سعد التخصصي (JCI)  
• مستشفى الملك فهد  

كيف أقدر أساعدك؟`,

  en: `Welcome to **Wisal Medical Assistant** 😊

I can help you with:

• Finding the right doctor  
• Comparing costs  
• Planning your medical trip  
• Booking appointments  

🏥 Our hospitals:
• Al-Moosa Specialist Hospital  
• Saad Specialist Hospital (JCI Accredited)  
• King Fahd Hospital  

How can I help you today?`,
};
async function* fakeStream(text: string) {
  const chunks = text.split(/(?<=\s)|(?=\s)/);
  for (const chunk of chunks) {
    yield chunk;
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 25));
  }
}

function pickResponse(
  messages: { role: string; content: string }[],
  locale: string
): string {
  const lang = locale === "ar" ? "ar" : "en";
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return DEFAULT[lang];

  const text = lastUser.content.toLowerCase();
  const match = FAKE_RESPONSES.find((r) =>
    r.keywords.some((kw) => text.includes(kw.toLowerCase()))
  );
  return match ? match[lang] : DEFAULT[lang];
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = await req.json();
    const response = pickResponse(messages, locale ?? "en");

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of fakeStream(response)) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
          );
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
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
