import type { Hotel } from "@/data/hotels";
import type { TransportOption } from "@/data/car-rentals";
import type { LocalEvent } from "@/data/events";

export interface TriageResult {
  findings: string[];
  recommendedSpecialty: string;
  urgency: "low" | "moderate" | "high" | "emergency";
  summary: string;
  suggestedActions: string[];
  recommendedTests: string[];
  estimatedStayDays: number;
}

export interface TreatmentPackage {
  id: string;
  name: string;
  nameAr: string | null;
  specialty: string;
  price: number;
  currency: string;
  duration: string | null;
  includes: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  yearsExp: number;
  languages: string[];
}

export interface Hospital {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  rating: number;
  specialties: string[];
  doctors: Doctor[];
  treatmentPackages: TreatmentPackage[];
}

export interface JourneyData {
  hospitals: Hospital[];
  hotels: Hotel[];
  transports: TransportOption[];
  events: LocalEvent[];
}

export interface JourneyState {
  step: number;
  triageResult: TriageResult | null;
  journeyData: JourneyData | null;
  selectedHospital: Hospital | null;
  selectedPackage: TreatmentPackage | null;
  selectedHotel: Hotel | null;
  nights: number;
  selectedTransport: TransportOption | null;
  selectedEvents: LocalEvent[];
}
