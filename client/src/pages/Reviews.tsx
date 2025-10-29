import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/ReviewCard";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: "1",
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely loved our stay! The property is surrounded by beautiful coconut trees and the peace here is unmatched. The 2nd floor suite was spacious and well-maintained.",
      date: "November 2024",
    },
    {
      id: "2",
      name: "Amit Patel",
      rating: 5,
      comment: "Perfect getaway from city life. The hosts were very accommodating and the location is ideal for exploring Gokarna. Highly recommend!",
      date: "October 2024",
    },
    {
      id: "3",
      name: "Sneha Reddy",
      rating: 4,
      comment: "Beautiful location near Gokarna. The natural surroundings and peaceful atmosphere were exactly what we needed for a relaxing vacation.",
      date: "September 2024",
    },
    {
      id: "4",
      name: "Rajesh Kumar",
      rating: 5,
      comment: "The homestay exceeded our expectations. Clean, comfortable, and the coconut grove setting is magical. Will definitely return!",
      date: "September 2024",
    },
    {
      id: "5",
      name: "Meera Iyer",
      rating: 5,
      comment: "A hidden gem! The property is well-maintained, amenities are great, and the location offers easy access to beaches and temples.",
      date: "August 2024",
    },
    {
      id: "6",
      name: "Vikram Singh",
      rating: 4,
      comment: "Loved the serene environment and the lush greenery. Perfect for a weekend retreat with family. The kitchen facilities were very helpful.",
      date: "August 2024",
    },
    {
      id: "7",
      name: "Anjali Desai",
      rating: 5,
      comment: "Wonderful experience! The property is exactly as shown in pictures. Peaceful, clean, and close to all tourist spots. Great value for money.",
      date: "July 2024",
    },
    {
      id: "8",
      name: "Karthik Nair",
      rating: 5,
      comment: "Best homestay in the Gokarna region. The natural setting with coconut trees provides a unique experience. Highly recommended for nature lovers!",
      date: "July 2024",
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

        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Guest Reviews</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Read what our guests have to say about their experience at VinayaVana Homestay
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
