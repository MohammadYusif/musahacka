export interface Hotel {
  id: string;
  name: string;
  nameAr: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  distanceKm: number;
  address: string;
  addressAr: string;
  amenities: string[];
  image: string;
  description: string;
  descriptionAr: string;
}

export const hotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Fakieh Resort Al-Ahsa",
    nameAr: "منتجع فقيه - الأحساء",
    stars: 5,
    pricePerNight: 850,
    currency: "SAR",
    distanceKm: 2.4,
    address: "King Fahd Road, Al-Hofuf, Al-Ahsa",
    addressAr: "طريق الملك فهد، الهفوف، الأحساء",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Free WiFi", "Airport Shuttle"],
    image: "/hotels/fakieh.jpg",
    description: "A premier 5-star resort offering luxurious rooms with full spa facilities, ideally located near the main medical district.",
    descriptionAr: "منتجع خمس نجوم فاخر يوفر غرفاً راقية مع مرافق سبا متكاملة، يقع بالقرب من المنطقة الطبية الرئيسية.",
  },
  {
    id: "hotel-2",
    name: "Al-Ahsa InterContinental",
    nameAr: "فندق إنتركونتيننتال الأحساء",
    stars: 5,
    pricePerNight: 920,
    currency: "SAR",
    distanceKm: 1.8,
    address: "Prince Sultan Road, Al-Hofuf, Al-Ahsa",
    addressAr: "طريق الأمير سلطان، الهفوف، الأحساء",
    amenities: ["Pool", "Spa", "Multiple Restaurants", "Business Centre", "Concierge", "Free WiFi"],
    image: "/hotels/intercontinental.jpg",
    description: "World-class 5-star hotel with dedicated medical tourism coordinator, just 1.8 km from Al-Moosa and Saad Specialist hospitals.",
    descriptionAr: "فندق عالمي 5 نجوم مزود بمنسق سياحة علاجية متخصص، على بُعد 1.8 كم من مستشفيي الموسى وسعد التخصصيين.",
  },
  {
    id: "hotel-3",
    name: "Mövenpick Hotel Al-Ahsa",
    nameAr: "فندق موفنبيك الأحساء",
    stars: 4,
    pricePerNight: 680,
    currency: "SAR",
    distanceKm: 3.1,
    address: "Al-Mubarraz District, Al-Ahsa",
    addressAr: "حي المبرز، الأحساء",
    amenities: ["Restaurant", "Gym", "Free WiFi", "Room Service", "Meeting Rooms"],
    image: "/hotels/movenpick.jpg",
    description: "Elegant 4-star hotel known for its excellent service and central location, with a dedicated patient support desk.",
    descriptionAr: "فندق أنيق 4 نجوم يتميز بخدمة ممتازة وموقع مركزي مع مكتب دعم مخصص للمرضى.",
  },
  {
    id: "hotel-4",
    name: "Holiday Inn Al-Hofuf",
    nameAr: "هوليداي إن الهفوف",
    stars: 4,
    pricePerNight: 540,
    currency: "SAR",
    distanceKm: 2.9,
    address: "Al-Hofuf City Centre, Al-Ahsa",
    addressAr: "وسط مدينة الهفوف، الأحساء",
    amenities: ["Restaurant", "Free WiFi", "Laundry", "24hr Front Desk", "Room Service"],
    image: "/hotels/holiday-inn.jpg",
    description: "Comfortable and reliable 4-star hotel popular with medical tourists. Offers shuttle service to major hospitals.",
    descriptionAr: "فندق مريح وموثوق 4 نجوم يحظى بشعبية لدى مرضى السياحة العلاجية، ويوفر خدمة توصيل للمستشفيات الكبرى.",
  },
  {
    id: "hotel-5",
    name: "Al-Ahsa Palace Hotel",
    nameAr: "فندق قصر الأحساء",
    stars: 3,
    pricePerNight: 320,
    currency: "SAR",
    distanceKm: 4.2,
    address: "Al-Hofuf Old Town, Al-Ahsa",
    addressAr: "الهفوف البلد، الأحساء",
    amenities: ["Free WiFi", "24hr Front Desk", "Room Service", "Parking"],
    image: "/hotels/palace.jpg",
    description: "A clean, budget-friendly 3-star option with easy access to public transport and nearby restaurants.",
    descriptionAr: "خيار اقتصادي نظيف 3 نجوم سهل الوصول إلى وسائل النقل العام والمطاعم القريبة.",
  },
  {
    id: "hotel-6",
    name: "Garden Suites Al-Ahsa",
    nameAr: "جاردن سويتس الأحساء",
    stars: 3,
    pricePerNight: 285,
    currency: "SAR",
    distanceKm: 5.0,
    address: "Al-Mubarraz, Al-Ahsa",
    addressAr: "المبرز، الأحساء",
    amenities: ["Kitchenette", "Free WiFi", "Laundry", "Parking", "Weekly Cleaning"],
    image: "/hotels/garden.jpg",
    description: "Extended-stay suites with kitchenettes — ideal for patients requiring longer treatment stays. Best value for money.",
    descriptionAr: "أجنحة للإقامة الطويلة مزودة بمطابخ صغيرة — مثالية للمرضى الذين يحتاجون إلى إقامة أطول. أفضل قيمة مقابل المال.",
  },
];
