import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import heroImage from "@assets/hero-1_1760336656757.jpg";

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById("check-availability");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary-foreground/20">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Near Gokarna, Karnataka</span>
          </div>
        </div>

        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
          Serenity Among the Palms
        </h1>

        <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Experience tranquility in our beautiful bungalow surrounded by 1 acre of lush coconut and betelnut trees
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToBooking}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            data-testid="button-check-availability"
          >
            <Calendar className="h-5 w-5" />
            Check Availability
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-virtual-tour"
          >
            <Users className="h-5 w-5" />
            Virtual Tour
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>2+ Units Available</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <span>🌴</span>
            <span>1 Acre Property</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <span>❄️</span>
            <span>AC Rooms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
