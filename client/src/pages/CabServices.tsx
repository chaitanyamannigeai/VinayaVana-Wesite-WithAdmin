import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CabServiceCard from "@/components/CabServiceCard";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import yanaImage from "@assets/stock_images/yana_caves_karnataka_ebdce50e.jpg";
import murdeshwarImage from "@assets/stock_images/murdeshwar_temple_st_5c011d0a.jpg";
import gokarnaImage from "@assets/stock_images/gokarna_beach_sunset_fdf6aade.jpg";

interface Destination {
  id: string;
  destinationName: string;
  distance: string;
  duration: string;
  driverName: string;
  driverPhone: string;
  description: string;
}

export default function CabServices() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/cab-destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Failed to fetch cab destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageForDestination = (name: string) => {
    if (name.toLowerCase().includes("yana")) return yanaImage;
    if (name.toLowerCase().includes("murdeshwar")) return murdeshwarImage;
    if (name.toLowerCase().includes("gokarna")) return gokarnaImage;
    return yanaImage;
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Cab Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore nearby attractions with our reliable cab services. Book your ride to popular destinations around Gokarna.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading destinations...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <CabServiceCard
                key={destination.id}
                id={destination.id}
                destination={destination.destinationName}
                image={getImageForDestination(destination.destinationName)}
                distance={destination.distance}
                duration={destination.duration}
                driverName={destination.driverName}
                driverPhone={destination.driverPhone}
                description={destination.description}
              />
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom tour or different destination? Contact us and we'll arrange the perfect ride for you.
          </p>
        </div>
      </div>
    </div>
  );
}
