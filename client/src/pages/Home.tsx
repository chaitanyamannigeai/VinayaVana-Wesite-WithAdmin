import Hero from "@/components/Hero";
import UnitCard from "@/components/UnitCard";
import AvailabilityChecker from "@/components/AvailabilityChecker";
import TariffCalculator from "@/components/TariffCalculator";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Wifi, Coffee, Car, Utensils } from "lucide-react";
import bedroomImage from "@assets/accommodation-1_1760336319837.jpg";
import coconutGrove from "@assets/gallery-5_1760336319839.jpg";

export default function Home() {
  const reviews = [
    {
      id: "1",
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely loved our stay! The property is surrounded by beautiful coconut trees and the peace here is unmatched.",
      date: "November 2024",
    },
    {
      id: "2",
      name: "Amit Patel",
      rating: 5,
      comment: "Perfect getaway from city life. The 2nd floor suite was spacious and well-maintained. Highly recommend!",
      date: "October 2024",
    },
    {
      id: "3",
      name: "Sneha Reddy",
      rating: 4,
      comment: "Beautiful location near Gokarna. The natural surroundings and peaceful atmosphere were exactly what we needed.",
      date: "September 2024",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              A Natural Paradise Awaits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nestled in the heart of nature, our 1-acre property offers a perfect blend of comfort and tranquility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Wifi, title: "Modern Amenities", desc: "High-speed WiFi & AC" },
              { icon: Coffee, title: "Full Kitchen", desc: "Cook your own meals" },
              { icon: Car, title: "Cab Services", desc: "Local tours arranged" },
              { icon: Utensils, title: "Local Cuisine", desc: "Experience authentic flavors" },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-card hover-elevate transition-all"
                data-testid={`feature-${index}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <img
                src={coconutGrove}
                alt="Coconut grove"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold mb-4">Surrounded by Nature</h3>
              <p className="text-muted-foreground mb-4">
                Experience the serenity of being surrounded by lush coconut and betelnut trees. Our 1-acre property offers a peaceful retreat where you can reconnect with nature while enjoying modern comforts.
              </p>
              <p className="text-muted-foreground mb-6">
                Located near the famous Gokarna beaches, you're perfectly positioned to explore the region's natural beauty and spiritual sites.
              </p>
              <Link href="/accommodations">
                <Button className="gap-2" data-testid="button-view-accommodations">
                  View Accommodations
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Our Accommodations
            </h2>
            <p className="text-lg text-muted-foreground">
              Comfortable stays designed for your perfect getaway
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UnitCard
              id="2nd-floor"
              name="2nd Floor Suite"
              image={bedroomImage}
              capacity={4}
              bedrooms={2}
              amenities={["Kitchen", "Refrigerator", "Microwave", "Washing Machine"]}
              pricePerNight={4500}
              available={true}
              seasonTag="Regular"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AvailabilityChecker />
        </div>
      </section>
	  
	   <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TariffCalculator />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Experiences shared by those who've stayed with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/reviews">
              <Button variant="outline" className="gap-2" data-testid="button-all-reviews">
                View All Reviews
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
