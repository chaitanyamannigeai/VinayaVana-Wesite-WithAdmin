import UnitCard from "../UnitCard";
import bedroomImage from "@assets/stock_images/luxury_bedroom_inter_8c60e3ef.jpg";

export default function UnitCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <UnitCard
        id="2nd-floor"
        name="2nd Floor Suite"
        image={bedroomImage}
        capacity={4}
        bedrooms={2}
        amenities={["Kitchen", "Refrigerator", "Microwave", "Washing Machine"]}
        pricePerNight={3500}
        available={true}
        seasonTag="Regular"
      />
    </div>
  );
}
