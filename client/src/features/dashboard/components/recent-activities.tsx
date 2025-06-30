import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { activitiesApi } from "@/features/activities";

export function RecentActivities() {
  const activities = use(activitiesApi.getAll());
  const recentActivities = [...activities]
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          Recent Events
        </CardTitle>
        <CardDescription className="text-gray-600">
          Your latest created events and activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-start space-x-4 rounded-xl border border-gray-100 p-4 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 cursor-pointer"
            >
              {/* Event Image Placeholder */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {activity.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>
                      {activity.city}, {activity.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>
                        {new Date(activity.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      <span>0 attendees</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {activity.isActive ? "Active" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {recentActivities.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first event
              </p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors">
                Create Event
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
