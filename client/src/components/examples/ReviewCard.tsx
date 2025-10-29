import ReviewCard from "../ReviewCard";

export default function ReviewCardExample() {
  return (
    <div className="p-8 max-w-md">
      <ReviewCard
        id="1"
        name="Priya Sharma"
        rating={5}
        comment="Absolutely loved our stay! The property is surrounded by beautiful coconut trees and the peace here is unmatched. The 2nd floor suite was spacious and well-maintained."
        date="November 2024"
      />
    </div>
  );
}
