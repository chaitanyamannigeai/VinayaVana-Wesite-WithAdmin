import { Button } from "@/components/ui/button";
import GallerySection from "@/components/GallerySection";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import accommodation1 from "@assets/accommodation-1_1760336319837.jpg";
import gallery2 from "@assets/gallery-2_1760336319838.jpg";
import gallery3 from "@assets/gallery-3_1760336319838.jpg";
import gallery4 from "@assets/gallery-4_1760336319839.jpg";
import gallery5 from "@assets/gallery-5_1760336319839.jpg";
import gallery6 from "@assets/gallery-6_1760336319839.jpg";
import gallery8 from "@assets/gallery8_1760336319840.jpg";
import washing from "@assets/wasing_1760336319840.jpg";
import bedroom1 from "@assets/bedroom1_1760336406160.jpg";
import bedroom2 from "@assets/bedroom2_1760336406161.jpg";
import bedroom3 from "@assets/vinayavana03681_1760336406162.jpg";
import bedroom4 from "@assets/vinayavana04931_1760336478536.jpg";
import kitchen from "@assets/kitchen_1760336793511.jpg";
import tvRoom from "@assets/vinayavana03241_1760336840228.jpg";
import kitchen2 from "@assets/vinayavana03511_1760336910288.jpg";

export default function Gallery() {
  const images = [
    { src: accommodation1, alt: "Comfortable living area with cane furniture and coconut grove views", category: "Rooms" },
    { src: bedroom1, alt: "Cozy bedroom with wooden flooring and modern furnishings", category: "Rooms" },
    { src: bedroom2, alt: "Spacious bedroom with natural light and curtains", category: "Rooms" },
    { src: bedroom3, alt: "Bedroom with dining area and wardrobe overlooking coconut groves", category: "Rooms" },
    { src: bedroom4, alt: "Comfortable seating area with red couch", category: "Rooms" },
    { src: gallery2, alt: "Dining area overlooking lush coconut groves", category: "Rooms" },
    { src: gallery3, alt: "Relaxing dining space with nature views", category: "Rooms" },
    { src: gallery4, alt: "Spacious living room with natural light", category: "Rooms" },
    { src: gallery5, alt: "Lush coconut and betelnut grove surroundings", category: "Nature" },
    { src: gallery6, alt: "Beautiful property view with tropical trees", category: "Nature" },
    { src: gallery8, alt: "Serene coconut grove at golden hour", category: "Nature" },
    { src: kitchen, alt: "Fully equipped kitchen with refrigerator, microwave, and stove", category: "Amenities" },
    { src: kitchen2, alt: "Modern kitchen with all cooking facilities", category: "Amenities" },
    { src: tvRoom, alt: "Entertainment room with flat-screen TV and refrigerator", category: "Amenities" },
    { src: washing, alt: "Washing machine and laundry facilities", category: "Amenities" },
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
          <h1 className="font-heading text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the natural beauty and comfortable amenities of VinayaVana Homestay
          </p>
        </div>

        <GallerySection images={images} />
      </div>
    </div>
  );
}
