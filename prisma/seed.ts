import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const facilities = [
    {
      name: "Al-Moosa Specialist Hospital",
      nameAr: "مستشفى المواس التخصصي",
      description: "A leading private hospital in Al-Ahsa offering comprehensive medical services with state-of-the-art technology and internationally trained physicians.",
      descriptionAr: "مستشفى خاص رائد في الأحساء يقدم خدمات طبية شاملة بأحدث التقنيات وأطباء مدربين دولياً.",
      city: "Al-Ahsa",
      address: "King Fahd Road, Al-Hofuf, Al-Ahsa 36442",
      phone: "+966 13 582 3333",
      email: "info@almoosa-hospital.com",
      website: "https://almoosa-hospital.com",
      rating: 4.7,
      specialties: ["Cardiology", "Orthopedics", "Neurology", "General Surgery", "Oncology", "Urology"],
    },
    {
      name: "King Fahd Hospital in Al-Ahsa",
      nameAr: "مستشفى الملك فهد بالأحساء",
      description: "A major government hospital providing advanced medical care, specialized surgeries, and serving as a referral center for the Eastern Province.",
      descriptionAr: "مستشفى حكومي رئيسي يقدم رعاية طبية متقدمة وجراحات متخصصة ويعمل كمركز إحالة للمنطقة الشرقية.",
      city: "Al-Ahsa",
      address: "Al-Hofuf, Al-Ahsa 31982",
      phone: "+966 13 584 8888",
      rating: 4.3,
      specialties: ["Cardiac Surgery", "Nephrology", "Pediatrics", "Obstetrics", "Emergency Medicine", "Internal Medicine"],
    },
    {
      name: "Saad Specialist Hospital",
      nameAr: "مستشفى سعد التخصصي",
      description: "A JCI-accredited hospital known for excellence in cardiac care, orthopedics, and oncology with multilingual staff serving international patients.",
      descriptionAr: "مستشفى معتمد من JCI معروف بالتميز في رعاية القلب والطب العظمي والأورام مع طاقم متعدد اللغات يخدم المرضى الدوليين.",
      city: "Al-Ahsa",
      address: "Prince Sultan Road, Al-Hofuf, Al-Ahsa 31952",
      phone: "+966 13 587 9999",
      email: "info@saad-hospital.com",
      rating: 4.5,
      specialties: ["Cardiology", "Orthopedics", "Oncology", "Ophthalmology", "ENT", "Dermatology"],
    },
    {
      name: "Al-Ahsa Medical Center",
      nameAr: "مركز الأحساء الطبي",
      description: "A modern medical center offering specialized outpatient services, diagnostic imaging, and minimally invasive procedures.",
      descriptionAr: "مركز طبي حديث يقدم خدمات العيادات الخارجية المتخصصة والتصوير التشخيصي والإجراءات طفيفة التوغل.",
      city: "Al-Ahsa",
      address: "Al-Mubarraz, Al-Ahsa 36321",
      phone: "+966 13 585 4444",
      rating: 4.1,
      specialties: ["Internal Medicine", "Endocrinology", "Gastroenterology", "Pulmonology", "Rheumatology"],
    },
  ];

  const doctorData = [
    { name: "Dr. Ahmed Al-Qahtani", nameAr: "د. أحمد القحطاني", specialty: "Cardiology", rating: 4.8, yearsExp: 18, languages: ["Arabic", "English"], bio: "Interventional cardiologist with extensive experience in cardiac catheterization and stent placement.", bioAr: "طبيب قلب تدخلي مع خبرة واسعة في القسطرة القلبية وتركيب الدعامات." },
    { name: "Dr. Fatima Al-Dossari", nameAr: "د. فاطمة الدوسري", specialty: "Orthopedics", rating: 4.7, yearsExp: 14, languages: ["Arabic", "English", "French"], bio: "Orthopedic surgeon specializing in joint replacement and sports medicine.", bioAr: "جراح عظام متخصص في استبدال المفاصل والطب الرياضي." },
    { name: "Dr. Khalid Al-Shammari", nameAr: "د. خالد الشمري", specialty: "Neurology", rating: 4.6, yearsExp: 12, languages: ["Arabic", "English"], bio: "Neurologist focused on stroke management and neurodegenerative diseases.", bioAr: "طبيب أعصاب متخصص في إدارة السكتة الدماغية والأمراض التنكسية العصبية." },
    { name: "Dr. Sara Al-Harbi", nameAr: "د. سارة الحربي", specialty: "Oncology", rating: 4.9, yearsExp: 20, languages: ["Arabic", "English", "German"], bio: "Medical oncologist with international training in immunotherapy and targeted cancer treatments.", bioAr: "طبيبة أورام مع تدريب دولي في العلاج المناعي والعلاجات الموجهة للسرطان." },
    { name: "Dr. Mohammed Al-Ghamdi", nameAr: "د. محمد الغامدي", specialty: "General Surgery", rating: 4.5, yearsExp: 15, languages: ["Arabic", "English"], bio: "General and laparoscopic surgeon with expertise in bariatric and colorectal surgery.", bioAr: "جراح عام ومنظاري مع خبرة في جراحة السمنة والقولون." },
    { name: "Dr. Noura Al-Zahrani", nameAr: "د. نورة الزهراني", specialty: "Pediatrics", rating: 4.8, yearsExp: 10, languages: ["Arabic", "English", "Urdu"], bio: "Pediatric specialist with focus on childhood development and infectious diseases.", bioAr: "أخصائية طب أطفال مع تركيز على نمو الطفل والأمراض المعدية." },
    { name: "Dr. Hassan Al-Mutairi", nameAr: "د. حسن المطيري", specialty: "Ophthalmology", rating: 4.6, yearsExp: 16, languages: ["Arabic", "English"], bio: "Eye surgeon specializing in LASIK, cataract surgery, and retinal treatments.", bioAr: "جراح عيون متخصص في الليزك وجراحة الساد وعلاج الشبكية." },
    { name: "Dr. Aisha Al-Badr", nameAr: "د. عائشة البدر", specialty: "Dermatology", rating: 4.7, yearsExp: 11, languages: ["Arabic", "English", "French"], bio: "Dermatologist with expertise in cosmetic dermatology, laser treatments, and skin cancer screening.", bioAr: "طبيبة جلدية متخصصة في الأمراض الجلدية التجميلية وعلاجات الليزر وفحص سرطان الجلد." },
  ];

  const packageData = [
    { name: "Cardiac Check-up Package", nameAr: "باقة فحص القلب الشامل", description: "Comprehensive heart health assessment including ECG, echocardiogram, blood tests, and cardiologist consultation.", descriptionAr: "تقييم شامل لصحة القلب يشمل تخطيط القلب وتخطيط صدى القلب وتحاليل الدم واستشارة طبيب قلب.", specialty: "Cardiology", price: 3500, currency: "SAR", duration: "1 Day", includes: ["ECG", "Echocardiogram", "Blood Panel", "Doctor Consultation", "Report"] },
    { name: "Joint Replacement Surgery", nameAr: "جراحة استبدال المفاصل", description: "Complete knee or hip replacement package including surgery, hospital stay, physiotherapy, and follow-up.", descriptionAr: "باقة استبدال الركبة أو الورك الكاملة بما في ذلك الجراحة والإقامة في المستشفى والعلاج الطبيعي والمتابعة.", specialty: "Orthopedics", price: 85000, currency: "SAR", duration: "7-10 Days", includes: ["Pre-op Assessment", "Surgery", "5-Day Hospital Stay", "Physiotherapy", "Medications", "Follow-up"] },
    { name: "Comprehensive Cancer Screening", nameAr: "فحص شامل للكشف عن السرطان", description: "Full-body cancer screening with advanced imaging, tumor markers, and oncologist consultation.", descriptionAr: "فحص شامل للكشف عن السرطان بالتصوير المتقدم وعلامات الأورام واستشارة طبيب أورام.", specialty: "Oncology", price: 6000, currency: "SAR", duration: "2 Days", includes: ["CT Scan", "Tumor Markers", "Blood Tests", "Oncologist Review", "Detailed Report"] },
    { name: "LASIK Eye Surgery", nameAr: "عملية الليزك لتصحيح النظر", description: "State-of-the-art LASIK vision correction with pre and post-operative care.", descriptionAr: "تصحيح النظر بالليزك المتطور مع الرعاية قبل وبعد العملية.", specialty: "Ophthalmology", price: 8000, currency: "SAR", duration: "1 Day", includes: ["Pre-op Assessment", "LASIK Surgery", "Post-op Check", "Eye Drops", "3-Month Follow-up"] },
    { name: "Medical Tourist Welcome Package", nameAr: "باقة ترحيب بالسائح الطبي", description: "Airport pickup, hotel booking, local SIM card, translator, and medical appointment coordination.", descriptionAr: "استقبال من المطار وحجز فندق وشريحة اتصال محلية ومترجم وتنسيق المواعيد الطبية.", specialty: "General", price: 1500, currency: "SAR", duration: "Per Trip", includes: ["Airport Transfer", "3-Star Hotel (3 Nights)", "Local SIM", "Translator", "Appointment Coordination"] },
    { name: "Executive Health Check-up", nameAr: "فحص صحي تنفيذي شامل", description: "Premium health screening for executives with same-day results and lifestyle recommendations.", descriptionAr: "فحص صحي متميز للتنفيذيين مع نتائج في نفس اليوم وتوصيات لنمط الحياة.", specialty: "Internal Medicine", price: 4500, currency: "SAR", duration: "1 Day", includes: ["Full Blood Panel", "Chest X-Ray", "Ultrasound", "Stress Test", "Doctor Consultation", "Nutrition Plan"] },
  ];

  for (const facility of facilities) {
    const created = await prisma.facility.create({ data: facility });

    const facilityDoctors = doctorData.filter(d =>
      facility.specialties.includes(d.specialty)
    );

    for (const doc of facilityDoctors) {
      await prisma.doctor.create({
        data: { ...doc, facilityId: created.id },
      });
    }

    const facilityPackages = packageData.filter(p =>
      facility.specialties.includes(p.specialty) || p.specialty === "General"
    );

    for (const pkg of facilityPackages) {
      await prisma.treatmentPackage.create({
        data: { ...pkg, facilityId: created.id },
      });
    }
  }

  const demoUser = await prisma.user.create({
    data: {
      email: "patient@example.com",
      name: "Ahmed Hassan",
      password: "$2a$10$placeholder_hash_for_demo",
      role: "patient",
      locale: "en",
      phone: "+966 50 123 4567",
      nationality: "UAE",
    },
  });

  await prisma.medicalReport.create({
    data: {
      userId: demoUser.id,
      fileUrl: "/uploads/sample-report.pdf",
      fileName: "blood-test-results.pdf",
      fileType: "application/pdf",
      analysis: JSON.stringify({
        findings: ["Elevated cholesterol (280 mg/dL)", "Borderline high blood pressure (135/88)", "Vitamin D deficiency"],
        recommendedSpecialty: "Cardiology",
        urgency: "moderate",
        suggestedActions: ["Cardiology consultation", "Diet modification", "Regular blood pressure monitoring"],
      }),
      specialty: "Cardiology",
      summary: "Patient shows elevated cholesterol levels and borderline hypertension. Cardiology consultation recommended.",
      status: "analyzed",
    },
  });

  await prisma.appointment.create({
    data: {
      userId: demoUser.id,
      doctorName: "Dr. Ahmed Al-Qahtani",
      facilityName: "Al-Moosa Specialist Hospital",
      specialty: "Cardiology",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "confirmed",
      notes: "Initial consultation for cholesterol management",
    },
  });

  await prisma.chatMessage.createMany({
    data: [
      { userId: demoUser.id, role: "assistant", content: "Hello! I'm your MedVisit assistant. How can I help you with your medical journey today?" },
      { userId: demoUser.id, role: "user", content: "I have high cholesterol and need to see a cardiologist in Al-Ahsa. What are my options?" },
      { userId: demoUser.id, role: "assistant", content: "Based on your condition, I recommend Al-Moosa Specialist Hospital or Saad Specialist Hospital. Both have excellent cardiology departments with internationally trained cardiologists. Dr. Ahmed Al-Qahtani at Al-Moosa specializes in interventional cardiology. Would you like me to help you book an appointment?" },
    ],
  });

  console.log("Seeding completed successfully!");
  console.log(`Created ${facilities.length} facilities with doctors and packages`);
  console.log(`Created demo user: ${demoUser.email}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
