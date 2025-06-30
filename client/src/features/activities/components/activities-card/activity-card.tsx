import { Calendar, MapPin, Users, Edit, Eye, Star, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { Activity } from "@/types/api";

interface ActivityCardProps {
  activity: Activity;
  onView?: (activity: Activity) => void;
  onEdit?: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  onView,
  onEdit,
}: Readonly<ActivityCardProps>) {
  const isUpcoming = new Date(activity.date) > new Date();

  return (
    <Card className="group overflow-hidden bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
      {/* Event Image/Header */}
      <div className="relative h-48 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-white/80" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant={activity.isActive ? "success" : "secondary"}
            className="font-medium"
          >
            {activity.isActive ? "Active" : "Draft"}
          </Badge>
        </div>

        {/* Date Badge */}
        {isUpcoming && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <div className="text-xs font-bold text-gray-900">
              {new Date(activity.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        )}

        {/* Favorite Icon */}
        <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {activity.name}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-2 text-sm">
            {activity.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4 text-orange-500" />
              <span className="font-medium">{formatDate(activity.date)}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4 text-orange-500" />
              <span className="truncate">
                {activity.city}, {activity.location}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Users className="mr-2 h-4 w-4" />
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
                className="flex-1 rounded-xl border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all"
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
                className="flex-1 rounded-xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <Edit className="mr-1.5 h-3.5 w-3.5" />
                Edit
              </Button>
            )}
          </div>

          {/* Rating/Stats Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`star-${activity.id}-${i}`}
                  className={`h-3 w-3 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">4.0</span>
            </div>

            <div className="text-xs text-gray-500">
              Created {formatDateTime(activity.createdDate)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
