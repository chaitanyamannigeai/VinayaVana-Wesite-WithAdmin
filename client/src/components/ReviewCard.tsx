import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export default function ReviewCard({ id, name, rating, comment, date, avatar }: ReviewCardProps) {
  return (
    <Card className="h-full" data-testid={`card-review-${id}`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
            {avatar || name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold truncate" data-testid={`text-reviewer-name-${id}`}>
                {name}
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3" data-testid={`text-review-comment-${id}`}>
              {comment}
            </p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
