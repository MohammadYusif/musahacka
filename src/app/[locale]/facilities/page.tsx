"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FacilityCard } from "@/components/facilities/facility-card";
import { FacilityDetailDialog } from "@/components/facilities/facility-detail-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, Loader2 } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  nameAr: string | null;
  specialty: string;
  rating: number;
  yearsExp: number;
  languages: string[];
  bio: string | null;
  bioAr: string | null;
  image: string | null;
}

interface TreatmentPackage {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  specialty: string;
  price: number;
  currency: string;
  duration: string | null;
  includes: string[];
}

interface Facility {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  city: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  rating: number;
  specialties: string[];
  doctors: Doctor[];
  treatmentPackages: TreatmentPackage[];
}

export default function FacilitiesPage() {
  const t = useTranslations("facilities");
  const searchParams = useSearchParams();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get("specialty") || "All Specialties");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const sp = searchParams.get("specialty");
    if (sp) setSelectedSpecialty(sp);
  }, [searchParams]);

  useEffect(() => {
    fetchFacilities();
  }, [selectedSpecialty, search]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedSpecialty && selectedSpecialty !== "All Specialties") {
        params.set("specialty", selectedSpecialty);
      }
      if (search) params.set("search", search);

      const res = await fetch(`/api/facilities?${params}`);
      const data = await res.json();
      setFacilities(data.facilities || []);
      if (data.specialties) setSpecialties(data.specialties);
    } catch (error) {
      console.error("Failed to fetch facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    const facility = facilities.find((f) => f.id === id);
    if (facility) {
      setSelectedFacility(facility);
      setDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t("title")}</h1>
        </div>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("filterSpecialty")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Specialties">{t("allSpecialties")}</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : facilities.length === 0 ? (
        <div className="text-center py-20">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <FacilityDetailDialog
        facility={selectedFacility}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
