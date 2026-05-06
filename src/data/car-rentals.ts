export interface TransportOption {
  id: string;
  type: "rental" | "rideshare";
  name: string;
  nameAr: string;
  carModel: string;
  pricePerDay: number;
  currency: string;
  seating: number;
  features: string[];
  description: string;
  descriptionAr: string;
  provider?: string;
  estimatedPerTrip?: number;
}

export const transportOptions: TransportOption[] = [
  {
    id: "transport-1",
    type: "rental",
    name: "Economy Car",
    nameAr: "سيارة اقتصادية",
    carModel: "Hyundai Accent",
    pricePerDay: 120,
    currency: "SAR",
    seating: 5,
    features: ["A/C", "Bluetooth", "USB Charging", "Insurance Included"],
    description: "Compact and fuel-efficient. Perfect for solo patients or couples navigating the city.",
    descriptionAr: "مدمجة وقليلة الاستهلاك. مثالية للمرضى المنفردين أو الأزواج في التنقل بالمدينة.",
  },
  {
    id: "transport-2",
    type: "rental",
    name: "Standard Sedan",
    nameAr: "سيدان قياسي",
    carModel: "Toyota Camry",
    pricePerDay: 180,
    currency: "SAR",
    seating: 5,
    features: ["A/C", "Bluetooth", "GPS", "Insurance Included", "Spacious Boot"],
    description: "Comfortable mid-size sedan with extra luggage space — the most popular choice for medical tourists.",
    descriptionAr: "سيدان مريحة متوسطة الحجم مع مساحة حقائب إضافية — الخيار الأكثر شعبية لمرضى السياحة العلاجية.",
  },
  {
    id: "transport-3",
    type: "rental",
    name: "SUV",
    nameAr: "سيارة رياضية متعددة الاستخدام",
    carModel: "GMC Terrain",
    pricePerDay: 260,
    currency: "SAR",
    seating: 7,
    features: ["A/C", "Bluetooth", "GPS", "Insurance Included", "7 Seats", "High Ground Clearance"],
    description: "Spacious SUV ideal for families or patients who need extra comfort and space during recovery.",
    descriptionAr: "سيارة رياضية واسعة مثالية للعائلات أو المرضى الذين يحتاجون مساحة وراحة إضافية أثناء التعافي.",
  },
  {
    id: "transport-4",
    type: "rideshare",
    name: "Uber / Careem",
    nameAr: "أوبر / كريم",
    carModel: "On-demand",
    pricePerDay: 0,
    currency: "SAR",
    seating: 4,
    features: ["No Commitment", "Door-to-Door", "Available 24/7", "Pay Per Ride"],
    description: "No daily commitment. Estimated 35–50 SAR per hospital trip. Best if you prefer not to drive.",
    descriptionAr: "بدون التزام يومي. ما بين 35-50 ريال لكل رحلة إلى المستشفى. الخيار الأفضل إن كنت تفضل عدم القيادة.",
    provider: "Uber / Careem",
    estimatedPerTrip: 40,
  },
];
