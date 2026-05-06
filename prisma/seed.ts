import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.facility.count();
  if (existing > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }

  console.log("Seeding database...");

  const facilities = [
    {
      name: "Al-Moosa Specialist Hospital",
      nameAr: "مستشفى الموسى التخصصي",
      description: "A leading private hospital in Al-Ahsa offering world-class cardiology, orthopedics, and neurology with internationally trained physicians and state-of-the-art technology.",
      descriptionAr: "مستشفى خاص رائد في الأحساء يقدم خدمات طب القلب وجراحة العظام وأمراض الأعصاب على مستوى عالمي بأطباء مدربين دولياً وأحدث التقنيات.",
      city: "Al-Ahsa",
      address: "King Fahd Road, Al-Hofuf, Al-Ahsa 36442",
      phone: "+966 13 582 3333",
      email: "info@almoosa-hospital.com",
      website: "https://almoosa-hospital.com",
      rating: 4.7,
      specialties: ["Cardiology", "Orthopedics", "Neurology", "General Surgery", "Urology"],
    },
    {
      name: "King Faisal Specialist Hospital & Research Centre",
      nameAr: "مستشفى الملك فيصل التخصصي ومركز الأبحاث",
      description: "Saudi Arabia's premier medical institution offering world-class oncology, cardiac surgery, organ transplantation, and complex case management. Ranked among the top hospitals globally.",
      descriptionAr: "المؤسسة الطبية الأولى في المملكة العربية السعودية تقدم علاج الأورام وجراحة القلب وزراعة الأعضاء وإدارة الحالات المعقدة بمستوى عالمي. مصنفة ضمن أفضل المستشفيات عالمياً.",
      city: "Riyadh",
      address: "Zahrawi Street, Al Mathar Ash Shamali, Riyadh 11211",
      phone: "+966 11 442 7777",
      email: "info@kfshrc.edu.sa",
      website: "https://www.kfshrc.edu.sa",
      rating: 4.9,
      specialties: ["Oncology", "Cardiac Surgery", "Transplant Surgery", "Hematology", "Nephrology"],
    },
    {
      name: "Saudi German Hospital Jeddah",
      nameAr: "المستشفى السعودي الألماني جدة",
      description: "A world-class hospital on Jeddah's Corniche specializing in plastic surgery, cosmetic procedures, and dermatology. Home to European-trained surgeons and the latest aesthetic technologies.",
      descriptionAr: "مستشفى عالمي على كورنيش جدة متخصص في الجراحة التجميلية والعمليات الجمالية وأمراض الجلد. يضم جراحين مدربين أوروبياً وأحدث تقنيات التجميل.",
      city: "Jeddah",
      address: "Corniche Road, Al Hamra District, Jeddah 23215",
      phone: "+966 12 682 9999",
      email: "info@sghgroup.net",
      website: "https://www.sghgroup.net",
      rating: 4.6,
      specialties: ["Plastic Surgery", "Cosmetic Surgery", "Dermatology", "ENT", "Ophthalmology"],
    },
    {
      name: "Dr. Soliman Fakeeh Hospital",
      nameAr: "مستشفى الدكتور سليمان الفقيه",
      description: "One of Jeddah's most trusted private hospitals with over 40 years of excellence in orthopedics, maternity care, pediatrics, and general surgery serving both local and international patients.",
      descriptionAr: "أحد أكثر المستشفيات الخاصة ثقةً في جدة مع أكثر من 40 عاماً من التميز في جراحة العظام ورعاية الأمومة وطب الأطفال والجراحة العامة لخدمة المرضى المحليين والدوليين.",
      city: "Jeddah",
      address: "Palestine Street, Al Andalus District, Jeddah 23323",
      phone: "+966 12 665 5000",
      email: "info@fakeeh.care",
      website: "https://www.fakeeh.care",
      rating: 4.5,
      specialties: ["Orthopedics", "Obstetrics", "Pediatrics", "General Surgery", "Internal Medicine", "Cardiology"],
    },
    {
      name: "Al-Hammadi Hospital",
      nameAr: "مستشفى الحمادي",
      description: "A leading Riyadh hospital renowned for neurology, endocrinology, and chronic disease management. Known for its patient-centered care and advanced diagnostics for complex neurological and metabolic conditions.",
      descriptionAr: "مستشفى رائد في الرياض مشهور بأمراض الأعصاب والغدد الصماء وإدارة الأمراض المزمنة. معروف برعايته المتمحورة حول المريض والتشخيص المتقدم للحالات العصبية والأيضية المعقدة.",
      city: "Riyadh",
      address: "King Fahd Road, Al Olaya District, Riyadh 12211",
      phone: "+966 11 218 9999",
      email: "info@hammadi.com",
      rating: 4.4,
      specialties: ["Neurology", "Endocrinology", "Psychiatry", "Pulmonology", "Rheumatology", "Internal Medicine"],
    },
  ];

  const doctorData = [
    // Cardiology
    { name: "Dr. Ahmed Al-Qahtani", nameAr: "د. أحمد القحطاني", specialty: "Cardiology", rating: 4.8, yearsExp: 18, languages: ["Arabic", "English"], bio: "Interventional cardiologist with extensive experience in cardiac catheterization and stent placement.", bioAr: "طبيب قلب تدخلي مع خبرة واسعة في القسطرة القلبية وتركيب الدعامات." },
    // Orthopedics
    { name: "Dr. Fatima Al-Dossari", nameAr: "د. فاطمة الدوسري", specialty: "Orthopedics", rating: 4.7, yearsExp: 14, languages: ["Arabic", "English", "French"], bio: "Orthopedic surgeon specializing in joint replacement and sports medicine.", bioAr: "جراح عظام متخصص في استبدال المفاصل والطب الرياضي." },
    // Neurology
    { name: "Dr. Khalid Al-Shammari", nameAr: "د. خالد الشمري", specialty: "Neurology", rating: 4.6, yearsExp: 12, languages: ["Arabic", "English"], bio: "Neurologist focused on stroke management and neurodegenerative diseases.", bioAr: "طبيب أعصاب متخصص في إدارة السكتة الدماغية والأمراض التنكسية العصبية." },
    // Oncology
    { name: "Dr. Sara Al-Harbi", nameAr: "د. سارة الحربي", specialty: "Oncology", rating: 4.9, yearsExp: 20, languages: ["Arabic", "English", "German"], bio: "Medical oncologist with international training in immunotherapy and targeted cancer treatments.", bioAr: "طبيبة أورام مع تدريب دولي في العلاج المناعي والعلاجات الموجهة للسرطان." },
    // General Surgery
    { name: "Dr. Mohammed Al-Ghamdi", nameAr: "د. محمد الغامدي", specialty: "General Surgery", rating: 4.5, yearsExp: 15, languages: ["Arabic", "English"], bio: "General and laparoscopic surgeon with expertise in bariatric and colorectal surgery.", bioAr: "جراح عام ومنظاري مع خبرة في جراحة السمنة والقولون." },
    // Pediatrics
    { name: "Dr. Noura Al-Zahrani", nameAr: "د. نورة الزهراني", specialty: "Pediatrics", rating: 4.8, yearsExp: 10, languages: ["Arabic", "English", "Urdu"], bio: "Pediatric specialist with focus on childhood development and infectious diseases.", bioAr: "أخصائية طب أطفال مع تركيز على نمو الطفل والأمراض المعدية." },
    // Ophthalmology
    { name: "Dr. Hassan Al-Mutairi", nameAr: "د. حسن المطيري", specialty: "Ophthalmology", rating: 4.6, yearsExp: 16, languages: ["Arabic", "English"], bio: "Eye surgeon specializing in LASIK, cataract surgery, and retinal treatments.", bioAr: "جراح عيون متخصص في الليزك وجراحة الساد وعلاج الشبكية." },
    // Dermatology
    { name: "Dr. Aisha Al-Badr", nameAr: "د. عائشة البدر", specialty: "Dermatology", rating: 4.7, yearsExp: 11, languages: ["Arabic", "English", "French"], bio: "Dermatologist with expertise in cosmetic dermatology, laser treatments, and skin cancer screening.", bioAr: "طبيبة جلدية متخصصة في الأمراض الجلدية التجميلية وعلاجات الليزر وفحص سرطان الجلد." },
    // Plastic Surgery
    { name: "Dr. Tariq Al-Otaibi", nameAr: "د. طارق العتيبي", specialty: "Plastic Surgery", rating: 4.8, yearsExp: 17, languages: ["Arabic", "English", "German"], bio: "Board-certified plastic surgeon trained in Germany specializing in rhinoplasty, facelifts, and reconstructive procedures.", bioAr: "جراح تجميل معتمد مدرب في ألمانيا متخصص في تجميل الأنف وشد الوجه والإجراءات الترميمية." },
    // Cosmetic Surgery
    { name: "Dr. Lina Al-Rashidi", nameAr: "د. لينا الراشدي", specialty: "Cosmetic Surgery", rating: 4.7, yearsExp: 13, languages: ["Arabic", "English"], bio: "Cosmetic surgeon specializing in body contouring, liposuction, and non-invasive aesthetic procedures.", bioAr: "جراحة تجميل متخصصة في تشكيل الجسم وشفط الدهون والإجراءات الجمالية غير الجراحية." },
    // Cardiac Surgery
    { name: "Dr. Ibrahim Al-Malki", nameAr: "د. إبراهيم المالكي", specialty: "Cardiac Surgery", rating: 4.9, yearsExp: 22, languages: ["Arabic", "English"], bio: "Senior cardiac surgeon with over 2,000 open-heart surgeries and expertise in valve repair and bypass surgery.", bioAr: "جراح قلب أول أجرى أكثر من 2000 عملية قلب مفتوح مع خبرة في إصلاح الصمامات وجراحة المجازة." },
    // Endocrinology
    { name: "Dr. Reem Al-Sulami", nameAr: "د. ريم السلمي", specialty: "Endocrinology", rating: 4.6, yearsExp: 13, languages: ["Arabic", "English"], bio: "Endocrinologist specializing in diabetes management, thyroid disorders, and hormonal conditions.", bioAr: "أخصائية غدد صماء متخصصة في إدارة السكري واضطرابات الغدة الدرقية والحالات الهرمونية." },
    // Hematology
    { name: "Dr. Yousuf Al-Anazi", nameAr: "د. يوسف العنزي", specialty: "Hematology", rating: 4.7, yearsExp: 16, languages: ["Arabic", "English"], bio: "Hematologist specializing in blood disorders, bone marrow transplants, and hemoglobinopathies.", bioAr: "طبيب دم متخصص في اضطرابات الدم وزراعة نخاع العظام وأمراض الهيموغلوبين." },
  ];

  const packageData = [
    { name: "Cardiac Check-up Package", nameAr: "باقة فحص القلب الشامل", description: "Comprehensive heart health assessment including ECG, echocardiogram, blood tests, and cardiologist consultation.", descriptionAr: "تقييم شامل لصحة القلب يشمل تخطيط القلب وتخطيط صدى القلب وتحاليل الدم واستشارة طبيب قلب.", specialty: "Cardiology", price: 3500, currency: "SAR", duration: "1 Day", includes: ["ECG", "Echocardiogram", "Blood Panel", "Doctor Consultation", "Report"] },
    { name: "Joint Replacement Surgery", nameAr: "باقة جراحة استبدال المفاصل", description: "Complete knee or hip replacement package including surgery, hospital stay, physiotherapy, and follow-up.", descriptionAr: "باقة استبدال الركبة أو الورك الكاملة بما في ذلك الجراحة والإقامة في المستشفى والعلاج الطبيعي والمتابعة.", specialty: "Orthopedics", price: 85000, currency: "SAR", duration: "7–10 Days", includes: ["Pre-op Assessment", "Surgery", "5-Day Hospital Stay", "Physiotherapy", "Medications", "Follow-up"] },
    { name: "Comprehensive Cancer Screening", nameAr: "باقة الفحص الشامل للكشف عن السرطان", description: "Full-body cancer screening with advanced imaging, tumor markers, and oncologist consultation.", descriptionAr: "فحص شامل للكشف عن السرطان بالتصوير المتقدم وعلامات الأورام واستشارة طبيب أورام.", specialty: "Oncology", price: 6000, currency: "SAR", duration: "2 Days", includes: ["CT Scan", "Tumor Markers", "Blood Tests", "Oncologist Review", "Detailed Report"] },
    { name: "Cancer Treatment Package", nameAr: "باقة علاج السرطان المتكاملة", description: "Comprehensive cancer treatment including oncology consultations, diagnostics, chemotherapy sessions, and follow-up care.", descriptionAr: "علاج متكامل للسرطان يشمل استشارات الأورام والتشخيص وجلسات العلاج الكيميائي والمتابعة.", specialty: "Oncology", price: 45000, currency: "SAR", duration: "2–4 Weeks", includes: ["Oncology Consultation", "PET Scan", "Biopsy", "Treatment Protocol", "Chemotherapy Sessions", "Follow-up"] },
    { name: "Rhinoplasty Package", nameAr: "باقة عملية تجميل الأنف", description: "Complete nose reshaping surgery with pre-op planning, surgery, and post-operative care by a board-certified plastic surgeon.", descriptionAr: "جراحة شاملة لإعادة تشكيل الأنف مع تخطيط ما قبل العملية والجراحة ورعاية ما بعد العملية من قِبل جراح تجميل معتمد.", specialty: "Plastic Surgery", price: 28000, currency: "SAR", duration: "2–3 Days", includes: ["Surgeon Consultation", "Pre-op Assessment", "Surgery", "Anesthesia", "2-Night Hospital Stay", "Post-op Care", "Follow-up Visits"] },
    { name: "Cosmetic Surgery Consultation & Plan", nameAr: "استشارة وخطة جراحة تجميلية شاملة", description: "Full cosmetic assessment with 3D imaging, personalized treatment plan, and pricing for your desired procedures.", descriptionAr: "تقييم تجميلي كامل مع تصوير ثلاثي الأبعاد وخطة علاج شخصية وتسعير للإجراءات المطلوبة.", specialty: "Cosmetic Surgery", price: 2500, currency: "SAR", duration: "1 Day", includes: ["Surgeon Consultation", "3D Imaging", "Personalized Treatment Plan", "Nutrition Advice", "Priority Booking"] },
    { name: "LASIK Eye Surgery", nameAr: "باقة عملية الليزك لتصحيح النظر", description: "State-of-the-art LASIK vision correction with pre and post-operative care.", descriptionAr: "تصحيح النظر بالليزك المتطور مع الرعاية قبل وبعد العملية.", specialty: "Ophthalmology", price: 8000, currency: "SAR", duration: "1 Day", includes: ["Pre-op Assessment", "LASIK Surgery", "Post-op Check", "Eye Drops", "3-Month Follow-up"] },
    { name: "Medical Tourist Welcome Package", nameAr: "باقة ترحيب بالسائح الطبي", description: "Airport pickup, hotel booking, local SIM card, translator, and medical appointment coordination.", descriptionAr: "استقبال من المطار وحجز فندق وشريحة اتصال محلية ومترجم وتنسيق المواعيد الطبية.", specialty: "General", price: 1500, currency: "SAR", duration: "Per Trip", includes: ["Airport Transfer", "3-Star Hotel (3 Nights)", "Local SIM", "Translator", "Appointment Coordination"] },
    { name: "Executive Health Check-up", nameAr: "باقة الفحص الصحي التنفيذي الشامل", description: "Premium health screening for executives with same-day results and lifestyle recommendations.", descriptionAr: "فحص صحي متميز للتنفيذيين مع نتائج في نفس اليوم وتوصيات لنمط الحياة.", specialty: "Internal Medicine", price: 4500, currency: "SAR", duration: "1 Day", includes: ["Full Blood Panel", "Chest X-Ray", "Ultrasound", "Stress Test", "Doctor Consultation", "Nutrition Plan"] },
    { name: "Cardiac Surgery Package", nameAr: "باقة جراحة القلب المفتوح", description: "Comprehensive open-heart surgery package including pre-op evaluation, surgery, ICU care, and cardiac rehabilitation.", descriptionAr: "باقة شاملة لجراحة القلب المفتوح تشمل التقييم قبل الجراحة والجراحة ورعاية العناية المركزة وإعادة تأهيل القلب.", specialty: "Cardiac Surgery", price: 120000, currency: "SAR", duration: "10–14 Days", includes: ["Pre-op Evaluation", "Surgery", "ICU Care", "7-Day Hospital Stay", "Cardiac Rehabilitation", "Follow-up"] },
    { name: "Diabetes & Thyroid Management", nameAr: "باقة إدارة السكري والغدة الدرقية", description: "Comprehensive endocrinology evaluation for diabetes and thyroid conditions with personalized management plan.", descriptionAr: "تقييم شامل لأمراض الغدد الصماء لحالات السكري والغدة الدرقية مع خطة إدارة شخصية.", specialty: "Endocrinology", price: 2800, currency: "SAR", duration: "1 Day", includes: ["Endocrinologist Consultation", "Blood Tests", "HbA1c", "Thyroid Panel", "Ultrasound", "Diet Plan"] },
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
      { userId: demoUser.id, role: "assistant", content: "Hello! I'm your Wisal assistant. How can I help you with your medical journey across Saudi Arabia today?" },
      { userId: demoUser.id, role: "user", content: "I have high cholesterol and need to see a cardiologist. What are my options?" },
      { userId: demoUser.id, role: "assistant", content: "For cardiology, I recommend Al-Moosa Specialist Hospital in Al-Ahsa or Dr. Soliman Fakeeh Hospital in Jeddah. Both have excellent cardiology departments with internationally trained cardiologists. If your case requires open-heart surgery, King Faisal Specialist Hospital in Riyadh is the top choice in the region. Would you like help planning your trip?" },
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
