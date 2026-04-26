"use client";

import { useLocale } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Phone, Mail, Globe as GlobeIcon, User, Languages, Clock, DollarSign } from "lucide-react";

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

interface FacilityDetailProps {
  facility: Facility | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FacilityDetailDialog({ facility, open, onOpenChange }: FacilityDetailProps) {
  const locale = useLocale();

  if (!facility) return null;

  const displayName = locale === "ar" && facility.nameAr ? facility.nameAr : facility.name;
  const displayDesc = locale === "ar" && facility.descriptionAr ? facility.descriptionAr : facility.description;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{displayName}</DialogTitle>
          <DialogDescription className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {facility.rating.toFixed(1)}
            </span>
            {facility.address && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {facility.address}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {displayDesc && <p className="text-sm text-muted-foreground mb-4">{displayDesc}</p>}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {facility.specialties.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {facility.phone && <a href={`tel:${facility.phone}`} className="flex items-center gap-1 hover:text-foreground"><Phone className="h-3.5 w-3.5" />{facility.phone}</a>}
            {facility.email && <a href={`mailto:${facility.email}`} className="flex items-center gap-1 hover:text-foreground"><Mail className="h-3.5 w-3.5" />{facility.email}</a>}
            {facility.website && <a href={facility.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground"><GlobeIcon className="h-3.5 w-3.5" />Website</a>}
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="doctors">
            <TabsList className="w-full">
              <TabsTrigger value="doctors" className="flex-1">Doctors ({facility.doctors.length})</TabsTrigger>
              <TabsTrigger value="packages" className="flex-1">Packages ({facility.treatmentPackages.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="doctors" className="mt-4 space-y-3">
              {facility.doctors.map((doctor) => (
                <div key={doctor.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">
                        {locale === "ar" && doctor.nameAr ? doctor.nameAr : doctor.name}
                      </h4>
                      <Badge variant="outline" className="mt-1 text-xs">{doctor.specialty}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{doctor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{doctor.yearsExp} yrs</span>
                    <span className="flex items-center gap-1"><Languages className="h-3 w-3" />{doctor.languages.join(", ")}</span>
                  </div>
                  {(locale === "ar" && doctor.bioAr ? doctor.bioAr : doctor.bio) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {locale === "ar" && doctor.bioAr ? doctor.bioAr : doctor.bio}
                    </p>
                  )}
                </div>
              ))}
              {facility.doctors.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No doctors listed yet.</p>
              )}
            </TabsContent>

            <TabsContent value="packages" className="mt-4 space-y-3">
              {facility.treatmentPackages.map((pkg) => (
                <div key={pkg.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">
                        {locale === "ar" && pkg.nameAr ? pkg.nameAr : pkg.name}
                      </h4>
                      <Badge variant="outline" className="mt-1 text-xs">{pkg.specialty}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        <DollarSign className="inline h-3.5 w-3.5" />
                        {pkg.price.toLocaleString()} {pkg.currency}
                      </p>
                      {pkg.duration && <p className="text-xs text-muted-foreground">{pkg.duration}</p>}
                    </div>
                  </div>
                  {(locale === "ar" && pkg.descriptionAr ? pkg.descriptionAr : pkg.description) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {locale === "ar" && pkg.descriptionAr ? pkg.descriptionAr : pkg.description}
                    </p>
                  )}
                  {pkg.includes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pkg.includes.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {facility.treatmentPackages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No packages listed yet.</p>
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
