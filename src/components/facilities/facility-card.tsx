"use client";

import { useLocale } from "next-intl";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, ExternalLink, Users, Package } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  city: string;
  address: string | null;
  phone: string | null;
  rating: number;
  specialties: string[];
  doctors: unknown[];
  treatmentPackages: unknown[];
}

interface FacilityCardProps {
  facility: Facility;
  onViewDetails: (id: string) => void;
}

export function FacilityCard({ facility, onViewDetails }: FacilityCardProps) {
  const locale = useLocale();
  const displayName = locale === "ar" && facility.nameAr ? facility.nameAr : facility.name;
  const displayDesc = locale === "ar" && facility.descriptionAr ? facility.descriptionAr : facility.description;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{displayName}</CardTitle>
            {facility.address && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{facility.address}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{facility.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayDesc && (
          <p className="text-sm text-muted-foreground line-clamp-2">{displayDesc}</p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {facility.specialties.slice(0, 4).map((s) => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
          {facility.specialties.length > 4 && (
            <Badge variant="outline" className="text-xs">+{facility.specialties.length - 4}</Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{facility.doctors.length} Doctors</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5" />
            <span>{facility.treatmentPackages.length} Packages</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        {facility.phone && (
          <a href={`tel:${facility.phone}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Phone className="h-3 w-3" />
            {facility.phone}
          </a>
        )}
        <Button size="sm" variant="outline" className="ml-auto gap-1" onClick={() => onViewDetails(facility.id)}>
          <ExternalLink className="h-3 w-3" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
