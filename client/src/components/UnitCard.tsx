import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Wind, Check } from "lucide-react";

interface UnitCardProps {
  id: string;
  name: string;
  image: string;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  pricePerNight: number;
  available: boolean;
  seasonTag?: "Regular" | "Peak" | "Holiday";
}

export default function UnitCard({
  id,
  name,
  image,
  capacity,
  bedrooms,
  amenities,
  pricePerNight,
  available,
  seasonTag = "Regular",
}: UnitCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-unit-${id}`}>
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <Badge
            variant={available ? "default" : "destructive"}
            className="bg-white/90 backdrop-blur-sm"
            data-testid={`badge-availability-${id}`}
          >
            {available ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                Available
              </>
            ) : (
              "Booked"
            )}
          </Badge>
        </div>
        {seasonTag !== "Regular" && (
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {seasonTag} Season
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-xl font-semibold" data-testid={`text-unit-name-${id}`}>
              {name}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{capacity} Guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4" />
                <span>AC</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            ₹{pricePerNight}
          </p>
          <p className="text-xs text-muted-foreground">per night</p>
        </div>
        <Button
          onClick={() => {
            const element = document.getElementById("check-availability");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
          data-testid={`button-check-dates-${id}`}
        >
          Check Dates
        </Button>
      </CardFooter>
    </Card>
  );
}
