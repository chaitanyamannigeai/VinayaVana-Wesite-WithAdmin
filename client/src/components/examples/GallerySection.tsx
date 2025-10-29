import GallerySection from "../GallerySection";
import bedroomImage from "@assets/stock_images/luxury_bedroom_inter_8c60e3ef.jpg";
import coconutGrove1 from "@assets/stock_images/coconut_palm_grove_t_987fb344.jpg";
import coconutGrove2 from "@assets/stock_images/coconut_palm_grove_t_692dad98.jpg";
import propertyImage from "@assets/stock_images/tropical_bungalow_su_72284093.jpg";

export default function GallerySectionExample() {
  const images = [
    { src: propertyImage, alt: "Bungalow surrounded by coconut trees", category: "Property" },
    { src: bedroomImage, alt: "Spacious AC bedroom", category: "Rooms" },
    { src: coconutGrove1, alt: "Lush coconut grove", category: "Nature" },
    { src: coconutGrove2, alt: "Tropical palm trees", category: "Nature" },
    { src: bedroomImage, alt: "Modern amenities", category: "Amenities" },
    { src: propertyImage, alt: "Peaceful surroundings", category: "Property" },
  ];

  return (
    <div className="p-8">
      <GallerySection images={images} />
    </div>
  );
}
