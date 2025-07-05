import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Calendar, Edit, Eye, Heart, MapPin, Star, Users } from "lucide-react";
import type { Activity } from "@/features/activities/types/activity";

interface ActivityCardProps {
  activity: Activity;
  onView?: (activity: Activity) => void;
  onEdit?: (activity: Activity) => void;
}

export function ActivityCard({ activity, onView, onEdit }: Readonly<ActivityCardProps>) {
  const isUpcoming = new Date(activity.date) > new Date();
  return (
    <Card
      className="transform overflow-hidden rounded-2xl border-0 pt-0 shadow-md transition-all 
    duration-300 group bg-card hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Activity Image */}
      <div className="relative h-48 bg-gradient-to-br-primary">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-primary-foreground/80" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant={activity.isActive ? "default" : "destructive"} className="font-medium">
            {activity.isActive ? "Active" : "Draft"}
          </Badge>
        </div>

        {/* Date Badge */}
        {isUpcoming && (
          <div className="absolute top-4 right-4 rounded-lg px-3 bg-accent/90 py-1.5">
            <div className="text-xs font-medium">{formatDate(activity.date)}</div>
          </div>
        )}

        {/* Favorite Icon */}
        <Button
          className="absolute right-4 bottom-4 rounded-full p-2 opacity-0 backdrop-blur-sm 
        transition-opacity bg-background/90 group-hover:opacity-100 hover:bg-background/70"
        >
          <Heart className="h-4 w-4 transition-colors text-muted-foreground" />
        </Button>
      </div>

      {/* Card Title and Description */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle
            className="text-lg font-bold transition-colors line-clamp-2 
          group-hover:text-primary"
          >
            {activity.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {activity.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Activity Details */}
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">{formatDate(activity.date)}</span>
            </div>

            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span className="truncate">
                {activity.city}, {activity.location}
              </span>
            </div>

            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              <span>0 registered</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(activity)}
                className="flex-1 rounded-xl border-muted transition-all 
                hover:border-secondary hover:bg-primary/90 hover:text-primary-foreground"
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                View
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(activity)}
                className="flex-1 rounded-xl border-muted transition-all 
                hover:border-primary hover:bg-secondary hover:text-secondary-foreground"
              >
                <Edit className="mr-1.5 h-3.5 w-3.5" />
                Edit
              </Button>
            )}
          </div>

          {/* Rating/Stats Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`star-${activity.id}-${i}`}
                  className={`h-3 w-3 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">4.0</span>
            </div>

            <div className="text-xs text-muted-foreground">
              Created {formatDate(activity.createdDate, true)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
