import CabServiceCard from "../CabServiceCard";
import yanaImage from "@assets/stock_images/yana_caves_karnataka_ebdce50e.jpg";

export default function CabServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CabServiceCard
        id="yana"
        destination="Yana Caves"
        image={yanaImage}
        distance="45 km"
        duration="1.5 hours"
        driverName="Rajesh Kumar"
        driverPhone="919876543211"
        description="Visit the famous Yana rock formations and ancient caves surrounded by lush forest."
      />
    </div>
  );
}
