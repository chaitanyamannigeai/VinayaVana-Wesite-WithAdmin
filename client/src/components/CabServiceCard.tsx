import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";

interface CabServiceCardProps {
  id: string;
  destination: string;
  image: string;
  distance: string;
  duration: string;
  driverName: string;
  driverPhone: string;
  description: string;
}

export default function CabServiceCard({
  id,
  destination,
  image,
  distance,
  duration,
  driverName,
  driverPhone,
  description,
}: CabServiceCardProps) {
  const handleWhatsApp = () => {
    const message = `Hi ${driverName}, I'd like to book a cab from VinayaVana to ${destination}. Please confirm availability.`;
    window.open(`https://wa.me/${driverPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Card className="overflow-hidden" data-testid={`card-cab-${id}`}>
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-heading text-xl font-semibold" data-testid={`text-destination-${id}`}>
            {destination}
          </h3>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Driver Contact</p>
          <p className="font-medium" data-testid={`text-driver-${id}`}>{driverName}</p>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.open(`tel:${driverPhone}`)}
          data-testid={`button-call-driver-${id}`}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button
          className="flex-1"
          onClick={handleWhatsApp}
          data-testid={`button-whatsapp-driver-${id}`}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
