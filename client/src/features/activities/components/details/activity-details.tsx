import type { Activity } from "@/features/activities/types/activity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Calendar, MapPin, Users, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button.tsx";

interface ActivityDetailsProps {
  activity: Activity;
  handleOnCloseDetails: () => void;
}

export function ActivityDetails({ activity, handleOnCloseDetails }: ActivityDetailsProps) {
  return (
    <Card className="rounded-2xl border-0 pt-0 shadow-md bg-">
      {/* Header Image & Category */}
      <div className="relative h-56 bg-gradient-to-br from-primary to-secondary rounded-t-2xl">
        <div className="absolute inset-0 bg-black/10 rounded-t-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-20 w-20 text-primary-foreground/80" />
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="font-medium">{activity.category}</Badge>
        </div>

        <div className="absolute top-4 right-4 text-primary-foreground">
          <X
            className="hover:cursor-pointer"
            onClick={() => handleOnCloseDetails()}
            data-testid="close-details-button"
          />
        </div>
        {/* Bookmark icon */}
        <Button
          className="absolute right-4 bottom-4 rounded-full p-2 bg-background/90 
        backdrop-blur-sm hover:bg-background/70"
        >
          <Bookmark className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      {/* Card Title and Description */}
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{activity.name}</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {activity.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            <span className="font-medium">{formatDate(activity.date, true)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            <span>
              {activity.city}, {activity.location}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            <span>0 registered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
