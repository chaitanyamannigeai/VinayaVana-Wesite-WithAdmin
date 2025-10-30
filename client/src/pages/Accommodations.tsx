import { Button } from "@/components/ui/button";
import UnitCard from "@/components/UnitCard";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import bedroomImage from "@assets/accommodation-1_1760336319837.jpg";

export default function Accommodations() {
  const units = [
    {
      id: "2nd-floor",
      name: "2nd Floor Suite",
      image: bedroomImage,
      capacity: 4,
      bedrooms: 2,
      amenities: ["Kitchen", "Refrigerator", "Microwave", "Washing Machine", "WiFi", "AC"],
      pricePerNight: 4500,
      available: true,
      seasonTag: "Regular" as const,
    },

  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Our Accommodations</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Choose from our comfortable units designed to provide you with a peaceful and memorable stay. More units coming soon!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <UnitCard key={unit.id} {...unit} />
          ))}

          <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-3xl">🏡</span>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">More Units Coming Soon</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're expanding! Ground floor and cottage units will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
