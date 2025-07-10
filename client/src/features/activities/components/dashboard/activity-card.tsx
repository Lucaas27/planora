import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { formatDate } from "@/lib/utils.ts";
import { Bookmark, Calendar, Eye, MapPin } from "lucide-react";
import type { Activity } from "@/features/activities/types/activity.ts";
import { Badge } from "@/components/ui/badge.tsx";

interface ActivityCardProps {
  activity: Activity;
  isActivitySelected: boolean;
  onSelect: (activityId: string) => void;
}

export function ActivityCard({ activity, isActivitySelected, onSelect }: ActivityCardProps) {
  return (
    <Card
      className={`transform overflow-hidden rounded-2xl border-2 pt-0 shadow-md transition-all duration-300 group bg-card hover:-translate-y-1 hover:shadow-xl hover:bg-primary/5
        ${isActivitySelected ? "border-secondary bg-primary/5" : "border-0"}`}
    >
      {/* Card Title and Description */}
      <CardHeader className="pb-3 pt-3 relative">
        <div className="space-y-4">
          <CardTitle
            className="text-lg font-bold transition-colors line-clamp-2 
          group-hover:text-primary"
          >
            {activity.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {activity.description}
          </CardDescription>
          {/* Category Badge */}
          <Badge className="font-medium ml-auto">{activity.category}</Badge>
        </div>
        {/* Bookmark icon */}
        <Bookmark
          className="h-5 w-5 absolute right-4 top-4 hover:cursor-pointer backdrop-blur-sm"
          data-testid="bookmark-icon"
        />
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Activity Summary */}
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">{formatDate(activity.date)}</span>
            </div>

            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span className="truncate">{activity.city}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(activity.id)}
              className="flex-1 rounded-xl border-muted transition-all"
              data-testid="view-activity-button"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
